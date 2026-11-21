# Props trong Vue 3

Bài này đi qua toàn bộ về **Props** — cách truyền dữ liệu từ cha xuống con trong Vue — từ khai báo, quy tắc đặt tên, đến one-way data flow và validation, mỗi phần đều có ví dụ kèm theo.

# 1. Props là gì?

Mục này trả lời câu hỏi nền tảng: làm sao cho component con "có hàng để bán" khi nó không tự sản xuất? Dùng props — giống như nhà cung cấp giao nguyên liệu đúng theo đơn hàng đã đặt.

Props là cách truyền dữ liệu từ component cha xuống component con trong Vue.

👉 Props giúp component:
- Tái sử dụng được
- Không phụ thuộc cứng vào dữ liệu bên trong
- Dễ bảo trì và mở rộng

> 🔑 **Nguyên tắc quan trọng:**
> Props là **one-way data flow** (dữ liệu chỉ đi từ cha → con).

> **Tóm gọn 1 câu:** Props là "đơn hàng cha giao xuống" — con nhận, dùng, và không tự ý sửa lô hàng.

# 2. Khai báo Props (Props Declaration)

Mục này nói về cách "đăng ký đơn hàng": component con khai báo trước nó cần gì, với bốn cách viết từ phổ biến đến TypeScript.

## 2.1. Khai báo props với `<script setup>`

> 📄 **Code ví dụ:** [`examples/01-2-1-khai-bao-props-voi-script-setup.html`](examples/01-2-1-khai-bao-props-voi-script-setup.html)

✔ Dùng `defineProps()`
✔ Phổ biến nhất trong Vue 3

## 2.2. Khai báo props với Options API

> 📄 **Code ví dụ:** [`examples/02-2-2-khai-bao-props-voi-options-api.js`](examples/02-2-2-khai-bao-props-voi-options-api.js)

## 2.3. Khai báo props bằng object (có kiểu dữ liệu)

> 📄 **Code ví dụ:** [`examples/03-2-3-khai-bao-props-bang-object-co.js`](examples/03-2-3-khai-bao-props-bang-object-co.js)

📌 Lợi ích:
- Tự document code
- Vue cảnh báo nếu truyền sai kiểu

## 2.4. Khai báo props bằng TypeScript

Mục này nói về cách khai báo "có công chứng": viết kiểu ngay trên generic của `defineProps`, sai kiểu là trình biên dịch gạch đỏ trước cả lúc chạy.

> 📄 **Code ví dụ:** [`examples/04-2-4-khai-bao-props-bang-typescript.html`](examples/04-2-4-khai-bao-props-bang-typescript.html)

✔ Rất phù hợp khi dùng Vue + TypeScript

> **Tóm gọn 1 câu:** Khai báo props là "dán bảng giá" của component — object syntax tự document, TypeScript chặn sai ngay lúc build.

# 3. Reactive Props & Destructure

Mục này nói về cách cầm và làm việc với props sau khi khai báo: truy cập trực tiếp, destructure gọn gàng, và gán mặc định.

## 3.1. Truy cập trực tiếp props

> 📄 **Code ví dụ:** [`examples/05-3-1-truy-cap-truc-tiep-props.js`](examples/05-3-1-truy-cap-truc-tiep-props.js)

✔ `props.foo` luôn reactive

## 3.2. Destructure props (Vue 3.5+)

> 📄 **Code ví dụ:** [`examples/06-3-2-destructure-props-vue-3-5.js`](examples/06-3-2-destructure-props-vue-3-5.js)

📌 Vue 3.5+ tự động chuyển `foo` → `props.foo`

## 3.3. Gán giá trị mặc định khi destructure

Mục này nói về "phương án dự phòng": nếu cha quên truyền prop, destructure với giá trị mặc định giúp component không chết vì `undefined`.

> 📄 **Code ví dụ:** [`examples/07-3-3-gan-gia-tri-mac-inh-khi.ts`](examples/07-3-3-gan-gia-tri-mac-inh-khi.ts)

# 4. Truyền props đã destructure vào hàm

Mục này là bẫy reactivity kinh điển: destructure xong thì giá trị trở thành "tấm ảnh chụp" tại thời điểm lấy — đưa vào hàm composable theo cách nào quyết định nó còn "sống" hay không.

❌ **Sai – mất reactivity**

