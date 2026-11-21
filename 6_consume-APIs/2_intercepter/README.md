# Axios Interceptors — Chặn và xử lý request/response tập trung

> **Yêu cầu:** Vue 3.5+ · axios 1.x · đã đọc [`1_axios`](../1_axios/README.md)
> **Bài sau:** [`3_auth`](../3_auth/README.md)

---

## 1. Interceptor là gì?

Mục này định nghĩa khái niệm trọng tâm của bài: interceptor là "trạm kiểm soát" mà mọi request/response phải đi qua. Đọc để hiểu vì sao nó giúp bạn xóa hàng loạt code lặp.

Ví von: interceptor như trạm thu phí trên cao tốc — thay vì mỗi cửa nhà thu phí riêng, mọi xe đều qua một trạm duy nhất.

**Interceptor** là hàm chạy **trước khi request đi ra** hoặc **khi response về tới** — cho phép xử lý xuyên suốt (tự động thêm token, refresh token, log, dịch lỗi...) **tại một chỗ duy nhất** thay vì lặp code trong từng component.

> 📄 **Code ví dụ:** [`examples/01-1-interceptor-la-gi.ts`](examples/01-1-interceptor-la-gi.ts)

📌 Có thể đăng ký **nhiều** interceptor cho cùng một instance — chúng chạy theo thứ tự đăng ký (FIFO với request, LIFO với response).

> **Tóm gọn 1 câu:** Interceptor là trạm kiểm soát tập trung: mọi request đi ra và response về tới đều lướt qua một chỗ duy nhất để gắn token, log hay dịch lỗi.

---

## 2. Request interceptor — tự động gắn token

Mục này là use-case "quốc dân" của interceptor: ai cũng cần gắn `Authorization` vào mọi request, và không ai muốn gõ dòng đó 50 lần trong code.

Đây là use-case phổ biến nhất: mọi request cần header `Authorization`. Giống như thẻ từ công ty tự quẹt ở mọi cửa — bạn không phải xuất trình tay từng lần.

> 📄 **Code ví dụ:** [`examples/02-2-request-interceptor-tu-ong-gan-token.ts`](examples/02-2-request-interceptor-tu-ong-gan-token.ts)

📌 **Đọc token lúc gửi** (không cache khi tạo interceptor) — để interceptor luôn dùng token mới nhất sau khi đăng nhập lại.

### Idempotency-Key, ngôn ngữ, tenant

> 📄 **Code ví dụ:** [`examples/03-idempotency-key-ngon-ngu-tenant.ts`](examples/03-idempotency-key-ngon-ngu-tenant.ts)

---

## 3. Response interceptor — chuẩn hóa lỗi

Mục này nói về phía "đường về": thay vì mỗi component tự dịch lỗi thành thông báo, interceptor dịch một lần cho cả app — như một đầu giờ giải thích đồng loạt thay vì từng người tự hỏi.

Thay vì mỗi component xử lý `e.response.status`, interceptor dịch lỗi về **thông điệp tiếng Việt** và trả lỗi đồng nhất:

> 📄 **Code ví dụ:** [`examples/04-3-response-interceptor-chuan-hoa-loi.ts`](examples/04-3-response-interceptor-chuan-hoa-loi.ts)

> 📄 **Code ví dụ:** [`examples/05-3-response-interceptor-chuan-hoa-loi.vue`](examples/05-3-response-interceptor-chuan-hoa-loi.vue)

> **Tóm gọn 1 câu:** Response interceptor là "phiên dịch viên duy nhất" của app — dịch lỗi server thành thông điệp UI một lần, mọi component hưởng.

---

## 4. Pattern phổ biến: log + đếm request đang chạy

Mục này dựng pattern "bảng điện tổng": interceptor đếm số request đang chạy để bật/tắt spinner chung, và log mọi request đi qua — không phải rải spinner từng trang.

> 📄 **Code ví dụ:** [`examples/06-4-pattern-pho-bien-log-em-request-ang.ts`](examples/06-4-pattern-pho-bien-log-em-request-ang.ts)

Và trong component root hoặc store UI:

