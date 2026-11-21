# Luồng Dữ liệu v-model qua Nhiều Cấp Component

Bài này giải thích từ dễ đến đúng bản chất, kèm ví dụ luồng **Parent → Child → Child 1.1** để bạn thấy rõ cách dữ liệu di chuyển — hình dung như một chuỗi người đưa thư: tin nhắn đi qua từng cấp nhưng không ai sửa nội dung giữa đường.

## 1. Trường hợp: Parent → Child → Child 1.1

Mục này dựng lên tình huống kinh điển: dữ liệu nằm ở tầng trên cùng, người thao tác lại ở tầng dưới cùng, ở giữa là các component "chỉ đi đường".

Giả sử cấu trúc component:
```text
Parent
 └─ Child1
     └─ Child1_1
```

**Mục tiêu:**
- 👉 Parent giữ dữ liệu gốc.
- 👉 Child1_1 thực hiện thay đổi dữ liệu.
- 👉 Parent tự động nhận giá trị mới cập nhật.

### ❌ Cách SAI (không nên dùng)
- ❌ Child 1.1 tự sửa state của parent trực tiếp.
- ❌ Truyền props xuyên nhiều tầng và cố gắng sửa chúng.

> [!IMPORTANT]
> Vue **KHÔNG** cho phép component con sửa trực tiếp props nhận từ cha.

### ✅ Cách ĐÚNG & PHỔ BIẾN NHẤT: "Forward v-model"
- Parent giữ **state**.
- Các component trung gian chỉ đóng vai trò **chuyển tiếp (forward)** `v-model`.

---

#### 1️⃣ Parent.vue (Nguồn dữ liệu)

> 📄 **Code ví dụ:** [`examples/01-1-parent-vue-nguon-du-lieu.html`](examples/01-1-parent-vue-nguon-du-lieu.html)

#### 2️⃣ Child1.vue (Component trung gian)

👉 **KHÔNG** tạo state mới.
👉 Chỉ forward `v-model` xuống child 1.1.

> 📄 **Code ví dụ:** [`examples/02-2-child1-vue-component-trung-gian.html`](examples/02-2-child1-vue-component-trung-gian.html)

📌 **Điểm quan trọng:**
- `defineModel()` tạo ra một ref liên kết trực tiếp với `v-model` của parent.
- `Child1` hoàn toàn không giữ bản sao dữ liệu riêng.

> **Tóm gọn 1 câu:** Component trung gian chỉ là "trạm chuyển tiếp" — cầm đường đi, không giữ hành lý riêng.

#### 3️⃣ Child1_1.vue (Component thao tác dữ liệu)

> 📄 **Code ví dụ:** [`examples/03-3-child1-1-vue-component-thao-tac-du.html`](examples/03-3-child1-1-vue-component-thao-tac-du.html)

---

## 2. Luồng dữ liệu (Cực kỳ quan trọng)

Mục này theo chân một cú thay đổi đi hết vòng đời của nó — từ dưới lên trên rồi phản chiếu xuống lại, như gõ vào mép một sợi dây dây chuyền.

Sơ đồ di chuyển:
```text
Parent (count)
   ↑       ↓
Child1 (model)
   ↑       ↓
Child1_1 (model)
```

1. **Child1_1** thay đổi `model.value`.
2. Vue tự động phát (emit) event ngược lên.
3. **Parent** nhận được tín hiệu và cập nhật biến `count`.
4. Toàn bộ UI trong chuỗi component re-render để hiển thị giá trị mới.

👉 **Lợi ích:** Không cần viết `emit` thủ công ở từng cấp.

> **Tóm gọn 1 câu:** Con dưới nhất đổi giá trị → tín hiệu tự "leo" ngược từng cấp lên parent — bạn không phải gác lại một emit nào trên đường.

---

## 3. Nhiều v-model qua nhiều cấp

Mục này chứng minh cơ chế trên không chỉ chạy với một model: bao nhiêu `v-model` cũng được forward ngang qua các cấp trung gian như nhau.

Ví dụ truyền cả `name` và `age`:

**Parent:**
> 📄 **Code ví dụ:** [`examples/04-3-nhieu-v-model-qua-nhieu-cap.html`](examples/04-3-nhieu-v-model-qua-nhieu-cap.html)

**Child1:**
> 📄 **Code ví dụ:** [`examples/05-3-nhieu-v-model-qua-nhieu-cap.html`](examples/05-3-nhieu-v-model-qua-nhieu-cap.html)

**Child1_1:**
> 📄 **Code ví dụ:** [`examples/06-3-nhieu-v-model-qua-nhieu-cap.html`](examples/06-3-nhieu-v-model-qua-nhieu-cap.html)

> **Tóm gọn 1 câu:** Forward bao nhiêu model cũng được — mỗi model một đường riêng, các cấp trung gian cứ "đi tiếp" như tuyến buýt.

---

## 4. Khi nào KHÔNG nên forward v-model?

Mục này là mặt trái của bài: forward v-model rất tiện, nhưng lạm dụng quá 3–4 tầng thì trở thành "đường dây điện xuyên tầng" khó sửa chữa — lúc đó nên đổi phương án.

❌ **Hạn chế dùng khi:**
- Cấu trúc quá sâu (3–4 cấp trở lên).
- Các component trung gian không có liên quan logic đến dữ liệu đó.
- Dữ liệu (state) cần dùng ở nhiều nhánh component khác nhau.

➡️ **Lúc này nên cân nhắc:**

| Giải pháp | Khi nào dùng |
| :--- | :--- |
| **Pinia** | App lớn, dữ liệu dùng chung toàn cục (Global State) |
| **Provide / Inject** | Truyền dữ liệu sâu, ít khi thay đổi (Dependency Injection) |
| **Emit events** | Logic cần sự rõ ràng, tách biệt hoàn toàn |

> **Cách đọc bảng này:** cột trái là công cụ thay thế, cột phải là "điều kiện sử dụng" — dò theo tình huống của bạn ở hàng nào thì chọn hàng đó.

### 💡 Ví dụ thay thế bằng `provide` / `inject` (gọn hơn)

**Parent:**
> 📄 **Code ví dụ:** [`examples/07-vi-du-thay-the-bang-provide-inject-gon.js`](examples/07-vi-du-thay-the-bang-provide-inject-gon.js)

**Child 1.1:**
> 📄 **Code ví dụ:** [`examples/08-vi-du-thay-the-bang-provide-inject-gon.js`](examples/08-vi-du-thay-the-bang-provide-inject-gon.js)

> [!CAUTION]
> **Nhược điểm:** Khó debug hơn vì không thấy rõ luồng dữ liệu đi qua các component trung gian trên template.

---

## 5. Tổng kết nhanh

Mục này chốt lại toàn bộ bài thành ba tình huống chọn giải pháp — nhớ ba dòng này là đủ để quyết định.

- ✅ **2–3 tầng:** Dùng `v-model` forwarding (nhanh, dễ hiểu).
- ✅ **Nhiều tầng, nhiều nhánh:** Dùng **Pinia** (chuẩn quy trình).
- ✅ **Truyền sâu, dữ liệu tĩnh hoặc ít đổi:** Dùng `provide`/`inject`.

> **Tóm gọn 1 câu:** Chọn đường theo độ sâu: ngắn thì forward `v-model`, sâu và rộng thì Pinia, sâu nhưng ít đổi thì `provide`/`inject`.