Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài Conditional Rendering (Render có điều kiện) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng nội dung trang bạn đang mở.

# 1. Conditional Rendering là gì?

Mục này mở bài: giao diện không phải lúc nào cũng hiện hết mọi thứ — tùy điều kiện mà "lên sóng" hoặc "ẩn mình".

Conditional Rendering cho phép Vue hiển thị hoặc ẩn một phần giao diện dựa trên điều kiện (true / false).

Ví von: giống như **biển báo điện tử trên cao tốc** — điều kiện nào (kẹt xe, sương mù) thì hiện biển đó, điều kiện không còn thì biển biến mất.

➡️ Rất thường dùng cho:

- Hiển thị / ẩn nút đăng nhập
- Loading / Empty state
- Phân quyền người dùng
- Toggle UI (bật / tắt)

Vue cung cấp các directive chính:

- `v-if`
- `v-else`
- `v-else-if`
- `v-show`

# 2. v-if – Hiển thị có điều kiện

## Khái niệm

`v-if` chỉ render phần tử khi điều kiện đúng.
Nếu điều kiện sai → phần tử không tồn tại trong DOM.

## Cú pháp

> 📄 **Code ví dụ:** [`examples/01-cu-phap.html`](examples/01-cu-phap.html)

## Ví dụ

> 📄 **Code ví dụ:** [`examples/02-vi-du.html`](examples/02-vi-du.html)

> ➡️ Khi isLogin = false → `<h1>` bị xóa khỏi DOM

# 3. v-else – Trường hợp ngược lại của v-if

## Khái niệm

`v-else` đại diện cho “nếu không thì…”

**BẮT BUỘC** đứng ngay sau `v-if`

## Ví dụ

> 📄 **Code ví dụ:** [`examples/03-vi-du.html`](examples/03-vi-du.html)

> ⚠️ Sai cách (Vue sẽ không nhận `v-else`):

> 📄 **Code ví dụ:** [`examples/04-vi-du.html`](examples/04-vi-du.html)

# 4. v-else-if – Nhiều điều kiện liên tiếp

## Khái niệm

- Dùng khi có nhiều nhánh điều kiện
- Có thể chain nhiều `v-else-if`
- Phải đứng liền kề nhau

## Ví dụ

> 📄 **Code ví dụ:** [`examples/05-vi-du.html`](examples/05-vi-du.html)

# 5. v-if trên template – Render nhiều phần tử cùng lúc

## Vấn đề

`v-if` chỉ gắn vào 1 element, vậy nếu muốn bật/tắt nhiều element thì sao?

## Giải pháp

Dùng `<template v-if>`

## Ví dụ

> 📄 **Code ví dụ:** [`examples/06-vi-du.html`](examples/06-vi-du.html)

> 📌 `<template>` không xuất hiện trong DOM, chỉ là wrapper logic.
>
> ➡️ `v-else` và `v-else-if` cũng dùng được với `<template>`.

# 6. v-show – Ẩn/hiện bằng CSS

## Khái niệm

`v-show` luôn render element

Chỉ thay đổi CSS: `display: none`

## Cú pháp

> 📄 **Code ví dụ:** [`examples/07-cu-phap.html`](examples/07-cu-phap.html)

## Ví dụ

> 📄 **Code ví dụ:** [`examples/08-vi-du.html`](examples/08-vi-du.html)

> ⚠️ Lưu ý:
>
> - `v-show` ❌ KHÔNG hỗ trợ `<template>`
> - `v-show` ❌ KHÔNG dùng được với `v-else`

# 7. So sánh v-if vs v-show (RẤT QUAN TRỌNG)

Mục này là phần "chấm điểm" giữa hai cách ẩn/hiện — câu hỏi phỏng vấn kinh điển và cũng là phân vân thực tế thường gặp nhất.

| Tiêu chí | v-if | v-show |
| :--- | :--- | :--- |
| **Render DOM** | Có điều kiện | Luôn render |
| **Ẩn/hiện** | Thêm/xóa DOM | CSS display |
| **Chi phí** | Cao khi toggle | Cao lúc render đầu |
| **Phù hợp** | Ít thay đổi | Toggle thường xuyên |

> **Cách đọc bảng này:** so sánh ngang từng hàng. Hàng "Render DOM" là khác biệt gốc (có trong DOM hay không), các hàng còn lại đều là hệ quả. Hàng cuối là "câu trả lời tóm tắt" nên nhớ nhất.

## Khi nào dùng?

- ✅ **v-if**: Modal hiếm mở, tab ít đổi
- ✅ **v-show**: Dropdown, accordion, toggle UI

> **Tóm gọn 1 câu:** `v-if` là "gọi người lên sân khấu khi cần", `v-show` là "đóng băng đèn hậu trường" — diễn thường xuyên thì dùng `v-show`, diễn ít thì dùng `v-if`.

# 8. v-if kết hợp với v-for

Mục này nói về cái bẫy thứ tự ưu tiên: khi đặt hai directive trên cùng một element, `v-if` "nói trước" `v-for` — và vì sao điều đó gây rắc rối.

## Quy tắc

Khi dùng trên cùng 1 element:

> 📄 **Code ví dụ:** [`examples/09-quy-tac.html`](examples/09-quy-tac.html)

➡️ `v-if` chạy trước `v-for`

Vue khuyến cáo ❌ **KHÔNG** nên dùng như vậy

## Cách đúng

> 📄 **Code ví dụ:** [`examples/10-cach-ung.html`](examples/10-cach-ung.html)

> 📄 **Code ví dụ:** [`examples/11-cach-ung.js`](examples/11-cach-ung.js)

> 📌 Tách logic ra → code rõ ràng, dễ debug, hiệu năng tốt hơn.

# 9. Tổng kết nhanh 🧠

- `v-if` → render có điều kiện (DOM thật)
- `v-else`, `v-else-if` → nhánh logic
- `<template v-if>` → bật/tắt nhiều element
- `v-show` → ẩn/hiện bằng CSS
- Không nên dùng `v-if` + `v-for` cùng element.

> **Tóm gọn 1 câu:** `v-if` quyết định "có tồn tại hay không", `v-show` quyết định "có hiện ra hay không" — và đừng bao giờ ghép `v-if` với `v-for` trên cùng một thẻ.