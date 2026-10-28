# Event Bus — Bus sự kiện (legacy, đã lỗi thời trong Vue 3)

> **Yêu cầu:** Vue 3.x
> **Bài trước:** [`4_props-emit`](../4_props-emit/README.md) · **Bài sau:** [`6_fallthrough-attribute`](../6_fallthrough-attribute/README.md)

---

## ⚠️ Bài học về pattern LỖI THỜI

> **Event Bus (`$on` / `$off` / `$emit` trên một Vue instance rỗng) đã bị LOẠI BỎ khỏi Vue 3.**
>
> Trong Vue 2, bạn tạo một instance rỗng để phát/nghe sự kiện toàn cục. Vue 3 đã xóa hẳn API `$on`/`$off` khỏi instance — pattern này **không thể dùng** và cũng **không nên** dùng nữa.
>
> **Thay thế chính thức:** `provide`/`inject` (truyền dữ liệu theo cây), **Pinia** (state toàn cục), hoặc thư viện ngoài như `mitt` nếu thực sự cần pub/sub. Chi tiết bên dưới.

---

## 1. Event Bus là gì? (bối cảnh lịch sử)

Trong Vue 2, "event bus" là một Vue instance rỗng dùng làm **đài phát thanh trung tâm**:

```js
// ❌ Vue 2 — KHÔNG hoạt động trong Vue 3
const bus = new Vue()                     // instance rỗng
bus.$on('cart-updated', handler)          // nghe
bus.$emit('cart-updated', payload)        // phát
bus.$off('cart-updated', handler)         // hủy đăng ký
```

Mục đích: cho hai component **không có quan hệ cha–con** nói chuyện với nhau (ví dụ: sidebar nghe sự kiện từ một modal ở nhánh khác của cây component).

### Vì sao nó bị xóa khỏi Vue 3?

| Vấn đề | Hậu quả |
|---|---|
| **Không rõ nguồn dữ liệu** | Không thể lần ngược xem ai phát sự kiện — debug "ma" |
| **Memory leak** | Quên `$off` → handler giữ tham chiếu component đã hủy |
| **Trùng lặp với Pinia/`provide-inject`** | Vue 3 cung cấp giải pháp chính thức tốt hơn cho từng nhu cầu |
| **API instance gọn hơn** | Vue 3 tách hẳn các API toàn cục ra khỏi instance |

---

## 2. Thay thế 1 — `provide` / `inject` (chuẩn Vue 3, trong cùng cây component)

```vue
<!-- App.vue (ancestor) — đóng vai trò "broadcaster" -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const setTheme = (t) => { theme.value = t }

provide('theme', { theme, setTheme })   // bất kỳ component con nào cũng có thể lấy
</script>
```

```vue
<!-- Sidebar.vue (con sâu trong cây) -->
<script setup>
import { inject } from 'vue'

const { theme, setTheme } = inject('theme')   // "nghe" giá trị reactive
</script>

<template>
  <button @click="setTheme('light')">Chuyển sáng</button>
</template>
```

📌 Với **app cấp component gốc** (toàn app), `app.provide()` cũng hoạt động. Chi tiết đầy đủ: [`8_provide_inject`](../8_provide_inject/README.md).

---

## 3. Thay thế 2 — Pinia (state toàn cục)

Khi nhiều component cùng đọc/ghi một nguồn dữ liệu (giỏ hàng, user, theme), store là lựa chọn chuẩn:

```ts
// stores/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as Item[] }),
  actions: {
    add(item: Item) { this.items.push(item) },
  },
})
```

```vue
<!-- Component nào cũng gọi cùng store — không cần bus, không cần prop drilling -->
<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <button @click="cart.add(product)">Thêm vào giỏ ({{ cart.items.length }})</button>
</template>
```

Chi tiết đầy đủ: [`8_pinia`](../../8_pinia/README.md) và [`9_vue-ecosystem/pinia-2`](../../9_vue-ecosystem/pinia-2/README.md).

---

## 4. Thay thế 3 — `mitt` (nếu thật sự cần pub/sub)

Trong vài tình huống đặc biệt (cầu nối giữa code ngoài Vue và app Vue, iframe, Worker...), pub/sub vẫn hữu ích. Cài một thư viện nhỏ:

```bash
npm install mitt
```

```ts
// eventBus.ts
import mitt from 'mitt'

type Events = {
  'cart-updated': { count: number }
}

export const emitter = mitt<Events>()
```

```ts
// Phát sự kiện (bất kỳ đâu — kể cả code ngoài component)
eventBus.emit('cart-updated', { count: 3 })
```

```vue
<!-- Nghe sự kiện — luôn hủy đăng ký khi component unmount -->
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { eventBus } from '@/eventBus'

const onCartUpdated = (payload) => console.log('cart:', payload)

onMounted(() => eventBus.on('cart-updated', onCartUpdated))
onUnmounted(() => eventBus.off('cart-updated', onCartUpdated))  // ⚠️ BẮT BUỘC
</script>
```

