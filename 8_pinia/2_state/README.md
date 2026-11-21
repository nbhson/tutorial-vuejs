# Pinia State

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học State trong Pinia, kèm ví dụ minh họa dựa theo nội dung tài liệu chính thức.

## 1. State là gì trong Pinia?

Mục này định nghĩa "kho hàng" của store: state là dữ liệu trung tâm, và phải khai báo bằng hàm trả về object. Đọc để nắm cách khai báo chuẩn và hai quy tắc bất di bất dịch.

Hãy hình dung state như kệ hàng của cửa hàng: khui kho lúc mở cửa (khai báo trước hết), chứ không giữa giờ lại dựng thêm kệ mới (thêm thuộc tính sau khởi tạo là không được).

State là nơi lưu trữ dữ liệu trung tâm của store (giống `data` trong component). Trong Pinia, state luôn được định nghĩa bằng một **hàm trả về object**. Cách này giúp Pinia hoạt động tốt cho cả SSR (Server-Side Rendering) và Client.

### Ví dụ
> 📄 **Code ví dụ:** [`examples/01-vi-du.js`](examples/01-vi-du.js)

📌 **Lưu ý quan trọng:**
-   Mọi state phải được khai báo trước, kể cả khi giá trị ban đầu là `undefined`.
-   Không thể thêm thuộc tính mới vào state sau khi store đã được khởi tạo.

---

## 2. State & TypeScript

Mục này nói về "bản đồ kho": TS tự suy luận kiểu của state, nhưng có vài trường hợp phải vẽ tay bản đồ (ép kiểu) — đọc để biết khi nào cần can thiệp.

Pinia tự động suy luận kiểu dữ liệu nếu bạn bật `strict` hoặc tối thiểu là `noImplicitThis`.

### Trường hợp cần ép kiểu (Type Casting)

**Ví dụ 1: Mảng rỗng hoặc dữ liệu chưa load**
> 📄 **Code ví dụ:** [`examples/02-truong-hop-can-ep-kieu-type-casting.ts`](examples/02-truong-hop-can-ep-kieu-type-casting.ts)

**Ví dụ 2: Khai báo interface cho toàn bộ state**
> 📄 **Code ví dụ:** [`examples/03-truong-hop-can-ep-kieu-type-casting.ts`](examples/03-truong-hop-can-ep-kieu-type-casting.ts)

---

## 3. Truy cập & thay đổi State

Mục này là "quyền tự do" của Pinia: đọc và ghi state trực tiếp, không cần mutations như Vuex. Đọc để biết đường chính tả và những thao tác không hợp lệ.

