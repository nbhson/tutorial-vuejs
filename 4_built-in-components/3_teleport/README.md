# Teleport trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này đi qua toàn bộ về `<Teleport>` trong Vue 3: vì sao cần "dịch chuyển" render, cách dùng, các thuộc tính `to`/`disabled`/`defer` — kèm ví dụ cho từng phần.

---

## 1. `<Teleport>` là gì?

Mục này giới thiệu "cổng dịch chuyển": component làm việc ở đâu vẫn vậy, nhưng phần hiển thị được chuyển sang điểm khác trong DOM — như làm việc ở tầng 3 mà bán hàng ở tầng trệt.

`<Teleport>` là một built-in component của Vue 3, cho phép bạn **render (hiển thị)** một phần template sang một vị trí khác trong DOM, nằm ngoài cây DOM của component hiện tại, nhưng vẫn giữ nguyên logic và trạng thái của component đó.

👉 **Nói ngắn gọn:**
- **Logic:** Nằm ở một nơi (trong component).
- **Hiển thị:** Nằm ở nơi khác trong DOM (ví dụ: cuối thẻ `<body>`).

> **Tóm gọn 1 câu:** `<Teleport>` là "cổng dịch chuyển thân xác hiển thị" — người ở đâu trong component tree vẫn vậy, nhưng DOM thì xuất hiện ở chỗ khác.

---

## 2. Vì sao cần `<Teleport>`?

Mục này kể "án mạng layout" mà modal hay gặp: CSS của tổ tiên (overflow, z-index, transform) bóp nghẹt lớp phủ dù bạn không hề muốn vậy.

### Vấn đề thường gặp:
Khi một component bị lồng quá sâu trong cấu trúc DOM, việc hiển thị các thành phần dạng lớp phủ (overlay) như Modal, Popup, Dropdown sẽ gặp khó khăn do ảnh hưởng từ CSS của các component cha:
- `overflow: hidden`: Làm mất một phần modal.
- `z-index`: Bị giới hạn bởi ngữ cảnh xếp chồng (stacking context) của cha.
- `transform`: Làm thay đổi cách tính vị trí `position: fixed`.

**Ví dụ cấu trúc lỗi:**
> 📄 **Code ví dụ:** [`examples/01-van-e-thuong-gap.html`](examples/01-van-e-thuong-gap.html)
👉 `MyModal` sẽ bị giới hạn không gian hiển thị bởi lớp `.outer`.

---

## 3. Ví dụ khi KHÔNG dùng `<Teleport>`

Mục này là "hiện trường vụ án": một modal viết bình thường đặt trong DOM lồng sâu, để bạn thấy các vấn đề tiềm ẩn trước khi chữa.

**MyModal.vue**
> 📄 **Code ví dụ:** [`examples/02-3-vi-du-khi-khong-dung-teleport.html`](examples/02-3-vi-du-khi-khong-dung-teleport.html)

❌ **Các vấn đề tiềm ẩn:**
- `position: fixed` có thể bị sai lệch nếu cha có thuộc tính `transform`.
- `z-index` bị giới hạn trong DOM cha, modal có thể bị che khuất bởi các phần tử khác cùng cấp với cha.

---

## 4. Cách dùng `<Teleport>` (Basic Usage)

Mục này là "liều thuốc": bọc nội dung trong `<Teleport to="body">` — modal được đẩy thẳng ra cuối `<body>`, thoát khỏi mọi ràng buộc CSS của tổ tiên.

**Cú pháp cơ bản:**
> 📄 **Code ví dụ:** [`examples/03-4-cach-dung-teleport-basic-usage.html`](examples/03-4-cach-dung-teleport-basic-usage.html)

**Ví dụ sửa lại MyModal.vue:**
> 📄 **Code ví dụ:** [`examples/04-4-cach-dung-teleport-basic-usage.html`](examples/04-4-cach-dung-teleport-basic-usage.html)

**Kết quả:**
- Toàn bộ khối `.modal` sẽ được đẩy trực tiếp ra làm con của thẻ `<body>`.
- Không bị ảnh hưởng bởi CSS của component cha.
- Mọi logic xử lý sự kiện (click đóng modal) vẫn hoạt động hoàn hảo.

---

## 5. Thuộc tính `to`

Mục này nói về "địa chỉ đích": `to` nhận cả CSS selector lẫn DOM node thật — bạn trỏ cổng dịch chuyển đến bất kỳ nơi nào có thật trong DOM.

Thuộc tính `to` xác định nơi mà nội dung sẽ được render vào. Nó chấp nhận:

- **CSS selector:**
  > 📄 **Code ví dụ:** [`examples/05-5-thuoc-tinh-to.html`](examples/05-5-thuoc-tinh-to.html)
- **DOM node thực tế:**
  > 📄 **Code ví dụ:** [`examples/06-5-thuoc-tinh-to.html`](examples/06-5-thuoc-tinh-to.html)

> [!WARNING]
> **Quan trọng:** Target (mục tiêu) PHẢI tồn tại trong DOM từ trước khi `<Teleport>` được mount. Nếu bạn teleport vào một element do chính Vue quản lý, hãy đảm bảo element đó đã xuất hiện.

---