> 💡 Quy tắc dùng mitt an toàn:
> - Đăng ký trong `onMounted`, **luôn** `off()` trong `onUnmounted`.
> - Đặt loại sự kiện (`type Events`) vào một file duy nhất.
> - Chỉ dùng khi `provide/inject` + Pinia không giải quyết được — ưu tiên cả hai trước.

---

## 5. Bảng so sánh — chọn công cụ thay thế

| Nhu cầu | Giải pháp thay Event Bus |
|---|---|
| Con → cha (thuật ngữ "phát sự kiện lên") | `emit` (xem [`4_props-emit/EMIT.md`](../4_props-emit/EMIT.md)) |
| Cha → con sâu nhiều tầng | `provide` / `inject` |
| Dữ liệu chia sẻ toàn app | **Pinia** |
| Component ngoài Vue cần thông báo vào Vue | `mitt` hoặc một hàm callback được app cung cấp |
| Global event thật sự (sự kiện window, keydown) | addEventListener trực tiếp trong `onMounted` + cleanup |

---

## 6. Mã tham khảo: Event Bus "tự chế" bằng cách nào trong Vue 2 (chỉ để hiểu lịch sử)

```js
// Vue 2 — KHÔNG chạy được trên Vue 3
const bus = new Vue()
bus.$emit('hello', 42)                 // phát
bus.$on('hello', (v) => console.log(v)) // nghe
```

Nếu bạn gặp code cũ như vậy khi refactor dự án Vue 2 → Vue 3, hãy:

1. Tìm nơi `bus.$on` — thường là các component lắng nghe.
2. Xác định dữ liệu có phải **state chia sẻ** không → đưa vào Pinia.
3. Nếu chỉ là **thông báo một chiều** → chuyển sang `emit`/`provide-inject`.
4. Nếu là cầu nối với mã ngoài → dùng `mitt` + dọn dẹp trong `onUnmounted`.

---

## Nguồn tham khảo

- Vue 3 migration — `listens-to-emit` đã bị xóa: https://v3-migration.vuejs.org/breaking-changes/events-api.html
- provide/inject: https://vuejs.org/guide/components/provide-inject.html
- mitt: https://github.com/developit/mitt
- Pinia (state chính thức): https://pinia.vuejs.org/

---

## 7. Gói pub/sub thành composable (thay bus bằng API của Vue)

Nếu dự án bạn dùng pub/sub ở nhiều chỗ, đóng gói vào một composable để các component **tự dọn dẹp** — không ai quên `off()`:

```ts
// composables/useEventBus.ts
import { onScopeDispose } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()

/** Đăng ký handler và tự hủy khi scope (component) bị hủy */
export function onBus(type, handler) {
  emitter.on(type, handler)
  onScopeDispose(() => emitter.off(type, handler))   // ⭐ tự dọn dẹp
}

export const emitBus = emitter.emit
```

```vue
<!-- Dùng — không cần onUnmounted nữa -->
<script setup>
import { onBus, emitBus } from '@/composables/useEventBus'

onBus('cart-updated', (payload) => console.log(payload))
emitBus('cart-updated', { count: 1 })
</script>
```

📌 `onScopeDispose` chạy khi scope hiệu ứng (component) bị hủy — đây là cách "unmount" của composition world. Mọi listener trong composable nên đi kèm nó.

---

## 8. Anti-pattern cần tránh

- **Bus làm "kênh mặc định"**: dự án mới chớ thiết kế giao tiếp qua sự kiện toàn cục — hãy bắt đầu từ props/emit + Pinia, chỉ "nới lỏng" khi thật sự cần.
- **Sự kiện lặp tên trùng** ở nhiều nơi (`'update'` được mọi component phát) → không thể phân biệt nguồn. Đặt tên sự kiện theo domain: `'order:created'`, `'cart:updated'`.
- **Payload "bá đạo"**: gửi nguyên component/state qua bus khiến listener nắm tham chiếu tới state cũ — hãy gửi dữ liệu phẳng, tối thiểu cần thiết.
- **Đăng ký trong `setup` root nhưng không dọn**: với `mitt` bạn phải tự `off()`; quên là leak. Composable ở mục 7 giải quyết triệt để.

### Checklist khi gặp code cũ dùng Event Bus (Vue 2 → 3)

1. ✅ Tìm toàn bộ `\$on`, `\$off`, `\$emit` trên instance dùng làm bus (`grep -rn "\$on(" src`).
2. ✅ Phân loại: giao tiếp con→cha? (→ `emit`) — dữ liệu chia sẻ? (→ Pinia) — cầu nối ngoài? (→ mitt).
3. ✅ Thay từng cụm một và chạy test sau mỗi thay đổi.
4. ✅ Kiểm tra `onUnmounted`/`onScopeDispose` với mọi listener còn lại.

---

## Nguồn tham khảo (bổ sung)

- Vue 3 — Breaking changes: Events API: https://v3-migration.vuejs.org/breaking-changes/events-api.html
- `onScopeDispose`: https://vuejs.org/api/reactivity-core.html#onscopedispose
- Event emitter pattern ( mitt ): https://github.com/developit/mitt
- Vue style guide — avoid event bus: https://vuejs.org/style-guide/
