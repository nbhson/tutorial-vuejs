# Template Syntax (Cú pháp Template)

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học **Template Syntax** (Cú pháp Template trong Vue), được chia từng phần rõ ràng, mỗi phần đều có ví dụ minh họa sẵn để bạn học là dùng được ngay.

---

## 1. Template Syntax là gì?

Mục này nói về "ngôn ngữ chung" giữa HTML của bạn và dữ liệu trong component. Đọc để hiểu bức tranh tổng thể trước khi đi vào từng cú pháp cụ thể.

### Ý chính
- Vue sử dụng **HTML-based template syntax**.
- Cho phép **liên kết dữ liệu (data binding)** giữa giao diện (DOM) và dữ liệu trong component.
- Vue sẽ **compile template** thành JavaScript tối ưu, chỉ render lại những phần cần thiết khi dữ liệu thay đổi.

Ví von: template là **bản hợp đồng giữa bạn và Vue** — bạn ghi rõ "ô này hiện dữ liệu gì", Vue ký và cam kết tự lo phần cập nhật mỗi khi dữ liệu đổi.

> 👉 **Tóm lại:** Bạn viết HTML quen thuộc, Vue tự lo phần cập nhật giao diện.

---

## 2. Text Interpolation (Nội suy văn bản – `{{ }}`)

### Ý chính
- Là cách bind dữ liệu cơ bản và đơn giản nhất.
- Sử dụng cú pháp **Mustache** (hai dấu ngoặc nhọn): `{{ }}`.
- Khi dữ liệu thay đổi → giao diện tự động cập nhật.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/01-vi-du.html`](examples/01-vi-du.html)

> 👉 **Hiển thị:**
> `Message: Hello Vue!`

---

## 3. Raw HTML – `v-html`

Mục này nói về trường hợp đặc biệt: khi bạn muốn Vue render **thật** một đoạn HTML thay vì chỉ hiện text. Đọc kỹ phần cảnh báo — đây là chỗ dễ dính lỗi bảo mật nhất của Vue.

### Ý chính
- Cú pháp `{{ }}` chỉ hiển thị text, **KHÔNG** render HTML.
- Muốn render HTML thực sự → dùng directive `v-html`.

Ví von: `{{ }}` giống như **khung ảnh in chữ** — chuỗi gì đưa vào cũng chỉ là chữ. `v-html` là **khung kính không lọc**: nó thiệt sự "gắn đồ" vào trang, nên ai đưa đồ vào (dữ liệu người dùng nhập) cũng phải soi kỹ, kẻo kẻ xấu gắn cài bẫy (XSS).

> ⚠️ **Cảnh báo:** Rất nguy hiểm nếu dùng với dữ liệu do người dùng nhập vào (nguy cơ tấn công **XSS**).

### Ví dụ
> 📄 **Code ví dụ:** [`examples/02-vi-du.html`](examples/02-vi-du.html)

> 👉 **Kết quả:**
> - Dòng 1: in ra chuỗi HTML dưới dạng text thuần.
> - Dòng 2: in ra dòng chữ màu đỏ (HTML được render).

> ⚠️ **Lưu ý:** Chỉ dùng `v-html` với dữ liệu mà bạn hoàn toàn tin cậy.

---

## 4. Attribute Bindings – `v-bind`

### Ý chính
- Không thể dùng `{{ }}` bên trong các attribute của thẻ HTML.
- Phải dùng directive `v-bind` để bind giá trị cho thuộc tính.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/03-vi-du.html`](examples/03-vi-du.html)

> 👉 **Kết quả HTML:**
> ```html
> <div id="app-container"></div>
> ```

### 4.1 Shorthand của `v-bind` (Dấu `:`)
Đây là cách viết tắt phổ biến và chuẩn mực nhất trong Vue.

> 📄 **Code ví dụ:** [`examples/04-4-1-shorthand-cua-v-bind-dau.html`](examples/04-4-1-shorthand-cua-v-bind-dau.html)

### 4.2 Same-name Shorthand (Vue 3.4+)
Nếu tên attribute giống hệt tên biến, bạn có thể viết gọn hơn nữa:

> 📄 **Code ví dụ:** [`examples/05-4-2-same-name-shorthand-vue-3-4.html`](examples/05-4-2-same-name-shorthand-vue-3-4.html)
> 👉 Tương đương với:
> ```html
> <div :id="id"></div>
> ```

---

## 5. Boolean Attributes

### Ý chính
- Áp dụng cho các attribute như `disabled`, `checked`, `selected`, v.v.
- Sự hiện diện của attribute phụ thuộc vào giá trị là **truthy** hay **falsy**.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/06-vi-du.html`](examples/06-vi-du.html)

> 📄 **Code ví dụ:** [`examples/07-vi-du.js`](examples/07-vi-du.js)

> 👉 **Kết quả:** Button sẽ bị vô hiệu hóa (`disabled`).

---

## 6. Bind nhiều attributes cùng lúc

### Ý chính
- Có thể dùng một object chứa nhiều cặp `key: value` để bind hàng loạt thuộc tính cùng lúc.
- Sử dụng `v-bind="objectOfAttrs"`.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/08-vi-du.html`](examples/08-vi-du.html)

> 👉 **Kết quả HTML:**
> ```html
> <div id="box" class="container" style="background: green"></div>
> ```

---

## 7. Using JavaScript Expressions

