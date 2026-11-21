# Pinia Plugins

Dưới đây là tóm tắt đầy đủ – dễ hiểu – có ví dụ cụ thể về bài học Pinia Plugins, dựa theo nội dung tài liệu chính thức.

## 1. Pinia Plugin là gì?

Mục này định nghĩa "cửa hậu" của Pinia: plugin là hàm gắn thêm năng lực cho mọi store sau khi khởi tạo. Đọc để biết plugin dùng được cho những việc gì trước khi học cách đăng ký.

Ví von: plugin như lắp thêm phụ kiện chung cho mọi xe trong hãng — một lần lắp ở xưởng (đăng ký), mọi xe (store) sau đó đều có sẵn camera lùi.

👉 **Pinia Plugin** là một hàm cho phép bạn mở rộng và tùy chỉnh store sau khi nó được khởi tạo. 

Bạn có thể dùng plugin để:
-   Thêm thuộc tính mới cho store.
-   Thêm state mới hoặc bọc (wrap) các action hiện có.
-   Bắt sự kiện action thông qua `$onAction`.
-   Lắng nghe thay đổi state thông qua `$subscribe`.
-   Tích hợp các side effects (như `localStorage`, logger, analytics...).

> **Tóm gọn 1 câu:** Pinia plugin là "hội phụ kiện" — gắn một lần, mọi store tạo sau đó đều được mở rộng thêm thuộc tính, listener hay side effect.

---

## 2. Cách đăng ký plugin

Mục này nói về "thời điểm lắp phụ kiện": đăng ký qua `pinia.use()` — và nhớ quy tắc vàng, plugin chỉ tác động lên store sinh ra SAU nó.

Plugin được đăng ký thông qua phương thức `pinia.use()`.

> 📄 **Code ví dụ:** [`examples/01-2-cach-ang-ky-plugin.js`](examples/01-2-cach-ang-ky-plugin.js)

⚠️ **Quan trọng:**
-   Plugin chỉ áp dụng cho những store được tạo **SAU** khi plugin được đăng ký.
-   Instance của `pinia` phải được gắn vào ứng dụng Vue trước (`app.use(pinia)`).

---

## 3. Cấu trúc của một Pinia Plugin

Một plugin đơn giản là một function nhận vào một đối tượng `context`:

> 📄 **Code ví dụ:** [`examples/02-3-cau-truc-cua-mot-pinia-plugin.js`](examples/02-3-cau-truc-cua-mot-pinia-plugin.js)

---

## 4. Thêm thuộc tính vào Store (Augmenting Store)

### Cách 1: Trả về một object (Khuyên dùng)
> 📄 **Code ví dụ:** [`examples/03-cach-1-tra-ve-mot-object-khuyen-dung.js`](examples/03-cach-1-tra-ve-mot-object-khuyen-dung.js)
✔️ **Ưu điểm:** Các thuộc tính này sẽ tự động hiển thị chính xác trong Vue DevTools.

### Cách 2: Gán trực tiếp vào instance của store
> 📄 **Code ví dụ:** [`examples/04-cach-2-gan-truc-tiep-vao-instance-cua.js`](examples/04-cach-2-gan-truc-tiep-vao-instance-cua.js)
👉 Nếu muốn thuộc tính hiển thị trong DevTools ở môi trường phát triển:
> 📄 **Code ví dụ:** [`examples/05-cach-2-gan-truc-tiep-vao-instance-cua.js`](examples/05-cach-2-gan-truc-tiep-vao-instance-cua.js)

---

## 5. Reactivity tự động

Vì Pinia store được bọc bởi `reactive()`, nên các `ref` hoặc `computed` được thêm vào qua plugin sẽ tự động được unwrap (không cần dùng `.value`).

> 📄 **Code ví dụ:** [`examples/06-5-reactivity-tu-ong.js`](examples/06-5-reactivity-tu-ong.js)

---

## 6. Thêm State mới cho Store

Mục này là quy tắc khó nhất của plugin: thêm state mới phải ghi cả hai nơi (store và `store.$state`) để mọi hệ thống nhìn thấy cùng một bản. Ví von: đổi tên công ty phải đổi cả trên biển hiệu lẫn trên giấy đăng ký — chỉ đổi một chỗ là giấy tờ (SSR) không khớp.

