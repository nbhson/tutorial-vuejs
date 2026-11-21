Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Form Input Bindings (v-model) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa trên trang bạn đang xem.

# 1. Mục đích của v-model

Mục này nói về "vì sao cần v-model": so sánh cách nối dữ liệu form thủ công với cách Vue cung cấp.

Trong frontend, ta thường cần đồng bộ dữ liệu giữa form và JavaScript.

❌ Cách thủ công (dài dòng):

> 📄 **Code ví dụ:** [`examples/01-1-muc-ich-cua-v-model.html`](examples/01-1-muc-ich-cua-v-model.html)

✅ Dùng `v-model` (ngắn gọn):

> 📄 **Code ví dụ:** [`examples/02-1-muc-ich-cua-v-model.html`](examples/02-1-muc-ich-cua-v-model.html)

👉 `v-model` tự động:

- Lấy giá trị từ input → JS
- Cập nhật UI khi JS thay đổi

Ví von: `v-model` là **đường ống hai chiều** — nước (dữ liệu) chảy từ input về JS và ngược lại từ JS ra input, không cần bạn múc từng gáo.

# 2. Cách v-model hoạt động với từng loại input

Mục này cho biết `v-model` "móc" vào thuộc tính và sự kiện nào của từng loại input — hiểu chỗ này là hiểu bản chất, không cần học thuộc.

| Element | Property | Event |
| :--- | :--- | :--- |
| `input` (text) / `textarea` | `value` | `input` |
| `checkbox` / `radio` | `checked` | `change` |
| `select` | `value` | `change` |

> **Cách đọc bảng này:** mỗi dòng một loại form element; cột Property là chỗ `v-model` đọc/ghi dữ liệu, cột Event là thời điểm nó cập nhật. Đọc theo hàng để thấy `v-model` thực chất là "property + event" ghép lại.

> 📌 Lưu ý quan trọng
>
> `v-model` bỏ qua các thuộc tính HTML ban đầu (`value`, `checked`, `selected`)
> → JavaScript là nguồn dữ liệu duy nhất (source of truth)

# 3. Basic Usage – Text input

Ví dụ:

> 📄 **Code ví dụ:** [`examples/03-3-basic-usage-text-input.html`](examples/03-3-basic-usage-text-input.html)

> 📄 **Code ví dụ:** [`examples/04-3-basic-usage-text-input.js`](examples/04-3-basic-usage-text-input.js)

👉 Gõ vào input → message đổi → UI tự cập nhật

# 4. Multiline Text – textarea

> 📄 **Code ví dụ:** [`examples/05-4-multiline-text-textarea.html`](examples/05-4-multiline-text-textarea.html)

❌ Sai:

> 📄 **Code ví dụ:** [`examples/06-4-multiline-text-textarea.html`](examples/06-4-multiline-text-textarea.html)

✅ Đúng:

> 📄 **Code ví dụ:** [`examples/07-4-multiline-text-textarea.html`](examples/07-4-multiline-text-textarea.html)

# 5. Checkbox

## 5.1 Checkbox đơn (Boolean)

> 📄 **Code ví dụ:** [`examples/08-5-1-checkbox-on-boolean.html`](examples/08-5-1-checkbox-on-boolean.html)

> 📄 **Code ví dụ:** [`examples/09-5-1-checkbox-on-boolean.js`](examples/09-5-1-checkbox-on-boolean.js)

👉 true / false

## 5.2 Nhiều checkbox → Array

> 📄 **Code ví dụ:** [`examples/10-5-2-nhieu-checkbox-array.html`](examples/10-5-2-nhieu-checkbox-array.html)

> 📄 **Code ví dụ:** [`examples/11-5-2-nhieu-checkbox-array.js`](examples/11-5-2-nhieu-checkbox-array.js)

👉 `skills = ['Vue', 'React']`

# 6. Radio Button

> 📄 **Code ví dụ:** [`examples/12-6-radio-button.html`](examples/12-6-radio-button.html)

> 📄 **Code ví dụ:** [`examples/13-6-radio-button.js`](examples/13-6-radio-button.js)