Mục này phân định ranh giới quan trọng: trong template được xài **biểu thức** nhưng không được xài **câu lệnh**. Đọc để khỏi bất ngờ khi code không chạy.

### Ý chính
- Vue cho phép sử dụng các **biểu thức JavaScript (Expressions)** bên trong `{{ }}` hoặc `v-bind`.
- **KHÔNG** cho phép sử dụng các câu lệnh (Statements) như `if`, `for`, `var`, `while`, v.v.

Ví von: template giống như **máy tính bỏ túi** — nó tính được `2 + 3`, `a * b`, thậm chí `ok ? 'yes' : 'no'`, nhưng không phải máy tính lập trình nên không chấp nhận "chương trình" (if, for, var).

### Ví dụ hợp lệ
> 📄 **Code ví dụ:** [`examples/09-vi-du-hop-le.html`](examples/09-vi-du-hop-le.html)

### Ví dụ KHÔNG hợp lệ
> 📄 **Code ví dụ:** [`examples/10-vi-du-khong-hop-le.html`](examples/10-vi-du-khong-hop-le.html)

---

## 8. Gọi hàm trong template

### Ý chính
- Có thể gọi trực tiếp method (hàm) bên trong template.
- ⚠️ **Lưu ý:** Hàm sẽ được gọi lại mỗi khi component re-render, do đó **không nên** để hàm thực hiện các tác vụ nặng (side-effects) như gọi API hay thay đổi dữ liệu.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/11-vi-du.html`](examples/11-vi-du.html)

---

## 9. Restricted Globals (Biến toàn cục bị giới hạn)

### Ý chính
- Template chỉ có thể truy cập một danh sách giới hạn các biến toàn cục phổ biến.
- Các biến được phép: `Math`, `Date`, `Infinity`, `undefined`, `NaN`, `isFinite`, `isNaN`.
- **Không thể** truy cập trực tiếp các biến người dùng tự định nghĩa trên `window` (ví dụ `window.alert` sẽ không chạy trừ khi khai báo rõ).

### Ví dụ
> 📄 **Code ví dụ:** [`examples/12-vi-du.html`](examples/12-vi-du.html)

---

## 10. Directives (`v-`)

Mục này giới thiệu "họ nhà `v-`" — gia đình directive là trái tim của toàn bộ template Vue. Các mục sau (argument, dynamic argument, modifier) đều xoay quanh họ nhà này.

### Ý chính
- Directive là các thuộc tính đặc biệt bắt đầu bằng tiền tố `v-`.
- Nhiệm vụ: Thao tác lên DOM một cách reactive khi giá trị của expression thay đổi.

Ví von: directive là **tên lệnh viết trên giấy dán lên thẻ HTML** — Vue đọc tên lệnh đó và tự sắp xếp lại thẻ (xóa, thêm, đổi thuộc tính) mỗi khi dữ liệu liên quan đổi.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/13-vi-du.html`](examples/13-vi-du.html)

> 📄 **Code ví dụ:** [`examples/14-vi-du.js`](examples/14-vi-du.js)
> Nếu `seen` là `false`, thẻ `<p>` sẽ bị xóa khỏi DOM.

---

## 11. Directive Arguments

### Ý chính
Một số directive nhận thêm "tham số" (argument), được viết sau dấu hai chấm `:`.

### Ví dụ `v-bind`
> 📄 **Code ví dụ:** [`examples/15-vi-du-v-bind.html`](examples/15-vi-du-v-bind.html)

### Ví dụ `v-on` (Lắng nghe sự kiện)
> 📄 **Code ví dụ:** [`examples/16-vi-du-v-on-lang-nghe-su-kien.html`](examples/16-vi-du-v-on-lang-nghe-su-kien.html)

---

## 12. Dynamic Arguments (Tham số động)

### Ý chính
- Argument (tên thuộc tính hoặc tên sự kiện) có thể là một biến động.
- Cú pháp: Sử dụng dấu ngoặc vuông `[]`.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/17-vi-du.html`](examples/17-vi-du.html)

> 📄 **Code ví dụ:** [`examples/18-vi-du.js`](examples/18-vi-du.js)
> Kết quả sẽ tương đương với `<a href="https://vuejs.org">`.

---

## 13. Modifiers (Bổ trợ)

### Ý chính
- Modifier là các hậu tố đặc biệt bắt đầu bằng dấu chấm `.`.
- Dùng để thay đổi hành vi mặc định của directive.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/19-vi-du.html`](examples/19-vi-du.html)
> 👉 `.prevent` tương đương với việc gọi `event.preventDefault()` trong JavaScript.

---

## 14. Tổng kết nhanh (Checklist)

- [x] **{{ }}**: Dùng để hiển thị text (Nội suy).
- [x] **v-html**: Dùng để render HTML (Cẩn thận lỗi XSS).
- [x] **v-bind** (hoặc `:`): Dùng để bind giá trị vào attribute.
- [x] **v-on** (hoặc `@`): Dùng để bắt sự kiện.
- [x] Có thể dùng **JavaScript Expression**, nhưng không dùng **Statement**.
- [x] **Directive** (v-...) là nền tảng cốt lõi của Vue template.

> **Tóm gọn 1 câu:** Template Vue = HTML quen thuộc + vài "từ lệnh": `{{ }}` hiện chữ, `:` gắn dữ liệu, `@` bắt sự kiện, `v-` thao tác DOM.