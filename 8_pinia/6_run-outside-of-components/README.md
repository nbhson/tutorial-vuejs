# Using a Store Outside of a Component

Dưới đây là tóm tắt đầy đủ – dễ hiểu nội dung bài "Using a store outside of a component" (Sử dụng Pinia store bên ngoài component), kèm ví dụ cụ thể cho từng phần.

## 1. Vấn đề cốt lõi: Vì sao dùng Pinia ngoài component lại đặc biệt?

Mục này giải thích "vì sao có bài này": trong component thì Pinia tự tìm được đường, ngoài component thì mất bản đồ — gọi sai là lỗi ngay. Đọc để hiểu nguyên nhân trước cách khắc phục.

Ví von: trong component như ở trong nhà có sẵn hệ định vị; ra ngoài (router, util file) là ra vùng không sóng — phải tự mang theo bản đồ (instance pinia).

Trong component Vue (ở hàm `setup()` hoặc `<script setup>`), bạn chỉ cần gọi:
> 📄 **Code ví dụ:** [`examples/01-1-van-e-cot-loi-vi-sao-dung.js`](examples/01-1-van-e-cot-loi-vi-sao-dung.js)

👉 **Lý do:**
-   Pinia tự động tìm thấy instance `pinia` đã được cài đặt qua `app.use(pinia)`.
-   Vue tự biết "ngữ cảnh hiện tại" (context) của ứng dụng.

⚠️ **Tuy nhiên, ngoài component (router, file util, service, middleware...):**
-   Không có ngữ cảnh Vue tự động.
-   `useStore()` không tự biết phải dùng instance `pinia` nào.
-   Nếu gọi không đúng cách, bạn sẽ gặp lỗi vì store cố gắng truy cập pinia trước khi nó được khởi tạo.

> **Tóm gọn 1 câu:** Trong component Pinia tự biết đường; ngoài component mất "sóng định vị" nên phải tự trỏ instance pinia — gọi sai là lỗi ngay.

## 2. Nguyên tắc quan trọng nhất

Mục này chốt một câu luật chơi duy nhất của cả bài: store chỉ sống khi pinia đã được cài vào app. Mọi lỗi gặp dưới đây đều quy về vi phạm câu này.

> **Pinia store chỉ hoạt động khi `pinia` đã được cài đặt vào ứng dụng (`app.use(pinia)`).**

Nếu bạn gọi `useStore()` ở cấp độ cao nhất (top-level) của một file được import trước khi `app.use(pinia)` chạy, ứng dụng sẽ bị lỗi.

---

## 3. Single Page Application (SPA)

Mục này là "trường training" của SPA: một ví dụ sai để nhìn rõ vết hở, một ví dụ đúng, rồi một mẹo an toàn nhất. Đọc theo đúng thứ tự 3 mục con.

### 3.1. Trường hợp GÂY LỖI ❌

Ví von: mở cửa hàng trước khi có mặt bằng — đứng gọi store ngay khi file load, lúc pinia chưa kịp cài.

> 📄 **Code ví dụ:** [`examples/02-3-1-truong-hop-gay-loi.js`](examples/02-3-1-truong-hop-gay-loi.js)

### 3.2. Trường hợp ĐÚNG ✅
> 📄 **Code ví dụ:** [`examples/03-3-2-truong-hop-ung.js`](examples/03-3-2-truong-hop-ung.js)

### 3.3. Cách an toàn nhất (Best Practice) ⭐

👉 **KHÔNG** gọi store ở cấp độ top-level của file.
👉 Luôn đặt `useStore()` bên trong một function để đảm bảo nó chỉ chạy khi được gọi (thường là sau khi app đã khởi tạo).

> 📄 **Code ví dụ:** [`examples/04-3-3-cach-an-toan-nhat-best-practice.js`](examples/04-3-3-cach-an-toan-nhat-best-practice.js)

---

## 4. Ví dụ thực tế: Dùng Pinia trong Vue Router

Mục này áp dụng nguyên tắc trên vào tình huống thật nhất: guard của Vue Router cần check auth store — và thứ tự import là chỗ dễ chết người.

### Cách sai (Dễ gây lỗi thứ tự import) ❌
> 📄 **Code ví dụ:** [`examples/05-cach-sai-de-gay-loi-thu-tu-import.js`](examples/05-cach-sai-de-gay-loi-thu-tu-import.js)

### Cách đúng (Chuẩn Pinia) ✅
> 📄 **Code ví dụ:** [`examples/06-cach-ung-chuan-pinia.js`](examples/06-cach-ung-chuan-pinia.js)
👉 **Tại sao đúng?** Vì `beforeEach` chỉ thực thi khi ứng dụng đã bắt đầu chạy, nghĩa là lúc đó `pinia` chắc chắn đã được cài đặt.

---

## 5. Server-Side Rendering (SSR)

Mục này nói về "luật riêng của nhà hàng phục vụ nhiều bàn": SSR mỗi request là một bàn khách — phải cấp pinia riêng từng bàn, dùng chung một cái là khách bàn này ăn trộm đồ bàn kia.

⚠️ **Với môi trường SSR, nguyên tắc hoàn toàn khác:**
-   Mỗi request cần một instance `pinia` riêng biệt để tránh rò rỉ dữ liệu giữa các người dùng.
-   Không bao giờ được sử dụng một instance `pinia` toàn cục.

👉 **Bắt buộc:** Bạn phải truyền instance `pinia` vào hàm `useStore`.
> 📄 **Code ví dụ:** [`examples/07-5-server-side-rendering-ssr.js`](examples/07-5-server-side-rendering-ssr.js)

---

## 6. Tổng kết ngắn gọn 🔥

| Nên làm ✅ | Tránh ❌ |
| :--- | :--- |
| Gọi `useStore()` sau khi `app.use(pinia)`. | Gọi `useStore()` ở top-level của file. |
| Gọi store bên trong các function, hook, hoặc guard. | Gọi store trước khi cài đặt pinia. |
| Với SSR: Luôn truyền instance `pinia` cụ thể. | Dùng pinia global/singleton trong môi trường SSR. |

> **Tóm gọn 1 câu:** Dùng store ngoài component = chờ `app.use(pinia)` xong và gọi trong function — còn SSR thì mỗi request một instance pinia riêng, tuyệt đối không dùng chung.

> **Cách đọc bảng này:** mỗi dòng là một cặp "đường đúng / đường gãy" cho cùng một tình huống — cột trái là thói quen nên hình thành, cột phải là lỗi phổ biến gây crash app lúc khởi động.