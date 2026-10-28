# Mixins — Trộn logic dùng chung (⚠️ legacy — khuyến nghị Composables)

> **Yêu cầu:** Vue 3.x
> **Bài trước:** [`2_filter`](../2_filter/README.md) · **Bài sau:** [`4_composables`](../4_composables/README.md)

---

## 📌 Tư cách của pattern này

> **Mixins vẫn hoạt động trong Vue 3 nhưng KHÔNG còn được khuyến nghị.**
>
> Tài liệu chính thức của Vue (Style Guide + trang Migration) gọi mixins là pattern khó bảo trì và khuyến nghị thay bằng **Composables** (Composition API). Bài này:
>
> 1. Giải thích mixins hoạt động ra sao — để bạn **đọc hiểu code cũ**;
> 2. Chỉ cách **nâng cấp** sang composables;
> 3. Liệt kê các bẫy của mixins để tránh đưa pattern này vào code mới.
>
> 👉 Nếu bạn đang viết tính năng mới, hãy đọc thẳng [`4_composables`](../4_composables/README.md).

---

## 1. Mixin là gì?

**Mixin** là một object chứa tùy chọn component (`data`, `methods`, `computed`, lifecycle hooks...) được **"trộn" vào** nhiều component dùng chung.

```js
// mixins/hoverable.js
export const hoverMixin = {
  data() {
    return { isHover: false }
  },
  methods: {
    onMouseEnter() { this.isHover = true },
    onLeave()      { this.isHover = false },
  },
}
```

```vue
<script>
// ❌ Style cũ — vẫn chạy trong Vue 3 nhưng KHÔNG khuyến nghị
import { hoverMixin } from '@/mixins/hover'

export default {
  mixins: [hoverMixin],
}
</script>

<template>
  <div @mouseenter="isHover = true" @mouseleave="onHover(false)">
    {{ isHover ? 'Đang hover' : '' }}
  </div>
</template>
```

Vấn đề ngay lập tức nhìn thấy: component dùng `isHover`/`onHover` mà **không khai báo ở đâu cả** — chúng đến từ mixin, "tàng hình" với người đọc code.

---

## 2. Quy tắc trộn (merge strategy)

Khi component và mixin có cùng tùy chọn, Vue quy ước:

| Tùy chọn | Hành vi khi trùng |
|---|---|
| `data` | Đệ quy gộp; **component thắng** khi trùng key |
| Lifecycle hooks | **Chạy cả hai**, mixin hook chạy **trước** hook của component |
| `methods` / `computed` / `components` | Gộp object; **component thắng** khi trùng tên |
| `watch` | Các watcher cùng tên đều chạy |

```js
const mixin = {
  data: () => ({ shared: 'từ mixin' }),
  created() { console.log('mixin hook') },
}
export default {
  mixins: [mixin],
  data: () => ({ shared: 'của component' }),   // đè lên nếu trùng tên
  created() { console.log('hook component chạy SAU mixin') },
}
```

📌 **Dấu hiệu nhận biết khi đọc code cũ:** một component "tự nhiên" có method/hook bạn không thấy khai báo ở đâu → nghi ngờ mixin. Tìm `mixins: [...]` trong file và mở mixin đó ra.

---

## 3. Bẫy của mixins — vì sao bị "ghét"

| Bẫy | Mô tả |
|---|---|
| **Nguồn ẩn** | Biến/method trong mixin không thấy trong component — tìm kiếm "trên máy" không ra |
| **Xung đột tên** | Hai mixin cùng khai `formatDate` → im lặng ghi đè nhau theo thứ tự |
| **Phụ thuộc chéo** | Mixin dùng `this.title` nhưng không component nào khai báo nó rõ ràng |
| **Không có kiểu** | TypeScript không suy luận được dữ liệu mixin cung cấp |
| **Khó tái sử dụng có chọn lọc** | Không thể "lấy mỗi `formatter()` của mixin" — nhận cả xà lách |

Cùng một logic "hover" viết theo 2 cách để so sánh:

### Mixin (cũ)

```js
// hoverMixin.js — ai dùng mixin này biết gì về nó?
export const hoverMixin = {
  data: () => ({ isHover: false }),
  methods: {
    onEnter() { this.isHover = true },
    onLeave() { this.isHover = false },
  },
}
```

