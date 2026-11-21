# Side Effects & Re-rendering Detail

Câu hỏi này rất hay 👍 và chạm đúng cơ chế cốt lõi của Vue. Mình trả lời chính xác + rõ ràng, không mơ hồ.

---

## 1. Không có `v-once` → function CÓ được gọi lại không?

Mục này trả lời câu hỏi mở bài: function viết trong template có bị gọi lại mỗi lần component re-render không — và câu trả lời ngắn gọn là CÓ.

### 👉 CÓ. Chắc chắn có.

Với code của bạn:
> 📄 **Code ví dụ:** [`examples/01-co-chac-chan-co.html`](examples/01-co-chac-chan-co.html)

**Mỗi lần component re-render:**
- `changeContent()` **SẼ ĐƯỢC GỌI LẠI**.
- Kể cả khi:
  - `number` thay đổi.
  - `content` thay đổi.
  - Hoặc bất kỳ reactive state nào trong component thay đổi.

### Ví dụ rõ ràng
> 📄 **Code ví dụ:** [`examples/02-vi-du-ro-rang.js`](examples/02-vi-du-ro-rang.js)

> 👉 **Khi bạn chạy:**
> ```javascript
> this.number++
> ```
>
> **Console sẽ in:**
> ```text
> changeContent called
> ```
>
> ➡️ **Kết luận:** Dù `content` **KHÔNG** đổi, function vẫn chạy lại.

---

## 2. Vậy UI có render lại toàn bộ không?

Mục này nói về chuyện "Vue có vẽ lại cả trang không" — câu trả lời là không, và cơ chế diff phía dưới chính là lý do Vue nhanh.

### 👉 KHÔNG render lại toàn bộ DOM thật

Ví von: Vue vẽ lại giống **thợ sửa nhà giỏi** chứ không phải đập đi xây lại — thợ không phá cả căn nhà, mà so bản thiết kế cũ/mới rồi chỉ đụng đúng bức tường bị thay đổi.

**Vue KHÔNG:**
- Xóa hết DOM.
- Tạo lại toàn bộ HTML.

**Vue làm gì?**
1. Re-run render function.
2. Tạo Virtual DOM mới.
3. So sánh với Virtual DOM cũ (diff).
4. Chỉ cập nhật phần DOM thật bị thay đổi (patch).

> **Tóm gọn 1 câu:** Vue "vẽ lại bản thiết kế" toàn bộ, nhưng "sửa nhà" chỉ đúng chỗ bị thay đổi.

---

## 3. Cụ thể với ví dụ của bạn

### Trường hợp 1: `number` thay đổi
> 📄 **Code ví dụ:** [`examples/03-truong-hop-1-number-thay-oi.js`](examples/03-truong-hop-1-number-thay-oi.js)

**Điều xảy ra:**
1. Component re-render.
2. `changeContent()` → được gọi lại.
3. Vue diff DOM.
4. **DOM thật được cập nhật:**
   - `<p>{{number}}</p>`   ✅ thay đổi (DOM update).
   - `<p>...</p>`          ❌ KHÔNG thay đổi.

> ➡️ Chỉ thẻ `<p>` chứa `number` được update trong DOM.

### Trường hợp 2: `content` thay đổi
> 📄 **Code ví dụ:** [`examples/04-truong-hop-2-content-thay-oi.js`](examples/04-truong-hop-2-content-thay-oi.js)

**Kết quả:**
1. Component re-render.
2. `changeContent()` → được gọi lại.
3. **DOM update ở:**
   - `<p>{{ content }} - ...</p>`

### Trường hợp 3: State KHÔNG liên quan thay đổi
> 📄 **Code ví dụ:** [`examples/05-truong-hop-3-state-khong-lien-quan-thay.js`](examples/05-truong-hop-3-state-khong-lien-quan-thay.js)

> 👉 **Kết quả:**
> 1. Component re-render.
> 2. `changeContent()` → **VẪN ĐƯỢC GỌI**.
> 3. **DOM thật:**
>    - KHÔNG có node nào đổi.
>    - Nhưng render cycle vẫn chạy.

---

## 4. Kết luận cực kỳ quan trọng

> ❗ **Vue re-render component, không re-render toàn bộ DOM.**

| Cấp độ | Có xảy ra? |
| :--- | :---: |
| Gọi lại function trong template | ✅ |
| Chạy lại render function | ✅ |
| Tạo Virtual DOM mới | ✅ |
| Update DOM thật toàn bộ | ❌ |
| Update DOM node có thay đổi | ✅ |

> **Cách đọc bảng này:** mỗi dòng là một "cấp độ" của quá trình re-render, cột phải cho biết việc đó có diễn ra hay không. Đọc từ trên xuống để thấy: mấy việc "giấy tờ" (function, render, diff) đều chạy đủ, chỉ có "xây lại nhà" (DOM thật toàn bộ) là bị bỏ qua.

---

## 5. Vì sao KHÔNG nên gọi function trực tiếp trong template?

Mục này nói về hậu quả của kết luận ở mục 1: vì function bị gọi lại liên tục, nên chỉ những việc rẻ, không gây tác dụng phụ mới nên để trong template.

### ❌ Tệ:
> 📄 **Code ví dụ:** [`examples/06-te.html`](examples/06-te.html)

**Vì:**
- Bị gọi lại **mỗi lần** render.
- Dễ gây lag nếu function xử lý nặng.
- Dễ gây **side-effect** không mong muốn.

### ✅ Cách tốt hơn: `computed`
> 📄 **Code ví dụ:** [`examples/07-cach-tot-hon-computed.js`](examples/07-cach-tot-hon-computed.js)

> 📄 **Code ví dụ:** [`examples/08-cach-tot-hon-computed.html`](examples/08-cach-tot-hon-computed.html)

> 👉 **Lợi ích của `computed`:**
> - Chỉ chạy lại khi **dependency** thay đổi.
> - Có cơ chế **caching**.
> - Tối ưu **performance**.

> **Tóm gọn 1 câu:** Function trong template là "nhân viên thời vụ bị gọi mỗi lượt render" — chuyển sang `computed` để nó chỉ làm việc khi thật sự có việc.

---

## 6. Tóm tắt 1 câu để nhớ

> ❗ **Vue luôn re-render component khi state đổi, gọi lại toàn bộ expression trong template, nhưng chỉ update DOM node bị thay đổi.**

> **Tóm gọn 1 câu:** Re-render là chuyện của component (luôn xảy ra), re-paint là chuyện của DOM (chỉ chỗ đổi) — phân biệt được hai chữ này là hiểu hết bài.