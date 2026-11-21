# Transition trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này đi qua toàn bộ về `<Transition>` trong Vue 3: từ cơ chế hoạt động, sáu class CSS, đến named transition, JS hooks và lưu ý hiệu năng — kèm ví dụ cho từng phần.

---

## 1. `<Transition>` là gì?

Mục này giới thiệu "người đạo diễn sân khấu": `<Transition>` lo mọi khâu ra vào của phần tử — bạn chỉ cần dàn dựng, Vue lo đôn đáo từng khung hình.

`<Transition>` là một component dựng sẵn của Vue dùng để tạo hiệu ứng animation/transition khi một phần tử hoặc component xuất hiện hoặc biến mất khỏi DOM.

📌 **Áp dụng khi:**
- Sử dụng `v-if`.
- Sử dụng `v-show`.
- Thay đổi component động thông qua `<component :is="..." />`.
- Thay đổi giá trị của thuộc tính `key`.

> [!IMPORTANT]
> - `<Transition>` chỉ bao bọc **một phần tử hoặc một component duy nhất**.
> - Component bên trong cũng chỉ được phép có **một root element duy nhất**.

**Ví dụ cơ bản:**

> 📄 **Code ví dụ:** [`examples/01-1-transition-la-gi.html`](examples/01-1-transition-la-gi.html)

> **Tóm gọn 1 câu:** `<Transition>` là "người đạo diễn" cho mọi cảnh ra vào — bọc phần tử lại là có animation, miễn là cảnh trên sân chỉ có một diễn viên chính.

---

## 2. Cách Vue xử lý Transition

Mục này "mở hậu trường" cho bạn xem đạo diễn làm việc: bốn bước Vue tự thực hiện khi phần tử ra vào DOM.

Khi một phần tử đi vào hoặc ra khỏi DOM, Vue sẽ:
1. Tự động kiểm tra xem phần tử đích có các CSS transition hoặc animation được áp dụng hay không.
2. Gắn các class transition tương ứng vào phần tử tại những thời điểm nhất định.
3. Gọi các JavaScript hooks (nếu có) để thực hiện logic tùy chỉnh.
4. Nếu không phát hiện CSS hay JavaScript hooks, các thao tác DOM sẽ được thực thi ngay lập tức.

---

## 3. Các lớp CSS trong Transition (Transition Classes)

Mục này nói về "trang phục" Vue mặc cho phần tử: sáu class chia theo giai đoạn vào/ra — hiểu bản đồ class này là tự viết được mọi hiệu ứng CSS.

Vue sử dụng 6 class chính để quản lý quá trình chuyển đổi:

| Class | Ý nghĩa |
| :--- | :--- |
| **`v-enter-from`** | Trạng thái bắt đầu khi phần tử xuất hiện |
| **`v-enter-active`** | Áp dụng trong suốt quá trình phần tử xuất hiện |
| **`v-enter-to`** | Trạng thái kết thúc khi phần tử đã xuất hiện |
| **`v-leave-from`** | Trạng thái bắt đầu khi phần tử biến mất |
| **`v-leave-active`** | Áp dụng trong suốt quá trình phần tử biến mất |
| **`v-leave-to`** | Trạng thái kết thúc khi phần tử đã biến mất |

> **Cách đọc bảng này:** chia đôi theo enter (vào) và leave (ra), mỗi bên ba giai đoạn from → active → to như "chuẩn bị → diễn → về đích" — ghi nhớ 3 cặp giai đoạn là nhớ cả 6 class.

📌 **Thường dùng nhất:**
- `*-enter-active`, `*-leave-active`: Để khai báo thuộc tính `transition` hoặc `animation`.
- `*-enter-from`, `*-leave-to`: Để khai báo các giá trị bắt đầu và kết thúc của hiệu ứng.

---

## 4. Transition có tên (Named Transition)

Mục này nói về việc "đặt tên đoàn kịch": `name="fade"` đổi tiền tố class từ `v-` thành `fade-` — nhiều hiệu ứng chung sống trong một app mà không giẫm chân nhau.

