Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài List Rendering (v-for) trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng nội dung trang bạn đang xem.

# 1. v-for – Render danh sách từ mảng

Mục này mở bài bằng "vòng lặp trên template": cách biến một mảng dữ liệu thành nhiều phần tử HTML.

## Khái niệm

`v-for` dùng để lặp qua một mảng và render phần tử tương ứng.

Ví von: `v-for` giống như **máy photo phát một tờ mẫu cho mỗi học sinh trong danh sách** — mảng (danh sách) có bao nhiêu tên, template in bấy nhiêu bản.

Cú pháp cơ bản:

> 📄 **Code ví dụ:** [`examples/01-khai-niem.html`](examples/01-khai-niem.html)

## Ví dụ

> 📄 **Code ví dụ:** [`examples/02-vi-du.js`](examples/02-vi-du.js)

> 📄 **Code ví dụ:** [`examples/03-vi-du.html`](examples/03-vi-du.html)

> 👉 Kết quả:
>
> Foo
> Bar

# 2. Truy cập index trong v-for

## Khái niệm

`v-for` hỗ trợ tham số thứ hai là `index` (vị trí phần tử).

## Ví dụ

> 📄 **Code ví dụ:** [`examples/04-vi-du.html`](examples/04-vi-du.html)

> 👉 Kết quả:
>
> 0 - Foo
> 1 - Bar

# 3. Phạm vi biến (Scope) trong v-for

## Khái niệm

Bên trong `v-for`:

- Truy cập được biến cha
- Biến `item`, `index` chỉ tồn tại trong vòng lặp

Tương đương JavaScript:

> 📄 **Code ví dụ:** [`examples/05-khai-niem.js`](examples/05-khai-niem.js)

# 4. Destructuring trong v-for

## Khái niệm

Có thể destructuring object giống như tham số hàm JS.

## Ví dụ

> 📄 **Code ví dụ:** [`examples/06-vi-du.html`](examples/06-vi-du.html)

Hoặc có index:

> 📄 **Code ví dụ:** [`examples/07-vi-du.html`](examples/07-vi-du.html)

# 5. v-for lồng nhau (Nested loop)

## Khái niệm

`v-for` bên trong vẫn truy cập được scope bên ngoài.

## Ví dụ

> 📄 **Code ví dụ:** [`examples/08-vi-du.html`](examples/08-vi-du.html)

# 6. in và of trong v-for

## Khái niệm

- `in` và `of` tương đương nhau
- `of` giống cú pháp JavaScript hơn

> 📄 **Code ví dụ:** [`examples/09-khai-niem.html`](examples/09-khai-niem.html)

# 7. v-for với Object

## Khái niệm

- Có thể lặp qua giá trị, key, và index
- Thứ tự dựa trên `Object.values()`

## Ví dụ

> 📄 **Code ví dụ:** [`examples/10-vi-du.js`](examples/10-vi-du.js)

> 📄 **Code ví dụ:** [`examples/11-vi-du.html`](examples/11-vi-du.html)

Có key:

> 📄 **Code ví dụ:** [`examples/12-vi-du.html`](examples/12-vi-du.html)

Có index:

> 📄 **Code ví dụ:** [`examples/13-vi-du.html`](examples/13-vi-du.html)

# 8. v-for với Range (số nguyên)

## Khái niệm

Lặp từ 1 → n (không phải từ 0)

## Ví dụ

> 📄 **Code ví dụ:** [`examples/14-vi-du.html`](examples/14-vi-du.html)

> 👉 Kết quả:
>
> 1 2 3 4 5

# 9. v-for trên thẻ template

## Khái niệm

- Dùng khi muốn render nhiều phần tử cùng lúc
- `<template>` không render ra DOM

## Ví dụ

> 📄 **Code ví dụ:** [`examples/15-vi-du.html`](examples/15-vi-du.html)

# 10. v-for kết hợp với v-if (⚠️ Quan trọng)

