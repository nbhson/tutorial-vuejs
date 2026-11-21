# Pinia Getters

Dưới đây là tóm tắt đầy đủ – dễ hiểu bài học Getters trong Pinia, kèm ví dụ cụ thể cho từng phần, dựa đúng theo nội dung tài liệu chính thức.

## 1. Getters là gì?

Mục này định nghĩa getter — "trí nhớ có cache" của store. Đọc để nắm bản chất computed và 2 đặc điểm (chỉ đọc, không cần ngoặc) trước khi xem ví dụ.

Getters trong Pinia tương đương với **computed property** trong Vue:
-   Dùng để tính toán dữ liệu dẫn xuất (derived state) từ state.
-   Được **cache** (chỉ chạy lại khi dữ liệu phụ thuộc thay đổi).

Ví von: getter như máy pha cà phê có bình giữ nhiệt — khách gọi thì pha, giữ nóng đến khi nguyên liệu (state) đổi mới pha bình mới.

📌 **Đặc điểm quan trọng:**
-   Không thay đổi state (chỉ đọc).
-   Truy cập như một thuộc tính, không cần gọi hàm (không có cặp ngoặc `()`).

### Ví dụ cơ bản
> 📄 **Code ví dụ:** [`examples/01-vi-du-co-ban.js`](examples/01-vi-du-co-ban.js)
👉 `doubleCount` luôn tự động cập nhật khi `count` thay đổi.

> **Tóm gọn 1 câu:** Getter = computed của store — tính từ state, tự cache, chỉ đọc, và dùng như thuộc tính (không cần ngoặc).

## 2. Truy cập getters trong component

Mục này cho thấy cách "mở nắp bình giữ nhiệt": dùng getter trong component y hệt như dùng state.

### Ví dụ với `<script setup>`
> 📄 **Code ví dụ:** [`examples/02-vi-du-voi-script-setup.html`](examples/02-vi-du-voi-script-setup.html)

---

## 3. Sử dụng `this` để truy cập getter khác

Mục này nói về getter "hỏi getter khác trong cùng nhà": cần dùng `this`, và `this` đòi hai điều kiện — function thường + khai báo kiểu trả về. Đọc để tránh lỗi TS khó hiểu về sau.

Khi một getter cần truy cập một getter khác trong cùng Store, bạn phải:
1.  Sử dụng **function thường** (không dùng arrow function).
2.  Khai báo **kiểu trả về** (nếu dùng TypeScript).

### Ví dụ (TypeScript)
> 📄 **Code ví dụ:** [`examples/03-vi-du-typescript.ts`](examples/03-vi-du-typescript.ts)
📌 **Lưu ý:** Việc khai báo kiểu trả về là bắt buộc trong TypeScript do hạn chế về khả năng suy luận kiểu khi dùng `this`.

---

## 4. Kết hợp nhiều getters

Các getters có thể kết hợp với nhau một cách linh hoạt để tạo ra các logic phức tạp hơn.

> 📄 **Code ví dụ:** [`examples/04-4-ket-hop-nhieu-getters.js`](examples/04-4-ket-hop-nhieu-getters.js)

---

## 5. Truyền tham số cho getters (Passing arguments)

Mục này xử lý nhu cầu "bảng hiệu có ô điền thông tin": getter mặc định không nhận tham số, phải dùng mẹo trả về function (closure). Đọc để biết cách làm và cái giá cache đi kèm.

Ví von: getter thường là bảng giá in sẵn; getter trả về function là một người trực — gọi thì tính, nên không có bản ghi sẵn để tái sử dụng.

🚫 Getters mặc định **không** nhận tham số trực tiếp.
✅ **Giải pháp:** Getter trả về một function (câu lệnh đóng - closure).

### Ví dụ
> 📄 **Code ví dụ:** [`examples/05-vi-du.js`](examples/05-vi-du.js)

**Sử dụng trong component:**
> 📄 **Code ví dụ:** [`examples/06-vi-du.html`](examples/06-vi-du.html)

⚠️ **Lưu ý quan trọng:** Khi getter trả về một function, kết quả của function đó **không được cache**. Nó thực chất chỉ là một hàm được gọi mỗi khi render.

---

## 6. Tối ưu hiệu năng khi getter trả về function

Bạn có thể cache tạm dữ liệu bên trong getter để tối ưu các vòng lặp xử lý nặng.

> 📄 **Code ví dụ:** [`examples/07-6-toi-uu-hieu-nang-khi-getter-tra.js`](examples/07-6-toi-uu-hieu-nang-khi-getter-tra.js)

---

## 7. Truy cập getters của store khác

Mục này nói về "hỏi chéo giữa các tủ": getter ở store A cần dữ liệu từ store B — chỉ cần khởi tạo store B ngay bên trong getter.

Getters có thể sử dụng dữ liệu từ các store khác một cách dễ dàng.

> 📄 **Code ví dụ:** [`examples/08-7-truy-cap-getters-cua-store-khac.js`](examples/08-7-truy-cap-getters-cua-store-khac.js)

---

## 8. Sử dụng getters với Options API

### Với `setup()`
Sử dụng cho các component đang trong quá trình chuyển đổi (migrate).

> 📄 **Code ví dụ:** [`examples/09-voi-setup.html`](examples/09-voi-setup.html)

### Không dùng `setup()` (dùng `mapState`)
> 📄 **Code ví dụ:** [`examples/10-khong-dung-setup-dung-mapstate.js`](examples/10-khong-dung-setup-dung-mapstate.js)

---

## 10. Tổng kết nhanh

Mục này gói cả bài vào một bảng ôn — bảng "ghi nhớ" dùng trước khi viết getter.

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Bản chất** | Tương đương với `computed` trong Vue. |
| **Cache** | ✅ Có (tự động lưu kết quả). |
| **Tham số** | ❌ Không nhận trực tiếp (phải trả về function). |
| **Truy cập** | `store.getterName`. |
| **Getter khác** | Dùng `this` + khai báo kiểu dữ liệu (nếu dùng TS). |
| **Store khác** | Khởi tạo store đó ngay bên trong getter. |

> **Cách đọc bảng này:** mỗi dòng là một quy tắc dùng getter, đọc theo cột "Ghi nhớ" là đủ — hai dòng cần nhớ nhất là Cache (có) và Tham số (không nhận trực tiếp).