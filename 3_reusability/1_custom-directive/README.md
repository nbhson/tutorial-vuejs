# Custom Directives trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này đi qua toàn bộ về **Custom Directives** (Chỉ thị tùy chỉnh) trong Vue 3: khi nào nên dùng, cách khai báo, vòng đời hooks, và những lưu ý quan trọng — kèm ví dụ cho từng phần.

---

## 1. Custom Directives là gì?

Mục này định nghĩa "công cụ cầm tay DOM": directive là điểm chạm trực tiếp vào phần tử DOM — thứ mà component và composable đều khó chạm được một cách tự nhiên, giống như một cặp kề chuyên dụng trong hộp đồ nghề.

Ngoài các directive có sẵn như `v-model`, `v-show`, `v-if`, Vue cho phép bạn tạo directive riêng gọi là **Custom Directives**.

👉 **Mục đích chính:**
Custom directives dùng để tái sử dụng logic **thao tác DOM trực tiếp**, điều mà:
- **Component:** ❌ không phù hợp.
- **Composable:** ❌ không xử lý tốt.

📌 **So sánh nhanh:**
| Loại | Mục đích |
| :--- | :--- |
| **Component** | Tái sử dụng giao diện (UI) |
| **Composable** | Tái sử dụng logic (state, reactivity) |
| **Custom Directive** | Tái sử dụng các thao tác trên DOM (DOM manipulation) |

> **Cách đọc bảng này:** ba hàng là ba "loại kìm trong hộp đồ nghề", xếp theo tầng tác động — UI, logic, rồi DOM. Nhìn cột Mục đích để chọn đúng kìm cho đúng việc.

---

## 2. Khi nào nên dùng Custom Directives?

Mục này là "hướng dẫn chọn nghề" cho directive: dùng khi phải đụng DOM trực tiếp, tránh khi binding/component/composable giải quyết được.

✅ **NÊN dùng khi:**
- Cần thao tác trực tiếp với phần tử DOM (ví dụ: tập trung tiêu điểm, vẽ canvas, quan sát kích thước).
- Logic thao tác DOM không thể giải quyết hiệu quả bằng binding (`v-bind`) hoặc component.

❌ **KHÔNG NÊN dùng nếu:**
- Có thể giải quyết bằng các tính năng cơ bản như `v-bind`, `:class`, `:style`.
- Có thể viết logic bằng component hoặc composable.

**Ví dụ điển hình: Tự động focus input**

> 📄 **Code ví dụ:** [`examples/01-2-khi-nao-nen-dung-custom-directives.html`](examples/01-2-khi-nao-nen-dung-custom-directives.html)

> [!TIP]
> Directive này tốt hơn thuộc tính `autofocus` thuần vì nó hoạt động chính xác ngay cả khi phần tử được render động (v-if) hoặc di chuyển trong DOM.

> **Tóm gọn 1 câu:** Directive là "túi đồ nghề riêng cho DOM" — cần gắn sự vụ trực tiếp lên element thì dùng, có cách khác thì đừng lạm dụng.

---

## 3. Cách khai báo Custom Directive

Mục này nói về ba cách đăng ký: trong `<script setup>`, cục bộ và toàn cục — tương tự như cách đăng ký component mà bạn đã quen.

### 3.1. Khai báo trong `<script setup>`
📌 Bất kỳ biến nào theo chuẩn **camelCase** bắt đầu bằng chữ `v` đều được Vue hiểu là một directive.

> 📄 **Code ví dụ:** [`examples/02-3-1-khai-bao-trong-script-setup.html`](examples/02-3-1-khai-bao-trong-script-setup.html)
*📌 `vHighlight` trong script → được sử dụng dưới dạng `v-highlight` trong template.*

### 3.2. Đăng ký directive cục bộ (Local)
Dùng trong Options API:

