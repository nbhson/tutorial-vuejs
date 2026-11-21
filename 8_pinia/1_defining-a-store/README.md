# Định nghĩa Store trong Pinia: Tóm tắt Đầy đủ & Dễ hiểu

Dưới đây là bản tóm tắt chi tiết – đầy đủ – dễ hiểu bài **“Defining a Store”** (Định nghĩa Store trong Pinia), kèm ví dụ minh họa cho từng phần. 👌

---

## 1. Store trong Pinia là gì?

Mục này định nghĩa "nhân vật chính" của toàn bộ chương Pinia: store là nơi dữ liệu dùng chung sống, và `defineStore()` là giấy khai sinh của nó. Đọc để nắm hai quy tắc bắt buộc (hàm `defineStore`, `id` duy nhất) trước khi đi vào cú pháp.

Hãy hình dung store như tủ hồ sơ trung tâm của công ty: mọi phòng đều đến lấy và cập nhật hồ sơ ở một chỗ duy nhất, không ai giữ bản photo riêng rồi lệch số liệu.

**Store** là một thực thể quản lý trạng thái (**State**) toàn cục. Nó giống như một "nguồn sự thật duy nhất" chứa dữ liệu dùng chung cho toàn bộ ứng dụng mà không bị rằng buộc bởi cấu trúc phân cấp của component.

- Store được tạo bằng hàm `defineStore()`.
- Mỗi store **bắt buộc** phải có một **`id`** duy nhất (kiểu chuỗi).

👉 **Pinia dùng `id` này để:**
- Kết nối và định danh chính xác trên **Vue DevTools**.
- Quản lý việc cài đặt và truy xuất store trong toàn bộ ứng dụng.

**Cú pháp cơ bản:**
> 📄 **Code ví dụ:** [`examples/01-1-store-trong-pinia-la-gi.js`](examples/01-1-store-trong-pinia-la-gi.js)

> [!TIP]
> **Quy ước đặt tên:** Hàm khởi tạo store nên tuân theo quy tắc: `use` + `TênStore` + `Store` (ví dụ: `useUserStore`, `useCartStore`, `useAuthStore`).

> **Tóm gọn 1 câu:** Store là "nguồn sự thật trung tâm" của app — tạo bằng `defineStore()` và bắt buộc có `id` duy nhất như số nhà.

## 2. Hai cách định nghĩa Store trong Pinia

Mục này giới thiệu hai "phong cách viết" cho cùng một việc: Option Store (giống Options API) và Setup Store (giống Composition API). Đọc để biết mình sẽ chọn một trong hai con đường nào ở hai mục sau.

Pinia cực kỳ linh hoạt khi hỗ trợ cả hai kiểu cú pháp tương ứng với hai phong cách viết code trong Vue 3:
1. **Option Store**: Tương tự như Options API (data, computed, methods).
2. **Setup Store**: Tương tự như Composition API (ref, computed, function).

Ví von: giống viết thư bằng mực tím hay đánh máy — nội dung như nhau, chọn kiểu nào quen tay thì dùng, nhưng cả công ty nên thống nhất một kiểu.

> **Tóm gọn 1 câu:** Pinia cho hai cách viết một store — Option (dễ học, quen Vue 2) và Setup (linh hoạt theo Composition API) — cùng đích, khác phong cách.

## 3. Option Store (Cách 1 – Trực quan, dễ học)

Mục này đi vào cách viết thứ nhất: Option Store — cấu trúc `state`/`getters`/`actions` đối chiếu thẳng với `data`/`computed`/`methods` mà bạn đã biết từ component.

Đây là cách viết truyền thống, cực kỳ phù hợp cho những người đã quen với Vue 2 hoặc Options API. Hãy hình dung như điền form có sẵn các ô: state vào ô data, getter vào ô computed, action vào ô methods.

### Thành phần chính:
| Thuộc tính | Tương ứng trong Vue | Ý nghĩa |
| :--- | :--- | :--- |
| **`state`** | `data()` | Nơi định nghĩa các dữ liệu phản ứng |
| **`getters`** | `computed` | Các giá trị được tính toán dựa trên state |
| **`actions`** | `methods` | Các hàm xử lý logic hoặc thay đổi state |

> **Cách đọc bảng này:** mỗi dòng là một "khoảng trống" trong form — cột giữa cho biết nó tương đương với gì trong component, cột phải là vai trò của nó trong store.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/02-thanh-phan-chinh.js`](examples/02-thanh-phan-chinh.js)

> **Tóm gọn 1 câu:** Option Store là "điền form" quen thuộc: state ↔ data, getters ↔ computed, actions ↔ methods.

## 4. Setup Store (Cách 2 – Linh hoạt, mạnh mẽ)

Mục này đi vào cách viết thứ hai: Setup Store — định nghĩa store bằng một hàm như viết `<script setup>`. Đọc để nắm quy tắc sống còn duy nhất: phải `return` đủ.

Cú pháp này sử dụng hàm để định nghĩa store, cho phép bạn tận dụng tối đa sức mạnh của Composition API.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/03-4-setup-store-cach-2-linh-hoat-manh.js`](examples/03-4-setup-store-cach-2-linh-hoat-manh.js)

