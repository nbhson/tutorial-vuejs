# 5. Binding Inline Styles (:style)

File này nói về cách "đổi màu áo" của phần tử từ JavaScript: gán style inline bằng `:style` thay vì viết CSS tĩnh. Mục 5–8 đi từ object cơ bản tới auto-prefix.

## 5.1. Binding style bằng Object

Đây là cách phổ biến nhất: mỗi thuộc tính CSS là một key, giá trị là một biểu thức có thể thay đổi theo state.

> 📄 **Code ví dụ:** [`examples/01-5-1-binding-style-bang-object.html`](examples/01-5-1-binding-style-bang-object.html)

> 📄 **Code ví dụ:** [`examples/02-5-1-binding-style-bang-object.js`](examples/02-5-1-binding-style-bang-object.js)

**render:**

> 📄 **Code ví dụ:** [`examples/03-5-1-binding-style-bang-object.html`](examples/03-5-1-binding-style-bang-object.html)

## 5.2. camelCase & kebab-case đều được

> 📄 **Code ví dụ:** [`examples/04-5-2-camelcase-kebab-case-eu-uoc.html`](examples/04-5-2-camelcase-kebab-case-eu-uoc.html)

## 5.3. Style object đặt trong biến

> 📄 **Code ví dụ:** [`examples/05-5-3-style-object-at-trong-bien.js`](examples/05-5-3-style-object-at-trong-bien.js)

> 📄 **Code ví dụ:** [`examples/06-5-3-style-object-at-trong-bien.html`](examples/06-5-3-style-object-at-trong-bien.html)

> ✔ Template sạch hơn

## 5.4. Dùng chung style thường và :style

> 📄 **Code ví dụ:** [`examples/07-5-4-dung-chung-style-thuong-va-style.html`](examples/07-5-4-dung-chung-style-thuong-va-style.html)

**render:**

> 📄 **Code ví dụ:** [`examples/08-5-4-dung-chung-style-thuong-va-style.html`](examples/08-5-4-dung-chung-style-thuong-va-style.html)

# 6. Binding style bằng Array

> 📄 **Code ví dụ:** [`examples/09-6-binding-style-bang-array.html`](examples/09-6-binding-style-bang-array.html)

> ➡ Các object style sẽ merge lại với nhau

# 7. Auto-prefix (Vue tự thêm tiền tố trình duyệt)

Mục này là tin vui "khỏi lo": Vue tự lo phần tương thích trình duyệt giúp bạn.

Vue tự kiểm tra:

- `-webkit-`
- `-ms-`
- `-moz-`

👉 Bạn không cần lo compatibility

Ví von: Vue đóng vai **người phiên dịch tại quầy làm visa** — bạn nói tiếng CSS chuẩn, Vue tự dịch sang "tiếng địa phương" của từng trình duyệt khi cần.

# 8. Multiple Values (nhiều giá trị cho 1 property)

Mục này nói về mẹo "dự phòng phương án": cung cấp nhiều giá trị cho cùng một thuộc tính, trình duyệt tự chọn cái nó hiểu.

> 📄 **Code ví dụ:** [`examples/10-8-multiple-values-nhieu-gia-tri-cho-1.html`](examples/10-8-multiple-values-nhieu-gia-tri-cho-1.html)

> ✔ Trình duyệt sẽ chọn giá trị hỗ trợ cuối cùng

# 9. Tóm tắt nhanh (cheat-sheet 🧠)

| Tình huống | Nên dùng |
| :--- | :--- |
| **Bật/tắt class** | `:class="{ active: isActive }"` |
| **Nhiều class** | Object hoặc Array |
| **Logic phức tạp** | `computed` |
| **Style động** | `:style="{ color, fontSize }"` |
| **Style gọn** | Object / Array |
| **Component** | Class tự merge vào root |

> **Cách đọc bảng này:** cột trái là tình huống thực tế, cột phải là "cú pháp nên dùng". Dùng như bảng tra cứu nhanh trước khi viết code.

> **Tóm gọn 1 câu:** `:style` là "bảng màu động" — object để gọn, array để gộp, computed để gánh logic, còn chuyện trình duyệt nào hiểu cú pháp gì thì Vue lo giùm.