# Component Registration (Đăng ký Component)

Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Component Registration trong Vue 3, kèm ví dụ minh họa cho từng phần.

## 1. Component Registration là gì?

Mục này mở bài bằng khái niệm "đăng ký": code component viết xong chưa ai biết đến, phải khai báo với Vue thì thẻ mới render được.

Trong Vue, component phải được “đăng ký” (register) thì Vue mới biết:
-   Component đó nằm ở đâu.
-   Khi gặp thẻ `<MyComponent />` trong template thì phải render gì.

Ví von: giống như **đăng ký tạm trú** — người (component) có thể đã ở trong thành phố (dự án) rồi, nhưng chưa khai báo với chính quyền (Vue) thì mọi thủ tục dùng nó đều không hợp lệ.

👉 Có 2 cách đăng ký component:
1.  **Global Registration** (Đăng ký toàn cục)
2.  **Local Registration** (Đăng ký cục bộ)

---

## 2. Global Registration (Đăng ký toàn cục)

Mục này nói về cách đăng ký "một lần, dùng mãi": tiện nhưng có cái giá về hiệu năng và quản lý code.

### 2.1. Khái niệm
Component được đăng ký dùng được ở mọi component trong cùng một app, kể cả component con, cháu, chắt…

### 2.2. Cách đăng ký Global

**Ví dụ 1: Đăng ký component đơn giản**
> 📄 **Code ví dụ:** [`examples/01-2-2-cach-ang-ky-global.js`](examples/01-2-2-cach-ang-ky-global.js)

**Ví dụ 2: Đăng ký component từ file .vue**
> 📄 **Code ví dụ:** [`examples/02-2-2-cach-ang-ky-global.js`](examples/02-2-2-cach-ang-ky-global.js)

**Ví dụ 3: Chain nhiều component**
> 📄 **Code ví dụ:** [`examples/03-2-2-cach-ang-ky-global.js`](examples/03-2-2-cach-ang-ky-global.js)

### 2.3. Sử dụng component global trong template
> 📄 **Code ví dụ:** [`examples/04-2-3-su-dung-component-global-trong-template.html`](examples/04-2-3-su-dung-component-global-trong-template.html)
👉 Các component này có thể dùng ở bất kỳ đâu trong app.

### 2.4. Nhược điểm của Global Registration ❌
-   **Không tree-shaking:** Dù không dùng component → vẫn bị build vào bundle.
-   **Khó quản lý dependency:** Không biết component này đến từ đâu.
-   **App lớn:** Sẽ rất khó bảo trì.

---

## 3. Local Registration (Đăng ký cục bộ)

Mục này nói về cách đăng ký "cửa hàng ủy nhiệm": import ở đâu, dùng ở đó — và vì sao Vue khuyến khích cách này.

### 3.1. Khái niệm
-   Component chỉ dùng được trong component hiện tại.
-   Rõ ràng dependency.
-   Tree-shaking tốt.

👉 Vue khuyến khích dùng **Local Registration** cho app vừa & lớn.

### 3.2. Local Registration với `<script setup>` (Vue 3 – khuyên dùng)
> 📄 **Code ví dụ:** [`examples/05-3-2-local-registration-voi-script-setup-vue.html`](examples/05-3-2-local-registration-voi-script-setup-vue.html)
👉 Không cần `components: {}`, chỉ cần import là dùng được.

### 3.3. Local Registration không dùng `<script setup>`
> 📄 **Code ví dụ:** [`examples/06-3-3-local-registration-khong-dung-script-setup.js`](examples/06-3-3-local-registration-khong-dung-script-setup.js)
**Template:**
> 📄 **Code ví dụ:** [`examples/07-3-3-local-registration-khong-dung-script-setup.html`](examples/07-3-3-local-registration-khong-dung-script-setup.html)

### 3.4. Cách hoạt động của components
> 📄 **Code ví dụ:** [`examples/08-3-4-cach-hoat-ong-cua-components.js`](examples/08-3-4-cach-hoat-ong-cua-components.js)
👉 Đây là dạng đầy đủ. Thường dùng ES6 shorthand: `components: { ComponentA }`.

### 3.5. Lưu ý quan trọng ⚠️
Component đăng ký local **KHÔNG** dùng được cho component con.
-   Ví dụ: `Parent.vue` đăng ký `ComponentA` thì `Child.vue` **KHÔNG** dùng được `ComponentA`.
👉 Muốn dùng → phải import lại trong `Child.vue`.

Ví von: local registration giống như **thẻ nhân viên nội bộ của từng chi nhánh** — thẻ chi nhánh A không quét cửa được chi nhánh B, dù cùng công ty.

---

## 4. Component Name Casing (Quy tắc đặt tên component)

Mục này nói về chuyện viết hoa hay viết thường tên component — và ngoại lệ "không rủi ro được" của in-DOM template.

### 4.1. Vì sao dùng PascalCase?
Ví dụ: `MyComponent`, `UserProfile`, `BaseButton`.

**Lý do:**
-   Là identifier hợp lệ trong JavaScript.
-   IDE auto-complete tốt.
-   Dễ phân biệt với HTML tag.

### 4.2. Dùng PascalCase hay kebab-case trong template?
Vue hỗ trợ cả 2:
-   Component đăng ký: `MyComponent`.
-   Trong template có thể dùng: `<MyComponent />` hoặc `<my-component />`.

👉 Vue tự map **kebab-case ↔ PascalCase**.

### 4.3. Lưu ý với in-DOM templates
HTML không hỗ trợ PascalCase. Khi viết template trực tiếp trong HTML (không qua bước compile của Vue):
-   Dùng: `<my-component></my-component>`.
-   ❌ `<MyComponent>` sẽ không chạy.

---

## 5. Khi nào dùng Global vs Local?

Bảng này là "bản án cuối cùng" sau hai section so sánh — tra để quyết định cách đăng ký cho từng loại component.

| **Global Registration** (nên dùng khi) | **Local Registration** (khuyên dùng) |
| :--- | :--- |
| Base component (Button, Icon, Modal…) | Component dùng riêng cho 1 page |
| Component dùng ở rất nhiều nơi | Component business logic |
| Tên rõ ràng, ít thay đổi | App vừa và lớn |

> **Cách đọc bảng này:** so sánh theo hàng ngang — hàng nào mô tả đúng component của bạn thì chọn cách đăng ký ở cột đó. Cột phải là lựa chọn mặc định nếu còn phân vân.

---

## 6. Tóm tắt nhanh (cheat sheet)

| Tiêu chí | Global | Local |
| :--- | :--- | :--- |
| **Phạm vi** | Toàn app | Component hiện tại |
| **Tree-shaking** | ❌ Không | ✅ Có |
| **Quản lý** | Khó | Rõ ràng |
| **Vue 3 khuyên dùng** | ❌ | ✅ |

> **Cách đọc bảng này:** mỗi hàng một tiêu chí chấm điểm hai cách đăng ký. Hàng cuối là "phán quyết" của Vue 3 — trừ base component dùng mọi nơi, mặc định chọn Local.

> **Tóm gọn 1 câu:** Đăng ký global là "quốc tịch" (dùng cả nước nhưng khó khai trừ), đăng ký local là "thẻ nội bộ từng chi nhánh" (rõ ràng, gọn bundle) — Vue 3 mặc định khuyên dùng local.