> [!IMPORTANT]
> Trong Setup Store, bạn **PHẢI** `return` tất cả các biến state. Nếu không return, Pinia sẽ không thể nhận diện chúng để hỗ trợ SSR, DevTools hoặc các Plugin. Ví von: như chuẩn bị món ăn mà quên bày ra mâm — làm xong trong bếp rồi mà khách không thấy.

> **Tóm gọn 1 câu:** Setup Store = viết store như một hàm `<script setup>` — nhớ `return` đủ mọi state, thiếu là Pinia không thấy.

## 5. Sử dụng Router & Inject trong Setup Store

Mục này cho thấy ưu điểm riêng của Setup Store: được dùng composable khác (router, inject...) ngay bên trong store — Option Store không làm được việc này.

> 📄 **Code ví dụ:** [`examples/04-5-su-dung-router-inject-trong-setup-store.js`](examples/04-5-su-dung-router-inject-trong-setup-store.js)

---

## 6. Nên chọn Option Store hay Setup Store?

Mục này giúp bạn chốt phương án: bảng dưới so hai cách theo độ khó, độ linh hoạt và loại dự án phù hợp.

| Tiêu chí | Option Store | Setup Store |
| :--- | :--- | :--- |
| **Độ khó** | Dễ học, cấu trúc cố định | Đòi hỏi hiểu về Composition API |
| **Độ linh hoạt** | Thấp hơn | Rất cao, dễ dàng lồng các composable |
| **Dự án** | App nhỏ, người mới bắt đầu | App lớn, logic phức tạp, cần tái sử dụng |

> **Cách đọc bảng này:** mỗi dòng là một tiêu chí bỏ phiếu — đọc cả 3 dòng rồi "chấm điểm" theo dự án của bạn, thay vì chỉ nhìn một dòng.

👉 **Lời khuyên:** Hãy chọn cách nào giúp bạn và đồng đội cảm thấy thoải mái và dễ bảo trì nhất.

> **Tóm gọn 1 câu:** Option Store cho người mới và app nhỏ, Setup Store cho logic phức tạp — chọn kiểu cả team bảo trì thoải mái nhất là đúng.

## 7. Sử dụng Store trong Component

Store chỉ thực sự được khởi tạo khi bạn gọi hàm `useXxxStore()` bên trong một component.

> 📄 **Code ví dụ:** [`examples/05-7-su-dung-store-trong-component.html`](examples/05-7-su-dung-store-trong-component.html)

---

## 8. CẢNH BÁO: Không được Destructure trực tiếp Store ❌

Mục này là bẫy số 1 của người mới dùng Pinia: destructure store làm "rơi mất tính phản ứng" — dữ liệu vẫn hiện nhưng không tự cập nhật nữa.

Ví von: như photo bản gốc một trang để mang đi — bản photo đẹp, nhưng gốc sửa gì thì bản photo không đổi theo.

Nếu bạn dùng kỹ thuật destructure thông thường từ ES6, bạn sẽ làm **mất tính phản ứng (reactivity)** của dữ liệu.

> 📄 **Code ví dụ:** [`examples/06-8-canh-bao-khong-uoc-destructure-truc-tiep.js`](examples/06-8-canh-bao-khong-uoc-destructure-truc-tiep.js)

---

## 9. Cách đúng: Sử dụng `storeToRefs()` ✅

Mục này đưa ra "liều thuốc giải" cho bẫy trên: `storeToRefs()` cho phép destructure mà vẫn giữ dây nối reactivity với store.

Để có thể destructure mà vẫn giữ được tính phản ứng cho `state` và `getters`, hãy sử dụng tiện ích `storeToRefs`.

Ví von: thay vì photo bản gốc, bạn cấp quyền truy cập trực tiếp vào hồ sơ gốc — gốc đổi, người xem thấy ngay.

> 📄 **Code ví dụ:** [`examples/07-9-cach-ung-su-dung-storetorefs.html`](examples/07-9-cach-ung-su-dung-storetorefs.html)

> **Tóm gọn 1 câu:** Muốn destructure store thì phải qua `storeToRefs()` — destructure trực tiếp là photo bản gốc, mất dây nối reactivity.

## 10. Khuyến nghị (Best Practices) 🚀

- **Tách file:** Mỗi store nên nằm trong một file riêng biệt.
- **Thư mục:** Đặt tất cả các file store vào thư mục `src/stores/`.
- **Lợi ích:** 
  - Tự động tách mã (Code-splitting).
  - Hỗ trợ TypeScript gợi ý code (inference) chính xác nhất.
  - Cấu trúc dự án rõ ràng, dễ tìm kiếm và bảo trì.

---

## 11. Tổng kết nhanh 🎯

Mục này gói cả bài vào 4 dòng để ôn lại — nhớ 4 dòng này là dùng được Pinia cơ bản.

1. **Store** = Quản lý trạng thái dùng chung toàn app.
2. **`defineStore(id, configuration)`**: Hàm duy nhất để tạo store.
3. **2 Kiểu viết**: **Option Store** (dễ dùng) và **Setup Store** (linh hoạt).
4. **Phản ứng**: Không destructure store trực tiếp, hãy dùng **`storeToRefs()`** cho state và getters.
