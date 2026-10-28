# Vuex — Mutations (⚠️ LEGACY — Pinia đã thay thế Vuex)

> ## ⚠️ TÀI LIỆU LEGACY
>
> **Pinia là thư viện state management chính thức của Vue 3.** Vuex chỉ được duy trì cho các dự án cũ.
>
> **Điểm khác biệt quan trọng nhất giữa Vuex và Pinia nằm ở bài này:** Vuex bắt buộc thay đổi state qua **mutations** (các hàm đồng bộ riêng); Pinia **loại bỏ hoàn toàn mutations** — bạn sửa state trực tiếp bên trong store.
>
> - Nội dung Vuex bên dưới: chỉ để đọc hiểu code cũ / migration.
> - Dự án mới: [`8_pinia/4_actions`](../8_pinia/4_actions/README.md) — tại Pinia, actions làm cả việc của mutations.
>
> 👉 Bảng đối chiếu đầy đủ: [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md).

---

## 1. Mutations là gì? (vì sao Vuex có chúng)

Trong Vuex, **state không được sửa trực tiếp từ ngoài**. Mọi thay đổi phải đi qua một **mutation** — hàm nhận `(state, payload)`:

```js
// ❌ Vuex 4 — legacy
import { createStore } from 'vuex'

export default createStore({
  state: () => ({ count: 0 }),
  mutations: {
    increment(state) {
      state.count++                       // thay đổi state ở đây
    },
    incrementBy(state, amount) {
      state.count += amount
    },
  },
})
```

```vue
<script setup>
import { useStore } from 'vuex'

const store = useStore()

function increment() {
  store.commit('increment')            // BẮT BUỘC gọi qua mutation
}
</script>
```

### Vì sao Vuex thiết kế mutations?

- Mọi thay đổi state đều đi qua một điểm duy nhất → **dễ theo dõi** trong DevTools.
- DevTools "time-travel": undo/redo từng mutation để debug.
- Quy ước mutations **đồng bộ** (sync) — giúp log chính xác thứ tự thay đổi.

Trong thực tế, hai lý do này được Pinia giải quyết tốt hơn qua DevTools tự theo dõi action — đó là lý do Pinia xóa mutations.

## 2. Mutations truyền tham số — "payload"

```js
// ❌ legacy
mutations: {
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter((t) => t.id !== id)
  },
}
```

```js
store.commit('add', { id: 3, text: 'Nhiệm vụ mới', done: false })
store.commit('todo/remove', 2, { root: true })   // gọi từ module khác
```

## 3. ❌ Cấm mutate state từ ngoài mutation

Vuex **báo lỗi** (trong chế độ dev) khi bạn ghi state trực tiếp:

```js
store.state.count = 10     // ❌ "Do not mutate vuex store state outside mutation handlers"
```

Tương ứng trong **Pinia** — hành vi **ngược lại**:

```ts
// ✅ Pinia: sửa state trực tiếp trong store là được, không cần mutation
const store = useCounterStore()
store.count++
```

> 💡 Đó là một trong những lý do lớn nhất khiến Pinia gọn hơn Vuex: **một lớp trung gian (mutations) bị xóa bỏ**.

## 4. Đối chiếu mutation → action Pinia

| Vuex | Pinia tương đương |
|---|---|
| `mutations: { increment(state) {...} }` | **Không có** — sửa trực tiếp `state.count++` trong action hoặc component |
| `store.commit('increment')` | `counter.increment()` (gọi action) |
| `commit` phải đồng bộ | Action được phép async tự do |

```ts
// ✅ Pinia — action đồng bộ, không qua mutation
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() { count.value++ }
  return { count, increment }
})
```

## 5. Quy trình migration: mutations → Pinia

```
Vuex store
  state     ──▶  ref()/reactive() trong store Pinia
  getters   ──▶  computed() trong store
  mutations ──▶  XÓA — logic đổi state đưa thẳng vào action
  actions   ──▶  actions Pinia (async tự nhiên)
```

Ví dụ chuyển một mutation cụ thể:

```js
// Vuex mutation
mutations: {
  addItem(state, item) { state.items.push(item) }
}
```

```ts
// ✅ Pinia action tương đương
export const useCartStore = defineStore('cart', () => {
  const items = ref<Item[]>([])
  function addItem(item: Item) { items.value.push(item) }   // không cần mutation
  return { items, addItem }
})
```

## 6. Khi nào đọc tiếp phần Vuex legacy?

- ✅ Code cũ dùng `store.commit(...)` và bạn cần hiểu từng dòng.
- ✅ Chuyển Vuex → Pinia: mỗi mutation trở thành một **action** Pinia (bên trong vẫn sửa state trực tiếp).
- ❌ Dự án mới: học thẳng Pinia — mutations **không tồn tại** trong Pinia.

## Nguồn tham khảo

- Vuex mutations: https://vuex.vuejs.org/guide/mutations.html
- Pinia actions (thay mutations + actions của Vuex): https://pinia.vuejs.org/core-concepts/actions.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
