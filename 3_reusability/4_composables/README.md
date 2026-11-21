# Composables (Composition API)

Bài này đi qua toàn bộ về **Composables** — cách tái sử dụng logic có state trong Vue 3 — từ ví dụ chuột, fetch API, đến quy ước đặt tên và best practices.

## 1. Composable là gì?

Mục này định nghĩa khái niệm nền của bài: composable là hàm "đóng thùng" logic có trạng thái để mang đi dùng ở nhiều component — như một bộ dụng cụ cầm được đi khắp nhà thay vì lắp cố định vào từng phòng.

Composable là một hàm sử dụng Composition API để đóng gói và tái sử dụng **logic có state** (stateful logic).

📌 **Khác với hàm tiện ích thông thường:**
-   **Hàm thường:** Logic không có state (stateless) - ví dụ: format date.
-   **Composable:** Logic có state, lifecycle, side effects - ví dụ: theo dõi chuột, fetch API, theo dõi trạng thái mạng.

> **Tóm gọn 1 câu:** Composable = hàm có "trí nhớ và giác quan" — giữ state, nghe lifecycle, dọn side effect; hàm thường chỉ tính ra kết quả rồi thôi.

## 2. Vì sao cần Composables?

Mục này nói về căn bệnh mà composable chữa: copy-paste logic giữa các component — sửa một chỗ quên bảy chỗ.

Trong thực tế, một logic thường được dùng ở nhiều component. Nếu viết lặp lại (copy-paste), mã nguồn sẽ rất khó bảo trì. **Composables** giúp tách phần logic này ra để tái sử dụng một cách linh hoạt.

---

## 3. Ví dụ cơ bản: Theo dõi vị trí chuột (Mouse Tracker)

Mục này là "bằng chứng phạm tội" của code lặp: một logic theo dõi chuột viết trực tiếp trong component — chạy được nhưng "niêm phong" trong đó.

### ❌ Viết trực tiếp trong component
> 📄 **Code ví dụ:** [`examples/01-viet-truc-tiep-trong-component.html`](examples/01-viet-truc-tiep-trong-component.html)
⛔ **Nhược điểm:** Logic bị “dính chặt” vào component → không tái sử dụng được ở nơi khác.

---

## 4. Tách logic thành Composable

Mục này là "ca phẫu thuật" đầu tiên: tách logic chuột ra thành `useMouse` — mỗi component muốn dùng chỉ cần gọi một dòng.

### 4.1. Tạo composable `useMouse`
📁 **mouse.js**
> 📄 **Code ví dụ:** [`examples/02-4-1-tao-composable-usemouse.js`](examples/02-4-1-tao-composable-usemouse.js)
📌 **Quy ước:**
-   Tên hàm bắt đầu bằng `use` (ví dụ: `useMouse`).
-   Trả về một object chứa các `ref`.

### 4.2. Sử dụng composable trong component
> 📄 **Code ví dụ:** [`examples/03-4-2-su-dung-composable-trong-component.html`](examples/03-4-2-su-dung-composable-trong-component.html)
✅ Logic dùng lại dễ dàng.
✅ Mỗi component sử dụng sẽ có một instance state riêng biệt.

> **Tóm gọn 1 câu:** `useMouse` chứng minh sức mạnh composable: một lần viết, mọi component gọi là có ngay logic chuột — và state mỗi bên tự riêng.

---

## 5. Composables có thể lồng nhau

Mục này nói về cách "xếp lego": composable bên trong composable — `useMouse` dùng lại `useEventListener` thay vì tự viết từ đầu.

### 5.1. Tạo composable dùng chung event listener
📁 **event.js**
> 📄 **Code ví dụ:** [`examples/04-5-1-tao-composable-dung-chung-event-listener.js`](examples/04-5-1-tao-composable-dung-chung-event-listener.js)

### 5.2. Dùng trong `useMouse`
> 📄 **Code ví dụ:** [`examples/05-5-2-dung-trong-usemouse.js`](examples/05-5-2-dung-trong-usemouse.js)
📌 **Lợi ích:** Chia nhỏ logic thành các phần chuyên biệt, dễ bảo trì và test.

---

## 6. Ví dụ: Async State (useFetch)

Mục này nâng cấp từ ví dụ chơi sang ví dụ thật: gói toàn bộ bộ ba trạng thái fetch API (loading, data, error) vào một composable.

### 6.1. Vấn đề
Mọi tác vụ fetch API đều cần xử lý các trạng thái: `loading`, `data`, và `error`.

### 6.2. Composable `useFetch` cơ bản
> 📄 **Code ví dụ:** [`examples/06-6-2-composable-usefetch-co-ban.js`](examples/06-6-2-composable-usefetch-co-ban.js)
**Cách sử dụng:**
> 📄 **Code ví dụ:** [`examples/07-6-2-composable-usefetch-co-ban.js`](examples/07-6-2-composable-usefetch-co-ban.js)