> 📄 **Code ví dụ:** [`examples/03-3-2-ang-ky-directive-cuc-bo-local.js`](examples/03-3-2-ang-ky-directive-cuc-bo-local.js)

### 3.3. Đăng ký directive toàn cục (Global)
Gắn trực tiếp vào instance của ứng dụng:

> 📄 **Code ví dụ:** [`examples/04-3-3-ang-ky-directive-toan-cuc-global.js`](examples/04-3-3-ang-ky-directive-toan-cuc-global.js)
📌 Sau khi đăng ký global, `v-highlight` có thể dùng được ở mọi component trong toàn bộ ứng dụng.

---

## 4. Directive Hooks (Vòng đời của directive)

Mục này nói về "vòng đời" của directive: giống component có mounted/unmounted, directive có chuỗi hook tương ứng — mỗi hook là một thời điểm bạn được chạm vào element.

Một directive là một object chứa các hook tương tự như lifecycle của component.

> 📄 **Code ví dụ:** [`examples/05-4-directive-hooks-vong-oi-cua-directive.js`](examples/05-4-directive-hooks-vong-oi-cua-directive.js)

---

## 5. Tham số trong Directive Hook

Mục này nói về "hành trang" mà mỗi hook nhận vào: `el` là phần tử thật, `binding` là hồ sơ chỉ thị, `vnode` là bản dựng ảo — hiểu ba món này là đọc được mọi directive.

Mỗi hook nhận các tham số sau:
- **`el`**: Phần tử DOM thực tế.
- **`binding`**: Một object chứa thông tin về directive được truyền vào.
- **`vnode`**: Đại diện cho phần tử ảo (Virtual Node).

| Thuộc tính của `binding` | Ý nghĩa |
| :--- | :--- |
| **`value`** | Giá trị truyền vào directive (ví dụ: trong `v-my-dir="1 + 1"`, giá trị là `2`) |
| **`oldValue`** | Giá trị cũ (chỉ có trong `beforeUpdate` và `updated`) |
| **`arg`** | Tham số (ví dụ: trong `v-my-dir:foo`, tham số là `"foo"`) |
| **`modifiers`** | Các công cụ sửa đổi (ví dụ: trong `v-my-dir.bar`, modifiers là `{ bar: true }`) |
| **`instance`** | Instance của component sử dụng directive này |