## 6. `<Teleport>` KHÔNG làm thay đổi logic component

Mục này trấn an điểm quan trọng nhất: "thân xác" dịch chuyển nhưng "linh hồn" nguyên vẹn — props, emits, provide/inject, Devtools vẫn hoạt động như chưa có gì xảy ra.

Dù mã HTML bị "dịch chuyển" đi nơi khác trong cây DOM, mối quan hệ giữa các component vẫn không đổi:

- Component con bên trong `<Teleport>` vẫn nhận được **props** từ cha.
- Các sự kiện **emits** từ con vẫn được cha lắng nghe bình thường.
- Cơ chế **provide / inject** vẫn hoạt động xuyên suốt.
- Trên **Vue Devtools**, component vẫn nằm đúng vị trí trong cây component logic.

> **Tóm gọn 1 câu:** Teleport chỉ dời "nhà ở", không dời "hộ khẩu" — mọi quan hệ component vẫn giữ nguyên.

---

## 7. Tắt `<Teleport>` bằng thuộc tính `disabled`

Mục này nói về "nút bật/tắt cổng dịch chuyển": `disabled` cho phép cùng một component render đúng chỗ trên desktop mà inline trên mobile.

Dùng khi bạn muốn thay đổi vị trí render dựa trên điều kiện (ví dụ: Responsive).

- **Desktop:** Hiện modal dạng overlay dịch chuyển ra `body`.
- **Mobile:** Hiện modal inline ngay tại vị trí hiện tại.

> 📄 **Code ví dụ:** [`examples/07-7-tat-teleport-bang-thuoc-tinh-disabled.html`](examples/07-7-tat-teleport-bang-thuoc-tinh-disabled.html)
👉 Khi `disabled="true"`, nội dung sẽ được render ngay tại chỗ mà không bị đẩy đi nơi khác.

---

## 8. Nhiều `<Teleport>` cùng một target

Mục này nói về việc "nhiều nguồn chảy về một đích": nhiều Teleport trỏ cùng target được thì nội dung xếp hàng theo thứ tự mount.

Bạn có thể đẩy nội dung từ nhiều nơi vào cùng một target.

> 📄 **Code ví dụ:** [`examples/08-8-nhieu-teleport-cung-mot-target.html`](examples/08-8-nhieu-teleport-cung-mot-target.html)

**Kết quả DOM:**
> 📄 **Code ví dụ:** [`examples/09-8-nhieu-teleport-cung-mot-target.html`](examples/09-8-nhieu-teleport-cung-mot-target.html)
👉 Các phần tử sẽ được thêm vào (append) theo thứ tự mà chúng được mount.

---

## 9. `defer` – Teleport trễ (Vue 3.5+)

Mục này nói về "hẹn giờ dịch chuyển": khi target chưa kịp xuất hiện (nằm dưới Teleport trong cùng template), `defer` nhắc Vue đợi đến hết tick render rồi mới gửi hàng đi.

Hữu ích khi target được render sau hoặc nằm bên dưới chính `<Teleport>` trong cùng một template.

> 📄 **Code ví dụ:** [`examples/10-9-defer-teleport-tre-vue-3-5.html`](examples/10-9-defer-teleport-tre-vue-3-5.html)

> [!NOTE]
> Thuộc tính `defer` chỉ hoạt động nếu target xuất hiện trong cùng một chu kỳ render (tick). Nó không dùng để đợi các tác vụ bất đồng bộ (async).

---

## 10. Trường hợp sử dụng phổ biến 🚀

Mục này là "danh sách khách mời thường trực" của Teleport: mọi loại lớp phủ nổi trên giao diện.

✅ **Các thành phần nên dùng Teleport:**
- **Modal / Dialog:** Lớp phủ ứng dụng.
- **Tooltip:** Hiển thị thông tin khi di chuột.
- **Dropdown:** Danh sách lựa chọn.
- **Toast / Notification:** Thông báo hệ thống.
- **Context menu:** Trình đơn chuột phải.

---

## 11. Tóm tắt nhanh (Cheat Sheet) 🎯

Mục này gom cả bài vào một bảng ghi nhớ cuối cùng.

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Mục đích** | Render DOM ra ngoài cây hiện tại để tránh lỗi layout/CSS |
| **Logic** | Không bị ảnh hưởng, vẫn giữ nguyên quan hệ Cha-Con |
| **Thuộc tính `to`** | Chấp nhận CSS selector hoặc DOM node |
| **`disabled`** | Tắt tính năng teleport, render nội dung tại chỗ |
| **Nhiều teleport** | Sẽ được thêm vào target theo thứ tự xuất hiện |
| **Vue 3.5+** | Hỗ trợ thuộc tính `defer` cho các target nằm phía dưới |

> **Cách đọc bảng này:** dò theo hàng ngang — cần nhớ "vì sao" nhìn hai hàng đầu, cần cú pháp nhìn bốn hàng sau; khi nghi ngờ hành vi của một thuộc tính, tra đúng hàng của nó.

> **Tóm gọn 1 câu:** `<Teleport>` dời hiển thị khỏi DOM lồng sâu để thoát CSS của tổ tiên — logic nguyên vẹn, `to` chọn đích, `disabled` tắt cổng, `defer` hẹn giờ.