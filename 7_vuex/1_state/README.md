# Vuex — State (⚠️ LEGACY — Vuex đã bị thay thế bởi Pinia)

> ## ⚠️ CẢNH BÁO: VUI LÒNG ĐỌC KỸ PHẦN NÀY
>
> **Vuex không còn là thư viện quản lý state chính thức của Vue 3.**
>
> - **Pinia** là thư viện state management **chính thức** từ Vue 3 (được nhóm Vue khuyến nghị, kể cả Vue 2.x hiện nay).
> - Vuex 4 chỉ tồn tại để **duy trì tương thích** các dự án cũ; nhóm phát triển không phát triển tính năng mới cho Vuex.
> - Bài này giữ lại nội dung Vuex làm **tài liệu tham khảo legacy** — để bạn đọc hiểu code cũ hoặc migration.
>
> 👉 **Dự án mới: hãy dùng Pinia** — bắt đầu từ [`8_pinia/1_defining-a-store`](../8_pinia/1_defining-a-store/README.md), và xem bảng đối chiếu [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md).

---

## 1. Store là gì? (khái niệm vẫn đúng với Pinia)

Khi ứng dụng lớn lên, nhiều component cùng cần chung một dữ liệu (user đang đăng nhập, giỏ hàng, theme...). Truyền props qua nhiều tầng (prop drilling) rất rối. **Store** là chỗ dữ liệu trung tâm — mọi component đều truy cập được.

```
┌────────────┐     ┌──────────────────────────┐
│ Component A│ ──▶ │                          │
├────────────┤     │   STORE (state chung)    │
│ Component B│ ──▶ │  user · cart · settings  │
├────────────┤     │                          │
│ Component C│ ──▶ │                          │
└────────────┘     └──────────────────────────┘
```

## 2. Cài đặt Vuex (chỉ khi làm việc với dự án cũ)

```bash
npm install vuex@4          # Vuex 4 dành cho Vue 3
```

```ts
// store/index.ts — ❌ legacy
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
  },
})
```

```ts
// main.ts
import { createApp } from 'vue'
import store from './store'

createApp(App).use(store).mount('#app')
```

Đối chiếu với **Pinia** (mới): không cần root store, không cần `use()`:

```ts
// stores/counter.ts — ✅ Pinia
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  return { count }
})
```

## 3. Truy cập state trong component (Vuex)

```vue
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const count = computed(() => store.state.count)
</script>

<template>
  <p>Count: {{ count }}</p>
</template>
```

Options API + `mapState` (thân thuộc với code cũ):

```js
import { mapState } from 'vuex'

export default {
  computed: mapState(['count']),
}
```

## 4. So sánh nhanh state Vuex vs Pinia

| Vuex 4 | Pinia 3 | Ghi chú |
|---|---|---|
| `state: { count: 0 }` (root store duy nhất) | Nhiều store, mỗi store tự định nghĩa | Pinia không có "root" — mọi store độc lập |
| `store.state.count` | `counter.count` (không cần `.state`) | Pinia gọn hơn khi dùng trong component |
| `mapState(['count'])` | `storeToRefs(counter)` | Pinia có helper riêng |
| Chỉ khởi tạo state qua plain object | Hàm trả object, hỗ trợ tốt SSR | Khái niệm giống nhau |

> 💡 Nội dung chi tiết từng khía cạnh state của Pinia: [`8_pinia/2_state`](../8_pinia/2_state/README.md).

## 5. Khi nào đọc tiếp phần Vuex legacy?

- ✅ Bạn **nhận code cũ** dùng Vuex và cần bảo trì/tìm hiểu.
- ✅ Bạn cần **migration** Vuex → Pinia (xem [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md)).
- ❌ Bạn đang **học từ đầu** — bỏ qua mục này, học Pinia ngay.

## Nguồn tham khảo

- Vuex 4 docs (bảo trì, không phát triển mới): https://vuex.vuejs.org/
- Pinia — state management chính thức: https://pinia.vuejs.org/
- So sánh Vuex vs Pinia (Pinia docs): https://pinia.vuejs.org/introduction.html#comparison-with-vuex
