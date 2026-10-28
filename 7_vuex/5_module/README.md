# Vuex — Modules (⚠️ LEGACY — Pinia giải quyết vấn đề này bằng cách khác)

> ## ⚠️ TÀI LIỆU LEGACY
>
> **Pinia là thư viện state management chính thức của Vue 3.** Vuex chỉ được duy trì cho dự án cũ.
>
> **Modules** trong Vuex tồn tại vì Vuex chỉ cho phép **một store duy nhất** — lớn lên phải chia module bên trong. Pinia giải quyết vấn đề cùng lúc bằng cách đơn giản hơn: **mỗi domain một store riêng**, không cần module, không cần `namespaced`.
>
> - Nội dung Vuex bên dưới: để đọc hiểu dự án cũ.
> - Dự án mới: [`8_pinia/1_defining-a-store`](../8_pinia/1_defining-a-store/README.md).
> - Đối chiếu chi tiết: [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md).

---

## 1. Vì sao Vuex cần modules?

Store Vuex chỉ có một — khi app lớn, mọi state/getter/mutation/action dồn vào một file hàng nghìn dòng. **Modules** chia store thành các phần độc lập:

```js
// ❌ Vuex 4 — legacy
const cart = {
  namespaced: true,        // ⭐ BẮT BUỘC nếu muốn gọi qua 'cart/...'
  state: () => ({ items: [] }),
  getters: { itemCount: (s) => s.items.length },
  mutations: { add(s, item) { s.items.push(item) } },
  actions: { checkout({ state, commit }) { /* ... */ } },
}

const user = {
  namespaced: true,
  state: () => ({ name: '' }),
}

export default createStore({
  modules: { cart, user },
})
```

```
root store
├── cart/     items, itemCount, add, checkout
└── user/     name, ...
```

Gọi phải **kèm tên module**:

```js
store.state.cart.items            // state — lồng nhau
store.getters['cart/itemCount']   // getter — dấu /
store.commit('cart/add', item)    // mutation — 'module/mutation'
store.dispatch('cart/checkout')   // action
```

> ⚠️ Quên `namespaced: true` → mutation/action của module **trộn lẫn với root** → gọi `commit('add')` cũng được, dễ xung đột tên giữa các module. Đây là một bẫy kinh điển của Vuex.

## 2. Pinia giải quyết cùng vấn đề thế nào?

Pinia **không có root store, không có modules** — mỗi domain là một store độc lập:

```ts
// ✅ stores/cart.ts (Pinia)
export const useCartStore = defineStore('cart', () => {
  const items = ref<Item[]>([])
  const itemCount = computed(() => items.value.length)
  function add(item: Item) { items.value.push(item) }
  async function checkout() { /* ... */ }
  return { items, itemCount, add, checkout }
})
```

```ts
// stores/user.ts — hoàn toàn độc lập
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  return { name }
})
```

```vue
<!-- component — gọi trực tiếp, không có tiền tố 'cart/' -->
<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
cart.add(item)
</script>
```

📌 **Không còn `namespaced`, không còn `cart/`** — dùng tên hàm như gọi hàm JavaScript bình thường. Vấn đề xung đột tên cũng biến mất vì store khác nhau, file khác nhau, tệp lớn tự chia module ES (`export`/`import`).

## 3. Bảng đối chiếu modules ↔ Pinia stores

| Vuex module | Pinia |
|---|---|
| `modules: { cart, user }` | Nhiều file store riêng (`stores/cart.ts`, `stores/user.ts`) |
| `namespaced: true` | Không cần — mọi store tự namespace theo file |
| `store.state.cart.items` | `cart.items` |
| `commit('cart/add', item)` | `cart.add(item)` |
| `dispatch('cart/checkout')` | `cart.checkout()` |
| `rootState`, `rootGetters` | Import trực tiếp store khác |
| Register module động `registerModule` | `store.$id`... — Pinia cũng hỗ trợ store động hiếm gặp |

## 4. Migration modules → Pinia

Quy trình từng module một:

```
modules/cart.js  (Vuex)
   │
   ├─ 1. Tạo stores/cart.ts bằng defineStore
   ├─ 2. State của module → ref()/reactive()
   ├─ 3. Getters  → computed()
   ├─ 4. Mutations+Actions → gộp thành actions (xóa mutation)
   ├─ 5. Trong component: cartStore.add(...) thay commit('cart/add', ...)
   └─ 6. Xóa module khỏi root store khi không còn ai dùng
```

Chi tiết từng bước migration: [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md) — đặc biệt phần "chuyển từng module".

> 💡 Khi migrate, chạy song song được: Pinia store và Vuex module có thể cùng tồn tại trong một app, chuyển dần từng tính năng rồi mới bỏ Vuex hoàn toàn.

## 5. Khi nào đọc tiếp phần Vuex legacy?

- ✅ Dự án cũ có `modules: {...}` và `namespaced: true` — cần bảo trì hoặc migrate.
- ✅ Hiểu tại sao Pinia không cần modules (lý do thiết kế).
- ❌ Dự án mới: **không tạo cấu trúc "module" trong Pinia** — hãy tạo nhiều store nhỏ theo domain (cart, user, ui...).

## Nguồn tham khảo

- Vuex modules: https://vuex.vuejs.org/guide/modules.html
- Pinia — defining stores: https://pinia.vuejs.org/core-concepts/defining-a-store.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
