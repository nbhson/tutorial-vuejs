# Component `v-model` trong Vue 3

Bài này đi qua toàn bộ cách dùng `v-model` trên component trong Vue 3 — từ `defineModel()` hiện đại cho đến modifiers tùy biến — mỗi phần đều có ví dụ kèm theo để bạn làm theo được ngay.

# 1. `v-model` trên Component là gì?

Bạn đã quen gắn `v-model` lên `<input>` — giờ là lúc "nâng cấp" nó lên cấp component. `v-model` liên kết dữ liệu hai chiều (two-way binding) giữa component cha (parent) và component con (child), giống như một đường dây điện thoại hai chiều: bên nào nói, bên kia đều nghe được.
- Khi parent thay đổi dữ liệu → child cập nhật
- Khi child cập nhật dữ liệu → parent cũng thay đổi theo

👉 Rất hay dùng cho:
- Input custom (`<CustomInput />`)
- Form component
- Modal, checkbox, select, datepicker custom…

> **Tóm gọn 1 câu:** `v-model` trên component là "đường dây nóng hai chiều" giữa cha và con — bên nào đổi, bên kia tự cập nhật theo.

# 2. Cách dùng `v-model` trong Vue 3.4+ (khuyến nghị)

Mục này nói về cách viết chuẩn hiện nay — nếu dự án của bạn dùng Vue 3.4 trở lên, đây là đường đi ngắn nhất.

## 2.1. `defineModel()` – cách hiện đại & ngắn gọn nhất

Từ Vue 3.4, bạn chỉ cần một dòng `defineModel()` thay vì tự khai báo prop + event. Giống như được cấp sẵn bộ ghép nối thay vì tự bắt hai sợi dây lại.

**📌 Component con (`Child.vue`):**

> 📄 **Code ví dụ:** [`examples/01-2-1-definemodel-cach-hien-ai-ngan-gon.html`](examples/01-2-1-definemodel-cach-hien-ai-ngan-gon.html)

**📌 Component cha (`Parent.vue`):**

> 📄 **Code ví dụ:** [`examples/02-2-1-definemodel-cach-hien-ai-ngan-gon.html`](examples/02-2-1-definemodel-cach-hien-ai-ngan-gon.html)

🔍 Giải thích:
- `defineModel()` trả về ref
- `model.value` luôn đồng bộ với biến ở parent
- Thay đổi ở child → parent tự cập nhật

> **Tóm gọn 1 câu:** Một dòng `defineModel()` là có ngay hai chiều cha ↔ con — Vue tự lo phần "rút dây" phía sau.

# 3. Bọc input native bằng `v-model`

Mục này nói về ứng dụng phổ biến nhất của `v-model` trên component: gói một `<input>` thường thành component input của riêng bạn.

**📌 `Child.vue`:**

> 📄 **Code ví dụ:** [`examples/03-3-boc-input-native-bang-v-model.html`](examples/03-3-boc-input-native-bang-v-model.html)

**📌 `Parent.vue`:**

> 📄 **Code ví dụ:** [`examples/04-3-boc-input-native-bang-v-model.html`](examples/04-3-boc-input-native-bang-v-model.html)

👉 Input trong child thay đổi → text trong parent cũng đổi

> **Tóm gọn 1 câu:** Bọc `<input v-model="model" />` là bạn có ngay component input riêng mà cha vẫn dùng như `<input>` thường.

# 4. `v-model` hoạt động “bên trong” như thế nào?

Mục này "mở nắp máy" cho bạn xem bên trong: hiểu được cách Vue dịch `v-model` ra prop + event, bạn sẽ không bối rối khi gặp code cũ viết thủ công.

`defineModel()` thực chất được Vue biên dịch thành:
- prop: `modelValue`
- event: `update:modelValue`

Ví von: `defineModel()` giống như quả cầu thần kỳ gom hai món đồ (prop để nhận, event để gửi) thành một — còn đây là cách tự làm thủ công trước khi có quả cầu:

**📌 Cách viết thủ công (trước Vue 3.4):**

> 📄 **Code ví dụ:** [`examples/05-4-v-model-hoat-ong-ben-trong-nhu.html`](examples/05-4-v-model-hoat-ong-ben-trong-nhu.html)

**📌 Khi parent viết:**
> 📄 **Code ví dụ:** [`examples/06-4-v-model-hoat-ong-ben-trong-nhu.html`](examples/06-4-v-model-hoat-ong-ben-trong-nhu.html)

👉 Vue tự chuyển thành:
> 📄 **Code ví dụ:** [`examples/07-4-v-model-hoat-ong-ben-trong-nhu.html`](examples/07-4-v-model-hoat-ong-ben-trong-nhu.html)

> **Tóm gọn 1 câu:** `v-model` chỉ là "đường" cho cặp prop `modelValue` + event `update:modelValue` — `defineModel()` tự viết giúp bạn đường đó.

# 5. Khai báo option cho `v-model`

Mục này nói về việc tinh chỉnh model như một prop thật sự: giá trị mặc định, kiểm tra kiểu, bắt buộc truyền — vì `defineModel()` tạo ra prop nên nó hưởng mọi quyền của prop.

Vì `defineModel()` tạo ra prop → bạn có thể cấu hình:

> 📄 **Code ví dụ:** [`examples/08-5-khai-bao-option-cho-v-model.js`](examples/08-5-khai-bao-option-cho-v-model.js)

Hoặc:

