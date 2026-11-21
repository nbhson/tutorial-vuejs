# Slots trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này đi qua toàn bộ về **Slots** trong Vue 3 theo đúng cấu trúc tài liệu chính thức: từ slot cơ bản, named slot, đến scoped slot và renderless component — mỗi phần đều có ví dụ kèm theo.

## 1. Slot là gì? (Slot Content & Slot Outlet)

Mục này nói về khái niệm mở đầu của cả bài: slot là "khe cắm nội dung" — con đui sẵn ổ điện, cha cắm phích gì thì sáng cái đó.

**Khái niệm:**
- **Slot** cho phép component cha truyền template (HTML) vào component con.
- Component con quyết định **render ở đâu**, còn component cha quyết định **nội dung**.

👉 Slot giống như những “chỗ trống” trong component con để component cha điền nội dung vào.

**Ví dụ cơ bản:**

**Component cha:**
> 📄 **Code ví dụ:** [`examples/01-1-slot-la-gi-slot-content-slot-outlet.html`](examples/01-1-slot-la-gi-slot-content-slot-outlet.html)

**Component con (`FancyButton.vue`):**
> 📄 **Code ví dụ:** [`examples/02-1-slot-la-gi-slot-content-slot-outlet.html`](examples/02-1-slot-la-gi-slot-content-slot-outlet.html)

👉 **Kết quả render:**
> 📄 **Code ví dụ:** [`examples/03-1-slot-la-gi-slot-content-slot-outlet.html`](examples/03-1-slot-la-gi-slot-content-slot-outlet.html)

> [!NOTE]
> `<slot>` được gọi là **slot outlet** (điểm đặt nội dung).

> **Tóm gọn 1 câu:** Con đặt `<slot>` (ổ cắm), cha đổ nội dung (phích cắm) — nơi render do con quyết, nội dung do cha quyết.

## 2. Slot không chỉ là text

Mục này nói về "loại hàng" được gửi qua slot: không chỉ chữ, mà cả HTML, khối phần tử lồng nhau hay cả component khác đều gửi được.

Slot có thể chứa bất kỳ kiểu nội dung nào:
- HTML thô.
- Nhiều phần tử lồng nhau.
- Các component khác.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/04-2-slot-khong-chi-la-text.html`](examples/04-2-slot-khong-chi-la-text.html)

> **Tóm gọn 1 câu:** Slot nhận mọi thứ template nhận được — text, HTML, component — không giới hạn "loại hàng".

## 3. Render Scope (Phạm vi dữ liệu của Slot)

Mục này nói về quy tắc "đồ của ai, người đó dùng": nội dung slot render trong scope của cha, nên không truy cập được dữ liệu riêng của con — như món quà bạn gói ở nhà thì chữ ký trên thiệp vẫn là của bạn.

**Nguyên tắc quan trọng:**
- Slot sử dụng scope của component cha.
- **KHÔNG** truy cập được dữ liệu bên trong của component con.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/05-3-render-scope-pham-vi-du-lieu-cua.html`](examples/05-3-render-scope-pham-vi-du-lieu-cua.html)
👉 Cả hai `{{ message }}` đều lấy giá trị từ parent, không phải từ `FancyButton`.

> [!IMPORTANT]
> Cơ chế này giống như **lexical scope** trong JavaScript.

> **Tóm gọn 1 câu:** Nội dung slot "sinh ra ở đâu thì theo scope đó" — luôn là scope của cha, dù render trong nhà con.

## 4. Fallback Content (Nội dung mặc định cho Slot)

Mục này nói về "kế hoạch B": khi cha không truyền gì vào slot, con hiển thị nội dung dự phòng có sẵn — như quán cơm có món mặc định nếu bạn không gọi món.

Sử dụng khi component cha không truyền bất kỳ nội dung nào vào slot.

**Ví dụ:**

**Component con:**
> 📄 **Code ví dụ:** [`examples/06-4-fallback-content-noi-dung-mac-inh-cho.html`](examples/06-4-fallback-content-noi-dung-mac-inh-cho.html)

