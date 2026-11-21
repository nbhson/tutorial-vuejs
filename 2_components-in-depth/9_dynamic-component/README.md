# Dynamic Components trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này nói về cách "đổi diễn viên trên cùng một sân khấu": một vị trí render duy nhất, nhiều component thay nhau lên — dùng `<component :is>` thay cho chuỗi `v-if` dài lê thê.

## 1. Khi nào dùng?

Mục này trả lời "đời sống thực" của dynamic component: mọi tình huống có nhiều màn hình thay nhau chiếm cùng một chỗ.

Sử dụng khi bạn muốn chuyển đổi qua lại giữa các component khác nhau tại cùng một vị trí mà không muốn dùng quá nhiều lệnh `v-if` / `v-else`.

**Các ví dụ phổ biến:**
- Hệ thống các **Tabs** (tab nội dung).
- Chuyển đổi giữa các **Views** (layout).
- Các bước trong một **Wizard/Multi-step form**.

## 2. Cú pháp

Mục này nói về cách viết: phần tử đặc biệt `<component>` với attribute `:is` — `:is` nhận "diễn viên" dưới dạng tên (string) hoặc đối tượng component (object).

Sử dụng phần tử đặc biệt `<component>` kết hợp với attribute `:is`.

**Cách 1: Truyền bằng tên (String)**
> 📄 **Code ví dụ:** [`examples/01-2-cu-phap.html`](examples/01-2-cu-phap.html)
*(`currentTab` là một chuỗi chứa tên component đã được đăng ký)*

**Cách 2: Truyền bằng đối tượng (Object)**
> 📄 **Code ví dụ:** [`examples/02-2-cu-phap.html`](examples/02-2-cu-phap.html)
*(`tabs[currentTab]` trả về trực tiếp đối tượng component đã được import)*

> [!TIP]
> Giá trị truyền vào `:is` có thể là:
> - Tên component (dưới dạng string).
> - Hoặc trực tiếp đối tượng component đã được import vào file.

## 3. Giữ trạng thái với `<KeepAlive>`

Mục này nói về cái giá phải trả khi đổi component: mặc định diễn viên cũ bị "hạ màn" hoàn toàn mất hết đạo cụ — muốn giữ đạo cụ thì bọc `<KeepAlive>`.

Mặc định, khi chuyển đổi, component cũ sẽ bị **unmount** (hủy bỏ hoàn toàn). Nếu bạn muốn giữ lại trạng thái (ví dụ: dữ liệu đã nhập trong input), hãy bọc nó bằng `<KeepAlive>`.

> 📄 **Code ví dụ:** [`examples/03-3-giu-trang-thai-voi-keepalive.html`](examples/03-3-giu-trang-thai-voi-keepalive.html)

> **Tóm gọn 1 câu:** `<component :is>` là "sân khấu xoay diễn viên" — thêm `<KeepAlive>` thì diễn viên ra sân vẫn cầm nguyên đạo cụ khi trở lại.