```vue
<!-- ❌ Không nhìn được là isHover từ đâu ra -->
<script>
export default {
  mixins: [hoverMixin],
  template: `<div @mouseenter="onEnter">{{ isHover }}</div>`,
}
</script>
```

### Composable tương đương

```ts
// composables/useHover.ts
import { ref } from 'vue'

export function useHover() {
  const isHover = ref(false)
  return {
    isHover,
    onEnter: () => (isHover.value = true),
    onLeave: () => (isHover.value = false),
  }
}
```

```vue
<!-- ✅ Rõ nguồn gốc, có kiểu, tự đặt tên biến -->
<script setup>
import { useHover } from '@/composables/useHover'

const { isHover, onEnter, onLeave } = useHover()
</script>

<template>
  <div @mouseenter="onEnter" @mouseleave="onLeave">{{ isHover }}</div>
</template>
```

---

## 4. Dẫn đường nâng cấp mixin → composable

Quy trình từng bước cho một mixin điển hình:

```
mixins/fetch-user.js  (Vue 2)
        │
        ├── 1. Xác định "state" trong mixin (data)      → biến ref/reactive
        ├── 2. Xác định "computed" trong mixin          → computed()
        ├── 3. Xác định "methods"                        → hàm thường
        └── 4. Lifecycle hooks (mounted/unmounted...)    → onMounted/onUnmounted
              │
              ▼
composables/useFetchUser.ts (Vue 3)
```

```ts
// Trước: mixins/fetch-user.js
export default {
  data: () => ({ user: null, loading: false }),
  created() { this.fetchUser(this.$route.params.id) },
  methods: {
    async fetchUser(id) {
      this.loading = true
      this.user = await fetchUserById(id)
      this.loading = false
    },
  },
}
```

```ts
// Sau: composables/useUser.ts
import { ref } from 'vue'
import { fetchUserById } from '@/api/users'

export function useUser(userId: string | number) {
  const user = ref<User | null>(null)
  const loading = ref(false)

  async function load() {
    loading.value = true
    user.value = await fetchUserById(userId)
    loading.value = false
  }
  onMounted(load)

  return { user, loading, reload: load }
}
```

```vue
<script setup>
const { user, loading } = useUser(route.params.id)
</script>
```

📌 Lợi ích thấy ngay khi refactor: composable trả về **đúng những gì component cần** — không còn "trôi" data/method thừa, đồng thời có type và auto-complete.

---

## 5. Bảng tổng hợp — mixins vs composables

| Tiêu chí | Mixin | Composable |
|---|---|---|
| Nguồn logic | Ẩn (nạp từ object) | Tường minh qua import + destructure |
| Đặt tên trùng | Xung đột, im lặng | Có thể đổi tên lúc gọi |
| Truyền tham số | Khó (chỉ qua props/data) | Tham số hàm bình thường |
| TypeScript | Gần như không hỗ trợ | Suy kiểu tự nhiên |
| Tái sử dụng chọn lọc | Không | Có — gọi đúng hàm cần |
| Tư cách trong Vue 3 | Hoạt động, **không khuyến nghị** | ✅ Khuyến nghị chính thức |

---

## 6. Trường hợp "mixins vẫn ổn"?

Trong thực tế hiếm khi cần giữ mixin, trừ khi:

- Dự án viết thuần Options API và chưa sẵn sàng chuyển sang Composition API (nên cân nhắc: mixins vẫn hợp lệ).
- Code cũ rất lớn, chưa kịp refactor — **giữ nguyên mixin, tài liệu hóa, lên kế hoạch chuyển dần**. Đừng sửa một lúc cả nghìn dòng.

Quy tắc thực chiến: **tính năng mới không dùng mixin nữa**; mixin cũ chỉ chạm vào khi sửa chức năng liên quan, mỗi lần chạm thì chuyển dần sang composable.

---

## Nguồn tham khảo

- Composables (thay thế khuyến nghị): https://vuejs.org/guide/reusability/composables.html
- Vue 3 migration — Mixins vẫn hoạt động nhưng khuyến nghị composables: https://v3-migration.vuejs.org/
- Style Guide — custom directives/composables ưu tiên: https://vuejs.org/style-guide/
- So sánh chi tiết mixin vs composable: https://vuejs.org/guide/reusability/composables.html#vs-mixins