**Component cha (không truyền nội dung):**
> 📄 **Code ví dụ:** [`examples/07-4-fallback-content-noi-dung-mac-inh-cho.html`](examples/07-4-fallback-content-noi-dung-mac-inh-cho.html)
👉 **Render:** `<button>Submit</button>`

**Component cha (truyền nội dung):**
> 📄 **Code ví dụ:** [`examples/08-4-fallback-content-noi-dung-mac-inh-cho.html`](examples/08-4-fallback-content-noi-dung-mac-inh-cho.html)
👉 **Render:** `<button>Save</button>`

> **Tóm gọn 1 câu:** Fallback là "món mặc định" — cha gọi món thì ra món đó, không gọi thì ra món nhà bếp đã chuẩn bị sẵn.

## 5. Named Slots (Slot có tên)

Mục này nói về việc mở nhiều "khe cắm có nhãn" trong một component: header vào kẻo header, footer vào kẻo footer — như tủ có nhiều ngăn, mỗi ngăn một nhãn.

Sử dụng khi component có nhiều vị trí render nội dung khác nhau.

**Component con:**
> 📄 **Code ví dụ:** [`examples/09-5-named-slots-slot-co-ten.html`](examples/09-5-named-slots-slot-co-ten.html)

**Component cha (truyền nội dung):**
> 📄 **Code ví dụ:** [`examples/10-5-named-slots-slot-co-ten.html`](examples/10-5-named-slots-slot-co-ten.html)

> [!TIP]
> Slot không khai báo `name` mặc định sẽ được coi là slot `default`.

> **Tóm gọn 1 câu:** Nhiều khe cắm thì gắn nhãn `<slot name="...">` — khe nào không nhãn chính là khe `default`.

## 6. Conditional Slots (Slot có điều kiện)

Mục này nói về việc "kiểm tra hàng trước khi dựng kệ": dùng `$slots` để chỉ render wrapper khi slot thật sự có nội dung.

**Mục đích:** Chỉ render wrapper bao quanh khi slot thực sự tồn tại nội dung.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/11-6-conditional-slots-slot-co-ieu-kien.html`](examples/11-6-conditional-slots-slot-co-ieu-kien.html)
📌 `$slots` là một object dùng để kiểm tra slot nào đang được truyền nội dung.

## 7. Dynamic Slot Names (Tên slot động)

Mục này nói về nhãn khe cắm "viết bằng biến": tên slot phụ thuộc dữ liệu JavaScript, dựng qua dynamic arguments `[]` của Vue.

Sử dụng khi tên slot phụ thuộc vào một biến JavaScript.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/12-7-dynamic-slot-names-ten-slot-ong.html`](examples/12-7-dynamic-slot-names-ten-slot-ong.html)
📌 Sử dụng **dynamic arguments** của Vue với cú pháp `[]`.

## 8. Scoped Slots (Slot nhận dữ liệu từ con)

Mục này nói về bước ngoặt của bài: thay vì cha chỉ "đưa hàng vào", giờ con gửi ngược dữ liệu cho cha dùng khi render — như nhà hàng đưa nguyên liệu để khách tự trổ món theo công thức của mình.

**Vấn đề:** Mặc định slot không truy cập được data của con.
**Giải pháp:** Truyền dữ liệu từ con ngược lên slot để cha có thể sử dụng.

**Component con:**
> 📄 **Code ví dụ:** [`examples/13-8-scoped-slots-slot-nhan-du-lieu-tu.html`](examples/13-8-scoped-slots-slot-nhan-du-lieu-tu.html)

**Component cha (nhận dữ liệu qua `v-slot`):**
> 📄 **Code ví dụ:** [`examples/14-8-scoped-slots-slot-nhan-du-lieu-tu.html`](examples/14-8-scoped-slots-slot-nhan-du-lieu-tu.html)

**Hoặc dùng Destructuring:**
> 📄 **Code ví dụ:** [`examples/15-8-scoped-slots-slot-nhan-du-lieu-tu.html`](examples/15-8-scoped-slots-slot-nhan-du-lieu-tu.html)

> [!NOTE]
> Scoped slot hoạt động tương tự như một hàm nhận tham số trong JavaScript.

> **Tóm gọn 1 câu:** Scoped slot là "hàm nhận tham số trong template" — con truyền dữ liệu, cha quyết định hiển thị thế nào.