Giúp bạn dễ dàng quản lý và phân biệt nhiều hiệu ứng khác nhau trong cùng một ứng dụng.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/02-4-transition-co-ten-named-transition.html`](examples/02-4-transition-co-ten-named-transition.html)

> 📄 **Code ví dụ:** [`examples/03-4-transition-co-ten-named-transition.css`](examples/03-4-transition-co-ten-named-transition.css)
👉 Khi có `name="fade"`, Vue sẽ tự động thay đổi tiền tố mặc định từ `v-` thành `fade-`.

---

## 5. Transition bằng CSS Transition

Mục này nói về "chất liệu" thứ nhất: CSS transition — nhẹ, mượt, hợp cho các thay đổi đơn giản về `opacity`, `transform`, `scale`, `translate`.

Phù hợp cho các thay đổi đơn giản về: `opacity`, `transform`, `scale`, `translate`.

**Ví dụ: Hiệu ứng Slide kết hợp Fade**
> 📄 **Code ví dụ:** [`examples/04-5-transition-bang-css-transition.css`](examples/04-5-transition-bang-css-transition.css)

> **Tóm gọn 1 câu:** CSS transition là "món ăn thường ngày" — khai báo một thuộc tính `transition` là có hiệu ứng mượt cho các thay đổi đơn giản.

---

## 6. Transition bằng CSS Animation

Mục này nói về "chất liệu" thứ hai: `@keyframes` — mạnh hơn cho các hiệu ứng nhiều chặng phức tạp như bounce.

Sử dụng `@keyframes` để tạo các hiệu ứng phức tạp hơn.

**Ví dụ: Hiệu ứng Bounce**
> 📄 **Code ví dụ:** [`examples/05-6-transition-bang-css-animation.css`](examples/05-6-transition-bang-css-animation.css)
📌 Vue sẽ tự động lắng nghe sự kiện `animationend` để kết thúc quá trình transition.

---

## 7. Custom Transition Classes

Mục này nói về cách "mượn trang phục bên ngoài": đổi tên class để khớp với thư viện animation như Animate.css hay GSAP.

Hữu ích khi bạn muốn tích hợp các thư viện bên ngoài như **Animate.css** hoặc **GSAP**.

> 📄 **Code ví dụ:** [`examples/06-7-custom-transition-classes.html`](examples/06-7-custom-transition-classes.html)

---

## 8. Kết hợp Transition & Animation

Mục này nói về lúc "hai đoàn kịch cùng diễn": khi một phần tử vừa có transition vừa có animation, phải chỉ định cho Vue biết ai quyết định giờ kết thúc.

Nếu một phần tử vừa áp dụng `transition` vừa áp dụng `animation` cùng lúc, bạn cần chỉ định cho Vue biết loại nào sẽ quyết định thời gian kết thúc.

> 📄 **Code ví dụ:** [`examples/07-8-ket-hop-transition-animation.html`](examples/07-8-ket-hop-transition-animation.html)

---

## 9. Transition lồng nhau (Nested Transition)

Mục này nói về việc "chỉ đạo từ xa": Transition gắn trên root element, nhưng class của nó vẫn điều khiển được các phần tử con bên trong — và có thể khai báo tổng thời gian để Vue tính đúng.

Mặc dù `<Transition>` chỉ áp dụng trực tiếp lên root element, nhưng bạn vẫn có thể sử dụng các class transition để điều khiển các phần tử con bên trong.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/08-9-transition-long-nhau-nested-transition.css`](examples/08-9-transition-long-nhau-nested-transition.css)

**Chỉ định thời gian (Duration):**
> 📄 **Code ví dụ:** [`examples/09-9-transition-long-nhau-nested-transition.html`](examples/09-9-transition-long-nhau-nested-transition.html)

---

## 10. Lưu ý về Hiệu năng (Performance)

Mục này là "khuyến nghị dinh dưỡng" cho animation: dùng thuộc tính nhẹ (opacity, transform), tránh thuộc tính gây reflow (height, margin, padding) — tương tự việc chọn thang máy thay vì đập tường mỗi lần lên xuống.

✅ **NÊN dùng các thuộc tính nhẹ:** `opacity`, `transform`.
❌ **HẠN CHẾ dùng:** `height`, `margin`, `padding`.

