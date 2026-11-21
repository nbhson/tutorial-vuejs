# Component Events — Sự kiện trong Component (Vue 3)

# 1. Component Events là gì?

Mục này nói về chiều giao tiếp ngược của component: props là cha nói xuống, còn events là con "gọi lên" cha — giống như nhân viên báo cáo sếp chứ không tự ý sửa sổ sách của sếp.

Component Events là cơ chế giúp component con (child) gửi tín hiệu (event) lên component cha (parent) để thông báo rằng một hành động nào đó đã xảy ra (click, submit, thay đổi dữ liệu…).

👉 Mục đích chính:
- Giao tiếp từ con → cha
- Giữ component độc lập, dễ tái sử dụng
- Tránh thao tác trực tiếp dữ liệu của cha

> **Tóm gọn 1 câu:** Event là "cú điện thoại lên trên" — con báo sự việc, cha quyết cách xử lý.

# 2. Emit và lắng nghe sự kiện (Emitting & Listening to Events)

Mục này nói về hai nửa của một cuộc gọi: con phát tín hiệu bằng `$emit()`, cha bắt tín hiệu bằng `@event-name`. Thiếu một trong hai thì đường dây chưa nối.

## 2.1 Emit sự kiện trong component con

Trong template của component con, dùng `$emit()` để phát sự kiện.

**Ví dụ (Component con):**

> 📄 **Code ví dụ:** [`examples/01-2-1-emit-su-kien-trong-component-con.html`](examples/01-2-1-emit-su-kien-trong-component-con.html)

Hoặc emit trong methods:

> 📄 **Code ví dụ:** [`examples/02-2-1-emit-su-kien-trong-component-con.js`](examples/02-2-1-emit-su-kien-trong-component-con.js)

## 2.2 Lắng nghe sự kiện ở component cha

Component cha dùng `v-on` hoặc `@` để lắng nghe.

**Ví dụ (Component cha):**

> 📄 **Code ví dụ:** [`examples/03-2-2-lang-nghe-su-kien-o-component.html`](examples/03-2-2-lang-nghe-su-kien-o-component.html)

> 📄 **Code ví dụ:** [`examples/04-2-2-lang-nghe-su-kien-o-component.js`](examples/04-2-2-lang-nghe-su-kien-o-component.js)

> 📌 **Lưu ý quan trọng**
> - Event emit dạng **camelCase**
> - Khi lắng nghe trong template → **kebab-case**

## 2.3 Modifier .once

Mục này nói về một phụ kiện nhỏ nhưng hữu ích: `.once` làm sự kiện chỉ kêu đúng một tiếng rồi tự ngắt — như chuông cửa chỉ rung lần đầu khách bấm.

Sự kiện chỉ chạy 1 lần duy nhất.

> 📄 **Code ví dụ:** [`examples/05-2-3-modifier-once.html`](examples/05-2-3-modifier-once.html)

> **Tóm gọn 1 câu:** Emit ở con (`$emit('ten')`), nghe ở cha (`@ten`) — nhớ nguyên tắc camelCase khi phát, kebab-case khi nghe.

# 3. Event không bubble (Rất quan trọng)

Mục này nói về một khác biệt then chốt so với DOM: event của Vue không "nổi bọt" lên trên — cha trực tiếp là người duy nhất nghe được, giống như bộ đàm điểm-điểm chứ không phải loa phường.

❌ Component event **KHÔNG bubble** như DOM event
✔ Chỉ component cha trực tiếp mới nghe được

👉 Nếu cần giao tiếp:
- Component anh em
- Component lồng sâu
➡ Dùng state management (Pinia, Vuex) hoặc event bus

> **Tóm gọn 1 câu:** Event không bubble — muốn nói chuyện với người ngoài tầm với (anh em, lồng sâu), phải đổi phương tiện: Pinia hoặc event bus.

# 4. Truyền dữ liệu qua Event (Event Arguments)

Mục này nói về việc gửi kèm "hàng hóa" trong cú điện thoại: emit không chỉ báo sự việc mà còn mang theo dữ liệu cho cha xử lý.

## 4.1 Emit kèm dữ liệu

Bạn có thể gửi dữ liệu khi emit — tham số thứ hai trở đi là hàng hóa bạn giao.

**Ví dụ (Component con):**

> 📄 **Code ví dụ:** [`examples/06-4-1-emit-kem-du-lieu.html`](examples/06-4-1-emit-kem-du-lieu.html)

## 4.2 Nhận dữ liệu ở component cha

**Cách 1: Inline arrow function**
> 📄 **Code ví dụ:** [`examples/07-4-2-nhan-du-lieu-o-component-cha.html`](examples/07-4-2-nhan-du-lieu-o-component-cha.html)

**Cách 2: Method**
> 📄 **Code ví dụ:** [`examples/08-4-2-nhan-du-lieu-o-component-cha.html`](examples/08-4-2-nhan-du-lieu-o-component-cha.html)

