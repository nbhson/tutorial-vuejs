Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Components Basics (Vue 3), kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang bạn đang xem.

# 1. Component là gì? Tại sao cần Component?

Mục này mở bài bằng cách trả lời câu hỏi "sao phải chia nhỏ giao diện ra làm component?" trước khi đi vào cú pháp.

## Khái niệm

- Component là các khối UI độc lập, có thể tái sử dụng.
- Ứng dụng Vue thường được tổ chức theo cây component (component tree).

Ví von: component giống như **bộ đồ ăn lego** — mỗi khối lắp được nhiều lần ở nhiều nơi, và cả mô hình (app) được ghép từ các khối nhỏ ấy thay vì đúc nguyên khối.

Mỗi component:
- Có template (HTML)
- Có logic (JS)
- Có style (CSS) (tuỳ chọn)

👉 Giống HTML nhưng component có logic riêng, không chỉ là thẻ tĩnh.

> **Tóm gọn 1 câu:** Component là "khối lego của giao diện" — một khối gồm HTML + JS + CSS, dùng đi dùng lại mà không phải viết lại.

# 2. Defining a Component (Định nghĩa Component)

## 2.1. Dùng Single File Component (SFC – .vue) (phổ biến nhất)

### Options API

> 📄 **Code ví dụ:** [`examples/01-options-api.html`](examples/01-options-api.html)

### Composition API (`<script setup>`)

> 📄 **Code ví dụ:** [`examples/02-composition-api-script-setup.html`](examples/02-composition-api-script-setup.html)

> 📌 Khuyến nghị Vue 3: dùng `<script setup>` vì:
>
> - Gọn hơn
> - Ít boilerplate
> - Hiệu năng tốt hơn

## 2.2. Không dùng build step (Component dạng object JS)

> 📄 **Code ví dụ:** [`examples/03-2-2-khong-dung-build-step-component-dang.js`](examples/03-2-2-khong-dung-build-step-component-dang.js)

👉 Cách này ít dùng trong dự án lớn.

# 3. Using a Component (Sử dụng Component)

## 3.1. Import và đăng ký component (Options API)

> 📄 **Code ví dụ:** [`examples/04-3-1-import-va-ang-ky-component-options.html`](examples/04-3-1-import-va-ang-ky-component-options.html)

## 3.2. Với `<script setup>` (tự động đăng ký)

> 📄 **Code ví dụ:** [`examples/05-3-2-voi-script-setup-tu-ong-ang.html`](examples/05-3-2-voi-script-setup-tu-ong-ang.html)

> 📌 Không cần `components: {}` nữa.

## 3.3. Tái sử dụng component

Mục này nói về một hành vi quan trọng: mỗi lần bạn xài lại component, Vue tạo ra một bản sao riêng biệt.

> 📄 **Code ví dụ:** [`examples/06-3-3-tai-su-dung-component.html`](examples/06-3-3-tai-su-dung-component.html)

➡️ Mỗi lần dùng = 1 instance riêng
➡️ State KHÔNG dùng chung

Ví von: giống như **in nhiều bản photo cùng một tờ khai** — mỗi tờ tự điền số liệu riêng, sửa tờ này không ảnh hưởng tờ kia.

# 4. Quy tắc đặt tên Component

**Trong SFC (khuyến nghị)**

> 📄 **Code ví dụ:** [`examples/07-4-quy-tac-at-ten-component.html`](examples/07-4-quy-tac-at-ten-component.html)

- Dùng **PascalCase**

**Trong DOM template (HTML thuần)**

> 📄 **Code ví dụ:** [`examples/08-4-quy-tac-at-ten-component.html`](examples/08-4-quy-tac-at-ten-component.html)

- Bắt buộc **kebab-case**
- Phải có thẻ đóng

# 5. Passing Props (Truyền dữ liệu từ cha → con)

## 5.1. Props là gì?

Mục này nói về "đường ống" dữ liệu chính của Vue: cách cha đưa đồ xuống cho con.

- Props là thuộc tính tùy chỉnh
- Dùng để truyền dữ liệu từ component cha xuống component con

Ví von: props giống như **quyết định của cha** — cha đưa món gì, con nhận món đó, con không tự sửa món đã nhận.

## 5.2. Khai báo props

**Options API**

> 📄 **Code ví dụ:** [`examples/09-5-2-khai-bao-props.html`](examples/09-5-2-khai-bao-props.html)

**`<script setup>`**

> 📄 **Code ví dụ:** [`examples/10-5-2-khai-bao-props.html`](examples/10-5-2-khai-bao-props.html)

## 5.3. Truyền props từ component cha

> 📄 **Code ví dụ:** [`examples/11-5-3-truyen-props-tu-component-cha.html`](examples/11-5-3-truyen-props-tu-component-cha.html)

## 5.4. Props động với v-bind

> 📄 **Code ví dụ:** [`examples/12-5-4-props-ong-voi-v-bind.html`](examples/12-5-4-props-ong-voi-v-bind.html)

> 📌 Dùng khi dữ liệu thay đổi theo state.

## 5.5. Props + v-for

> 📄 **Code ví dụ:** [`examples/13-5-5-props-v-for.html`](examples/13-5-5-props-v-for.html)

# 6. Listening to Events (Giao tiếp con → cha)

Mục này nói về chiều dữ liệu ngược lại: khi component con cần "báo cáo ngược" cho cha.

