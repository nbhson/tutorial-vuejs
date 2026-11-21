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

Mục này định nghĩa getter — khái niệm còn dùng nguyên vẹn ở Pinia. Đọc để hiểu "giá trị tính từ state có nhớ cache" hoạt động thế nào trước khi xem cú pháp Vuex cũ.

**Getter** là "computed property của store" — giá trị **được tính từ state**, có **cache** (chỉ tính lại khi state liên quan đổi), và dùng chung nhiều component.

Ví von: getter như bảng hiệu điện tử cập nhật tự động — số liệu gốc (state) đổi thì bảng mới chạy lại, không đổi thì bảng đứng yên tiết kiệm điện (cache).

Ví dụ kinh điển: "giỏ hàng còn bao nhiêu sản phẩm", "lọc danh sách việc cần làm chưa xong".

> 📄 **Code ví dụ:** [`examples/01-1-getter-la-gi-khai-niem-chung.js`](examples/01-1-getter-la-gi-khai-niem-chung.js)

> 📄 **Code ví dụ:** [`examples/02-1-getter-la-gi-khai-niem-chung.ts`](examples/02-1-getter-la-gi-khai-niem-chung.ts)

> **Tóm gọn 1 câu:** Getter = computed của store — tính từ state, có cache, dùng chung nhiều component như bảng hiệu tự cập nhật.

## 2. Truy cập getter trong component (Vuex)

> 📄 **Code ví dụ:** [`examples/03-2-truy-cap-getter-trong-component-vuex.vue`](examples/03-2-truy-cap-getter-trong-component-vuex.vue)

Hoặc `mapGetters` (Options API):

> 📄 **Code ví dụ:** [`examples/04-2-truy-cap-getter-trong-component-vuex.js`](examples/04-2-truy-cap-getter-trong-component-vuex.js)

## 3. Getter nhận tham số (pattern "filter theo điều kiện")

Mục này nói về một "xoắn" hay gặp: getter mặc định không nhận tham số, nên muốn filter theo điều kiện phải dùng mẹo trả về một hàm. Đọc để hiểu pattern này và cái giá hiệu năng của nó.

Ví von: getter thường là bảng hiệu có sẵn số; getter trả về hàm như một người trực bảo thông tin — gọi là tính, nên không có bản ghi sẵn (không cache).

Vuex getters chỉ nhận `state` mặc định — để truyền tham số, getter phải **trả về một hàm**:

> 📄 **Code ví dụ:** [`examples/05-3-getter-nhan-tham-so-pattern-filter-theo.js`](examples/05-3-getter-nhan-tham-so-pattern-filter-theo.js)

> 📄 **Code ví dụ:** [`examples/06-3-getter-nhan-tham-so-pattern-filter-theo.js`](examples/06-3-getter-nhan-tham-so-pattern-filter-theo.js)

⚠️ **Lưu ý hiệu năng:** getter trả về hàm mới mỗi lần gọi → **không cache** giữa các lần gọi. Trong Pinia, bạn viết hàm thường bên trong store và có kiểm soát caching:

> 📄 **Code ví dụ:** [`examples/07-3-getter-nhan-tham-so-pattern-filter-theo.ts`](examples/07-3-getter-nhan-tham-so-pattern-filter-theo.ts)

## 4. So sánh getters Vuex vs Pinia

Mục này là "từ điển dịch" getter Vuex → Pinia: cùng một ý niệm "computed từ state" nhưng cú pháp và cách cache khác nhau.

| Vuex | Pinia | Ghi chú |
|---|---|---|
| `getters: { doneCount: (state) => ... }` | `const doneCount = computed(...)` | Cùng ý niệm "computed từ state" |
| `store.getters.doneCount` | `store.doneCount` | Không cần `getters.` |
| Getter nhận tham số → trả hàm (không cache) | Hàm thường trong store | Pinia cache tự nhiên qua computed |
| Truy cập getter khác: dùng `getters` param | Dùng trực tiếp store khác | |

> **Cách đọc bảng này:** mỗi dòng là một thao tác (khai báo, truy cập, truyền tham số); đọc cột Vuex để hiểu code cũ, cột Pinia để biết viết lại thế nào, cột Ghi chú để nắm điểm khác cốt lõi.

Chi tiết getters Pinia: [`8_pinia/3_getters`](../8_pinia/3_getters/README.md).

## 5. Khi nào vẫn cần hiểu Vuex getters?

1. **Đọc/maintain code cũ** — dự án Vue 2/3 còn dùng Vuex.
2. **Migration**: mỗi getter Vuex trở thành một `computed` trong store Pinia; cách thức chuyển đổi chi tiết trong [`VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md).
3. **Phỏng vấn/làm việc với dự án cũ** — hiểu merge của pattern này giúp suy ra ý đồ của tác giả.

> ❌ Nếu bạn đang viết dự án mới, hãy **bỏ qua phần này** và học luôn cách Pinia: [`8_pinia/3_getters`](../8_pinia/3_getters/README.md).

> **Tóm gọn 1 câu:** Getters Vuex chỉ cần khi đọc code cũ hoặc migrate — về bản chất chúng là `computed` có cache, và Pinia giữ nguyên ý niệm đó với cú pháp gọn hơn.

## Nguồn tham khảo

- Vuex getters: https://vuex.vuejs.org/guide/getters.html
- Pinia getters: https://pinia.vuejs.org/core-concepts/getters.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