> 📄 **Code ví dụ:** [`examples/09-4-2-nhan-du-lieu-o-component-cha.js`](examples/09-4-2-nhan-du-lieu-o-component-cha.js)

> 📌 **Tip**
> `$emit('foo', 1, 2, 3)`
> ➡ listener sẽ nhận đầy đủ tham số (1, 2, 3)

> **Tóm gọn 1 câu:** `$emit('event', payload)` — mọi tham số sau tên event đều được chuyển nguyên xi cho listener ở cha.

# 5. Khai báo sự kiện emit (Declaring Emitted Events)

Mục này nói về "đăng ký kênh phát sóng": khai báo trước component sẽ emit những event nào — như dán danh sách kênh lên cửa hàng để người dùng biết có thể nghe gì.

👉 Vue khuyến nghị luôn khai báo các event mà component có thể emit

## 5.1 Dùng defineEmits() trong script setup

> 📄 **Code ví dụ:** [`examples/10-5-1-dung-defineemits-trong-script-setup.html`](examples/10-5-1-dung-defineemits-trong-script-setup.html)

> 📌 **Lưu ý:**
> - `defineEmits()` chỉ dùng trong `<script setup>`
> - Không đặt trong function

## 5.2 Dùng emits trong Options API

Mục này nói về cách khai báo tương tự cho người dùng Options API — nằm trong tùy chọn `emits` của component.

> 📄 **Code ví dụ:** [`examples/11-5-2-dung-emits-trong-options-api.js`](examples/11-5-2-dung-emits-trong-options-api.js)

Hoặc chỉ khai báo:

> 📄 **Code ví dụ:** [`examples/12-5-2-dung-emits-trong-options-api.js`](examples/12-5-2-dung-emits-trong-options-api.js)

> **Tóm gọn 1 câu:** Khai báo emits là "danh mục kênh" công khai của component — `defineEmits()` cho `<script setup>`, `emits: []` cho Options API.

# 6. Emit + TypeScript (Khai báo kiểu dữ liệu)

Mục này nói về việc gắn "tem kiểm định" lên từng event: TypeScript kiểm tra tên event và payload ngay lúc gõ code, sai là gạch đỏ hiện ra trước cả khi chạy.

## 6.1 Object syntax + validation

> 📄 **Code ví dụ:** [`examples/13-6-1-object-syntax-validation.html`](examples/13-6-1-object-syntax-validation.html)

## 6.2 Khai báo bằng type thuần

Mục này nói về cách khai báo gọn nhất với TypeScript: một union các call signature, mỗi event một kiểu payload riêng.

> 📄 **Code ví dụ:** [`examples/14-6-2-khai-bao-bang-type-thuan.html`](examples/14-6-2-khai-bao-bang-type-thuan.html)

> **Tóm gọn 1 câu:** Type-only emits là "hợp đồng có công chứng": tên event sai hay payload sai kiểu, TypeScript gạch đỏ ngay.

# 7. Validation cho Event

Mục này nói về lớp kiểm tra lúc chạy: giống như validate props, bạn có thể chặn và soi từng lần emit để cảnh báo khi dữ liệu không đạt.

Giống như validate props, bạn có thể kiểm tra dữ liệu emit.

**Ví dụ:**

> 📄 **Code ví dụ:** [`examples/15-7-validation-cho-event.html`](examples/15-7-validation-cho-event.html)

> 📌 Nếu validation trả về false → Vue cảnh báo

# 8. Lợi ích khi khai báo emits

Mục này tổng hợp ba lợi ích khi kiên nhẫn khai báo emits — lý do để biến nó thành thói quen chứ không phải thủ tục hình thức.

✔ Document rõ ràng component
✔ Tránh lỗi khi listener bị rơi vào DOM event
✔ Vue loại bỏ event khỏi fallthrough attributes

> ⚠️ **Lưu ý đặc biệt**
> Nếu bạn khai báo:
> `emits: ['click']`
> ➡ `@click` chỉ lắng nghe event emit, KHÔNG bắt DOM click nữa

# 9. Tóm tắt nhanh (Cheat Sheet)

Mục này gom cả bài vào một bảng tra nhanh cho lúc cần nhớ gấp.

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Emit event** | `$emit('eventName', data)` |
| **Lắng nghe** | `@event-name="handler"` |
| **Case** | Emit camelCase → Listen kebab-case |
| **Truyền dữ liệu** | `$emit('event', payload)` |
| **Khai báo event** | `defineEmits()` hoặc `emits` |
| **Event bubble** | ❌ Không bubble |
| **Validate** | Dùng object syntax |

> **Cách đọc bảng này:** cột trái là việc bạn cần làm, cột phải là cú pháp hoặc quy tắc tương ứng — dò theo hàng ngang, hàng nào đang quên thì lật lại section bên trên.

> **Tóm gọn 1 câu:** Emit là "điện thoại con gọi cha" — phát camelCase, nghe kebab-case, khai báo trước, dữ liệu kèm theo, và đừng mong nó bubble.