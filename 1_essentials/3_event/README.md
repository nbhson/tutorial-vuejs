Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài Event Handling (Xử lý sự kiện) trong Vue 3, kèm ví dụ minh họa cho từng phần, đúng theo nội dung trang bạn đang xem.

# 1. Event Handling là gì?

Mục này mở bài: mọi cú click, gõ phím, kéo scroll của người dùng đều phải đi qua "cửa tiếp tân" của Vue — `v-on`.

Event Handling là cách Vue lắng nghe và xử lý các sự kiện DOM (click, submit, keyup, scroll, …) do người dùng hoặc trình duyệt tạo ra.

Ví von: `v-on` giống như **gắn chuông cửa** — ai bấm (sự kiện xảy ra), chuông reo (hàm của bạn chạy). Không gắn chuông thì khách bấm mãi cũng không ai hay.

👉 Vue dùng directive `v-on` (viết tắt là `@`) để bắt sự kiện.

**Cú pháp chung:**

> 📄 **Code ví dụ:** [`examples/01-1-event-handling-la-gi.html`](examples/01-1-event-handling-la-gi.html)

# 2. Lắng nghe sự kiện (Listening to Events)

Ví dụ cơ bản:

> 📄 **Code ví dụ:** [`examples/02-2-lang-nghe-su-kien-listening-to-events.html`](examples/02-2-lang-nghe-su-kien-listening-to-events.html)

> 📌 Khi người dùng click vào button → hàm `doSomething` được gọi.

# 3. Inline Handlers (Xử lý trực tiếp trong template)

## Khái niệm

- Viết JavaScript trực tiếp ngay trong template
- Dùng cho logic đơn giản

## Ví dụ

> 📄 **Code ví dụ:** [`examples/03-vi-du.html`](examples/03-vi-du.html)

> 📌 Mỗi lần click → `count` tăng lên → UI tự động cập nhật.

# 4. Method Handlers (Gọi hàm)

## Khái niệm

- Logic phức tạp → viết trong script
- Template chỉ gọi tên hàm

## Ví dụ (Composition API)

> 📄 **Code ví dụ:** [`examples/04-vi-du-composition-api.html`](examples/04-vi-du-composition-api.html)

> 📌 Vue tự động truyền DOM Event vào hàm.

# 5. Phân biệt Inline vs Method

Mục này nói về cách Vue tự "đọc vị" handler của bạn: viết kiểu nào là inline, kiểu nào là method — không cần khai báo gì thêm.

Vue tự nhận diện:

| Kiểu viết | Loại |
| :--- | :--- |
| `greet` | **Method** |
| `count++` | **Inline** |
| `say('hi')` | **Inline** |
| `foo.bar` | **Method** |

> **Cách đọc bảng này:** mỗi dòng một cách viết, cột phải là cách Vue hiểu. Quy tắc chung: **chỉ là tên** (dẫn tới hàm) → method; **có cú pháp tính toán hay gọi hàm kèm ngoặc** → inline.

# 6. Gọi method + truyền tham số

## Ví dụ

> 📄 **Code ví dụ:** [`examples/05-vi-du.html`](examples/05-vi-du.html)

> 📌 Khi cần truyền dữ liệu → phải gọi hàm trong inline handler.

# 7. Truy cập DOM Event trong Inline Handler

Cách 1: dùng `$event`

> 📄 **Code ví dụ:** [`examples/06-7-truy-cap-dom-event-trong-inline-handler.html`](examples/06-7-truy-cap-dom-event-trong-inline-handler.html)

Cách 2: arrow function

> 📄 **Code ví dụ:** [`examples/07-7-truy-cap-dom-event-trong-inline-handler.html`](examples/07-7-truy-cap-dom-event-trong-inline-handler.html)

> 📄 **Code ví dụ:** [`examples/08-7-truy-cap-dom-event-trong-inline-handler.js`](examples/08-7-truy-cap-dom-event-trong-inline-handler.js)

# 8. Event Modifiers (Bộ sửa đổi sự kiện)

Mục này nói về "nút bấm gọn" cho những đoạn code xử lý sự kiện lặp đi lặp lại — thay vì viết tay `event.preventDefault()` khắp nơi.

Giúp giảm code DOM trong JS.

Các modifier phổ biến:

| Modifier | Ý nghĩa |
| :--- | :--- |
| `.stop` | `stopPropagation` |
| `.prevent` | `preventDefault` |
| `.self` | chỉ trigger khi click đúng element |
| `.once` | chỉ chạy 1 lần |
| `.capture` | capture mode |
| `.passive` | tối ưu scroll |

> **Cách đọc bảng này:** mỗi dòng một modifier, cột phải là công việc DOM thuần mà nó thay thế. Cần xử lý gì thì tìm hàng tương ứng, gắn vào sau `@click.` là xong.

## Ví dụ

> 📄 **Code ví dụ:** [`examples/09-vi-du.html`](examples/09-vi-du.html)

> 📌 Thứ tự modifier rất quan trọng
>
> `@click.prevent.self` ≠ `@click.self.prevent`

# 9. Key Modifiers (Phím bàn phím)

Mục này nói về cách "bắn tên phím" thẳng vào template: chỉ chạy handler khi người dùng bấm đúng phím mình cần.

## Ví dụ

> 📄 **Code ví dụ:** [`examples/10-vi-du.html`](examples/10-vi-du.html)

> 📌 Vue kiểm tra `event.key`.

## Key aliases

- `.enter`
- `.esc`
- `.tab`
- `.space`
- `.up`, `.down`, `.left`, `.right`
- `.delete` (Delete + Backspace)

> **Tóm gọn 1 câu:** Key modifier là "chốt cửa theo đúng chiếc chìa" — `@keyup.enter` nghĩa là chỉ mở cửa khi khách bấm đúng phím Enter.

# 10. System Modifier Keys (Ctrl, Alt, Shift, Meta)

> 📄 **Code ví dụ:** [`examples/11-10-system-modifier-keys-ctrl-alt-shift-meta.html`](examples/11-10-system-modifier-keys-ctrl-alt-shift-meta.html)

> 📌 meta:
>
> - macOS: ⌘
> - Windows: ⊞

# 11. .exact Modifier

Kiểm soát chính xác tổ hợp phím

> 📄 **Code ví dụ:** [`examples/12-11-exact-modifier.html`](examples/12-11-exact-modifier.html)

# 12. Mouse Button Modifiers

| Modifier | Chuột |
| :--- | :--- |
| `.left` | nút chính |
| `.right` | chuột phải |
| `.middle` | nút giữa |

> **Cách đọc bảng này:** ba dòng ứng với ba nút chuột, cột phải cho biết modifier nào "bắt" nút nào — ví dụ `.right` chỉ chạy handler cho chuột phải (menu chuột phải, copy-via-menu...).

> 📄 **Code ví dụ:** [`examples/13-12-mouse-button-modifiers.html`](examples/13-12-mouse-button-modifiers.html)

> 📌 Không phụ thuộc chuột thuận tay trái/phải.

> **Tóm gọn 1 câu:** Mouse modifier giúp chia handler theo từng nút chuột — `.left`, `.right`, `.middle` — không cần if kiểm tra `event.button` trong code.