> 📄 **Code ví dụ:** [`examples/08-4-truyen-props-a-destructure-vao-ham.js`](examples/08-4-truyen-props-a-destructure-vao-ham.js)

✔ **Đúng – giữ reactivity**

> 📄 **Code ví dụ:** [`examples/09-4-truyen-props-a-destructure-vao-ham.js`](examples/09-4-truyen-props-a-destructure-vao-ham.js)

✔ Khi dùng composable:

> 📄 **Code ví dụ:** [`examples/10-4-truyen-props-a-destructure-vao-ham.js`](examples/10-4-truyen-props-a-destructure-vao-ham.js)

> **Tóm gọn 1 câu:** Destructure là "rút hàng khỏi thùng" — muốn hàng còn tự cập nhật, hãy bọc lại bằng hàm (`() => props.foo`) trước khi giao cho composable.

# 5. Quy tắc đặt tên Props (Prop Name Casing)

Mục này nói về quy ước viết hoa viết thường: khai báo camelCase như đặt tên khai sinh, truyền kebab-case như cách gọi thân mật trong template.

## 5.1. Khai báo trong component

> 📄 **Code ví dụ:** [`examples/11-5-1-khai-bao-trong-component.js`](examples/11-5-1-khai-bao-trong-component.js)

## 5.2. Dùng trong template

> 📄 **Code ví dụ:** [`examples/12-5-2-dung-trong-template.html`](examples/12-5-2-dung-trong-template.html)

📌 Quy ước:
- Khai báo: **camelCase**
- Khi truyền: **kebab-case**

# 6. Static Props vs Dynamic Props

Mục này phân biệt hai kiểu giao hàng: static là "hàng cứng" viết chết trong template (chuỗi ký tự), dynamic là "hàng tính toán" cần dấu `:` để JS biểu thức ra giá trị thật.

## 6.1. Static

> 📄 **Code ví dụ:** [`examples/13-6-1-static.html`](examples/13-6-1-static.html)

## 6.2. Dynamic

> 📄 **Code ví dụ:** [`examples/14-6-2-dynamic.html`](examples/14-6-2-dynamic.html)

> **Tóm gọn 1 câu:** Không có `:` là chuỗi chết, có `:` là biểu thức sống — một dấu hai chấm quyết định props của bạn là text hay dữ liệu thật.

# 7. Truyền các kiểu dữ liệu khác nhau

Mục này là "sổ tay đóng gói": truyền number, boolean, array, object ra sao — nhớ quy tắc chung là giá trị JS phức tạp phải bọc trong dấu nháy của `:`.

## 7.1. Number

> 📄 **Code ví dụ:** [`examples/15-7-1-number.html`](examples/15-7-1-number.html)

## 7.2. Boolean

> 📄 **Code ví dụ:** [`examples/16-7-2-boolean.html`](examples/16-7-2-boolean.html)

## 7.3. Array

> 📄 **Code ví dụ:** [`examples/17-7-3-array.html`](examples/17-7-3-array.html)

## 7.4. Object

> 📄 **Code ví dụ:** [`examples/18-7-4-object.html`](examples/18-7-4-object.html)

# 8. Truyền nhiều props bằng object

Mục này nói về cách "gửi cả kiện hàng": `v-bind` không tham số bung nguyên một object thành nhiều prop riêng lẻ.

> 📄 **Code ví dụ:** [`examples/19-8-truyen-nhieu-props-bang-object.html`](examples/19-8-truyen-nhieu-props-bang-object.html)

Tương đương:

> 📄 **Code ví dụ:** [`examples/20-8-truyen-nhieu-props-bang-object.html`](examples/20-8-truyen-nhieu-props-bang-object.html)

> **Tóm gọn 1 câu:** `v-bind="object"` là "xé kiện, xếp hàng" — mỗi key trong object thành một prop riêng, viết tay từng cái thì dài mà dễ sót.

# 9. One-Way Data Flow (Rất quan trọng)

Mục này nhắc lại quy tắc vàng của props: con không được tự sửa hàng nhận được — muốn thay đổi phải báo lên cha, hoặc tạo state riêng của mình.

❌ Không được sửa props trong component con

> 📄 **Code ví dụ:** [`examples/21-9-one-way-data-flow-rat-quan-trong.js`](examples/21-9-one-way-data-flow-rat-quan-trong.js)

✔ **Cách đúng – tạo state riêng**

> 📄 **Code ví dụ:** [`examples/22-9-one-way-data-flow-rat-quan-trong.js`](examples/22-9-one-way-data-flow-rat-quan-trong.js)

✔ **Cách đúng – computed**

> 📄 **Code ví dụ:** [`examples/23-9-one-way-data-flow-rat-quan-trong.js`](examples/23-9-one-way-data-flow-rat-quan-trong.js)

> **Tóm gọn 1 câu:** Props chỉ đọc — cần "bản riêng" thì dùng state, cần "bản phái sinh" thì dùng computed, cần thay đổi gốc thì emit lên cha.

# 10. Mutating Object / Array Props

Mục này nói về cửa hậu nguy hiểm nhất: object/array là tham chiếu, mutate sâu bên trong không kêu lỗi nhưng âm thầm đổi cả state của cha — như sửa đồ trong phòng khách nhà người ta mà không ai thấy.

> 📄 **Code ví dụ:** [`examples/24-10-mutating-object-array-props.js`](examples/24-10-mutating-object-array-props.js)

⚠️ Nguy hiểm vì:
- Làm thay đổi state của component cha
- Khó debug

✔ **Best practice:**
➡ Emit event để cha xử lý

> 📄 **Code ví dụ:** [`examples/25-10-mutating-object-array-props.js`](examples/25-10-mutating-object-array-props.js)

> **Tóm gọn 1 câu:** Mutate object prop là "sửa lén đồ của cha" — chạy được nhưng vỡ quy ước; mọi thay đổi nên đi qua emit cho cha tự tay sửa.

# 11. Prop Validation (Ràng buộc props)

Mục này nói về "kiểm hàng lúc nhận": khai báo kiểu, bắt buộc, mặc định và validator — dữ liệu sai bị cảnh báo ngay khi phát triển.

> 📄 **Code ví dụ:** [`examples/26-11-prop-validation-rang-buoc-props.js`](examples/26-11-prop-validation-rang-buoc-props.js)

📌 Ghi nhớ:
- Props optional mặc định
- Boolean không truyền → `false`
- Object / Array default phải là function

# 12. Runtime Type Checks

Mục này nói về "chữ ký được chấp nhận" trên đơn hàng: prop có thể chấp nhận nhiều kiểu khác nhau, kể cả custom class.

Các kiểu hỗ trợ:
- String, Number, Boolean
- Array, Object
- Date, Function
- Custom class

> 📄 **Code ví dụ:** [`examples/27-12-runtime-type-checks.js`](examples/27-12-runtime-type-checks.js)

# 13. Nullable Props

Mục này nói về cách khai báo prop "được phép trống": chấp nhận cả kiểu thật lẫn `null` để không bị cảnh báo oan.

> 📄 **Code ví dụ:** [`examples/28-13-nullable-props.js`](examples/28-13-nullable-props.js)

# 14. Boolean Casting

Mục này nói về hành vi đặc biệt của prop Boolean: chỉ cần "có mặt" trong template là được tính `true` — như điểm danh, có tên trong danh sách là tính có mặt.

> 📄 **Code ví dụ:** [`examples/29-14-boolean-casting.html`](examples/29-14-boolean-casting.html)

> 📄 **Code ví dụ:** [`examples/30-14-boolean-casting.js`](examples/30-14-boolean-casting.js)

📌 Lưu ý thứ tự:
- `disabled: [Boolean, String]` // Boolean ưu tiên
- `disabled: [String, Boolean]` // String ưu tiên

> **Tóm gọn 1 câu:** Boolean casting là "có mặt là có mặt" — nhưng thứ tự kiểu trong mảng quyết định đặc biệt này hay kiểu kia được ưu tiên.

# 15. Tổng kết nhanh

Mục này chốt lại toàn bài bằng năm điều cần nhớ — đủ dùng khi viết component mỗi ngày.

✔ Props dùng để truyền dữ liệu từ cha → con
✔ Props là readonly
✔ Không mutate props
✔ Nên validate props
✔ Luôn tuân theo one-way data flow

> **Tóm gọn 1 câu:** Props là "hàng giao đến phải giữ nguyên vẹn" — nhận, dùng, phái sinh được; sửa thì báo lên cha bằng emit.