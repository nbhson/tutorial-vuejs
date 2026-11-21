# Vuex — Actions (⚠️ LEGACY — Pinia đã thay thế Vuex)

> ## ⚠️ TÀI LIỆU LEGACY
>
> **Pinia là thư viện state management chính thức của Vue 3.** Vuex chỉ được duy trì cho dự án cũ.
>
> Trong Pinia, **actions giữ vai trò của cả mutations lẫn actions của Vuex** — và được phép `async` tự nhiên. Nếu bạn đang viết dự án mới, hãy học thẳng: [`8_pinia/4_actions`](../8_pinia/4_actions/README.md).
>
> Nội dung Vuex bên dưới giúp bạn đọc hiểu code cũ và thực hiện migration (đối chiếu chi tiết: [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md)).

---

## 1. Action là gì? Khác mutation ở đâu?

Mục này phân vai hai nhân vật trong đoàn kịch Vuex: mutation là người "ghi sổ cái" (sync, qua `commit`), action là người "chạy việc ngoài" (gọi API, xử lý logic, qua `dispatch`). Đọc để hiểu bộ đôi này trước khi nhìn code cũ.

Ví von: mutation là kế toán trong phòng — chỉ nhận phiếu và ghi sổ ngay tại chỗ; action là nhân viên kinh doanh ra ngoài gặp khách, xong việc mới về nộp phiếu cho kế toán.

- **Mutation** — hàm **đồng bộ** thay đổi state, gọi qua `commit`.
- **Action** — hàm **chứa logic nghiệp vụ**, thường **bất đồng bộ** (gọi API...), khi cần thay state thì `commit` mutation. Gọi qua `dispatch`.

> 📄 **Code ví dụ:** [`examples/01-1-action-la-gi-khac-mutation-o-au.js`](examples/01-1-action-la-gi-khac-mutation-o-au.js)

> 📄 **Code ví dụ:** [`examples/02-1-action-la-gi-khac-mutation-o-au.js`](examples/02-1-action-la-gi-khac-mutation-o-au.js)

📌 **Nguyên tắc cũ của Vuex:** logic async nằm trong action; mutation chỉ làm việc gán state thuần (sync). Mọi điều kiện/lỗi xử lý trong action.

> **Tóm gọn 1 câu:** Action là "nhân viên ra ngoài chạy việc" (async, gọi qua `dispatch`), mutation là "kế toán ghi sổ trong phòng" (sync, qua `commit`) — Pinia gộp cả hai thành một.

## 2. Truyền tham số cho action

Mục này giải quyết chi tiết nhỏ nhưng hay vướng: action chỉ nhận một "túi payload" — cần nhiều thứ thì bỏ hết vào một object, như đưa cả vali thay vì ôm từng túi rời.

> 📄 **Code ví dụ:** [`examples/03-2-truyen-tham-so-cho-action.js`](examples/03-2-truyen-tham-so-cho-action.js)

> 📄 **Code ví dụ:** [`examples/04-2-truyen-tham-so-cho-action.js`](examples/04-2-truyen-tham-so-cho-action.js)

Lưu ý: nếu cần **nhiều** tham số, Vuex chỉ nhận một "payload" — bọc chúng vào object.

> **Tóm gọn 1 câu:** Action chỉ nhận một payload duy nhất — nhiều tham số thì bọc vào một object như gói cả vào một vali.

## 3. Action gọi action khác

> 📄 **Code ví dụ:** [`examples/05-3-action-goi-action-khac.js`](examples/05-3-action-goi-action-khac.js)

Đối chiếu Pinia — store khác chỉ cần import và gọi như hàm thường:

> 📄 **Code ví dụ:** [`examples/06-3-action-goi-action-khac.ts`](examples/06-3-action-goi-action-khac.ts)

## 4. Xử lý lỗi trong action

Mục này nói về "kịch bản xấu": gọi API thì có lúc trượt — action là đúng chỗ bắt lỗi, hiện thông báo, và đừng để app đứng hình.

> 📄 **Code ví dụ:** [`examples/07-4-xu-ly-loi-trong-action.js`](examples/07-4-xu-ly-loi-trong-action.js)

Đối chiếu Pinia — dễ hơn vì action là hàm JS thông thường:

> 📄 **Code ví dụ:** [`examples/08-4-xu-ly-loi-trong-action.ts`](examples/08-4-xu-ly-loi-trong-action.ts)

## 5. Action + Composable / Pinia hiện đại

Mục này cho thấy "sau khi bỏ nghi lễ": Pinia không còn commit/dispatch — bạn gọi hàm của store như gọi hàm JS bình thường. Bảng dưới đối chiếu từng thủ tục cũ.

| Vuex | Pinia |
|---|---|
| `store.dispatch('fetchPosts')` | `const store = usePostStore(); store.fetchPosts()` |
| `commit('setPosts', data)` | `posts.value = data` (trong action) |
| Context `{ commit, dispatch, state }` | `this` (Options store) hoặc closure (Setup store) |
| Action sync phải qua mutation | Action sync/async đều viết trực tiếp |

> **Cách đọc bảng này:** mỗi dòng là một "nghi lễ" Vuex và cách nó biến mất ở Pinia — đọc để thấy mọi tầng trung gian đều gỡ bỏ, chỉ còn gọi hàm trực tiếp.

Chi tiết đầy đủ: [`8_pinia/4_actions`](../8_pinia/4_actions/README.md).

## 6. Migration action Vuex → action Pinia

```
Vuex action
  │
  ├─ commit('setX', ...)        → gán trực tiếp state trong action Pinia
  ├─ dispatch('otherAction')    → import store khác, gọi hàm
  ├─ rootState / rootGetters    → import store khác (Pinia hỗ trợ tham chiếu chéo)
  └─ async logic                → giữ nguyên, action Pinia hỗ trợ async tự nhiên
```

Mẹo khi migration từng bước: giữ tên action Vuex ở Pinia (tên hàm trùng) để nơi gọi (`dispatch('fetchPosts')` → `store.fetchPosts()`) chỉ cần đổi cách gọi, không đổi logic.

> **Tóm gọn 1 câu:** Pinia xóa mọi nghi lễ commit/dispatch — action thành hàm thường, và giữ nguyên tên hàm khi migrate để đổi cách gọi là xong.

## 7. Khi nào đọc tiếp phần Vuex legacy?

- ✅ Code cũ có `store.dispatch(...)` và bạn cần bảo trì/migrate.
- ✅ Hiểu "tại sao Pinia bỏ mutations" — qua so sánh với action Vuex.
- ❌ Dự án mới: học Pinia (đường dẫn ở banner đầu bài).

## Nguồn tham khảo

- Vuex actions: https://vuex.vuejs.org/guide/actions.html
- Pinia actions: https://pinia.vuejs.org/core-concepts/actions.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