> 📄 **Code ví dụ:** [`examples/07-4-pattern-pho-bien-log-em-request-ang.vue`](examples/07-4-pattern-pho-bien-log-em-request-ang.vue)

> 💡 Với dự án dùng Pinia: thay `dispatchEvent` bằng một store `ui` với state `isLoading` — interceptor chỉ gọi `uiStore.start()`/`uiStore.stop()`. Chi tiết: [`8_pinia`](../../8_pinia/README.md).

---

## 5. Interceptor + refresh token (tổng quan, chi tiết ở bài sau)

Mục này mở màn cho vở kịch phổ biến nhất: token hết hạn (401) — interceptor tự đổi token mới rồi gửi lại request gốc, người dùng không hề hay biết. Ví von: chìa khóa từ chốt — có người đứng sẵn đổi chìa giúp bạn, bạn vẫn vào cửa bình thường.

Mỗi lần nhận `401`, interceptor cố gắng **làm mới token** rồi gửi lại request gốc:

> 📄 **Code ví dụ:** [`examples/08-5-interceptor-refresh-token-tong-quan-chi-tiet.ts`](examples/08-5-interceptor-refresh-token-tong-quan-chi-tiet.ts)

Chi tiết đầy đủ (lưu token, logout, tránh vòng lặp refresh): [`3_auth`](../3_auth/README.md).

---

## 6. Hủy và loại bỏ interceptor

> 📄 **Code ví dụ:** [`examples/09-6-huy-va-loai-bo-interceptor.ts`](examples/09-6-huy-va-loai-bo-interceptor.ts)

📌 Interceptor sống cùng vòng đời **instance** — với SPA thường đăng ký một lần khi khởi tạo app (trong `main.ts` hoặc module `api/client.ts`), hiếm khi cần eject.

---

## 7. Đừng lạm dụng interceptor

Mục này là phần "dạy về trách nhiệm": interceptor có quyền chạm vào mọi request/response nên cũng rất dễ phá app nếu nhét logic vào sai chỗ. Đọc bảng dưới trước khi viết interceptor đầu tiên.

Interceptor là "điểm chặn toàn cục" — quyền lực lớn, dễ phá code:

| Nên | Tránh |
|---|---|
| Gắn token, refresh token | Gọi API thứ hai bên trong interceptor của API thứ nhất |
| Dịch lỗi sang thông điệp UI | Điều hướng trang (`router.push`) từ interceptor — gây khó đoán hành vi |
| Log/đếm request | Retry vô điều kiện (dễ spam server) — nếu retry, giới hạn số lần + backoff |
| Thêm header chuẩn chung | Thay đổi **body** request cho từng endpoint trong interceptor |

> **Cách đọc bảng này:** mỗi dòng là một "được/không được" cho cùng một việc — cột Nên là cách làm đúng vị trí, cột Tránh là biến thể nguy hiểm của chính việc đó.

> ⚠️ Nguyên tắc: interceptor chỉ làm những việc **áp dụng cho mọi request/response**. Logic riêng từng endpoint nên nằm ở module API (`api/posts.ts`), không nằm trong interceptor.

> **Tóm gọn 1 câu:** Interceptor chỉ làm việc dành cho "mọi request" — logic riêng từng endpoint thì về nhà nó (module API), đừng nhét hết vào trạm kiểm soát.

---

## 8. Ví dụ tổng hợp: client hoàn chỉnh cho dự án thật

Mục này ghép mọi mảnh của bài thành một "client hoàn chỉnh" dùng được ngay trong dự án thật — đọc code ví dụ như đọc bản tổng kết có thể copy về.

> 📄 **Code ví dụ:** [`examples/10-8-vi-du-tong-hop-client-hoan-chinh.ts`](examples/10-8-vi-du-tong-hop-client-hoan-chinh.ts)

📌 Chú ý gọi `useAuthStore()` **bên trong** interceptor (mỗi lần chạy) chứ không ở cấp module — vì store cần app đã mount.

---

## Nguồn tham khảo

- Axios interceptors: https://axios-http.com/docs/interceptors
- Axios headers config: https://axios-http.com/docs/handling_errors
- Pinia stores (thay state toàn cục): https://pinia.vuejs.org/
- AbortController/timeout: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout
