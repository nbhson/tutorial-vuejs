# Fallthrough Attributes (Thuộc tính kế thừa) trong Vue 3

Bài này giải thích cơ chế "hành lý tự chuyển vào phòng": attribute bạn truyền vào component nhưng không nằm trong props/emits sẽ tự động gắn lên root element — và những lúc cơ chế đó không chạy, cách tự lái bằng `$attrs`.

# 1. Fallthrough Attributes là gì?

Mục này định nghĩa khái niệm cốt lõi của bài: attribute "vô chủ" — không ai nhận nuôi bằng props/emits — sẽ được Vue tự giao cho root element, như bưu điện tự để bưu kiện ở cửa chính khi không có người nhận riêng.

Fallthrough attributes là những attribute hoặc event được truyền vào component nhưng KHÔNG được khai báo trong:
- `props`
- `emits`

👉 Ví dụ thường gặp: `class`, `style`, `id`, `@click`, `@focus`, …

Khi component chỉ có 1 root element, các fallthrough attributes này sẽ tự động gắn vào root element đó.

**Ví dụ:**

**Component con:**

> 📄 **Code ví dụ:** [`examples/01-1-fallthrough-attributes-la-gi.html`](examples/01-1-fallthrough-attributes-la-gi.html)

**Component cha:**

> 📄 **Code ví dụ:** [`examples/02-1-fallthrough-attributes-la-gi.html`](examples/02-1-fallthrough-attributes-la-gi.html)

**DOM sau khi render:**

> 📄 **Code ví dụ:** [`examples/03-1-fallthrough-attributes-la-gi.html`](examples/03-1-fallthrough-attributes-la-gi.html)

➡️ `class="large"` không phải prop ⇒ được coi là fallthrough attribute.

> **Tóm gọn 1 câu:** Attribute không nằm trong props/emits là "hàng không người nhận" — Vue tự đặt nó lên root element của component.

# 2. Gộp (merge) class và style

Mục này nói về một ngoại lệ thông minh: thay vì ghi đè, Vue gộp class/style từ cha với từ con — như hợp nhất danh sách khách mời của hai bên thay vì xóa danh sách của bên này.

Nếu root element đã có `class` hoặc `style`, Vue sẽ tự động gộp với attribute truyền từ component cha.

**Ví dụ:**

**Component con:**

> 📄 **Code ví dụ:** [`examples/04-2-gop-merge-class-va-style.html`](examples/04-2-gop-merge-class-va-style.html)

**Component cha:**

> 📄 **Code ví dụ:** [`examples/05-2-gop-merge-class-va-style.html`](examples/05-2-gop-merge-class-va-style.html)

**DOM render:**

> 📄 **Code ví dụ:** [`examples/06-2-gop-merge-class-va-style.html`](examples/06-2-gop-merge-class-va-style.html)

➡️ Vue không ghi đè, mà gộp class.

> **Tóm gọn 1 câu:** `class` và `style` không ai thắng ai — Vue trộn cả hai vào cùng một phần tử.

# 3. Kế thừa event (v-on listener)

Mục này nói về event listener cũng thuộc hàng fallthrough: cha gắn `@click` lên component, con không khai báo gì thì listener tự dính lên root element.

Event listener (`@click`, `@input`, …) cũng là fallthrough attribute.

**Ví dụ:**

**Component cha:**

> 📄 **Code ví dụ:** [`examples/07-3-ke-thua-event-v-on-listener.html`](examples/07-3-ke-thua-event-v-on-listener.html)

**Component con:**

> 📄 **Code ví dụ:** [`examples/08-3-ke-thua-event-v-on-listener.html`](examples/08-3-ke-thua-event-v-on-listener.html)

➡️ Khi click vào `<button>`, `handleClick` ở component cha sẽ được gọi.

🔹 Nếu component con đã có `@click`, thì:
- Cả hai đều chạy.

> **Tóm gọn 1 câu:** Listener từ cha và từ con không giành nhau — cả hai cùng kích hoạt khi sự kiện xảy ra.

# 4. Kế thừa qua component lồng nhau (Nested Component)

Mục này nói về cơ chế "đổ xuống tầng dưới": root element là một component khác thì attribute tiếp tục được forward xuống tận nơi có root element thật.

Nếu root element của component là một component khác, fallthrough attributes sẽ được chuyển tiếp (forward).

**Ví dụ:**

**MyButton.vue:**

> 📄 **Code ví dụ:** [`examples/09-4-ke-thua-qua-component-long-nhau-nested.html`](examples/09-4-ke-thua-qua-component-long-nhau-nested.html)

**Sử dụng:**

> 📄 **Code ví dụ:** [`examples/10-4-ke-thua-qua-component-long-nhau-nested.html`](examples/10-4-ke-thua-qua-component-long-nhau-nested.html)

➡️ `class="large"` sẽ được chuyển sang `<BaseButton>`.

> [!IMPORTANT]
> - Props / emits đã khai báo ở `MyButton` sẽ bị “tiêu thụ”.
> - Chỉ những attribute không khai báo mới được forward.

# 5. Tắt kế thừa attribute (`inheritAttrs: false`)

Mục này nói về "nút tắt chế độ tự động": khi muốn attribute gắn đúng chỗ mình chọn thay vì mặc định lên root element, hãy tắt kế thừa và tự lái bằng `$attrs`.

Mặc định Vue tự động kế thừa.
Nếu bạn muốn tự kiểm soát attribute gắn vào đâu ⇒ tắt đi.

**Cách 1: Options API**
> 📄 **Code ví dụ:** [`examples/11-5-tat-ke-thua-attribute-inheritattrs-false.js`](examples/11-5-tat-ke-thua-attribute-inheritattrs-false.js)

**Cách 2: `<script setup>` (Vue 3.3+)**
> 📄 **Code ví dụ:** [`examples/12-5-tat-ke-thua-attribute-inheritattrs-false.html`](examples/12-5-tat-ke-thua-attribute-inheritattrs-false.html)

# 6. Dùng `$attrs` để gắn attribute thủ công

Mục này nói về "túi đồ" `$attrs` chứa toàn bộ fallthrough attributes — khi tắt kế thừa, bạn tự quyết định rót túi đồ đó vào element nào bằng `v-bind="$attrs"`.

`$attrs` chứa toàn bộ fallthrough attributes.

**Ví dụ thực tế:**

Yêu cầu:
- Bọc button bằng `<div>`
- Attribute từ cha (`class`, `@click`) phải gắn vào `<button>`

**Component con:**

> 📄 **Code ví dụ:** [`examples/13-6-dung-attrs-e-gan-attribute-thu-cong.html`](examples/13-6-dung-attrs-e-gan-attribute-thu-cong.html)

➡️ `v-bind="$attrs"` sẽ gắn tất cả attribute vào `<button>`.

> **Tóm gọn 1 câu:** `inheritAttrs: false` + `v-bind="$attrs"` là cặp bài trùng: tắt chế độ tự động rồi tự đặt hàng đến đúng địa chỉ.

# 7. Lưu ý khi dùng `$attrs`

Mục này là "hướng dẫn bảo quản" cho `$attrs`: casing giữ nguyên, event đổi tên key, và quan trọng nhất — nó không reactive.

- Attribute giữ nguyên casing: `$attrs['foo-bar']`
- Event `@click` sẽ thành: `$attrs.onClick`
- `$attrs` KHÔNG reactive:
    - Không dùng `watch`.
    - Muốn reactive ⇒ dùng `props`.

# 8. Component có nhiều root node

Mục này nói về điểm đứt của cơ chế tự động: component có nhiều root thì Vue không biết "để bưu kiện ở cửa phòng nào" — và sẽ nhắc bạn phải tự gắn tay.

❌ **KHÔNG tự động fallthrough.**

**Ví dụ gây warning:**
> 📄 **Code ví dụ:** [`examples/14-8-component-co-nhieu-root-node.html`](examples/14-8-component-co-nhieu-root-node.html)

**Sử dụng:**
> 📄 **Code ví dụ:** [`examples/15-8-component-co-nhieu-root-node.html`](examples/15-8-component-co-nhieu-root-node.html)

➡️ Vue không biết gắn `id` vào đâu ⇒ warning.

**Cách sửa (bind thủ công):**
> 📄 **Code ví dụ:** [`examples/16-8-component-co-nhieu-root-node.html`](examples/16-8-component-co-nhieu-root-node.html)

# 9. Truy cập fallthrough attributes trong JavaScript

Mục này nói về cách "mở túi đồ" từ trong script: mỗi phong cách viết component có một cách lấy `$attrs` riêng.

**Với `<script setup>`:**
> 📄 **Code ví dụ:** [`examples/17-9-truy-cap-fallthrough-attributes-trong-javascript.html`](examples/17-9-truy-cap-fallthrough-attributes-trong-javascript.html)

**Với `setup()`:**
> 📄 **Code ví dụ:** [`examples/18-9-truy-cap-fallthrough-attributes-trong-javascript.js`](examples/18-9-truy-cap-fallthrough-attributes-trong-javascript.js)

**Với Options API:**
> 📄 **Code ví dụ:** [`examples/19-9-truy-cap-fallthrough-attributes-trong-javascript.js`](examples/19-9-truy-cap-fallthrough-attributes-trong-javascript.js)

> [!WARNING]
> `attrs` luôn cập nhật nhưng không reactive.

# 10. Tóm tắt nhanh (cheat sheet)

Mục này gom cả bài vào một bảng hành vi — tra nhanh xem Vue sẽ xử lý ra sao trong từng tình huống.

| Trường hợp | Hành vi |
| :--- | :--- |
| **1 root node** | Auto fallthrough |
| **`class`, `style`** | Tự động merge |
| **Event listener** | Kế thừa & chạy song song |
| **Root là component khác** | Forward attribute |
| **Nhiều root node** | ❌ Không auto |
| **`inheritAttrs: false`** | Chủ động kiểm soát |
| **`$attrs`** | Toàn bộ attribute không khai báo |

> **Cách đọc bảng này:** cột trái là tình huống viết template của bạn, cột phải là Vue sẽ tự làm gì (hoặc từ chối làm) — dò hàng ngang, cần kiểm soát tay thì nhìn hai hàng cuối.

> **Tóm gọn 1 câu:** Fallthrough là "hành lý tự chuyển vào phòng" — một root thì tự chuyển, nhiều root thì phải tự tay nhận, muốn chủ động thì dùng `$attrs`.