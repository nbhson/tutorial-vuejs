Dưới đây là mô tả CHI TIẾT – DỄ HIỂU toàn bộ Lifecycle Hooks trong Vue 3, giải thích rõ hook nào chạy khi nào và nên dùng cho việc gì, kèm ví dụ thực tế.

(Mình trình bày theo Composition API trước, và ghi chú tương ứng với Options API)

# 1. Lifecycle Hooks là gì?

Mục này trả lời câu hỏi nền tảng: component "sống" qua mấy giai đoạn nào, và mình có thể "canh" ở từng giai đoạn không?

Mỗi component Vue sẽ trải qua các giai đoạn:
- Khởi tạo
- Render & gắn vào DOM
- Cập nhật khi dữ liệu thay đổi
- Bị hủy (remove khỏi DOM)

Ví von: một component giống như **một nhân viên mới vào công ty** — có ngày phỏng vấn (khởi tạo), ngày nhận bàn làm việc (gắn vào DOM), những ngày làm việc hằng ngày (cập nhật), và ngày nghỉ việc (bị hủy).

👉 Lifecycle Hooks là các “điểm móc” để bạn chạy code đúng thời điểm trong vòng đời đó.

> **Tóm gọn 1 câu:** Lifecycle hooks là "camera gác ở từng chặng đời" của component — muốn làm gì đúng lúc, treo code vào đúng hook.

# 2. Các Lifecycle Hooks theo thứ tự vòng đời

Mục này đi từng hook một, theo đúng thứ tự chúng xuất hiện trong đời component. Đọc để biết hook nào chạy khi nào và nên giao việc gì cho nó.

### 🔹 1. `beforeCreate` (Vue 2) ❌ – Vue 3 hầu như không dùng
- Vue 3 không khuyến khích dùng
- Thời điểm này chưa có data, props, computed
👉 Bỏ qua, không cần nhớ

### 🔹 2. `created` (Vue 2) ❌ – Vue 3 gộp vào `setup`
Trong Vue 3, logic này nằm trong `setup()`

👉 Nếu bạn từng dùng Vue 2 thì:
> 📄 **Code ví dụ:** [`examples/01-2-created-vue-2-vue-3-gop-vao.js`](examples/01-2-created-vue-2-vue-3-gop-vao.js)
➡ Vue 3: đặt thẳng trong `setup()`

### 🔹 3. `beforeMount`
**📌 Khi nào chạy?**
- Component chuẩn bị render
- DOM CHƯA tồn tại

**📌 Dùng để làm gì?**
- Chuẩn bị dữ liệu trước khi render
- Debug quá trình render

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/02-3-beforemount.js`](examples/02-3-beforemount.js)
> ⚠️ Không thao tác DOM ở đây

### 🔹 4. `mounted` ⭐ (RẤT QUAN TRỌNG)
**📌 Khi nào chạy?**
Component đã:
- Render xong
- Gắn vào DOM

Đây là thời điểm "đèn sáng, sân khấu sẵn sàng": mọi thứ đã dựng xong, giờ mới có khán giả (DOM) để tương tác.

**📌 Dùng để làm gì?**
- ✔ Gọi API
- ✔ Gắn event listener
- ✔ Thao tác DOM
- ✔ Dùng thư viện bên thứ 3 (chart, map, modal…)

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/03-4-mounted-rat-quan-trong.js`](examples/03-4-mounted-rat-quan-trong.js)
📌 90% trường hợp gọi API → dùng `mounted`

### 🔹 5. `beforeUpdate`
**📌 Khi nào chạy?**
- Data thay đổi
- DOM chưa cập nhật

**📌 Dùng để làm gì?**
- So sánh dữ liệu cũ – mới
- Debug trước khi DOM update

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/04-5-beforeupdate.js`](examples/04-5-beforeupdate.js)
⚠️ Hiếm dùng trong thực tế

### 🔹 6. `updated`
**📌 Khi nào chạy?**
- DOM đã cập nhật xong sau khi data thay đổi

**📌 Dùng để làm gì?**
- ✔ Xử lý logic phụ thuộc DOM mới
- ✔ Đồng bộ UI ngoài Vue

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/05-6-updated.js`](examples/05-6-updated.js)
> ⚠️ Cẩn thận vòng lặp vô hạn nếu thay đổi state trong hook này

