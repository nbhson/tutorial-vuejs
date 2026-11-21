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

Mục này giải thích nguyên nhân sinh ra modules: Vuex chỉ cho một store duy nhất, app lớn thì file đó phình thành "cục bự không ai dám đụng" — nên phải chia ngăn. Đọc để hiểu vấn đề mà Pinia xử theo cách khác hẳn.

Ví von: một nhà chỉ có một tủ quần áo chung — người nhiều thì phải chia "tủ con" và ghi biển tên (namespaced) để khỏi mặc nhầm áo nhau.

Store Vuex chỉ có một — khi app lớn, mọi state/getter/mutation/action dồn vào một file hàng nghìn dòng. **Modules** chia store thành các phần độc lập:

> 📄 **Code ví dụ:** [`examples/01-1-vi-sao-vuex-can-modules.js`](examples/01-1-vi-sao-vuex-can-modules.js)

```
root store
├── cart/     items, itemCount, add, checkout
└── user/     name, ...
```

Gọi phải **kèm tên module**:

> 📄 **Code ví dụ:** [`examples/02-1-vi-sao-vuex-can-modules.js`](examples/02-1-vi-sao-vuex-can-modules.js)

> ⚠️ Quên `namespaced: true` → mutation/action của module **trộn lẫn với root** → gọi `commit('add')` cũng được, dễ xung đột tên giữa các module. Đây là một bẫy kinh điển của Vuex.

> **Tóm gọn 1 câu:** Vuex cần modules vì chỉ có một store — phải chia ngăn trong tủ và dán biển tên (namespaced), quên dán là tên trộn lẫn nhau.

## 2. Pinia giải quyết cùng vấn đề thế nào?

Mục này cho thấy "cách giải thoát": thay vì chia ngăn trong một tủ chung, Pinia phát cho mỗi domain một tủ riêng — khỏi cần biển tên, khỏi xung đột.

Pinia **không có root store, không có modules** — mỗi domain là một store độc lập:

> 📄 **Code ví dụ:** [`examples/03-2-pinia-giai-quyet-cung-van-e-the.ts`](examples/03-2-pinia-giai-quyet-cung-van-e-the.ts)

> 📄 **Code ví dụ:** [`examples/04-2-pinia-giai-quyet-cung-van-e-the.ts`](examples/04-2-pinia-giai-quyet-cung-van-e-the.ts)

> 📄 **Code ví dụ:** [`examples/05-2-pinia-giai-quyet-cung-van-e-the.vue`](examples/05-2-pinia-giai-quyet-cung-van-e-the.vue)

📌 **Không còn `namespaced`, không còn `cart/`** — dùng tên hàm như gọi hàm JavaScript bình thường. Vấn đề xung đột tên cũng biến mất vì store khác nhau, file khác nhau, tệp lớn tự chia module ES (`export`/`import`).

## 3. Bảng đối chiếu modules ↔ Pinia stores

Mục này là "từ điển chuyển nhà": mỗi cấu trúc Vuex module tương ứng gì khi sang Pinia. Đọc dòng nào dịch dòng đó.

| Vuex module | Pinia |
|---|---|
| `modules: { cart, user }` | Nhiều file store riêng (`stores/cart.ts`, `stores/user.ts`) |
| `namespaced: true` | Không cần — mọi store tự namespace theo file |
| `store.state.cart.items` | `cart.items` |
| `commit('cart/add', item)` | `cart.add(item)` |
| `dispatch('cart/checkout')` | `cart.checkout()` |
| `rootState`, `rootGetters` | Import trực tiếp store khác |
| Register module động `registerModule` | `store.$id`... — Pinia cũng hỗ trợ store động hiếm gặp |

> **Cách đọc bảng này:** cột trái là cách gọi trong Vuex module, cột phải là cách gọi ngắn hơn ở Pinia — dùng như bảng dịch khi migrate từng dòng code cũ.

## 4. Migration modules → Pinia

Mục này là "kế hoạch chuyển nhà từng phòng": sơ đồ 6 bước dưới đây áp dụng cho từng module một, chứ không dọn cả nhà một lúc.

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

> **Tóm gọn 1 câu:** Vuex module là cách "chia ngăn trong một tủ chung"; Pinia cho mỗi domain một tủ riêng — migrate là chuyển từng module thành một file store.

## Nguồn tham khảo

- Vuex modules: https://vuex.vuejs.org/guide/modules.html
- Pinia — defining stores: https://pinia.vuejs.org/core-concepts/defining-a-store.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