⚠️ Nếu bạn muốn thêm một thuộc tính state mới, bạn **PHẢI** khai báo nó ở cả instance của store và `store.$state` để đảm bảo tính đồng bộ (đặc biệt là với SSR).

### Ví dụ: Thêm thuộc tính `hasError`
> 📄 **Code ví dụ:** [`examples/07-vi-du-them-thuoc-tinh-haserror.js`](examples/07-vi-du-them-thuoc-tinh-haserror.js)
✔️ Điều này đảm bảo:
-   SSR (Server-Side Rendering) hoạt động chính xác.
-   DevTools hiển thị state mới một cách trực quan.
-   State có thể được serialize/deserialize.

---

## 7. Reset state được thêm từ plugin

Mặc định, phương thức `$reset()` của store sẽ **KHÔNG** reset các thuộc tính state được thêm qua plugin. Bạn cần override (ghi đè) lại `$reset`.

> 📄 **Code ví dụ:** [`examples/08-7-reset-state-uoc-them-tu-plugin.js`](examples/08-7-reset-state-uoc-them-tu-plugin.js)

---

## 8. Thêm các thuộc tính bên ngoài (Router, Services...)

Mục này nói về "đồ đạc nặng không nên đóng gói": router hay API service không cần reactivity — bọc bằng `markRaw()` để Vue khỏi lãng phí công sức theo dõi chúng.

Ví von: không ai dán tem theo dõi nhiệt độ lên... tảng đá — markRaw() chính là cách nói với Vue "cục này không cần giám sát".

⚠️ Đối với các đối tượng không cần tính phản ứng (non-reactive) như instance của Router hoặc API Service, hãy sử dụng `markRaw()`.

> 📄 **Code ví dụ:** [`examples/09-8-them-cac-thuoc-tinh-ben-ngoai-router.js`](examples/09-8-them-cac-thuoc-tinh-ben-ngoai-router.js)

---

## 9. Sử dụng `$subscribe` và `$onAction` trong plugin

Bạn có thể thiết lập các trình lắng nghe toàn cục cho mọi store.

> 📄 **Code ví dụ:** [`examples/10-9-su-dung-subscribe-va-onaction-trong-plugin.js`](examples/10-9-su-dung-subscribe-va-onaction-trong-plugin.js)

---

## 10. Thêm option mới cho `defineStore`

Bạn có thể định nghĩa các thuộc tính tùy chỉnh ngay khi khai báo store và đọc chúng trong plugin.

### Ví dụ: Thêm option `debounce`
> 📄 **Code ví dụ:** [`examples/11-vi-du-them-option-debounce.js`](examples/11-vi-du-them-option-debounce.js)

### Plugin xử lý option `debounce`
> 📄 **Code ví dụ:** [`examples/12-plugin-xu-ly-option-debounce.js`](examples/12-plugin-xu-ly-option-debounce.js)

---

## 11. TypeScript với Pinia Plugin

Để có trải nghiệm lập trình tốt nhất, hãy khai báo kiểu cho các thuộc tính mới.

### Khai báo thuộc tính và state mới
> 📄 **Code ví dụ:** [`examples/13-khai-bao-thuoc-tinh-va-state-moi.ts`](examples/13-khai-bao-thuoc-tinh-va-state-moi.ts)

---

## 12. Tổng kết nhanh

Mục này gom cả bài vào một bảng ôn — mỗi dòng một quy tắc sống còn khi viết plugin.

| Mục | Ý nghĩa |
| :--- | :--- |
| **Bản chất** | Mở rộng tính năng cho mọi store một cách tập trung. |
| **Cơ chế** | Chạy mỗi khi một store được khởi tạo. |
| **Cách dùng tốt nhất** | Trả về object từ function của plugin. |
| **Ghi chú state** | Luôn đồng bộ với `$state` để hỗ trợ SSR/DevTools. |
| **markRaw()** | Bắt buộc cho các instance bên ngoài (Router, API). |
| **Theo dõi** | Sử dụng `$subscribe` và `$onAction` để làm logger/analytics. |

> **Cách đọc bảng này:** mỗi dòng là một quy tắc viết plugin, dòng "Cách dùng tốt nhất" và "markRaw()" là hai điều hay gặp nhất trong dự án thật.

> **Tóm gọn 1 câu:** Plugin là "xưởng lắp phụ kiện" chạy trước mọi store: gắn một lần, nhớ trả về object, đồng bộ `$state`, và `markRaw()` cho đồ nặng không cần reactivity.