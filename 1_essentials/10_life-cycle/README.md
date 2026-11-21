Dưới đây là tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Lifecycle Hooks (Vòng đời component) trong Vue 3, kèm ví dụ minh họa cho từng phần dựa đúng vào nội dung trang bạn đang xem.

# 1. Lifecycle Hooks là gì?

Mục này mở bài bằng cách vẽ ra "cuộc đời" của một component. Đọc để hiểu hook là gì và tại sao Vue lại cho bạn can thiệp vào từng thời điểm.

Lifecycle Hooks (các hook vòng đời) là những hàm đặc biệt mà Vue tự động gọi tại những thời điểm xác định trong vòng đời của một component.

Ví von: component giống như **một chuyến tàu chạy theo lịch cố định** — khởi hành, dừng từng ga, rồi đến điểm cuối. Lifecycle hooks chính là những điểm dừng đó, và bạn được phép nhảy lên tàu ở ga nào mình muốn để "làm vài việc" trước khi tàu chạy tiếp.

👉 Khi một component được tạo ra, Vue sẽ:

- Khởi tạo dữ liệu (reactivity)
- Biên dịch template
- Gắn component vào DOM
- Cập nhật DOM khi dữ liệu thay đổi
- Gỡ component khỏi DOM

Tại mỗi giai đoạn, Vue cho phép bạn chèn code của mình vào thông qua lifecycle hooks.

> **Tóm gọn 1 câu:** Lifecycle hook là "điểm dừng hẹn giờ" trên hành trình của component — code bạn treo ở đó sẽ chạy đúng khoảnh khắc đó.

> 📌 Mục đích:
>
> - Gọi API
> - Truy cập DOM
> - Gắn / hủy event listener
> - Dọn dẹp tài nguyên (timer, subscription…)

# 2. Cách đăng ký Lifecycle Hooks

Mục này nói về "thủ tục đăng ký": cùng một hook nhưng có hai cách viết tùy theo phong cách bạn đang dùng.

Vue 3 hỗ trợ 2 API style:

- Composition API (khuyến nghị)
- Options API (phong cách cũ)

## 2.1. Composition API (`<script setup>`)

**Ví dụ với `onMounted`:**

> 📄 **Code ví dụ:** [`examples/01-2-1-composition-api-script-setup.html`](examples/01-2-1-composition-api-script-setup.html)

> 📌 Hook `onMounted` chạy sau khi component render xong và DOM đã tồn tại.

## 2.2. Options API

> 📄 **Code ví dụ:** [`examples/02-2-2-options-api.js`](examples/02-2-2-options-api.js)

> 📌 Hai cách trên hoàn toàn tương đương về chức năng.

# 3. Các Lifecycle Hooks quan trọng nhất

Mục này soi kỹ 3 hook bạn sẽ dùng nhiều nhất trong thực chiến. Đọc xong là xử lý được phần lớn công việc hằng ngày.

Vue có nhiều hook, nhưng 3 hook được dùng nhiều nhất là:

## 3.1. onMounted / mounted

**⏱ Khi nào chạy?**

- Sau khi component render lần đầu
- DOM đã tồn tại và có thể truy cập

Như lúc **cánh cửa hàng vừa mở khóa**: kệ đã bày xong (DOM sẵn sàng), giờ mới xếp hàng được. Trước đó mà bày hàng là chưa có gì để bày.

**📌 Dùng khi nào?**

- Call API
- Truy cập DOM (ref)
- Khởi tạo thư viện JS (chart, map…)

**✅ Ví dụ:**

> 📄 **Code ví dụ:** [`examples/03-3-1-onmounted-mounted.html`](examples/03-3-1-onmounted-mounted.html)

## 3.2. onUpdated / updated

**⏱ Khi nào chạy?**

- Mỗi lần component re-render do dữ liệu thay đổi

**📌 Dùng khi nào?**

- Theo dõi DOM sau khi dữ liệu đổi
- Debug UI update

> ⚠️ Cẩn thận: chạy rất nhiều lần → không nên dùng cho logic nặng.

> **Tóm gọn 1 câu:** `onUpdated` là hook "nhạy cảm" — nó re-run mỗi lần UI đổi, nên chỉ giao việc nhẹ, đừng giao việc nặng.

**✅ Ví dụ:**