👉 Bởi vì `height`, `margin`, `padding` sẽ gây ra các trình trạng **reflow** và **repaint** nặng, làm giảm hiệu năng ứng dụng, đặc biệt trên thiết bị di động.

---

## 11. JavaScript Transition Hooks

Mục này nói về việc "cầm đất lái" bằng JavaScript: khi CSS không đủ, hooks cho bạn toàn quyền điều khiển từng chặng animation.

Sử dụng khi bạn cần kiểm soát hoàn toàn quá trình animation bằng JavaScript (ví dụ dùng GSAP).

> 📄 **Code ví dụ:** [`examples/10-11-javascript-transition-hooks.html`](examples/10-11-javascript-transition-hooks.html)

> 📄 **Code ví dụ:** [`examples/11-11-javascript-transition-hooks.js`](examples/11-11-javascript-transition-hooks.js)
> [!IMPORTANT]
> Khi sử dụng `:css="false"`, bạn **bắt buộc** phải gọi hàm `done()` trong các hook `enter` và `leave` để Vue biết khi nào tiến trình hoàn tất.

---

## 12. Tạo Transition tái sử dụng (Reusable Transition)

Mục này nói về cách "đóng khung" hiệu ứng thành component: viết một lần, dùng ở mọi nơi như một component bình thường.

Tạo một component bọc `<Transition>` để sử dụng lại ở nhiều nơi.

**`MyTransition.vue`**
> 📄 **Code ví dụ:** [`examples/12-12-tao-transition-tai-su-dung-reusable-transition.html`](examples/12-12-tao-transition-tai-su-dung-reusable-transition.html)

**Sử dụng:**
> 📄 **Code ví dụ:** [`examples/13-12-tao-transition-tai-su-dung-reusable-transition.html`](examples/13-12-tao-transition-tai-su-dung-reusable-transition.html)

---

## 13. Các tính năng mở rộng khác

Mục này là "tủ phụ kiện" của Transition: `appear` cho màn ra mắt đầu tiên, modes điều phối vào/ra, và mẹo dùng `key` để ép kích hoạt hiệu ứng.

- **`appear`**: Kích hoạt hiệu ứng ngay lần đầu tiên component được render.
- **Transition Modes**: Điều phối thứ tự giữa phần tử cũ và phần tử mới.
    - `out-in`: Phần tử cũ biến mất xong mới hiện phần tử mới.
    - `in-out`: Phần tử mới hiện lên rồi phần tử cũ mới biến mất.
- **Transition giữa các Elements**: Sử dụng cho các phần tử thay thế nhau (thường dùng `v-if` / `v-else`).
- **Transition với `key`**: Ép Vue render lại và kích hoạt transition ngay cả khi cùng một loại phần tử.

> 📄 **Code ví dụ:** [`examples/14-13-cac-tinh-nang-mo-rong-khac.html`](examples/14-13-cac-tinh-nang-mo-rong-khac.html)

---

## 14. Tổng kết nhanh 🎯

Mục này gom cả bài vào một bảng ghi nhớ cuối cùng.

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **`<Transition>`** | Tạo animation khi phần tử vào hoặc ra khỏi DOM |
| **CSS Transition** | Phổ biến, nhẹ nhàng và dễ triển khai |
| **CSS Animation** | Dùng cho các hiệu ứng phức tạp với `@keyframes` |
| **JS Hooks** | Dùng khi cần toàn quyền điều khiển bằng mã lệnh |
| **`mode`** | Rất quan trọng để tối ưu trải nghiệm thay đổi nội dung |
| **`key`** | Bắt buộc nếu muốn tạo hiệu ứng khi cùng một element thay đổi giá trị |

> **Cách đọc bảng này:** dò theo hàng ngang — hàng nào tương ứng nhu cầu của bạn (đơn giản → CSS Transition, phức tạp → Animation, cần quyền điều khiển → JS Hooks) thì quay lại section đó xem ví dụ.

> **Tóm gọn 1 câu:** `<Transition>` lo trọn cảnh ra vào của phần tử — CSS cho việc thường, `@keyframes` cho cảnh khó, JS hooks cho cảnh cần chỉ đạo từng nhịp.
