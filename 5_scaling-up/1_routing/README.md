# Routing — Định tuyến với Vue Router 4

> **Yêu cầu:** Vue 3.5+ · vue-router 4.x
> **Chi tiết đầy đủ về router API:** [`9_vue-ecosystem/vue-router-4`](../9_vue-ecosystem/vue-router-4/README.md)

---

## 1. Routing đơn giản không cần thư viện (hiểu cách hoạt động)

Mục này nói về "router tự chế": làm router bằng tay từ hash-URL + map component — không phải để dùng trong dự án, mà để bạn thấy nguyên lý của Vue Router chỉ là một bảng tra và một `<component :is>`.

Trước khi cài router, bạn có thể làm "router" bằng cách ánh xạ hash-URL tới component — giúp hiểu nguyên lý của Vue Router:

> 📄 **Code ví dụ:** [`examples/01-1-routing-on-gian-khong-can-thu-vien.vue`](examples/01-1-routing-on-gian-khong-can-thu-vien.vue)

📌 Ứng dụng thực tế: **không dùng cách này cho dự án** — thiếu route động, navigation guard, lazy-load. Dùng Vue Router 4. Nhưng nguyên lý (URL → component map → render bằng `<component :is>`) chính là cốt lõi của router.

---

## 2. Cài đặt Vue Router 4

Mục này nói về bước dựng khung: cài thư viện, tạo router với danh sách route, và gắn vào app — ba bước là có hệ thống định tuyến hoàn chỉnh.

> 📄 **Code ví dụ:** [`examples/02-2-cai-at-vue-router-4.sh`](examples/02-2-cai-at-vue-router-4.sh)

> 📄 **Code ví dụ:** [`examples/03-2-cai-at-vue-router-4.ts`](examples/03-2-cai-at-vue-router-4.ts)

> 📄 **Code ví dụ:** [`examples/04-2-cai-at-vue-router-4.ts`](examples/04-2-cai-at-vue-router-4.ts)

> 💡 `npm create vue@latest` hỏi có cài router ngay khi tạo dự án — chọn "Yes" để được khung sẵn như trên.

---

## 3. `<RouterLink>` và `<RouterView>`

> 📄 **Code ví dụ:** [`examples/05-3-routerlink-va-routerview.vue`](examples/05-3-routerlink-va-routerview.vue)

- `to="/about"` — theo đường dẫn; `:to="{ name: 'about' }"` — theo tên route (khuyến nghị, chống hỏng khi đổi path).
- `active-class` — đổi class active mặc định (`router-link-active`).

> **Tóm gọn 1 câu:** `<RouterLink>` là "biển chỉ dẫn", `<RouterView>` là "sân khấu" — URL đổi, RouterView thay diễn viên theo.

---

## 4. Route động — tham số trong URL

Mục này nói về route có "khe tham số": một định danh kiểu `/user/:id` phục vụ vô số URL khác nhau — như một cửa hàng duy nhất tiếp mọi khách theo số hóa đơn.

> 📄 **Code ví dụ:** [`examples/06-4-route-ong-tham-so-trong-url.ts`](examples/06-4-route-ong-tham-so-trong-url.ts)

> 📄 **Code ví dụ:** [`examples/07-4-route-ong-tham-so-trong-url.vue`](examples/07-4-route-ong-tham-so-trong-url.vue)

---

## 5. Lazy loading route (code splitting)

Mục này nói về tối ưu quan trọng nhất khi app lớn: mỗi route một "kiện hàng" riêng — vào trang nào mới tải trang đó.

Mỗi route một chunk riêng — trang chính tải nhẹ, chỉ tải view khi vào:

> 📄 **Code ví dụ:** [`examples/08-5-lazy-loading-route-code-splitting.ts`](examples/08-5-lazy-loading-route-code-splitting.ts)

> 💡 Đây là tối ưu quan trọng nhất khi dự án lớn lên. Ghi chú `/* webpackChunkName */` (Vite cũng hỗ trợ dạng `/* @vite-ignore */`-tuần tự qua cấu hình `manualChunks`).

---

## 6. Nested routes (route con)

Mục này nói về route "lồng nhau": route con render bên trong `<RouterView>` của route cha — như phòng lớn chứa phòng nhỏ, URL phản chiếu đúng cấu trúc.

