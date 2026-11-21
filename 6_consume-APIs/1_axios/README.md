# Axios — Gọi REST API trong Vue

> **Yêu cầu:** Vue 3.5+ · Vite · TypeScript · axios 1.x
> **Bài sau:** [`2_intercepter`](../2_intercepter/README.md)

---

## 1. Cài đặt và khi nào dùng axios

Mục này trả lời câu hỏi trước khi cài: axios khác gì `fetch`, và đáng "tốn 13 kB" ở điểm nào? Đọc để biết khi nào nên cắm axios, khi nào fetch là đủ.

Ví von: `fetch` là xe đạp công cộng có sẵn miễn phí; axios là xe máy đã bật sẵn đèn, gắn sẵn cốp — đi xa, chở nhiều thì đáng.

> 📄 **Code ví dụ:** [`examples/01-1-cai-at-va-khi-nao-dung-axios.sh`](examples/01-1-cai-at-va-khi-nao-dung-axios.sh)

Axios là thư viện HTTP client phổ biến nhất với Vue, khác `fetch` ở:

| Tiêu chí | axios | fetch (native) |
|---|---|---|
| JSON parse | **Tự động** (`response.data`) | Phải `await res.json()` thủ công |
| HTTP status lỗi | Reject tự động khi status ≥ 400 | Chỉ reject khi lỗi mạng — phải tự kiểm tra `res.ok` |
| Interceptor | ✅ Có sẵn | ❌ Tự viết wrapper |
| Timeout | ✅ `timeout: 5000` | Phải qua `AbortController` |
| Upload progress | ✅ `onUploadProgress` | ❌ |
| Kích thước | ~13 kB | 0 kB |

> **Cách đọc bảng này:** mỗi dòng là một việc phải làm khi gọi API; cột axios cho biết nó làm sẵn giúp bạn, cột fetch cho biết bạn phải tự làm gì. Dòng cuối là cái giá: 13 kB so với 0 kB.

> 💡 Chỉ cần GET/POST đơn giản, `fetch` của trình duyệt là đủ (đã trình bày trong các bài về async component). axios đáng giá khi bạn cần **interceptor, instance cấu hình chung, upload progress** — nội dung của bài này và bài sau.

> **Tóm gọn 1 câu:** axios = fetch cộng sẵn ba món hay dùng (parse JSON, interceptor, progress) với cái giá 13 kB — cần mấy món đó thì lấy axios, không thì fetch đủ.

---

## 2. GET — lấy dữ liệu

Mục này là bài "câu chào" với API: GET dữ liệu và hiển thị. Đọc để nắm pattern nền được dùng lại ở mọi trang có gọi API.

Ví von: như gọi món ở quán — bạn chờ món về (loading), món về thì ăn (data), còn quán báo hết món thì phải biết phản ứng (error).

> 📄 **Code ví dụ:** [`examples/02-2-get-lay-du-lieu.vue`](examples/02-2-get-lay-du-lieu.vue)

📌 Luôn có **3 trạng thái** trong template: loading / error / data — đây là pattern nền của mọi trang gọi API.

### Query params

> 📄 **Code ví dụ:** [`examples/03-query-params.js`](examples/03-query-params.js)

> **Tóm gọn 1 câu:** Mỗi trang gọi API cần đủ 3 trạng thái loading / error / data — thiếu một là người dùng nhìn màn hình "treo".

---

## 3. POST / PUT / PATCH / DELETE

Mục này nói về "động từ" của API: ngoài đọc (GET), bạn cần biết bốn hành động ghi dữ liệu và phân biệt chúng đúng ngữ nghĩa REST.

Ví von: POST là viết một trang mới vào sổ, PUT là thay nguyên cả trang, PATCH là gạch chân sửa vài chữ, DELETE là xé trang.

> 📄 **Code ví dụ:** [`examples/04-3-post-put-patch-delete.js`](examples/04-3-post-put-patch-delete.js)

📌 Lưu ý ngữ nghĩa: `POST` tạo, `PUT` thay toàn bộ, `PATCH` sửa một phần, `DELETE` xóa — API backend của bạn nên theo đúng REST convention để code front-end dễ đọc.

> **Tóm gọn 1 câu:** POST tạo, PUT thay cả, PATCH vá một phần, DELETE xóa — gọi đúng động từ thì code cả hai bên đều dễ đọc.

---

## 4. Tạo instance riêng cho dự án

Mục này nói về quy tắc "một cửa": thay vì gõ URL đầy đủ khắp nơi, tạo một instance axios cấu hình một lần cho cả dự án.

Hãy hình dung như công ty cấp thẻ xe có sẵn xăng và định tuyến chung — nhân viên chỉ việc lên xe và lái, không ai tự mang xăng riêng.

Đừng gọi `axios.get(...)` với URL đầy đủ khắp nơi. Tạo một instance cấu hình một lần:

> 📄 **Code ví dụ:** [`examples/05-4-tao-instance-rieng-cho-du-an.ts`](examples/05-4-tao-instance-rieng-cho-du-an.ts)