> 📄 **Code ví dụ:** [`examples/09-5-khai-bao-option-cho-v-model.js`](examples/09-5-khai-bao-option-cho-v-model.js)

> [!WARNING]
> - Nếu dùng `default` mà parent không truyền giá trị, có thể gây mất đồng bộ
> - Nên luôn đảm bảo parent có giá trị khởi tạo

> **Tóm gọn 1 câu:** Model là prop thật nên được cấu hình đầy đủ — nhưng cẩn thận với `default`: thiếu giá trị khởi tạo ở cha là dễ "lạc nhịp" đồng bộ.

# 6. `v-model` có tham số (Arguments)

Mục này nói về cách đặt tên riêng cho model thay vì mặc định `modelValue` — như dán nhãn lên từng kênh truyền thay vì dùng chung một kênh.

Dùng khi muốn đặt tên khác cho model, ví von: thay vì một kênh vô danh "kênh 0", bạn gọi thẳng "kênh tiêu đề".

**📌 Parent:**
> 📄 **Code ví dụ:** [`examples/10-6-v-model-co-tham-so-arguments.html`](examples/10-6-v-model-co-tham-so-arguments.html)

**📌 Child:**
> 📄 **Code ví dụ:** [`examples/11-6-v-model-co-tham-so-arguments.html`](examples/11-6-v-model-co-tham-so-arguments.html)

👉 Thay vì `modelValue` → Vue dùng:
- prop: `title`
- event: `update:title`

> **Tóm gọn 1 câu:** `v-model:title` đổi "kênh" từ `modelValue` sang `title` — prop và event đổi tên theo, còn cách dùng thì y nguyên.

# 7. Multiple `v-model` (nhiều `v-model` trên 1 component)

Mục này nói về việc gắn nhiều `v-model` cùng lúc lên một component — mỗi model một kênh riêng, như một bàn switch có nhiều nút bấm độc lập.

**📌 Parent:**
> 📄 **Code ví dụ:** [`examples/12-7-multiple-v-model-nhieu-v-model-tren.html`](examples/12-7-multiple-v-model-nhieu-v-model-tren.html)

**📌 Child:**
> 📄 **Code ví dụ:** [`examples/13-7-multiple-v-model-nhieu-v-model-tren.html`](examples/13-7-multiple-v-model-nhieu-v-model-tren.html)
👉 Mỗi `v-model` tương ứng với 1 prop riêng

> **Tóm gọn 1 câu:** Một component nhận được nhiều `v-model` cùng lúc — mỗi cái một tên, một prop riêng, không xung đột.

# 8. `v-model` Modifiers (tuỳ biến `.trim`, `.number`, …)

Mục này nói về lớp hoàn thiện cuối cùng: modifier cho phép component con "biết" cha đã kèm gạch chú ý gì (`.trim`, `.number`...) và tự xử lý giá trị trước khi trả về — giống như máy lọc nước biết bạn chọn vòi thường hay vòi tinh khiết để cho ra dòng nước tương ứng.

**📌 Parent:**
> 📄 **Code ví dụ:** [`examples/14-8-v-model-modifiers-tuy-bien-trim-number.html`](examples/14-8-v-model-modifiers-tuy-bien-trim-number.html)

**📌 Child – đọc modifiers:**
> 📄 **Code ví dụ:** [`examples/15-8-v-model-modifiers-tuy-bien-trim-number.html`](examples/15-8-v-model-modifiers-tuy-bien-trim-number.html)

**📌 Xử lý modifier bằng `set()`:**
> 📄 **Code ví dụ:** [`examples/16-8-v-model-modifiers-tuy-bien-trim-number.html`](examples/16-8-v-model-modifiers-tuy-bien-trim-number.html)
👉 Khi nhập "hello" → parent nhận "Hello"

> **Tóm gọn 1 câu:** Modifier là "ghi chú" cha gửi kèm theo `v-model` — con đọc qua `modifiers` và tự quyết định biến đổi giá trị thế nào trước khi trả về.

# 9. Modifiers + Arguments

Mục này ghép hai mảnh trước lại với nhau: vừa đặt tên model vừa kèm modifier — tất cả các mảnh ghép của `v-model` đều có thể phối hợp với nhau.

**📌 Parent:**
> 📄 **Code ví dụ:** [`examples/17-9-modifiers-arguments.html`](examples/17-9-modifiers-arguments.html)

**📌 Child:**
> 📄 **Code ví dụ:** [`examples/18-9-modifiers-arguments.html`](examples/18-9-modifiers-arguments.html)

# 10. Tổng kết nhanh (cheat sheet)

Mục này gom tất cả cách viết `v-model` thành một bảng tra nhanh — khi quên cú pháp, nhìn một cái là ra.

| Trường hợp | Cách làm |
| :--- | :--- |
| **`v-model` cơ bản** | `const model = defineModel()` |
| **`v-model` có tên** | `defineModel('title')` |
| **Nhiều `v-model`** | `defineModel('firstName')`, `defineModel('lastName')` |
| **Modifier** | `const [model, modifiers] = defineModel()` |
| **Tùy biến giá trị** | `defineModel({ get, set })` |
| **Bọc input** | `<input v-model="model" />` |

> **Cách đọc bảng này:** cột trái là tình huống bạn đang gặp, cột phải là cú pháp dùng ngay — dò theo hàng ngang, không cần đọc theo thứ tự.

> **Tóm gọn 1 câu:** `defineModel()` là chìa khóa vạn năng của `v-model` trên component — thêm tên, modifier hay `get`/`set` tùy tình huống.