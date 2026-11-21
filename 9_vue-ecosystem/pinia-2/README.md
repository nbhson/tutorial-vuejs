# Pinia — Quản lý state hiện đại cho Vue (2.x & 3.x)

Pinia là thư viện quản lý state **chính thức** của Vue (thay thế Vuex từ Vue 3). Phiên bản 2.x là chuẩn cho Vue 3 trong giai đoạn 2022–2024; **Pinia 3.0 (02/2025)** chỉ bỏ hỗ trợ Vue 2 và các API deprecated, **không có tính năng mới breaking** nên mọi kiến thức trong file này áp dụng cho cả 2.x và 3.x.

> 🔗 Tham khảo chính thức: [pinia.vuejs.org](https://pinia.vuejs.org/)

## 1. Tại sao chuyển từ Vuex sang Pinia?

Mục này là "đơn xin thôi việc" của Vuex: bảng dưới liệt kê từng điểm Pinia hơn — mutations, modules, TS, DevTools. Đọc để hiểu vì sao cả hệ sinh thái đã chuyển nhà.

Ví von: Vuex là ngôi nhà ở được nhưng cũ kỹ — mỗi lần sửa gì cũng phải đi vòng qua 3 cánh cửa; Pinia dỡ hết cửa nội bộ, đi thẳng từ phòng này sang phòng kia.

| Tiêu chí | Vuex 4 | Pinia |
| :--- | :--- | :--- |
| Mutations | Bắt buộc `commit()` mutations | ❌ Không có — sửa state trực tiếp qua actions |
| Modules | Cần `modules`, `namespaced: true` | Không cần modules — nhiều store phẳng |
| TypeScript | Suy luận kiểu yếu | Type inference tự nhiên, viết TS-first |
| Composition API | Hạn chế | `defineStore()` chuẩn Composition API |
| DevTools | Có | Có, tốt hơn (time-travel, editors) |
| SSR / HMR | Hỗ trợ | Hỗ trợ đầy đủ, boilerplate gần như bằng 0 |
| Code splitting | Khó | Tự động — store chỉ nạp khi dùng |

> **Cách đọc bảng này:** mỗi dòng là một điểm chuyển nhà — cột Vuex là "cái phải chịu", cột Pinia là "cái được hưởng". Dòng Mutations và Modules là hai khác biệt thay đổi tư duy nhiều nhất.

> 👉 Pinia ra đời chính là "Vuex 5" đề xuất của đội Vue — từ 2022 trở đi Pinia là lựa chọn mặc định (khuyến nghị chính thức từ Vue 3). Xem thêm so sánh trong `../8_pinia/VUEX-vs-PINIA.md`.

> 📄 **Code ví dụ:** [`examples/01-1-tai-sao-chuyen-tu-vuex-sang-pinia.sh`](examples/01-1-tai-sao-chuyen-tu-vuex-sang-pinia.sh)

> 📄 **Code ví dụ:** [`examples/02-1-tai-sao-chuyen-tu-vuex-sang-pinia.js`](examples/02-1-tai-sao-chuyen-tu-vuex-sang-pinia.js)

> **Tóm gọn 1 câu:** Pinia là "Vuex 5" thực thụ — bỏ mutations và modules, TS-native, DevTools tốt hơn; từ 2022 là lựa chọn mặc định của Vue.

## 2. `defineStore()` — định nghĩa store

Mục này dạy "hai phong cách viết một tủ hồ sơ": Options Store (điền form) và Setup Store (viết hàm). Đọc để biết chọn style nào cho dự án của mình.

Pinia có **2 style** khai báo store. Cả hai dùng chung một hàm `defineStore(id, ...)`:

- **Options Stores**: giống Options API của Vue.
- **Setup Stores**: giống `<script setup>` / Composition API.

### a) Options Store

> 📄 **Code ví dụ:** [`examples/03-a-options-store.js`](examples/03-a-options-store.js)

### b) Setup Store (Composition API style — khuyến nghị cho logic phức tạp)

> 📄 **Code ví dụ:** [`examples/04-b-setup-store-composition-api-style-khuyen-nghi.js`](examples/04-b-setup-store-composition-api-style-khuyen-nghi.js)

📌 Quy ước đặt tên: `useXxxStore` (kiểu `useCartStore`), id store nên dùng **camelCase** để khớp tên.

### So sánh 2 style

| | Options Store | Setup Store |
| :--- | :--- | :--- |
| Điểm mạnh | Cấu trúc rõ, quen thuộc với Vue, DevTools mapping tốt | Linh hoạt hơn: dùng composables có sẵn, watcher, lifecycle |
| Hạn chế | Không dùng composables/lifecycle bên trong | Phải return đủ mọi thứ; devtools không hiện property ẩn |

> **Cách đọc bảng này:** so theo từng cặp điểm mạnh/hạn chế — Options thắng ở "quen và rõ", Setup thắng ở "linh hoạt nhưng phải kỷ luật return đủ".

👉 Chọn 1 style cho cả project — có thể trộn nhưng đừng lẫn lộn. Như trong nhà chỉ nên thống nhất một kiểu vá víu, đừng mỗi phòng một kiểu.

> **Tóm gọn 1 câu:** `defineStore()` 2 style — Options cho sự quen thuộc, Setup cho sự linh hoạt; chọn một cho cả project là chính sách tốt nhất.

## 3. Sử dụng store trong component

> 📄 **Code ví dụ:** [`examples/05-3-su-dung-store-trong-component.vue`](examples/05-3-su-dung-store-trong-component.vue)

> 🔑 Đây chính là hạn chế "mất reactivity khi destructuring reactive object" đã học trong `../1_essentials/11_reactivity-fundamentals` — Pinia store về bản chất là một object reactive lớn.

## 4. `$patch` — cập nhật nhiều state trong 1 lần

Mục này về "gửi một phiếu thay vì nhiều phiếu": `$patch` gom nhiều thay đổi state vào một lần thông báo — DevTools và `$subscribe` chỉ ghi một entry.

> 📄 **Code ví dụ:** [`examples/06-4-patch-cap-nhat-nhieu-state-trong-1.js`](examples/06-4-patch-cap-nhat-nhieu-state-trong-1.js)

👉 Gộp nhiều thay đổi → chỉ 1 lần thông báo devtools/subscribe.

## 5. `$reset` — reset về state ban đầu

> 📄 **Code ví dụ:** [`examples/07-5-reset-reset-ve-state-ban-au.js`](examples/07-5-reset-reset-ve-state-ban-au.js)

> ⚠️ `$reset()` không tồn tại trong **Setup Store** (vì Pinia không biết state ban đầu). Tự viết `reset()` action nếu dùng setup store:

> 📄 **Code ví dụ:** [`examples/08-5-reset-reset-ve-state-ban-au.js`](examples/08-5-reset-reset-ve-state-ban-au.js)

## 6. `$subscribe` — theo dõi thay đổi store

> 📄 **Code ví dụ:** [`examples/09-6-subscribe-theo-doi-thay-oi-store.js`](examples/09-6-subscribe-theo-doi-thay-oi-store.js)

Tương tự có `store.$onAction()` để theo dõi actions (log, analytics, toast).

## 7. Plugins & DevTools

### Plugin (mở rộng Pinia)

> 📄 **Code ví dụ:** [`examples/10-plugin-mo-rong-pinia.js`](examples/10-plugin-mo-rong-pinia.js)

Plugin phổ biến: `pinia-plugin-persistedstate` (lưu localStorage), SSR serialization...

### DevTools Integration

Pinia tích hợp Vue DevTools sẵn:
- Xem toàn bộ stores, state, getters trong tab **Pinia**.
- **Time-travel** với `$patch` (mỗi patch là 1 entry history).
- Chỉnh sửa state trực tiếp, xem actions được gọi với payload & duration.
- HMR cho stores giữ nguyên state.

## 8. Lưu ý phiên bản (2025–2026)

Mục này là "lịch sử gần đây" để bạn không hoang mang về version: 2.x ngừng phát triển tính năng, 3.0 chỉ dọn dẹp — kiến thức trong file dùng được nguyên vẹn cho cả hai.

- **Pinia 2.x**: dòng cuối là `2.3.1` (01/2025); 2.2.6+ là bản cuối có tính năng mới.
- **Pinia 3.0 (02/2025)**: bỏ Vue 2, bỏ `PiniaStorePlugin` (dùng `PiniaPlugin`), native `Awaited`. Khỏi migration gì lớn — API giữ nguyên.
- Nuxt: dùng `@pinia/nuxt` tương ứng (0.11.x với Pinia 3).
- 👉 Dự án mới: cài `pinia@^3` — cú pháp `defineStore()` trong tài liệu này dùng được nguyên vẹn.

## 9. Tổng kết

Mục này gói cả bài vào 5 dòng ôn nhanh — thuộc 5 dòng này là dùng thành thạo Pinia.

- ✔ Pinia = Vuex không mutations, không modules, TS-native.
- ✔ `defineStore()` 2 style: Options Store & Setup Store.
- ✔ Không destructure store trực tiếp — dùng `storeToRefs()`.
- ✔ `$patch` (batch), `$reset` (options store), `$subscribe` (persist/log).
- ✔ DevTools time-travel + plugins (persistedstate...) mở rộng.

> **Tóm gọn 1 câu:** Pinia là Vuex tẩy trừ mutations/modules với TS-native — `defineStore` 2 style, `storeToRefs` khi destructure, `$patch`/`$reset`/`$subscribe` làm công việc ngày thường.

## 🔗 References

- [Pinia Getting Started](https://pinia.vuejs.org/getting-started.html)
- [defineStore — Core Concepts](https://pinia.vuejs.org/core-concepts/)
- [Migrating v2 → v3](https://pinia.vuejs.org/cookbook/migration-v2-v3.html)
- [Pinia Plugins](https://pinia.vuejs.org/core-concepts/plugins.html)
- [Changelog Pinia](https://github.com/vuejs/pinia/blob/v3/packages/pinia/CHANGELOG.md)
