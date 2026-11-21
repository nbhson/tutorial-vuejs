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

Mục này giải thích thứ duy nhất mà Pinia xóa hẳn: mutations. Đọc để hiểu vì sao Vuex từng bắt mọi thay đổi state phải đi qua "cửa duy nhất" này — và vì sao Pinia dám bỏ.

Ví von: mutations như thủ kho duy nhất được chạm vào kho — muốn lấy/đặt hàng thì phiếu phải qua tay ổng, nên ai làm gì với kho đều có ghi chép.

Trong Vuex, **state không được sửa trực tiếp từ ngoài**. Mọi thay đổi phải đi qua một **mutation** — hàm nhận `(state, payload)`:

> 📄 **Code ví dụ:** [`examples/01-1-mutations-la-gi-vi-sao-vuex-co.js`](examples/01-1-mutations-la-gi-vi-sao-vuex-co.js)

> 📄 **Code ví dụ:** [`examples/02-1-mutations-la-gi-vi-sao-vuex-co.vue`](examples/02-1-mutations-la-gi-vi-sao-vuex-co.vue)

### Vì sao Vuex thiết kế mutations?

- Mọi thay đổi state đều đi qua một điểm duy nhất → **dễ theo dõi** trong DevTools.
- DevTools "time-travel": undo/redo từng mutation để debug.
- Quy ước mutations **đồng bộ** (sync) — giúp log chính xác thứ tự thay đổi.

Trong thực tế, hai lý do này được Pinia giải quyết tốt hơn qua DevTools tự theo dõi action — đó là lý do Pinia xóa mutations.

> **Tóm gọn 1 câu:** Mutations là "cửa duy nhất" thay đổi state để dễ log và time-travel — nhưng Pinia chứng minh cửa đó không cần thiết nên đã xóa hẳn.

## 2. Mutations truyền tham số — "payload"

> 📄 **Code ví dụ:** [`examples/03-2-mutations-truyen-tham-so-payload.js`](examples/03-2-mutations-truyen-tham-so-payload.js)

> 📄 **Code ví dụ:** [`examples/04-2-mutations-truyen-tham-so-payload.js`](examples/04-2-mutations-truyen-tham-so-payload.js)

## 3. ❌ Cấm mutate state từ ngoài mutation

Mục này cho thấy "cảnh sát" của Vuex: sửa state lậu ngoài mutation là dev mode sẽ hét lên. Đọc để hiểu quy tắc mà code cũ của bạn đang tuân theo (và Pinia thì ngược lại).

Vuex **báo lỗi** (trong chế độ dev) khi bạn ghi state trực tiếp:

> 📄 **Code ví dụ:** [`examples/05-3-cam-mutate-state-tu-ngoai-mutation.js`](examples/05-3-cam-mutate-state-tu-ngoai-mutation.js)

Tương ứng trong **Pinia** — hành vi **ngược lại**:

> 📄 **Code ví dụ:** [`examples/06-3-cam-mutate-state-tu-ngoai-mutation.ts`](examples/06-3-cam-mutate-state-tu-ngoai-mutation.ts)

> 💡 Đó là một trong những lý do lớn nhất khiến Pinia gọn hơn Vuex: **một lớp trung gian (mutations) bị xóa bỏ**.

## 4. Đối chiếu mutation → action Pinia

Mục này là "bảng dịch" khi migrate: mỗi mutation của Vuex biến thành gì ở Pinia. Đọc dòng nào dịch dòng đó.

| Vuex | Pinia tương đương |
|---|---|
| `mutations: { increment(state) {...} }` | **Không có** — sửa trực tiếp `state.count++` trong action hoặc component |
| `store.commit('increment')` | `counter.increment()` (gọi action) |
| `commit` phải đồng bộ | Action được phép async tự do |

> **Cách đọc bảng này:** cột trái là cú pháp Vuex cần xóa, cột phải là nơi logic đó về ở Pinia. Dòng đầu là quan trọng nhất: mutation biến mất chứ không chuyển đổi.

> 📄 **Code ví dụ:** [`examples/07-4-oi-chieu-mutation-action-pinia.ts`](examples/07-4-oi-chieu-mutation-action-pinia.ts)

## 5. Quy trình migration: mutations → Pinia

Mục này là "đường đi của từng món đồ khi chuyển nhà": sơ đồ dưới cho biết mỗi thành phần Vuex về đâu trong store Pinia.

```
Vuex store
  state     ──▶  ref()/reactive() trong store Pinia
  getters   ──▶  computed() trong store
  mutations ──▶  XÓA — logic đổi state đưa thẳng vào action
  actions   ──▶  actions Pinia (async tự nhiên)
```

Ví dụ chuyển một mutation cụ thể:

> 📄 **Code ví dụ:** [`examples/08-5-quy-trinh-migration-mutations-pinia.js`](examples/08-5-quy-trinh-migration-mutations-pinia.js)

> 📄 **Code ví dụ:** [`examples/09-5-quy-trinh-migration-mutations-pinia.ts`](examples/09-5-quy-trinh-migration-mutations-pinia.ts)

## 6. Khi nào đọc tiếp phần Vuex legacy?

- ✅ Code cũ dùng `store.commit(...)` và bạn cần hiểu từng dòng.
- ✅ Chuyển Vuex → Pinia: mỗi mutation trở thành một **action** Pinia (bên trong vẫn sửa state trực tiếp).
- ❌ Dự án mới: học thẳng Pinia — mutations **không tồn tại** trong Pinia.

> **Tóm gọn 1 câu:** Mutations là khái niệm Vuex cần "xóa" khi migrate — logic đổi state đưa thẳng vào action Pinia, khỏi đi qua cửa trung gian nữa.

## Nguồn tham khảo

- Vuex mutations: https://vuex.vuejs.org/guide/mutations.html
- Pinia actions (thay mutations + actions của Vuex): https://pinia.vuejs.org/core-concepts/actions.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