👉 Chỉ chọn 1 giá trị duy nhất

# 7. Select

## 7.1 Select đơn

> 📄 **Code ví dụ:** [`examples/14-7-1-select-on.html`](examples/14-7-1-select-on.html)

> 📌 Nên có option disabled để tránh lỗi trên iOS

## 7.2 Select multiple (Array)

> 📄 **Code ví dụ:** [`examples/15-7-2-select-multiple-array.html`](examples/15-7-2-select-multiple-array.html)

> 📄 **Code ví dụ:** [`examples/16-7-2-select-multiple-array.js`](examples/16-7-2-select-multiple-array.js)

## 7.3 Select với v-for

> 📄 **Code ví dụ:** [`examples/17-7-3-select-voi-v-for.html`](examples/17-7-3-select-voi-v-for.html)

> 📄 **Code ví dụ:** [`examples/18-7-3-select-voi-v-for.js`](examples/18-7-3-select-voi-v-for.js)

# 8. Value Bindings (giá trị không phải string)

## 8.1 Checkbox với true-value / false-value

> 📄 **Code ví dụ:** [`examples/19-8-1-checkbox-voi-true-value-false-value.html`](examples/19-8-1-checkbox-voi-true-value-false-value.html)

👉 yes / no thay vì true / false

## 8.2 Radio với giá trị động

> 📄 **Code ví dụ:** [`examples/20-8-2-radio-voi-gia-tri-ong.html`](examples/20-8-2-radio-voi-gia-tri-ong.html)

👉 score là number, không phải string

## 8.3 Select với object

> 📄 **Code ví dụ:** [`examples/21-8-3-select-voi-object.html`](examples/21-8-3-select-voi-object.html)

👉 selected là object

# 9. Modifiers của v-model

Mục này nói về ba "công tắc tinh chỉnh" gắn ngay sau `v-model` — mỗi cái thay đổi thời điểm hoặc cách dữ liệu được đưa vào state.

## 9.1 .lazy – cập nhật khi blur / change

> 📄 **Code ví dụ:** [`examples/22-9-1-lazy-cap-nhat-khi-blur-change.html`](examples/22-9-1-lazy-cap-nhat-khi-blur-change.html)

👉 Không cập nhật theo từng ký tự

Giống như **đổi ca làm việc**: thay vì báo cáo mỗi lần gõ một chữ (sự kiện `input`), `.lazy` đợi bạn "nộp bài" (blur / change) rồi mới cập nhật.

## 9.2 .number – ép kiểu Number

> 📄 **Code ví dụ:** [`examples/23-9-2-number-ep-kieu-number.html`](examples/23-9-2-number-ep-kieu-number.html)

👉 age là Number, không phải string

## 9.3 .trim – tự động xóa khoảng trắng

> 📄 **Code ví dụ:** [`examples/24-9-3-trim-tu-ong-xoa-khoang-trang.html`](examples/24-9-3-trim-tu-ong-xoa-khoang-trang.html)

👉 `" son "` → `"son"`

# 10. v-model với Component

`v-model` không chỉ dùng cho input

Có thể dùng với component tự tạo

📖 Xem thêm:
👉 Component v-model (bài học tiếp theo)

# 11. Tổng kết nhanh

| Tình huống | Dùng |
| :--- | :--- |
| **Input text** | `v-model` |
| **Checkbox boolean** | `v-model` |
| **Nhiều checkbox** | Array |
| **Radio** | string / number |
| **Select** | string / array / object |
| **Ép kiểu** | `.number` |
| **Trim** | `.trim` |
| **Delay update** | `.lazy` |

> **Cách đọc bảng này:** cột trái là tình huống bạn gặp, cột phải là "công cụ" tương ứng. Làm form mà phân vân — tra bảng này trước, quay lại section nếu cần ví dụ.

> **Tóm gọn 1 câu:** `v-model` là đường ống hai chiều cho form — mặc định nối `value`/`checked` với state, còn `.lazy`, `.number`, `.trim` là ba công tắc chỉnh thời điểm và định dạng dữ liệu.