## Nguyên tắc

- `v-if` chạy trước `v-for`
- Không nên đặt cả hai trên cùng một element

❌ Sai:

> 📄 **Code ví dụ:** [`examples/16-nguyen-tac.html`](examples/16-nguyen-tac.html)

✅ Đúng:

> 📄 **Code ví dụ:** [`examples/17-nguyen-tac.html`](examples/17-nguyen-tac.html)

## Best Practice

Lọc dữ liệu bằng `computed`

> 📄 **Code ví dụ:** [`examples/18-best-practice.js`](examples/18-best-practice.js)

# 11. key – Duy trì trạng thái danh sách

Mục này nói về "giấy chứng minh thư" của từng phần tử trong danh sách — vì sao thiếu nó là Vue tái sử dụng DOM sai.

## Khái niệm

`key` giúp Vue:

- Theo dõi đúng phần tử
- Không làm mất state (input, component…)

> **Tóm gọn 1 câu:** `key` là "CMND của mỗi item" — có nó thì Vue biết ai là ai khi danh sách xáo trộn, state của input/component mới không bị "chuyển nhượng" nhầm.

## Ví dụ

> 📄 **Code ví dụ:** [`examples/19-vi-du.html`](examples/19-vi-du.html)

> ⚠️ Lưu ý:
>
> - `key` phải là string hoặc number
> - Không dùng object làm `key`

# 12. v-for với Component

## Khái niệm

- Component không tự nhận item
- Phải truyền qua props

## Ví dụ

> 📄 **Code ví dụ:** [`examples/20-vi-du.html`](examples/20-vi-du.html)

# 13. Vue & Array Change Detection

Mục này nói về "từ điển hành động" Vue hiểu được: những method nào gọi là Vue biết ngay có thay đổi.

Vue theo dõi được các method sau:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

> **Tóm gọn 1 câu:** Bảy method mutate ở trên được Vue "làm án"/theo dõi sẵn — gọi là UI cập nhật ngay, không cần làm gì thêm.

# 14. Thay thế mảng (Non-mutating methods)

## Ví dụ

> 📄 **Code ví dụ:** [`examples/21-vi-du.js`](examples/21-vi-du.js)

> 👉 Vue không render lại toàn bộ, mà tái sử dụng DOM thông minh.

# 15. Hiển thị danh sách lọc / sắp xếp

Dùng `computed`

> 📄 **Code ví dụ:** [`examples/22-15-hien-thi-danh-sach-loc-sap-xep.js`](examples/22-15-hien-thi-danh-sach-loc-sap-xep.js)

> 📄 **Code ví dụ:** [`examples/23-15-hien-thi-danh-sach-loc-sap-xep.html`](examples/23-15-hien-thi-danh-sach-loc-sap-xep.html)

⚠️ Cẩn thận với `sort()` & `reverse()`

> 📄 **Code ví dụ:** [`examples/24-15-hien-thi-danh-sach-loc-sap-xep.js`](examples/24-15-hien-thi-danh-sach-loc-sap-xep.js)

# Tóm tắt nhanh (cheat-sheet)

| Trường hợp | Cách làm |
| :--- | :--- |
| **Render list** | `v-for="item in items"` |
| **Dùng index** | `(item, index)` |
| **Object** | `(value, key, index)` |
| **Lọc dữ liệu** | `computed` |
| **Kết hợp v-if** | Dùng `<template>` |
| **Giữ state** | `:key` |
| **Component** | Truyền props |

> **Cách đọc bảng này:** cột trái là việc bạn cần làm, cột phải là cú pháp/kỹ thuật tương ứng. Đây là bảng tra cứu — code đến đâu đối chiếu đến đó, chi tiết thì quay lại section ở trên.

> **Tóm gọn 1 câu:** `v-for` là vòng lặp của template — nhớ "item + index", "key giữ state", "lọc bằng computed" là xử lý được 90% danh sách.