---

## 7. Truyền state reactive vào composable

Mục này nói về việc "cắm nguồn sống" vào composable: truyền ref/getter thay vì giá trị chết để composable phản ứng khi đầu vào thay đổi — URL đổi là tự fetch lại.

Khi muốn URL thay đổi thì `useFetch` tự động fetch lại dữ liệu:

### 7.1. Truyền ref hoặc getter
> 📄 **Code ví dụ:** [`examples/08-7-1-truyen-ref-hoac-getter.js`](examples/08-7-1-truyen-ref-hoac-getter.js)

### 7.2. Dùng `watchEffect()` + `toValue()`
> 📄 **Code ví dụ:** [`examples/09-7-2-dung-watcheffect-tovalue.js`](examples/09-7-2-dung-watcheffect-tovalue.js)
📌 **`toValue()`:** Giúp chuẩn hóa các đầu vào (ref, getter, hoặc giá trị thường) thành giá trị thuần túy.

---

## 8. Quy ước & Best Practices

Mục này là "luật chơi" của composable: đặt tên, nhận input, trả output, xử lý side effect và giới hạn chỗ gọi — năm nhóm quy tắc để composable của bạn "đúng chuẩn nghề".

### 8.1. Naming
-   Sử dụng **camelCase**.
-   Bắt đầu bằng **`use`** (ví dụ: `useMouse`, `useFetch`).

### 8.2. Input arguments
-   Nên chấp nhận cả `ref`, `getter` và giá trị thường bằng cách sử dụng `toValue()`.

### 8.3. Return values
-   ✅ **Luôn return một object chứa các refs.** Điều này giúp người dùng dễ dàng destructuring mà vẫn giữ được tính phản ứng (reactivity).
-   ❌ Tránh return object `reactive()`.

### 8.4. Side Effects
-   Các thao tác với DOM nên đặt trong `onMounted`.
-   Luôn dọn dẹp (cleanup) trong `onUnmounted`.

### 8.5. Usage rules ⚠️
-   Chỉ được gọi trong `<script setup>` hoặc `setup()`.
-   Phải được gọi **đồng bộ** (không đặt trong hàm `async` hoặc các lệnh điều kiện).

> **Tóm gọn 1 câu:** Composable chuẩn nghề: tên bắt đầu `use`, nhận gì cũng được nhờ `toValue()`, return object chứa refs, cleanup trong `onUnmounted`, và gọi đồng bộ trong `setup`.

---

## 9. Tổ chức code bằng Composables

Mục này nói về cách "sắp kho" theo chủ đề: thay vì chia code theo loại tùy chọn (data/methods như Options API), chia theo tính năng (feature) ngay trong cùng một component.

> 📄 **Code ví dụ:** [`examples/10-9-to-chuc-code-bang-composables.js`](examples/10-9-to-chuc-code-bang-composables.js)
📌 Giúp tách biệt các mảng business logic (features) khác nhau ngay trong cùng một component.

---

## 10. Dùng Composable trong Options API

Mục này trấn an ai còn ở Options API: composable vẫn gọi được trong `setup()` — hai thế giới không loại trừ nhau.

> 📄 **Code ví dụ:** [`examples/11-10-dung-composable-trong-options-api.js`](examples/11-10-dung-composable-trong-options-api.js)

---

## 11. So sánh với kỹ thuật khác

Mục này đặt composable cạnh hai "đối thủ cũ" để thấy vì sao nó là lựa chọn được khuyến nghị hiện nay.

| Kỹ thuật | Ưu điểm | Nhược điểm |
| :--- | :--- | :--- |
| **Composables** | Rõ ràng nguồn gốc, tree-shaking tốt, linh hoạt. | Cần hiểu về Composition API. |
| **Mixins (Vue 2)** | Tái sử dụng code. | ❌ Khó trace nguồn, dễ xung đột tên, phụ thuộc ngầm. |
| **Renderless Comp** | Tách UI và logic. | Tốn kém performance (nhiều instance). |

> **Cách đọc bảng này:** so sánh theo dòng — mỗi kỹ thuật một hàng, ưu/nhược đối chiếu hai cột sau; hàng nào cả ưu điểm mạnh và nhược điểm ít thì đó là lựa chọn mặc định.

---

## ✅ KẾT LUẬN

Mục này chốt lại cả bài trong bốn gạch đầu dòng.

-   **Composables** = Logic dẫn xuất có trạng thái.
-   Tự theo dõi và làm sạch tài nguyên.
-   Thay thế hoàn hảo cho Mixins.
-   Giúp code sạch, dễ đọc và dễ bảo trì.

> **Tóm gọn 1 câu:** Composable là "bộ dụng cụ di động có trí nhớ" — logic theo bạn đến mọi component, tự dọn dẹp sau khi dùng, và xóa sổ được bệnh copy-paste.