## 9. Named Scoped Slots

Mục này ghép hai kỹ thuật trước: slot vừa có tên vừa có dữ liệu truyền ngược — nhận tham số qua `v-slot:name` hoặc destructuring.

**Ví dụ:**

**Component con:**
> 📄 **Code ví dụ:** [`examples/16-9-named-scoped-slots.html`](examples/16-9-named-scoped-slots.html)

**Component cha:**
> 📄 **Code ví dụ:** [`examples/17-9-named-scoped-slots.html`](examples/17-9-named-scoped-slots.html)

## 10. Lưu ý khi kết hợp Default Slot và Named Slot

Mục này nói về quy tắc "một thẻ, một khe": mỗi thẻ template chỉ được khai báo một `v-slot` — muốn cả default lẫn named thì phải viết riêng từng thẻ.

❌ **Sai (không thể compile):**
> 📄 **Code ví dụ:** [`examples/18-10-luu-y-khi-ket-hop-default-slot.html`](examples/18-10-luu-y-khi-ket-hop-default-slot.html)

✅ **Đúng:**
> 📄 **Code ví dụ:** [`examples/19-10-luu-y-khi-ket-hop-default-slot.html`](examples/19-10-luu-y-khi-ket-hop-default-slot.html)

## 11. Ví dụ thực tế: `FancyList` (Scoped Slot thực dụng)

Mục này là "mẫu nhà đẹp" của scoped slot: con lo thu thập và xử lý dữ liệu, cha lo trang trí — phân công lao động rõ ràng.

**Component cha:**
> 📄 **Code ví dụ:** [`examples/20-11-vi-du-thuc-te-fancylist-scoped-slot.html`](examples/20-11-vi-du-thuc-te-fancylist-scoped-slot.html)

**Component con:**
> 📄 **Code ví dụ:** [`examples/21-11-vi-du-thuc-te-fancylist-scoped-slot.html`](examples/21-11-vi-du-thuc-te-fancylist-scoped-slot.html)
👉 **Logic** xử lý dữ liệu ở con – **UI** trang trí ở cha. Rất linh hoạt!

## 12. Renderless Components

Mục này nói về cực đoan hữu ích của slot: component không render HTML nào của riêng mình, chỉ thuần logic — như một nhà cung cấp chỉ giao nguyên liệu, món ăn hoàn toàn do đầu bếp (cha) chế biến.

**Khái niệm:**
- Là component không render bất kỳ mã HTML nào của riêng nó.
- Chỉ chứa logic xử lý, để slot (do cha truyền vào) quyết định UI hoàn toàn.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/22-12-renderless-components.html`](examples/22-12-renderless-components.html)
📌 Trong Vue 3, chúng ta thường dùng **Composition API** thay vì renderless component, nhưng kiến thức về scoped slot vẫn rất quan trọng để xây dựng component thư viện.

## 13. Tổng kết nhanh

Mục này gom toàn bộ các loại slot vào một bảng ôn nhanh.

| Tính năng | Mục đích |
| :--- | :--- |
| **Slot** | Truyền nội dung (HTML/Component) từ cha xuống con |
| **Fallback** | Hiển thị nội dung mặc định khi cha không truyền gì |
| **Named Slot** | Định nghĩa nhiều vị trí render khác nhau |
| **Scoped Slot** | Truyền dữ liệu từ component con ngược lên cho cha |
| **Conditional Slot** | Kiểm tra sự tồn tại của slot trước khi render wrapper |
| **Dynamic Slot** | Sử dụng tên slot dựa trên biến động |
| **Renderless** | Tách biệt logic và giao diện hiển thị |

> **Cách đọc bảng này:** xếp theo thứ tự xuất hiện trong bài — từ cơ bản (Slot) đến nâng cao (Renderless); khi thiết kế component, dò cột Mục đích để chọn đúng loại khe cắm cần mở.

> **Tóm gọn 1 câu:** Slot là "khe cắm nội dung": nhiều khe thì đặt tên, cần dữ liệu ngược thì scoped, không có hàng thì fallback, chỉ muốn giao công thức thì renderless.