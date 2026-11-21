# Scoped CSS trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này hướng dẫn bạn cách quản lý style trong Vue 3 sao cho CSS của component này không "lọt" sang component khác — từ `scoped` cơ bản đến `:deep()`, `:slotted()`, `:global()` và CSS Modules.

## 1. Scoped CSS là gì?

Mục này nói về cơ chế "phòng riêng kín cửa": khi thêm `scoped`, CSS của component chỉ tác động lên chính nó — giống như mỗi căn hộ tự sơn tường nhà mình mà không lo sơn sang nhà hàng xóm.

Khi thẻ `<style>` có thuộc tính `scoped`, CSS của nó sẽ chỉ áp dụng cho các element của **component hiện tại**.

**Cơ chế hoạt động:**
Vue sử dụng PostCSS để biến đổi code của bạn:
1. Thêm một attribute duy nhất (ví dụ: `data-v-f3f3eg5`) vào các element trong component.
2. Biến đổi selector CSS để chỉ nhắm vào các element có attribute đó.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/01-1-scoped-css-la-gi.html`](examples/01-1-scoped-css-la-gi.html)
Sẽ được biên dịch thành:
> 📄 **Code ví dụ:** [`examples/02-1-scoped-css-la-gi.html`](examples/02-1-scoped-css-la-gi.html)

> **Tóm gọn 1 câu:** `scoped` là Vue tự "đóng dấu" mỗi component một attribute riêng rồi neo CSS theo dấu đó — selector của bạn không bao giờ bắn nhầm sang component khác.

## 2. Ghi đè Root Element của Component con

Mục này nói về một "cửa mở" có chủ đích: root element của component con vẫn bị cả CSS scoped của cha chạm tới — để cha có thể căn chỉnh vị trí con từ bên ngoài.

Một component con có **root element** sẽ bị ảnh hưởng bởi cả:
- Scoped CSS của component cha.
- Scoped CSS của chính nó.

> [!TIP]
> Điều này giúp component cha có thể căn chỉnh layout cho component con từ bên ngoài một cách dễ dàng.

> **Tóm gọn 1 câu:** Root element là "cửa chính" — cha có thể chạm tới để căn layout, nhưng các phòng bên trong thì vẫn kín.

## 3. Deep Selectors (Selector chuyên sâu)

Mục này nói về cách "xin chìa khóa vào phòng": `:deep()` cho phép CSS của cha tác động sâu vào bên trong component con, đúng những chỗ mà scoped vốn chặn lại.

Nếu bạn muốn tác động vào các element bên trong component con (không phải root element), bạn cần dùng pseudo-class `:deep()`.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/03-3-deep-selectors-selector-chuyen-sau.html`](examples/03-3-deep-selectors-selector-chuyen-sau.html)
Sẽ biên dịch thành: `.parent[data-v-xxxx] .child-class`.

> **Tóm gọn 1 câu:** `:deep()` là "chìa khóa tháo cửa" — dùng khi chắc chắn cần style sâu vào component con, nhớ dùng tiết kiệm vì nó phá hàng rào scoped.

## 4. Slotted Selectors

Mục này nói về `:slotted()` — vì nội dung cha truyền qua `<slot>` không mặc nhận "thuộc" scoped CSS của con, muốn style chúng phải xin riêng.

Mặc định, scoped CSS không áp dụng cho nội dung được truyền vào qua `<slot>`. Để tác động đến chúng, hãy dùng `:slotted()`.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/04-4-slotted-selectors.html`](examples/04-4-slotted-selectors.html)

> **Tóm gọn 1 câu:** Nội dung slot là "đồ đạc của khách" — `:slotted()` là cách chủ nhà xin phép sắp lại vài món, không hơn.

## 5. Global Selectors

Mục này nói về `:global()` — nút mở "chế độ toàn cục" ngay trong block scoped khi cần style ảnh hưởng ra ngoài mà không muốn tạo file CSS riêng.

Nếu bạn muốn áp dụng một style toàn cục chỉ bên trong component hiện tại (không dùng file CSS riêng), hãy dùng `:global()`.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/05-5-global-selectors.html`](examples/05-5-global-selectors.html)

> **Tóm gọn 1 câu:** `:global()` là "loa phát thanh chung nhà" — dùng ít và có chủ đích, vì nó tác động đến toàn bộ ứng dụng ngay giữa file scoped.

## 6. CSS Modules (Lựa chọn thay thế)

Mục này giới thiệu phương án khác của "phòng riêng kín cửa": thay vì thêm dấu vô danh vào selector, CSS Modules tự đổi tên class thành giá trị duy nhất — không ai trùng ai.

Thay vì `scoped`, bạn có thể dùng CSS Modules bằng cách thêm thuộc tính `module`.

> 📄 **Code ví dụ:** [`examples/06-6-css-modules-lua-chon-thay-the.html`](examples/06-6-css-modules-lua-chon-thay-the.html)

> **Tóm gọn 1 câu:** CSS Modules đạt cùng mục tiêu cách ly nhưng theo kiểu "đổi tên riêng từng class" thay vì "đóng dấu" như scoped.

## 7. Local CSS Variables (`v-bind` trong CSS)

Mục này nói về cây cầu giữa JS và CSS: `v-bind()` cho phép CSS đọc giá trị từ script — đổi biến JS là style đổi theo, như xoay núm vặn độ sáng đèn.

Vue 3 hỗ trợ liên kết các biến JavaScript trực tiếp vào CSS thông qua hàm `v-bind()`.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/07-7-local-css-variables-v-bind-trong-css.html`](examples/07-7-local-css-variables-v-bind-trong-css.html)

## 8. Tóm tắt nhanh (Cheat Sheet)

Mục này gom cả bài vào một bảng tra nhanh — nhớ bảng này là đủ dùng hằng ngày.

| Kỹ thuật | Cú pháp | Mục đích |
| :--- | :--- | :--- |
| **Scoped cơ bản** | `<style scoped>` | Chỉ áp dụng CSS cho component hiện tại |
| **Deep Selector** | `:deep(.selector)` | Tác động vào sâu bên trong component con |
| **Slotted Selector** | `:slotted(.selector)` | Tác động vào nội dung trong slot |
| **Global Selector** | `:global(.selector)` | Định nghĩa style toàn cục trong component |
| **CSS v-bind** | `color: v-bind(color)` | Dùng biến JS trong CSS |

> **Cách đọc bảng này:** cột giữa là cú pháp gõ ngay được, hai cột hai bên trả lời "nó là gì" và "dùng để làm gì" — dò hàng ngang theo kỹ thuật bạn cần.

---
> [!IMPORTANT]
> Scoped CSS không thay thế hoàn toàn việc tổ chức CSS. Với các style dùng chung toàn app, bạn vẫn nên dùng các file CSS toàn cục hoặc hệ thống Design System.

> **Tóm gọn 1 câu:** `scoped` là hàng rào giữa các căn hộ — cần mở cửa thì có `:deep()`, `:slotted()`, `:global()`, nhưng hàng rào không thay thế quy hoạch chung của cả khu.

