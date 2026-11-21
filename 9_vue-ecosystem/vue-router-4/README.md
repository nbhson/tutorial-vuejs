# Vue Router 4 — Router chính thức cho Vue 3

Vue Router 4 là bản viết lại (rewrite) hoàn toàn để tương thích với Vue 3 và Composition API. API phần lớn giữ nguyên so với v3, nhưng khởi tạo, history mode và navigation guards đều mới.

> 🔗 Tham khảo chính thức:
> - [Vue Router — Getting Started](https://router.vuejs.org/)
> - [Migrating from Vue Router 3](https://router.vuejs.org/guide/migration)

## 1. Cài đặt & khởi tạo

Mục này là bước "đổ móng": cài router và tạo instance bằng `createRouter()`. Đọc để thấy khác biệt lớn nhất với v3 ngay từ dòng khởi tạo.

Ví von: v3 là dựng nhà bằng khuôn vuốt tay (`new VueRouter`), v4 là chuyển sang lắp ghép bằng bộ phận chuẩn (`createRouter` + hàm history riêng).

> 📄 **Code ví dụ:** [`examples/01-1-cai-at-khoi-tao.sh`](examples/01-1-cai-at-khoi-tao.sh)

> 📄 **Code ví dụ:** [`examples/02-1-cai-at-khoi-tao.js`](examples/02-1-cai-at-khoi-tao.js)

> ⚠️ Khác biệt lớn so với v3: `new VueRouter({ mode: 'history' })` đã **không còn** — thay bằng hàm factory `createRouter()` + hàm history riêng.

## 2. History Modes (Vue Router 4)

Mục này nói về "kiểu ghi nhật ký chuyến đi": URL của app hiển thị thế nào và do ai quản lý — HTML5, hash, hay memory. Đọc để chọn đúng mode cho môi trường hosting.

| Mode | Factory | URL | Dùng khi nào |
| :--- | :--- | :--- | :--- |
| HTML5 | `createWebHistory()` | `/about` (sạch, đẹp) | Mặc định, cần cấu hình server fallback |
| Hash | `createWebHashHistory()` | `/#/about` | Host tĩnh không cấu hình được server (GitHub Pages...) |
| Memory | `createMemoryHistory()` | (không có URL) | SSR, test, môi trường không có DOM |

> **Cách đọc bảng này:** cột URL là khác biệt nhìn thấy được, cột "Dùng khi nào" là điều kiện chọn — chọn theo nơi bạn deploy: server cấu hình được thì HTML5, host tĩnh thì Hash, không có DOM thì Memory.

> 📄 **Code ví dụ:** [`examples/03-2-history-modes-vue-router-4.js`](examples/03-2-history-modes-vue-router-4.js)

📌 Với `createWebHistory`, server phải trả về `index.html` cho mọi route (Vite dev server tự xử lý; production cần cấu hình nginx/vercel...).

## 3. Dynamic Routes (định tuyến động)

Mục này về "đường có số nhà": một pattern route phục vụ vô số giá trị (`/posts/1`, `/posts/42`...), kèm khả năng thêm route khi app đang chạy. Đọc để làm trang chi tiết và phân quyền động.

### Route params

Ví von: như tòa nhà chung cư có một địa chỉ duy nhất nhưng hàng trăm căn — pattern `/posts/:id` là địa chỉ, `:id` là số căn.

> 📄 **Code ví dụ:** [`examples/04-route-params.js`](examples/04-route-params.js)

Truy cập params bằng Composition API (Vue 3):

> 📄 **Code ví dụ:** [`examples/05-route-params.vue`](examples/05-route-params.vue)

### Thêm route lúc runtime (`router.addRoute()`)

Vue Router 4 hỗ trợ dynamic routing — thêm/xóa route khi app đang chạy (hữu ích cho phân quyền):

> 📄 **Code ví dụ:** [`examples/06-them-route-luc-runtime-router-addroute.js`](examples/06-them-route-luc-runtime-router-addroute.js)

> 🔗 [Dynamic Routing](https://router.vuejs.org/guide/advanced/dynamic-routing.html)

## 4. Nested Routes (routes lồng nhau)

Mục này về "phòng trong phòng": layout cha chứa `<router-view>` con — như một căn hộ có các phòng riêng, mỗi phòng tự có nội dung và có thể chuyển đổi độc lập.

Ví von: nhà hàng có sơ đồ khu (layout cha), mỗi khu có bàn riêng (view con) — đổi bàn không phải đổi cả khu.

> 📄 **Code ví dụ:** [`examples/07-4-nested-routes-routes-long-nhau.js`](examples/07-4-nested-routes-routes-long-nhau.js)

> 📄 **Code ví dụ:** [`examples/08-4-nested-routes-routes-long-nhau.vue`](examples/08-4-nested-routes-routes-long-nhau.vue)

> 📌 Vue Router 4: `<transition>` và `<keep-alive>` phải đặt **bên trong** `<router-view>` qua v-slot API:

> 📄 **Code ví dụ:** [`examples/09-4-nested-routes-routes-long-nhau.vue`](examples/09-4-nested-routes-routes-long-nhau.vue)

## 5. Lazy Loading Routes (code splitting)

Mục này về "trả tiền theo lượt dùng": mỗi trang chỉ được tải về máy khi người dùng thật sự vào — giảm đáng kể dung lượng bundle lần đầu.

Ví von: thay vì mua cả tủ sách về nhà ngay, bạn mượn từng cuốn lúc cần đọc.

Chỉ tải component khi người dùng truy cập route — giảm bundle ban đầu:

> 📄 **Code ví dụ:** [`examples/10-5-lazy-loading-routes-code-splitting.js`](examples/10-5-lazy-loading-routes-code-splitting.js)

👉 Khuyến nghị: lazy load mọi trang lớn, giữ các trang "lối vào" (home, login) nạp ngay.

## 6. Navigation Guards (chặn & kiểm soát điều hướng)

Mục này dựng "hệ thống chốt gác" của app: loạt guard chạy theo thứ tự chặt chẽ trước khi một lần điều hướng được xác nhận. Đọc để biết đặt logic kiểm tra ở chốt nào.

Ví von: như chuỗi kiểm tra ở sân bay — qua check-in, qua an ninh, qua cửa cửa máy bay; chốt nào cũng có quyền dừng bạn lại.

Luồng điều hướng đầy đủ: `beforeRouteLeave` → `beforeEach` → `beforeRouteUpdate` → `beforeEnter` (per-route) → `beforeRouteEnter` → `beforeResolve` → điều hướng xác nhận → `afterEach`.

### Global guard

> 📄 **Code ví dụ:** [`examples/11-global-guard.js`](examples/11-global-guard.js)

### Per-route guard & in-component guard

> 📄 **Code ví dụ:** [`examples/12-per-route-guard-in-component-guard.js`](examples/12-per-route-guard-in-component-guard.js)

> 📄 **Code ví dụ:** [`examples/13-per-route-guard-in-component-guard.vue`](examples/13-per-route-guard-in-component-guard.vue)

> 📌 Khác v3: guards ủng hộ **async/await** và return giá trị (`false` | route location | `undefined`) thay vì callback `next()`.

## 7. Route Matching với custom regex

Đường dẫn params hỗ trợ regex tùy chỉnh qua cú pháp `:param(regex)`:

> 📄 **Code ví dụ:** [`examples/14-7-route-matching-voi-custom-regex.js`](examples/14-7-route-matching-voi-custom-regex.js)

Định tuyến với **mảng** (một path → nhiều aliases):

> 📄 **Code ví dụ:** [`examples/15-7-route-matching-voi-custom-regex.js`](examples/15-7-route-matching-voi-custom-regex.js)

> 🔗 [Route Matching Syntax](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)

## 8. Composition API & điều hướng

Mục này nối router với Vue 3: `useRoute()` (đọc thông tin route hiện tại) và `useRouter()` (ra lệnh điều hướng) — dùng được trong mọi component có `<script setup>`.

> 📄 **Code ví dụ:** [`examples/16-8-composition-api-ieu-huong.vue`](examples/16-8-composition-api-ieu-huong.vue)

> 📌 `useRoute()` trả về object **reactive** — dùng trong template/computed được; không destructure nó (sẽ mất reactivity).

## 9. Tổng kết

Mục này gom cả bài thành 7 dòng ôn nhanh — checklist những gì Vue Router 4 mang lại so với v3.

- ✔ `createRouter()` + history factory (`createWebHistory` / `createWebHashHistory` / `createMemoryHistory`) thay cho `new VueRouter({ mode })`.
- ✔ `addRoute()` cho dynamic routing (phân quyền, plugin).
- ✔ Nested routes + `<router-view>` lồng nhau.
- ✔ Lazy loading bằng dynamic `import()` — mỗi route 1 chunk.
- ✔ Guards hiện đại: return giá trị, async/await, không cần `next()`.
- ✔ Custom regex trong path params + catch-all 404.
- ✔ Composition API: `useRoute()`, `useRouter()`, `onBeforeRouteUpdate/Leave`.

> **Tóm gọn 1 câu:** Vue Router 4 giữ ý cũ, đổi hình mới: `createRouter` + history factory, guard return-thay-callback, lazy loading từng trang — và Composition API trọn bộ.

## 🔗 References

- [Vue Router 4 docs](https://router.vuejs.org/)
- [Migrating from Vue 2 / Router 3](https://router.vuejs.org/guide/migration)
- [Dynamic Routing](https://router.vuejs.org/guide/advanced/dynamic-routing.html)
- [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Route Matching Syntax](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)
