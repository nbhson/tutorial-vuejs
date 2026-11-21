# Tạo Ứng Dụng Vue (Creating a Vue Application)

## 1. Application Instance (Thể hiện ứng dụng Vue)

Mục này nói về bước đầu tiên của mọi ứng dụng Vue: tạo ra "thân ứng dụng". Đọc để hiểu vì sao mọi thứ sau này đều xuất phát từ `createApp()`.

### Ý chính
Mỗi ứng dụng Vue bắt đầu bằng việc tạo một **application instance** sử dụng hàm `createApp()` từ Vue. Application instance đóng vai trò là “bộ điều khiển trung tâm” của ứng dụng.

Hãy hình dung `createApp()` như **bấm nút khởi động động cơ xe**: động cơ chưa chạy ra đường nào cả, nhưng từ giây phút này mọi hệ thống (đèn, điều hòa, vô lăng) đều nhận lệnh từ nó. Application instance cũng vậy — mọi cấu hình, component, plugin đều gắn vào nó.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/01-vi-du.js`](examples/01-vi-du.js)

> 👉 **Lưu ý:**
> - `createApp()` tạo ra một ứng dụng Vue.
> - Object truyền vào chính là **root component**.

---

## 2. Root Component (Component gốc)

Mục này nói về "gốc rễ" của cây component — nơi mọi component khác sẽ mọc ra từ đó.

### Ý chính
- Mỗi ứng dụng Vue bắt buộc phải có **1 root component**.
- Root component có thể chứa nhiều component con.
- Thường được viết dưới dạng **Single-File Component (SFC)** (ví dụ: `App.vue`).

Giống như một cây gia phả: root component là **ông tổ**, các component con cháu lần lượt sinh ra từ ông ấy. Một app không có root thì giống như gia phả không có người đầu tiên — không biết bắt đầu từ đâu.

### Ví dụ với Single-File Component
> 📄 **Code ví dụ:** [`examples/02-vi-du-voi-single-file-component.js`](examples/02-vi-du-voi-single-file-component.js)

> 👉 `App.vue` là component gốc của toàn bộ ứng dụng.

### Ví dụ cây component
```text
App (root)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

> 👉 Điều này cho thấy Vue khuyến khích chia nhỏ giao diện thành các component tái sử dụng.

> **Tóm gọn 1 câu:** Root component là ông tổ của cây component — cả ứng dụng mọc ra từ `App.vue`.

---

## 3. Mounting the App (Gắn ứng dụng vào DOM)

Mục này nói về khoảnh khắc ứng dụng "lên sóng": code đã viết xong nhưng phải gắn vào một chỗ trong trang HTML thì mới hiện ra. Đọc để biết cách chọn chỗ gắn và những quy tắc đi kèm.

### Ý chính
Ứng dụng chỉ hiển thị khi gọi phương thức `.mount()`. Hàm này nhận vào:
- Một phần tử DOM thực tế.
- Hoặc một selector CSS (chuỗi ký tự).

Ví von: viết app mà chưa `.mount()` thì giống như **treo một bức tranh nhưng chưa đóng đinh lên tường** — bức tranh đẹp thế nào cũng chẳng ai thấy.

### Ví dụ

**HTML:**
> 📄 **Code ví dụ:** [`examples/03-vi-du.html`](examples/03-vi-du.html)

**JavaScript:**
> 📄 **Code ví dụ:** [`examples/04-vi-du.js`](examples/04-vi-du.js)

> 👉 **Kết quả:**
> - Nội dung của `App.vue` sẽ được render bên trong `<div id="app">`.
> - Thẻ `<div id="app">` **không** phải là một phần của component.

> ⚠️ **Lưu ý quan trọng:** Phải hoàn tất cấu hình app trước khi gọi `.mount()`.

---

## 4. In-DOM Root Component Template
*(Template viết trực tiếp trong HTML)*

Mục này nói về cách "viết tắt": thay vì khai báo template trong file component, bạn để Vue tự lấy nội dung HTML có sẵn làm template. Hợp với ai đang dùng Vue qua CDN, không có build step.

### Ý chính
- Có thể viết template trực tiếp ngay trong file HTML.
- Vue sẽ sử dụng `innerHTML` của phần tử chứa làm template nếu root component không định nghĩa template riêng.
- **Thường dùng khi:**
  - Dùng Vue qua CDN.
  - Không có build step (như Webpack, Vite…).