## 6.1. Vấn đề

- Props chỉ cha → con
- Muốn con báo ngược lại cho cha → dùng Custom Events

Nếu props là "cha dặn con", thì event là **con gọi điện về báo cha**: "dượng ơi, khách vừa bấm nút xóa đấy, ơi là ơ!" — cha nhận tin rồi tự quyết định xử lý thế nào.

## 6.2. Emit event từ component con

> 📄 **Code ví dụ:** [`examples/14-6-2-emit-event-tu-component-con.html`](examples/14-6-2-emit-event-tu-component-con.html)

## 6.3. Cha lắng nghe event

> 📄 **Code ví dụ:** [`examples/15-6-3-cha-lang-nghe-event.html`](examples/15-6-3-cha-lang-nghe-event.html)

## 6.4. Khai báo emits (khuyến nghị)

**`<script setup>`**

> 📄 **Code ví dụ:** [`examples/16-6-4-khai-bao-emits-khuyen-nghi.html`](examples/16-6-4-khai-bao-emits-khuyen-nghi.html)

**Options API**

> 📄 **Code ví dụ:** [`examples/17-6-4-khai-bao-emits-khuyen-nghi.js`](examples/17-6-4-khai-bao-emits-khuyen-nghi.js)

> 📌 Lợi ích:
>
> - Document rõ event
> - Validate event
> - Tránh lỗi không mong muốn

# 7. Slots (Truyền nội dung HTML)

Mục này nói về cách truyền nguyên một mảnh giao diện (chứ không chỉ dữ liệu) từ cha vào con.

## 7.1. Slot là gì?

- Cho phép truyền nội dung HTML từ cha vào con
- Giống `children` trong React

Ví von: component con là **một cái khung tranh** — khung do con làm, còn bức tranh (nội dung HTML) do cha đưa vào qua `<slot />`.

## 7.2. Sử dụng slot

**Component cha**

> 📄 **Code ví dụ:** [`examples/18-7-2-su-dung-slot.html`](examples/18-7-2-su-dung-slot.html)

**Component con**

> 📄 **Code ví dụ:** [`examples/19-7-2-su-dung-slot.html`](examples/19-7-2-su-dung-slot.html)

> 📌 `<slot />` = vị trí nội dung được chèn vào

# 8. Dynamic Components (Component động)

## 8.1. Khi nào dùng?

- Tab
- Switch view
- Wizard step

## 8.2. Cú pháp

> 📄 **Code ví dụ:** [`examples/20-8-2-cu-phap.html`](examples/20-8-2-cu-phap.html)

Hoặc:

> 📄 **Code ví dụ:** [`examples/21-8-2-cu-phap.html`](examples/21-8-2-cu-phap.html)

> 📌 `:is` có thể là:
>
> - Tên component
> - Hoặc object component import vào

# 9. In-DOM Template Parsing Caveats (Lưu ý khi viết template trong HTML)

## 9.1. Case-insensitive

❌ Sai:

> 📄 **Code ví dụ:** [`examples/22-9-1-case-insensitive.html`](examples/22-9-1-case-insensitive.html)

✅ Đúng:

> 📄 **Code ví dụ:** [`examples/23-9-1-case-insensitive.html`](examples/23-9-1-case-insensitive.html)

## 9.2. Không dùng self-closing

❌ Sai:

> 📄 **Code ví dụ:** [`examples/24-9-2-khong-dung-self-closing.html`](examples/24-9-2-khong-dung-self-closing.html)

✅ Đúng:

> 📄 **Code ví dụ:** [`examples/25-9-2-khong-dung-self-closing.html`](examples/25-9-2-khong-dung-self-closing.html)

## 9.3. Giới hạn vị trí thẻ (table, ul, select...)

❌ Sai:

> 📄 **Code ví dụ:** [`examples/26-9-3-gioi-han-vi-tri-the-table.html`](examples/26-9-3-gioi-han-vi-tri-the-table.html)

✅ Đúng:

> 📄 **Code ví dụ:** [`examples/27-9-3-gioi-han-vi-tri-the-table.html`](examples/27-9-3-gioi-han-vi-tri-the-table.html)

## 10 Tổng kết ngắn gọn (rất dễ nhớ)

- `computed` → Tính toán

- `watch` → Theo dõi thay đổi

- `watchEffect` → Theo dõi tự động

- `onMounted` → Bắt đầu

- `onUnmounted` → Dọn dẹp

> 💡 Lifecycle quyết định THỜI ĐIỂM
> 💡 computed / watch quyết định PHẢN ỨNG

# 11. Tổng kết nhanh

| Chủ đề | Ý chính |
| :--- | :--- |
| **Component** | Khối UI tái sử dụng |
| **Props** | Truyền dữ liệu cha → con |
| **Events** | Con → cha |
| **Slot** | Truyền nội dung HTML |
| **Dynamic component** | Component thay đổi theo state |
| **script setup** | Cách viết gọn & hiện đại |

> **Cách đọc bảng này:** mỗi dòng là một chủ đề của bài, cột phải là "một cụm từ nhớ" cho chủ đề đó. Đọc từ trên xuống theo đúng trình tự bài học — nếu cột phải nào bạn còn mơ hồ thì quay lại section tương ứng.

> **Tóm gọn 1 câu:** Component app = lego (component) + đường ống (props xuống, events lên, slot chở HTML) + cầu chì (`:is` đổi component theo state).