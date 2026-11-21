Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Class and Style Bindings (Ràng buộc class và style) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang bạn đang xem.

# 1. Mục đích của Class & Style Bindings

Mục này nói về lý do có cả một bài học riêng cho việc gán class/style: nối chuỗi thủ công nhanh gây lỗi, Vue thay bằng cú pháp gọn và an toàn.

Trong Vue, ta thường cần:

- Thêm / gỡ class CSS
- Thay đổi style inline

👉 Nếu nối chuỗi thủ công `("active " + (isActive ? "on" : ""))` thì:

- Khó đọc
- Dễ lỗi

Ví von: nối chuỗi class thủ công giống như **xếp chữ bằng tay từng cái một** — chạy được nhưng lệch một khoảng trắng là hỏng cả dòng. Vue cho bạn "khay chữ có sẵn": object, array, computed — chỉ cần khai báo, Vue tự ghép.

➡️ Vue cung cấp cú pháp đặc biệt cho `:class` và `:style`
Cho phép dùng object, array, computed rất gọn gàng.

> **Tóm gọn 1 câu:** `:class`/`:style` là cách "bật-tắt class bằng dữ liệu" — hết thời nối chuỗi tay dễ lệch, dễ lỗi.

# 2. Binding HTML Classes (:class)

Mục này đi qua các cách gán class từ đơn giản tới phức tạp: object → biến → computed → array.

## 2.1. Binding class bằng Object

Mục này nói về cách "bật/tắt class theo công tắc": key là tên class, value là điều kiện đúng/sai.

Dùng khi bạn muốn bật/tắt class theo điều kiện.

> 📄 **Code ví dụ:** [`examples/01-2-1-binding-class-bang-object.html`](examples/01-2-1-binding-class-bang-object.html)

> ✔ Khi isActive = true → có class active
>
> ❌ Khi false → không có

## 2.2. Nhiều class trong object

> 📄 **Code ví dụ:** [`examples/02-2-2-nhieu-class-trong-object.html`](examples/02-2-2-nhieu-class-trong-object.html)

> 📄 **Code ví dụ:** [`examples/03-2-2-nhieu-class-trong-object.js`](examples/03-2-2-nhieu-class-trong-object.js)

**Kết quả render:**

> 📄 **Code ví dụ:** [`examples/04-2-2-nhieu-class-trong-object.html`](examples/04-2-2-nhieu-class-trong-object.html)

Nếu `hasError = true`:

> 📄 **Code ví dụ:** [`examples/05-2-2-nhieu-class-trong-object.html`](examples/05-2-2-nhieu-class-trong-object.html)

## 2.3. Dùng chung với class tĩnh

> 📄 **Code ví dụ:** [`examples/06-2-3-dung-chung-voi-class-tinh.html`](examples/06-2-3-dung-chung-voi-class-tinh.html)

**Render:**

> 📄 **Code ví dụ:** [`examples/07-2-3-dung-chung-voi-class-tinh.html`](examples/07-2-3-dung-chung-voi-class-tinh.html)

## 2.4. Object class đặt trong biến

> 📄 **Code ví dụ:** [`examples/08-2-4-object-class-at-trong-bien.js`](examples/08-2-4-object-class-at-trong-bien.js)

> 📄 **Code ví dụ:** [`examples/09-2-4-object-class-at-trong-bien.html`](examples/09-2-4-object-class-at-trong-bien.html)

**Render:**

> 📄 **Code ví dụ:** [`examples/10-2-4-object-class-at-trong-bien.html`](examples/10-2-4-object-class-at-trong-bien.html)

## 2.5. Class với computed property (rất hay dùng 👍)

> 📄 **Code ví dụ:** [`examples/11-2-5-class-voi-computed-property-rat-hay.js`](examples/11-2-5-class-voi-computed-property-rat-hay.js)

> 📄 **Code ví dụ:** [`examples/12-2-5-class-voi-computed-property-rat-hay.html`](examples/12-2-5-class-voi-computed-property-rat-hay.html)

👉 Logic phức tạp → đưa hết vào computed, template rất sạch.

# 3. Binding class bằng Array

Mục này chuyển sang cách thứ hai: khi bạn muốn gán **danh sách nhiều class** cùng lúc thay vì bật/tắt từng cái.

Dùng khi bạn có danh sách class.

## 3.1. Array cơ bản

> 📄 **Code ví dụ:** [`examples/13-3-1-array-co-ban.html`](examples/13-3-1-array-co-ban.html)

> 📄 **Code ví dụ:** [`examples/14-3-1-array-co-ban.js`](examples/14-3-1-array-co-ban.js)

**Render:**

> 📄 **Code ví dụ:** [`examples/15-3-1-array-co-ban.html`](examples/15-3-1-array-co-ban.html)

## 3.2. Class có điều kiện (ternary)

> 📄 **Code ví dụ:** [`examples/16-3-2-class-co-ieu-kien-ternary.html`](examples/16-3-2-class-co-ieu-kien-ternary.html)

> ✔ activeClass chỉ xuất hiện khi isActive = true

## 3.3. Kết hợp object trong array (rất mạnh)

> 📄 **Code ví dụ:** [`examples/17-3-3-ket-hop-object-trong-array-rat.html`](examples/17-3-3-ket-hop-object-trong-array-rat.html)

👉 Vừa gọn, vừa linh hoạt

# 4. Class khi dùng với Component

Mục này trả lời câu hỏi hay bị bỏ qua: gán `:class` lên component thì class rơi vào đâu, và chuyện gì xảy ra khi component có nhiều root.

## 4.1. Component có 1 root element

> 📄 **Code ví dụ:** [`examples/18-4-1-component-co-1-root-element.html`](examples/18-4-1-component-co-1-root-element.html)

**Render:**

> 📄 **Code ví dụ:** [`examples/19-4-1-component-co-1-root-element.html`](examples/19-4-1-component-co-1-root-element.html)

## 4.2. Binding class cho component

> 📄 **Code ví dụ:** [`examples/20-4-2-binding-class-cho-component.html`](examples/20-4-2-binding-class-cho-component.html)

**Khi isActive = true:**

> 📄 **Code ví dụ:** [`examples/21-4-2-binding-class-cho-component.html`](examples/21-4-2-binding-class-cho-component.html)

## 4.3. Component có nhiều root element

Mục này nói về ngoại lệ: component nhiều root thì class "không biết bám vào đâu", nên bạn phải tự chỉ chỗ bằng `$attrs.class`.

Phải dùng `$attrs.class`

> 📄 **Code ví dụ:** [`examples/22-4-3-component-co-nhieu-root-element.html`](examples/22-4-3-component-co-nhieu-root-element.html)

**Render:**

> 📄 **Code ví dụ:** [`examples/23-4-3-component-co-nhieu-root-element.html`](examples/23-4-3-component-co-nhieu-root-element.html)

> **Tóm gọn 1 câu:** Object để bật/tắt theo điều kiện, array để gộp danh sách, computed để gánh logic — còn với component nhiều root thì nhớ tự chỉ chỗ bằng `$attrs.class`.