> 📄 **Code ví dụ:** [`examples/04-3-2-onupdated-updated.html`](examples/04-3-2-onupdated-updated.html)

## 3.3. onUnmounted / unmounted

**⏱ Khi nào chạy?**

- Trước khi component bị gỡ khỏi DOM

Đây là lúc **dọn bàn trước khi rời tiệc**: những gì bạn đặt ra (timer, listener, subscription) phải tự mình gỡ lại, kẻo chúng tiếp tục chạy ngầm ăn RAM.

**📌 Dùng khi nào?**

- Clear setInterval, setTimeout
- Remove event listener
- Hủy subscription / observer

**✅ Ví dụ:**

> 📄 **Code ví dụ:** [`examples/05-3-3-onunmounted-unmounted.html`](examples/05-3-3-onunmounted-unmounted.html)

> **Tóm gọn 1 câu:** `onUnmounted` là giờ "dọn bàn" — mọi thứ bạn đặt ra trong đời component phải tự thu hồi ở đây.

# 4. Ngữ cảnh `this` trong Lifecycle Hooks

> ⚠️ Chỉ áp dụng với Options API

Lifecycle hooks được gọi với `this` trỏ đến component

**KHÔNG dùng arrow function nếu cần `this`**

❌ Sai:

> 📄 **Code ví dụ:** [`examples/06-4-ngu-canh-this-trong-lifecycle-hooks.js`](examples/06-4-ngu-canh-this-trong-lifecycle-hooks.js)

✅ Đúng:

> 📄 **Code ví dụ:** [`examples/07-4-ngu-canh-this-trong-lifecycle-hooks.js`](examples/07-4-ngu-canh-this-trong-lifecycle-hooks.js)

> 📌 Composition API không dùng `this`, nên không có vấn đề này.

# 5. Quy tắc quan trọng khi dùng Composition API

## 5.1. Hook phải được đăng ký đồng bộ (synchronous)

Vue chỉ liên kết hook với component nếu nó được gọi trực tiếp trong quá trình setup.

❌ Sai (hook nằm trong `setTimeout`):

> 📄 **Code ví dụ:** [`examples/08-5-1-hook-phai-uoc-ang-ky-ong.js`](examples/08-5-1-hook-phai-uoc-ang-ky-ong.js)

✅ Đúng:

> 📄 **Code ví dụ:** [`examples/09-5-1-hook-phai-uoc-ang-ky-ong.js`](examples/09-5-1-hook-phai-uoc-ang-ky-ong.js)

## 5.2. Có thể gọi hook trong hàm ngoài setup

Miễn là call stack vẫn xuất phát từ `setup()`.

✅ Ví dụ đúng:

> 📄 **Code ví dụ:** [`examples/10-5-2-co-the-goi-hook-trong-ham.js`](examples/10-5-2-co-the-goi-hook-trong-ham.js)

> 📌 Điều này cho phép tạo composables tái sử dụng.

# 6. Sơ đồ vòng đời component (Lifecycle Diagram)

Sơ đồ trong bài thể hiện thứ tự tổng quát:

1. Create component
2. → `setup()`
3. → render
4. → `mounted`
5. → `updated` (nhiều lần)
6. → `unmounted`

> 📌 Không cần nhớ hết ngay, nhưng:
>
> - `mounted`: DOM sẵn sàng
> - `updated`: dữ liệu thay đổi
> - `unmounted`: dọn dẹp

# 7. Tổng kết nhanh (dễ nhớ)

| Hook | Khi nào chạy | Dùng để làm gì |
| :--- | :--- | :--- |
| `onMounted` | Sau khi render | Call API, truy cập DOM |
| `onUpdated` | Sau mỗi update | Theo dõi UI |
| `onUnmounted` | Trước khi bị xóa | Cleanup tài nguyên |

> **Cách đọc bảng này:** ba dòng là ba cột mốc chính của vòng đời (sau khi lên sóng → trong quá trình chạy → trước khi rời sân khấu). Cột giữa trả lời *lúc nào*, cột phải trả lời *giao việc gì*.

> **Tóm gọn 1 câu:** Nhớ ba mốc là đủ đi làm: `onMounted` để bắt đầu, `onUpdated` để theo dõi, `onUnmounted` để dọn dẹp.