### Ví dụ
**HTML:**
> 📄 **Code ví dụ:** [`examples/05-vi-du.html`](examples/05-vi-du.html)

**JavaScript:**
> 📄 **Code ví dụ:** [`examples/06-vi-du.js`](examples/06-vi-du.js)

> 👉 **Khi click nút:**
> - Biến `count` tăng lên.
> - Vue tự động cập nhật giao diện (**reactivity**).

> **Tóm gọn 1 câu:** Vue có thể "mượn" luôn HTML có sẵn trên trang làm template — mọi thao tác trên đó vẫn reactive như thường.

---

## 5. App Configurations (Cấu hình ứng dụng)

Mục này nói về bảng điều khiển chung của app: những thiết lập áp dụng cho toàn ứng dụng, điển hình là bắt lỗi toàn cục.

### Ý chính
Application instance cung cấp object `app.config` để cấu hình toàn bộ ứng dụng.

Hãy tưởng tượng `app.config` như **bảng điện chung của tòa nhà**: chỉnh ở đây thì ảnh hưởng tới mọi căn hộ, thay vì phải đi từng phòng.

### Ví dụ: Bắt lỗi toàn cục (Global Error Handling)
> 📄 **Code ví dụ:** [`examples/07-vi-du-bat-loi-toan-cuc-global-error.js`](examples/07-vi-du-bat-loi-toan-cuc-global-error.js)

> 👉 Mọi lỗi xảy ra trong các component con đều sẽ được bắt và xử lý tại đây.

> **Tóm gọn 1 câu:** `app.config` là bảng điều khiển toàn app — một chỗ chỉnh, mọi nơi hưởng; bắt lỗi ở đây để không lỗi nào lọt lưới.

---

## 6. Đăng ký Component toàn cục (Global Component)

Mục này nói về cách "phát thẻ ra vào" cho component: đăng ký một lần thì dùng được ở mọi nơi trong app.

### Ý chính
Có thể đăng ký component để sử dụng ở mọi nơi trong ứng dụng bằng phương thức `app.component()`.

Giống như **đăng ký thẻ thư viện thành viên**: một lần đăng ký, mang thẻ đi đọc ở mọi chi nhánh đều được nhận.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/08-vi-du.js`](examples/08-vi-du.js)

> 👉 **Sau khi đăng ký:**
> ```html
> <TodoDeleteButton />
> ```
> Component này có thể được sử dụng ở bất kỳ component nào khác trong ứng dụng.

> ⚠️ **Lưu ý:** Phải đăng ký component trước khi gọi `.mount()`.

---

## 7. Multiple Application Instances (Nhiều ứng dụng Vue trên 1 trang)

Mục này nói về trường hợp "nhiều chủ một nhà": một trang web có thể chạy song song nhiều app Vue độc lập.

### Ý chính
Có thể tạo nhiều ứng dụng Vue độc lập trên cùng một trang web. Mỗi ứng dụng sẽ có:
- Cấu hình riêng.
- Phạm vi (scope) riêng biệt.

Hình dung mỗi Vue app là **một hộp kính kiệng riêng**: nước không chảy từ hộp này sang hộp kia — config app A không ảnh hưởng app B, kể cả khi chúng nằm chung một trang.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/09-vi-du.js`](examples/09-vi-du.js)

**HTML:**
> 📄 **Code ví dụ:** [`examples/10-vi-du.html`](examples/10-vi-du.html)

> 👉 **Trường hợp sử dụng:**
> - Trang web lớn (legacy apps).
> - Chỉ cần tích hợp Vue cho một vài khu vực nhỏ trên giao diện.
> - Phù hợp với server-rendered HTML.

---

## 8. Tổng kết nhanh (Checklist)

- [x] Dùng `createApp()` để khởi tạo ứng dụng.
- [x] Root component đóng vai trò là trung tâm của app.
- [x] Phải gọi `.mount()` thì ứng dụng mới được hiển thị (render).
- [x] Có thể viết template trong HTML hoặc trong file component.
- [x] Cấu hình ứng dụng thông qua `app.config`.
- [x] Đăng ký component toàn cục bằng `app.component()`.
- [x] Có thể chạy nhiều Vue app độc lập trên cùng một trang.

> **Tóm gọn 1 câu:** Một app Vue = `createApp()` + root component + `.mount()` — ba bước này xong là ứng dụng "lên sóng" trên trang web.