> 📄 **Code ví dụ:** [`examples/09-6-nested-routes-route-con.ts`](examples/09-6-nested-routes-route-con.ts)

> 📄 **Code ví dụ:** [`examples/10-6-nested-routes-route-con.vue`](examples/10-6-nested-routes-route-con.vue)

---

## 7. Navigation guards — chặn trước khi chuyển trang

Mục này nói về "trạm kiểm soát": guard chặn hành trình chuyển trang để kiểm tra đăng nhập, phân quyền... trước khi cho đi tiếp — giống cửa kiểm soát vé trước sảnh concert.

> 📄 **Code ví dụ:** [`examples/11-7-navigation-guards-chan-truoc-khi-chuyen-trang.ts`](examples/11-7-navigation-guards-chan-truoc-khi-chuyen-trang.ts)

> 📄 **Code ví dụ:** [`examples/12-7-navigation-guards-chan-truoc-khi-chuyen-trang.ts`](examples/12-7-navigation-guards-chan-truoc-khi-chuyen-trang.ts)

> 📄 **Code ví dụ:** [`examples/13-7-navigation-guards-chan-truoc-khi-chuyen-trang.vue`](examples/13-7-navigation-guards-chan-truoc-khi-chuyen-trang.vue)

Thứ tự chạy: `beforeEach` (toàn cục) → `beforeEnter` (route) → guard trong component (`beforeRouteEnter`/`beforeRouteUpdate`/`beforeRouteLeave`).

---

## 8. Programmatic navigation + đọc thông tin route

Mục này nói về điều hướng "bằng code thay vì bằng link": `router.push`/`replace` từ trong script, cùng cách đọc `route.params`, `route.query`.

> 📄 **Code ví dụ:** [`examples/14-8-programmatic-navigation-oc-thong-tin-route.ts`](examples/14-8-programmatic-navigation-oc-thong-tin-route.ts)

📌 Luật lịch sử: `push` thêm vào history (nút Back quay về được), `replace` thay thế mục hiện tại.

> **Tóm gọn 1 câu:** Guard là "chặn trước khi đi", programmatic navigation là "điều khiển từ xa" — `push` giữ dấu chân trong history, `replace` xóa dấu.

---

## 9. Scroll behavior + meta

Mục này nói về hai "tinh chỉnh" nhỏ cho trải nghiệm: cuộn trang đến đâu khi chuyển route, và gắn dữ liệu riêng (meta) lên từng route để guard đọc.

> 📄 **Code ví dụ:** [`examples/15-9-scroll-behavior-meta.ts`](examples/15-9-scroll-behavior-meta.ts)

---

## 10. Use-cases thực tế

Mục này là "hộp bài mẫu" cho bốn tình huống gặp thường nhật khi làm dự án thật.

### 404 route bắt mọi URL sai

> 📄 **Code ví dụ:** [`examples/16-404-route-bat-moi-url-sai.ts`](examples/16-404-route-bat-moi-url-sai.ts)

### Route nhớ tab qua query

> 📄 **Code ví dụ:** [`examples/17-route-nho-tab-qua-query.ts`](examples/17-route-nho-tab-qua-query.ts)

### Đổi document title theo route

> 📄 **Code ví dụ:** [`examples/18-oi-document-title-theo-route.ts`](examples/18-oi-document-title-theo-route.ts)

### Guard đăng nhập (tóm tắt — chi tiết bài auth)

> 📄 **Code ví dụ:** [`examples/19-guard-ang-nhap-tom-tat-chi-tiet-bai.ts`](examples/19-guard-ang-nhap-tom-tat-chi-tiet-bai.ts)

> **Tóm gọn 1 câu:** Bốn bài mẫu này chiếm 90% nhu cầu routing thực tế — 404, nhớ tab, đổi title, chặn đăng nhập; học theo mẫu là dùng được ngay.

---

## Nguồn tham khảo

- Vue Router 4: https://router.vuejs.org/
- Getting started: https://router.vuejs.org/guide/
- Navigation Guards: https://router.vuejs.org/guide/advanced/navigation-guards.html
- Dynamic Routing / lazy loading: https://router.vuejs.org/guide/advanced/lazy-loading.html
- Bài chi tiết về API router: [`9_vue-ecosystem/vue-router-4`](../9_vue-ecosystem/vue-router-4/README.md)