> **Cách đọc bảng này:** mỗi dòng là một "ngăn trong hồ sơ `binding`" — đọc kèm ví dụ ngay trong cột Ý nghĩa để thấy cú pháp template tương ứng ra giá trị gì.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/06-5-tham-so-trong-directive-hook.html`](examples/06-5-tham-so-trong-directive-hook.html)
Kết quả của `binding`:
> 📄 **Code ví dụ:** [`examples/07-5-tham-so-trong-directive-hook.js`](examples/07-5-tham-so-trong-directive-hook.js)

---

## 6. Directive có Argument & Modifier

Mục này nói về "phụ kiện" của directive: argument (`:foo`) chọn mục tiêu con, modifier (`.bar`) bật công tắc tùy chọn — như đèn có thể thêm chỉ định "bóng nào" và "chế độ nào".

### Argument (Tham số)
> 📄 **Code ví dụ:** [`examples/08-argument-tham-so.html`](examples/08-argument-tham-so.html)
> 📄 **Code ví dụ:** [`examples/09-argument-tham-so.js`](examples/09-argument-tham-so.js)

### Modifier (Công cụ sửa đổi)
> 📄 **Code ví dụ:** [`examples/10-modifier-cong-cu-sua-oi.html`](examples/10-modifier-cong-cu-sua-oi.html)
> 📄 **Code ví dụ:** [`examples/11-modifier-cong-cu-sua-oi.js`](examples/11-modifier-cong-cu-sua-oi.js)

---

## 7. Directive với Function Shorthand

Mục này nói về "cú viết tắt": nếu mounted và updated làm cùng một việc, viết directive thành một hàm duy nhất — Vue tự hiểu cho cả hai thời điểm.

Nếu bạn chỉ cần xử lý cho 2 hook `mounted` và `updated` với cùng một logic, bạn có thể viết ngắn gọn:

> 📄 **Code ví dụ:** [`examples/12-7-directive-voi-function-shorthand.js`](examples/12-7-directive-voi-function-shorthand.js)
Cách dùng:
> 📄 **Code ví dụ:** [`examples/13-7-directive-voi-function-shorthand.html`](examples/13-7-directive-voi-function-shorthand.html)

---

## 8. Truyền nhiều giá trị bằng Object Literal

Mục này nói về cách "gửi cả kiện hàng" cho directive: thay vì một giá trị lẻ, truyền nguyên object nhiều trường dữ liệu.

Bạn có thể truyền một object phức tạp nếu cần nhiều tham số.

> 📄 **Code ví dụ:** [`examples/14-8-truyen-nhieu-gia-tri-bang-object-literal.html`](examples/14-8-truyen-nhieu-gia-tri-bang-object-literal.html)
> 📄 **Code ví dụ:** [`examples/15-8-truyen-nhieu-gia-tri-bang-object-literal.js`](examples/15-8-truyen-nhieu-gia-tri-bang-object-literal.js)

---

## 9. Sử dụng directive trên Component

Mục này là "cảnh báo đỏ" của bài: directive gắn lên component thì chỉ dính root element và dễ rơi vào ngõ cụt — nên hạn chế, ưu tiên dùng cho thẻ HTML thuần.

> [!CAUTION]
> **KHÔNG KHUYẾN KHÍCH** sử dụng custom directive trên component.

**Lý do:**
- Directive chỉ áp dụng duy nhất lên **root element** của component con.
- Nếu component con có nhiều root node (fragments), directive sẽ bị bỏ qua và Vue sẽ phát cảnh báo.
- Không giống như attribute bình thường, directive không thể được chuyển tiếp bằng `$attrs`.

👉 **Khuyến nghị:** Chỉ nên dùng custom directive cho các HTML element thuần túy.

---

## 10. Ghi chú quan trọng

Mục này nói về quy tắc "chỉ đọc": `binding`, `vnode`, `instance` là hồ sơ Vue đưa cho bạn xem — sửa chúng là phá máy móc; muốn lưu gì thì lưu trên element.

> [!WARNING]
> Tuyệt đối **không được chỉnh sửa** trực tiếp các tham số `binding`, `vnode`, hoặc `instance`. Chúng nên được coi là chỉ đọc (read-only).

✅ Nếu bạn cần lưu trữ dữ liệu giữa các hook khác nhau, hãy sử dụng thuộc tính `dataset` của DOM hoặc chính thuộc tính của phần tử `el`:
> 📄 **Code ví dụ:** [`examples/16-10-ghi-chu-quan-trong.js`](examples/16-10-ghi-chu-quan-trong.js)

---

## 11. Tổng kết nhanh 🎯

Mục này gom cả bài vào một bảng ghi nhớ cuối cùng.

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Mục đích** | Tái sử dụng logic thao tác trực tiếp lên DOM |
| **Khi dùng** | Khi binding cơ bản không giải quyết được vấn đề |
| **Hook thường dùng** | `mounted`, `updated` |
| **Viết gọn** | Sử dụng Function shorthand nếu code `mounted` và `updated` giống nhau |
| **Component** | ❌ Hạn chế sử dụng, ưu tiên dùng cho thẻ HTML thuần |

> **Cách đọc bảng này:** dò theo hàng ngang — hàng nào trả lời đúng câu hỏi bạn đang có ("dùng khi nào?", "viết sao cho gọn?") thì áp dụng ngay.

> **Tóm gọn 1 câu:** Custom directive là "cặp kề chuyên dụng cho DOM" — dùng đúng việc thì sắc bén, dùng nhầm chỗ (component) thì vụng về.