### 🔹 7. `beforeUnmount`
**📌 Khi nào chạy?**
- Component sắp bị remove khỏi DOM

**📌 Dùng để làm gì?**
✔ **Cleanup:**
- `clearInterval`
- `removeEventListener`
- `unsubscribe socket`

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/06-7-beforeunmount.js`](examples/06-7-beforeunmount.js)

### 🔹 8. `unmounted` ⭐
**📌 Khi nào chạy?**
- Component đã bị remove khỏi DOM

**📌 Dùng để làm gì?**
- ✔ Cleanup cuối cùng
- ✔ Logging, analytics

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/07-8-unmounted.js`](examples/07-8-unmounted.js)

# 3. Bảng tổng hợp nhanh (RẤT DỄ NHỚ)

Bảng dưới đây gom toàn bộ hook thành một trang "cheat-sheet" — khi quên hook nào làm gì, quay lại đây là đủ.

| Hook | Khi chạy | Dùng để |
| :--- | :--- | :--- |
| `onBeforeMount` | Trước render | Chuẩn bị dữ liệu |
| `onMounted` ⭐ | DOM sẵn sàng | API, DOM, lib |
| `onBeforeUpdate` | Trước DOM update | Debug |
| `onUpdated` | Sau DOM update | Sync UI |
| `onBeforeUnmount` | Trước khi hủy | Cleanup |
| `onUnmounted` ⭐ | Sau khi hủy | Cleanup |

> **Cách đọc bảng này:** mỗi dòng là một hook, xếp đúng thứ tự vòng đời từ trên xuống. Cột "Khi chạy" trả lời câu hỏi *lúc nào*, cột "Dùng để" trả lời *giao việc gì*. Hai dòng đánh dấu ⭐ là hai hook bạn sẽ dùng nhiều nhất.

# 4. So sánh Composition API vs Options API

Mục này nói về chuyện "đổi tên gọi" giữa hai phong cách viết Vue: cùng một hook, hai cái tên khác nhau.

| Composition API | Options API |
| :--- | :--- |
| `onMounted` | `mounted` |
| `onUpdated` | `updated` |
| `onUnmounted` | `unmounted` |

> **Cách đọc bảng này:** đọc theo hàng ngang — mỗi hàng là một hook với tên gọi tương ứng trong 2 phong cách; cột trái là chuẩn bạn nên dùng trong Vue 3.

**Ví dụ Options API:**
> 📄 **Code ví dụ:** [`examples/08-4-so-sanh-composition-api-vs-options-api.js`](examples/08-4-so-sanh-composition-api-vs-options-api.js)

# 5. Lifecycle Hooks hay dùng nhất (thực tế)

Mục này nói về "lộ trình hằng ngày" của một component trong code thực tế — thuộc lòng 4 bước này là xử lý được phần lớn công việc.

👉 Thứ tự phổ biến khi code:
1. `setup()` → khởi tạo state
2. `onMounted()` → gọi API
3. `onUpdated()` → xử lý UI phụ
4. `onUnmounted()` → cleanup

> **Tóm gọn 1 câu:** Công thức thực chiến: setup nấu cơm, mounted dọn bàn ăn, updated châm thêm món, unmounted rửa bát.

# 6. Những lỗi thường gặp ❌

Mục này là "danh sách vết thương" của người đi trước — đọc để khỏi bị lại một lần.

- ❌ Thao tác DOM trong `setup()`
- ❌ Gọi API trong `onUpdated()`
- ❌ Quên cleanup interval / event
- ❌ Dùng arrow function trong Options API lifecycle.

> **Tóm gọn 1 câu:** DOM chỉ chạm khi đã mounted, cleanup thì đừng quên — bốn lỗi trên là bốn cái bẫy phổ biến nhất.