# Pinia Actions

Dưới đây là tóm tắt đầy đủ – dễ hiểu – có ví dụ cụ thể nội dung bài học Actions trong Pinia (Vue 3), dựa đúng theo nội dung tài liệu chính thức.

## 1. Actions trong Pinia là gì?

Mục này định nghĩa "bàn tay làm việc" của store: actions là nơi chứa mọi hành động — từ xử lý logic đến gọi API. Đọc để nắm vai trò của nó trước khi học cú pháp.

Hãy hình dung store như một cửa hàng: state là kho, getters là bảng giá, còn actions là nhân viên — người nhận yêu cầu, chạy ra chạy vào, gọi nhà cung cấp (API) và cập nhật kho.

Actions tương đương với **methods** trong component Vue. Chúng được dùng để:
-   Xử lý logic nghiệp vụ (business logic).
-   Thay đổi trạng thái (state).
-   Gọi API hoặc thực hiện các tác vụ bất đồng bộ (async/await).

👉 Actions được khai báo trong `defineStore()` thông qua thuộc tính `actions`.

> **Tóm gọn 1 câu:** Action = methods của store — nơi chứa logic nghiệp vụ, sửa state, và gọi API với async/await tự nhiên.

---

## 2. Khai báo Actions cơ bản

Mục này học "cách tuyển nhân viên đúng": khai báo action bằng function thường, đừng dùng arrow function — lý do nằm ở `this` ở mục sau.

### Ví dụ Store Counter
> 📄 **Code ví dụ:** [`examples/01-vi-du-store-counter.js`](examples/01-vi-du-store-counter.js)

📌 **Lưu ý quan trọng:**
-   ❌ **Không dùng arrow function** cho actions vì nó sẽ làm mất ngữ cảnh `this`. Ví von: arrow function như nhân viên "không nhận diện công ty" — làm việc được nhưng không biết mình thuộc cửa hàng nào, không chạm được vào kho.
-   ✅ **Dùng function thường** để `this` trỏ đúng về instance của store.

---

## 3. `this` trong Actions

Trong Pinia Actions, `this` đại diện cho toàn bộ instance của store. Bạn có thể truy cập mọi thứ:
-   `this.count`: Truy cập state.
-   `this.doubleCount`: Truy cập getters.
-   `this.otherAction()`: Gọi một action khác.

---

## 4. Actions bất đồng bộ (Async / Await)

Mục này là "trường phái chính" của action: gọi API, chờ kết quả, cập nhật state — tất cả với `await` như viết JS bình thường.

Actions cực kỳ phù hợp để xử lý các logic bất đồng bộ như gọi API. Ví von: action là nhân viên ra ngoài gặp nhà cung cấp — đi mất thời gian (async) nhưng mọi người cứ làm việc tiếp, nhân viên về thì cập nhật kho.

### Ví dụ gọi API đăng ký User
> 📄 **Code ví dụ:** [`examples/02-vi-du-goi-api-ang-ky-user.js`](examples/02-vi-du-goi-api-ang-ky-user.js)

👉 Bạn có thể:
-   Sử dụng `await` cho các lời gọi API.
-   `return` dữ liệu để component sử dụng.

---

## 5. Gọi Actions trong Component

### Trong `<script setup>`
> 📄 **Code ví dụ:** [`examples/03-trong-script-setup.html`](examples/03-trong-script-setup.html)

### Trong template
> 📄 **Code ví dụ:** [`examples/04-trong-template.html`](examples/04-trong-template.html)

---

## 6. Gọi Actions của store khác

Bạn không cần truyền props phức tạp; chỉ cần khởi tạo store khác ngay bên trong action.

> 📄 **Code ví dụ:** [`examples/05-6-goi-actions-cua-store-khac.js`](examples/05-6-goi-actions-cua-store-khac.js)

---

## 7. Dùng Actions với Options API

### 7.1. Dùng Options API + `setup()`
> 📄 **Code ví dụ:** [`examples/06-7-1-dung-options-api-setup.html`](examples/06-7-1-dung-options-api-setup.html)

### 7.2. Dùng `mapActions` (không có `setup`)
> 📄 **Code ví dụ:** [`examples/07-7-2-dung-mapactions-khong-co-setup.js`](examples/07-7-2-dung-mapactions-khong-co-setup.js)

---

## 8. Lắng nghe Actions với `$onAction()`

Mục này về "camera an ninh hành động": `$onAction` cho bạn biết action nào sắp chạy, chạy xong, hay gặp lỗi — dùng cho logging, analytics, error tracking.

Dùng để theo dõi action trước khi chạy, sau khi thành công hoặc khi gặp lỗi. Rất hữu ích cho **Logging**, **Analytics**, hoặc **Error Tracking**.

> 📄 **Code ví dụ:** [`examples/08-8-lang-nghe-actions-voi-onaction.js`](examples/08-8-lang-nghe-actions-voi-onaction.js)

📌 **Giữ subscription:** Mặc định `$onAction` sẽ tự hủy khi component unmount. Để giữ lại, truyền tham số `true`: `store.$onAction(callback, true)`.

---

## 11. Tổng kết nhanh

Mục này gói cả bài vào một bảng ôn — mỗi dòng một quy tắc dùng action.

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Bản chất** | Tương đương `methods` trong component. |
| **Async** | Hỗ trợ hoàn hảo `async/await`. |
| **`this`** | Trỏ tới chính instance của store. |
| **Gọi store khác** | Gọi trực tiếp bên trong action. |
| **Options API** | Dùng `mapActions` hoặc `setup()`. |
| **`$onAction`** | Dùng để debug, audit hoặc theo dõi hiệu năng. |

> **Cách đọc bảng này:** mỗi dòng là một quy tắc dùng action; dòng cần nhớ nhất là `this` (không dùng arrow function) — đó là bẫy duy nhất của bài này.

> **Tóm gọn 1 câu:** Action là "nhân viên làm việc" của store: chạy logic, gọi API với `await`, sửa state trực tiếp — nhớ dùng function thường để `this` không lạc đường.