Bạn có thể đọc và ghi trực tiếp vào state mà không cần thông qua mutations (như Vuex). Ví von: kho hàng mở cửa tự do — ai cũng tự vào lấy và đặt hàng, không cần thủ kho ký phiếu nữa.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/04-3-truy-cap-thay-oi-state.js`](examples/04-3-truy-cap-thay-oi-state.js)

🚫 **Không hợp lệ:**
> 📄 **Code ví dụ:** [`examples/05-3-truy-cap-thay-oi-state.js`](examples/05-3-truy-cap-thay-oi-state.js)

---

## 4. Reset State

Mục này nói về "xáo trộn lại ván cờ": đưa state về giá trị ban đầu — Option Store có sẵn công cụ, Setup Store phải tự chế.

### Option Store
Pinia cung cấp sẵn phương thức `$reset()`. Ví von: nút "reset game" — bấm một phát, mọi thứ về màn đầu.

> 📄 **Code ví dụ:** [`examples/06-option-store.js`](examples/06-option-store.js)

### Setup Store
Bạn cần tự viết hàm reset nếu dùng Setup Store.

> 📄 **Code ví dụ:** [`examples/07-setup-store.js`](examples/07-setup-store.js)

> **Tóm gọn 1 câu:** Option Store có nút `$reset()` sẵn, Setup Store phải tự viết hàm reset của mình.

---

## 5. Sử dụng State trong Options API

Nếu bạn không sử dụng Composition API, bạn có thể dùng các helpers của Pinia.

> 📄 **Code ví dụ:** [`examples/08-5-su-dung-state-trong-options-api.js`](examples/08-5-su-dung-state-trong-options-api.js)

---

## 6. `mapWritableState` (Có thể sửa)

Dùng khi bạn cần khả năng ghi lại state (ví dụ: dùng với `v-model` trong form).

> 📄 **Code ví dụ:** [`examples/09-6-mapwritablestate-co-the-sua.js`](examples/09-6-mapwritablestate-co-the-sua.js)
📌 Với mảng hoặc object, nếu bạn chỉ thực hiện `push()` hoặc `splice()`, `mapState` vẫn đủ dùng.

---

## 7. Các cách thay đổi State (Mutations)

Mục này liệt kê 3 "tác phong" khi sửa state: sửa trực tiếp (nhanh gọn), `$patch` với object (gom nhiều thay đổi), `$patch` với function (cho thao tác phức tạp). Đọc để biết dùng cách nào khi nào.

Ví von: sửa trực tiếp là ghi vội lên giấy nhớ; `$patch` là gộp nhiều việc vào một phiếu gửi một lần cho DevTools — đỡ "ngập giấy" trong lịch sử.

### Cách 1: Thay đổi trực tiếp
> 📄 **Code ví dụ:** [`examples/10-cach-1-thay-oi-truc-tiep.js`](examples/10-cach-1-thay-oi-truc-tiep.js)

### Cách 2: dùng `$patch` với object
> 📄 **Code ví dụ:** [`examples/11-cach-2-dung-patch-voi-object.js`](examples/11-cach-2-dung-patch-voi-object.js)

### Cách 3: dùng `$patch` với function (tốt cho mảng/object phức tạp)
> 📄 **Code ví dụ:** [`examples/12-cach-3-dung-patch-voi-function-tot-cho.js`](examples/12-cach-3-dung-patch-voi-function-tot-cho.js)
📌 **Ưu điểm:** Gom nhiều thay đổi thành một entry duy nhất trong DevTools.

---

## 8. Thay thế hoàn toàn State

Mục này nói về thao tác "đổi cả kho": gán `$state` bằng object mới — và cách Pinia xử lý ngầm bên dưới là `$patch()`.

❌ Không thể gán trực tiếp `$state` bằng một object mới hoàn toàn:
> 📄 **Code ví dụ:** [`examples/13-8-thay-the-hoan-toan-state.js`](examples/13-8-thay-the-hoan-toan-state.js)

✅ Thực chất Pinia sẽ thực hiện `$patch()` ngầm bên dưới:
> 📄 **Code ví dụ:** [`examples/14-8-thay-the-hoan-toan-state.js`](examples/14-8-thay-the-hoan-toan-state.js)

---

## 9. Theo dõi State với `$subscribe`

Mục này về "camera giám sát kho": `$subscribe` báo cho bạn mỗi lần state đổi — hữu ích cho persist vào localStorage, log, analytics.

Tương tự như `subscribe` của Vuex nhưng tối ưu hơn `watch`.

> 📄 **Code ví dụ:** [`examples/15-9-theo-doi-state-voi-subscribe.js`](examples/15-9-theo-doi-state-voi-subscribe.js)

**Thông tin trong `mutation`:**
-   `type`: direct / patch object / patch function.
-   `storeId`.
-   `payload`: dữ liệu truyền vào (nếu dùng patch object).

---

## 10. Flush timing & Detach

### Flush timing
Muốn callback chạy ngay lập tức sau mỗi thay đổi:
> 📄 **Code ví dụ:** [`examples/16-flush-timing.js`](examples/16-flush-timing.js)

### Detach subscription
Mặc định subscription bị hủy khi component unmount. Để giữ lại:
> 📄 **Code ví dụ:** [`examples/17-detach-subscription.js`](examples/17-detach-subscription.js)

---

## 11. Watch toàn bộ state Pinia

> 📄 **Code ví dụ:** [`examples/18-11-watch-toan-bo-state-pinia.js`](examples/18-11-watch-toan-bo-state-pinia.js)

---

## 🎯 Tổng kết nhanh

Mục này gom cả bài vào một bảng ôn — đọc cột "Ý chính" là nhớ được toàn bộ kiến thức state của Pinia.

| Chủ đề | Ý chính |
| :--- | :--- |
| **State** | Trung tâm dữ liệu, luôn là một function trả về object. |
| **TypeScript** | Tự động suy luận kiểu, hỗ trợ ép kiểu cho mảng/null. |
| **Truy cập** | Đọc và ghi trực tiếp (không cần mutations phức tạp). |
| **Reset** | Dùng `$reset()` (Option Store) hoặc tự viết (Setup Store). |
| **Options API** | Dùng `mapState` và `mapWritableState`. |
| **Mutation** | Direct change hoặc dùng `$patch` để gom nhóm thay đổi. |
| **Subscribe** | `$subscribe()` dùng để theo dõi và thực hiện side effects (ví dụ: bám dữ liệu). |
| **SSR** | Hỗ trợ qua `pinia.state.value`. |

> **Cách đọc bảng này:** mỗi dòng là một chủ đề của bài, xếp theo thứ tự xuất hiện — dùng để ôn nhanh trước khi code, quên chỗ nào quay lại section đó.