> 📄 **Code ví dụ:** [`examples/06-4-tao-instance-rieng-cho-du-an.ts`](examples/06-4-tao-instance-rieng-cho-du-an.ts)

> 📄 **Code ví dụ:** [`examples/07-4-tao-instance-rieng-cho-du-an.sh`](examples/07-4-tao-instance-rieng-cho-du-an.sh)

📌 Lợi ích: đổi môi trường dev/staging/prod không cần sửa code; timeout và header áp dụng cho mọi request.

> **Tóm gọn 1 câu:** Instance axios là "cấu hình một lần, hưởng suốt dự án" — baseURL, timeout, header đặt ở một chỗ duy nhất.

---

## 5. Xử lý lỗi chuyên nghiệp

Mục này dạy bạn "báo hiệu sự cố": axios đổ lỗi ở ba chỗ khác nhau tùy nguyên nhân — đọc mục để biết nhìn vào đâu khi có lỗi, thay vì cứ `console.log(e)` mò mẫm.

> 📄 **Code ví dụ:** [`examples/08-5-xu-ly-loi-chuyen-nghiep.vue`](examples/08-5-xu-ly-loi-chuyen-nghiep.vue)

Cấu trúc lỗi của axios — khi xử lý lỗi luôn phân biệt:

| Thuộc tính | Khi nào có | Ý nghĩa |
|---|---|---|
| `e.response` | Server đã trả lời (kể cả 4xx/5xx) | `{ status, data, headers }` |
| `e.request` | Request đã gửi, không nhận được response | Timeout, mạng đứt |
| `e.message` | Lỗi trước khi gửi (cấu hình sai) | |

> **Cách đọc bảng này:** đọc theo thứ tự "hỏi vọng xuống": server có trả lời không? (`e.response`) → request có đi chưa? (`e.request`) → có gửi được đi nữa không? (`e.message`). Thuộc tính nào có mặt thì nguyên nhân nằm ở tầng đó.

> **Tóm gọn 1 câu:** Lỗi axios nằm ở 3 tầng — `e.response` (server trả lời), `e.request` (không nhận được), `e.message` (chưa gửi được) — soi tầng nào có thì biết lỗi ở đâu.

---

## 6. Trạng thái loading & tránh race condition

Mục này nói về lỗi "kẻ đến sau lấn kẻ đến trước": người dùng gõ nhanh hoặc bấm liên tục khiến nhiều request cùng chạy, kết quả cũ về sau đè kết quả mới. Đọc để biết cách chặn bằng cờ và token hủy.

Ví von: như hai người trả lời cùng một câu hỏi — ai trả lời sau thì giọng to hơn, dù câu của người trước mới là đúng.

Người dùng bấm nhanh nhiều lần → nhiều request cùng chạy → kết quả "chạy đua". Dùng cờ + token hủy:

> 📄 **Code ví dụ:** [`examples/09-6-trang-thai-loading-tranh-race-condition.vue`](examples/09-6-trang-thai-loading-tranh-race-condition.vue)

Với debounce ô tìm kiếm, kết hợp `@input` + timer (hoặc thư viện `@vueuse/core` — `useDebounceFn`).

> **Tóm gọn 1 câu:** Race condition là "kết quả cũ về sau đè kết quả mới" — chặn bằng cờ loading + hủy request cũ, và debounce khi người dùng gõ.

---

## 7. Pattern chuẩn: tách API ra khỏi component

Mục này nói về cách tổ chức code bền vững: component chỉ lo "diễn" (render), còn lời gọi API nằm ở module riêng — như ca sĩ không tự đứng lo âm thanh.

Component nên "mỏng" — chỉ lo render. Đưa lời gọi API vào module riêng:

> 📄 **Code ví dụ:** [`examples/10-7-pattern-chuan-tach-api-ra-khoi-component.ts`](examples/10-7-pattern-chuan-tach-api-ra-khoi-component.ts)

> 📄 **Code ví dụ:** [`examples/11-7-pattern-chuan-tach-api-ra-khoi-component.vue`](examples/11-7-pattern-chuan-tach-api-ra-khoi-component.vue)

📌 Component không biết axios tồn tại → đổi thư viện HTTP hay mock API khi test đều dễ.

> **Tóm gọn 1 câu:** Component "mỏng" chỉ lo render; lời gọi API nằm ở module riêng — đổi thư viện hay test đều dễ vì component không biết axios tồn tại.

---

## 8. Use-cases thực tế

Mục này dựng hai tình huống hay gặp: danh sách phân trang và upload file có thanh tiến trình.

### Danh sách phân trang + load-more

> 📄 **Code ví dụ:** [`examples/12-danh-sach-phan-trang-load-more.js`](examples/12-danh-sach-phan-trang-load-more.js)

### Upload file kèm tiến trình

> 📄 **Code ví dụ:** [`examples/13-upload-file-kem-tien-trinh.vue`](examples/13-upload-file-kem-tien-trinh.vue)

---

## Nguồn tham khảo

- Axios docs: https://axios-http.com/docs/intro
- Instance API: https://axios-http.com/docs/instance
- Xử lý lỗi: https://axios-http.com/docs/handling_errors
- fetch API (phương án native): https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
