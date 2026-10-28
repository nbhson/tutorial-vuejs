# Vuex — Getters (⚠️ LEGACY — Pinia đã thay thế Vuex)

> ## ⚠️ TÀI LIỆU LEGACY
>
> **Pinia là thư viện state management chính thức của Vue 3.** Vuex 4 chỉ được duy trì để tương thích dự án cũ.
>
> Nội dung dưới đây mô tả **getters trong Vuex** — khái niệm tương đương trong Pinia là **getters** (mục 3 của [`8_pinia/3_getters`](../8_pinia/3_getters/README.md)) hoặc đơn giản là `computed()`.
>
> 👉 Dự án mới → Pinia. Chỉ đọc tiếp nếu bạn đang đọc/migrate code cũ.

---

## 1. Getter là gì? (khái niệm chung)

**Getter** là "computed property của store" — giá trị **được tính từ state**, có **cache** (chỉ tính lại khi state liên quan đổi), và dùng chung nhiều component.

Ví dụ kinh điển: "giỏ hàng còn bao nhiêu sản phẩm", "lọc danh sách việc cần làm chưa xong".

```js
// ❌ Vuex 4 — legacy
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [
      { id: 1, text: 'Học Vue', done: true },
      { id: 2, text: 'Viết báo cáo', done: false },
    ],
  },
  getters: {
    doneTodos: (state) => state.todos.filter((t) => t.done),
    doneCount: (state) => state.todos.filter((t) => t.done).length,
  },
})
```

```ts
// ✅ Pinia tương đương — see 8_pinia/3_getters
export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  const doneTodos = computed(() => todos.value.filter((t) => t.done))
  return { todos, doneTodos }
})
```

## 2. Truy cập getter trong component (Vuex)

```vue
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const doneCount = computed(() => store.getters.doneCount)
</script>

<template>
  <p>Hoàn thành: {{ doneCount }}</p>
</template>
```

Hoặc `mapGetters` (Options API):

```js
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['doneTodos', 'doneCount']),
}
```

## 3. Getter nhận tham số (pattern "filter theo điều kiện")

Vuex getters chỉ nhận `state` mặc định — để truyền tham số, getter phải **trả về một hàm**:

```js
// ❌ legacy Vuex
getters: {
  todoById: (state) => (id) => state.todos.find((t) => t.id === id),
}
```

```js
// Trong component
store.getters.todoById(2)
```

⚠️ **Lưu ý hiệu năng:** getter trả về hàm mới mỗi lần gọi → **không cache** giữa các lần gọi. Trong Pinia, bạn viết hàm thường bên trong store và có kiểm soát caching:

```ts
// ✅ Pinia
const todoById = computed(() => (id) => todos.value.find((t) => t.id === id))
```

## 4. So sánh getters Vuex vs Pinia

| Vuex | Pinia | Ghi chú |
|---|---|---|
| `getters: { doneCount: (state) => ... }` | `const doneCount = computed(...)` | Cùng ý niệm "computed từ state" |
| `store.getters.doneCount` | `store.doneCount` | Không cần `getters.` |
| Getter nhận tham số → trả hàm (không cache) | Hàm thường trong store | Pinia cache tự nhiên qua computed |
| Truy cập getter khác: dùng `getters` param | Dùng trực tiếp store khác | |

Chi tiết getters Pinia: [`8_pinia/3_getters`](../8_pinia/3_getters/README.md).

## 5. Khi nào vẫn cần hiểu Vuex getters?

1. **Đọc/maintain code cũ** — dự án Vue 2/3 còn dùng Vuex.
2. **Migration**: mỗi getter Vuex trở thành một `computed` trong store Pinia; cách thức chuyển đổi chi tiết trong [`VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md).
3. **Phỏng vấn/làm việc với dự án cũ** — hiểu merge của pattern này giúp suy ra ý đồ của tác giả.

> ❌ Nếu bạn đang viết dự án mới, hãy **bỏ qua phần này** và học luôn cách Pinia: [`8_pinia/3_getters`](../8_pinia/3_getters/README.md).

## Nguồn tham khảo

- Vuex getters: https://vuex.vuejs.org/guide/getters.html
- Pinia getters: https://pinia.vuejs.org/core-concepts/getters.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
