Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học Template Refs trong Vue 3, kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang bạn đang xem.

# 🧩 Template Refs trong Vue 3

# 1. Template Ref là gì? Dùng khi nào?

Mục này mở bài: phần lớn thời gian bạn không cần chạm DOM trực tiếp, nhưng có những tình huống "bất khả kháng" thì phải dùng đến template ref.

Template Ref cho phép bạn truy cập trực tiếp DOM element hoặc instance của component con sau khi component được mount.

Ví von: Vue Reactive là **hệ thống giao hàng tận nơi** (dữ liệu đến template tự động), còn template ref là **chìa khóa hậu trường** — bình thường khóa cửa, nhưng khi cần vào "sân khấu" chỉnh thiết bị (focus input, đo kích thước) thì phải dùng chìa này.

👉 Bình thường Vue khuyến khích bạn dùng data / props / emits.
👉 Nhưng Template Refs cần thiết khi:

- Focus input
- Đo kích thước DOM
- Tích hợp thư viện bên thứ 3 (chart, map, editor…)
- Gọi method của component con (trường hợp đặc biệt)

> **Tóm gọn 1 câu:** Template ref là "chìa khóa hậu trường" — dùng khi props/emit bất lực, như focus input hay gọi method của component con.

**Ví dụ template ref cơ bản:**

> 📄 **Code ví dụ:** [`examples/01-1-template-ref-la-gi-dung-khi-nao.html`](examples/01-1-template-ref-la-gi-dung-khi-nao.html)

# 2. Truy cập Template Ref với Composition API (Vue ≥ 3.5)

Vue 3.5 giới thiệu helper `useTemplateRef()` (cách chuẩn & gọn nhất).

**Ví dụ: focus input khi component mount**

> 📄 **Code ví dụ:** [`examples/02-2-truy-cap-template-ref-voi-composition-api.html`](examples/02-2-truy-cap-template-ref-voi-composition-api.html)

> 📌 Lưu ý:
>
> - `'my-input'` phải trùng với giá trị `ref` trong template
> - `input.value` chính là DOM element
> - TypeScript sẽ tự infer kiểu (`HTMLInputElement`)

# 3. Template Ref trước Vue 3.5 (cách cũ)

Nếu dùng Vue < 3.5, bạn phải tự khai báo `ref()`.

**Ví dụ với `<script setup>`**

> 📄 **Code ví dụ:** [`examples/03-3-template-ref-truoc-vue-3-5-cach.html`](examples/03-3-template-ref-truoc-vue-3-5-cach.html)

**Nếu KHÔNG dùng `<script setup>`**

> 📄 **Code ví dụ:** [`examples/04-3-template-ref-truoc-vue-3-5-cach.js`](examples/04-3-template-ref-truoc-vue-3-5-cach.js)

# 4. Template Ref trong Options API (this.$refs)

Vue sẽ gom tất cả template refs vào `this.$refs`.

**Ví dụ:**

> 📄 **Code ví dụ:** [`examples/05-4-template-ref-trong-options-api-this-refs.html`](examples/05-4-template-ref-trong-options-api-this-refs.html)

> ⚠️ Chỉ dùng được sau khi mounted

# 5. Lưu ý quan trọng khi dùng Template Refs

Mục này nói về "chuyện giờ giấc": ref chỉ có giá trị sau khi DOM thật tồn tại — lấy sớm là nhận về `null`.

❌ Không truy cập được ngay khi render

> 📄 **Code ví dụ:** [`examples/06-5-luu-y-quan-trong-khi-dung-template.html`](examples/06-5-luu-y-quan-trong-khi-dung-template.html)

👉 Vì DOM chưa tồn tại trước khi mounted

✅ Theo dõi ref an toàn với `watchEffect`

> 📄 **Code ví dụ:** [`examples/07-5-luu-y-quan-trong-khi-dung-template.js`](examples/07-5-luu-y-quan-trong-khi-dung-template.js)

✔ Xử lý được:

- Chưa mount
- Bị unmount (`v-if`)

# 6. Ref dùng cho Component Con

**Ví dụ: ref vào component con**

> 📄 **Code ví dụ:** [`examples/08-6-ref-dung-cho-component-con.html`](examples/08-6-ref-dung-cho-component-con.html)

> 📌 `childRef.value` là instance của component con

# 7. defineExpose() – expose API cho component con (script setup)

Mặc định, component dùng `<script setup>` là private.

👉 Muốn cho cha truy cập → dùng `defineExpose`

**Ví dụ trong `Child.vue`**

> 📄 **Code ví dụ:** [`examples/09-7-defineexpose-expose-api-cho-component-con-script.html`](examples/09-7-defineexpose-expose-api-cho-component-con-script.html)

👉 Component cha nhận được:

> 📄 **Code ví dụ:** [`examples/10-7-defineexpose-expose-api-cho-component-con-script.js`](examples/10-7-defineexpose-expose-api-cho-component-con-script.js)

> ⚠️ `defineExpose()` phải gọi trước `await`

# 8. Hạn chế truy cập component con với expose (Options API)

> 📄 **Code ví dụ:** [`examples/11-8-han-che-truy-cap-component-con-voi.js`](examples/11-8-han-che-truy-cap-component-con-voi.js)

👉 Cha chỉ truy cập được:

- `publicData`
- `publicMethod`

# 9. Template Ref bên trong v-for (Vue ≥ 3.5)

Khi dùng `ref` trong `v-for`, ref sẽ là một mảng

**Ví dụ:**

> 📄 **Code ví dụ:** [`examples/12-9-template-ref-ben-trong-v-for-vue.html`](examples/12-9-template-ref-ben-trong-v-for-vue.html)

> 📌 `itemRefs.value` → `Array<HTMLElement>`
>
> ⚠️ Không đảm bảo thứ tự giống mảng dữ liệu

# 10. v-for trước Vue 3.5

> 📄 **Code ví dụ:** [`examples/13-10-v-for-truoc-vue-3-5.html`](examples/13-10-v-for-truoc-vue-3-5.html)

# 11. Function Refs – ref bằng hàm

Thay vì string, bạn có thể dùng function

**Ví dụ:**

> 📄 **Code ví dụ:** [`examples/14-11-function-refs-ref-bang-ham.html`](examples/14-11-function-refs-ref-bang-ham.html)

> 📌 Khi:
>
> - mount → `el` là DOM element
> - unmount → `el = null`

👉 Dùng khi cần toàn quyền kiểm soát ref

# 12. Khi nào NÊN / KHÔNG NÊN dùng Template Refs?

Mục này chốt lại "đạo đức nghề" khi dùng ref: đây là công cụ dự phòng, không phải đường tắt.

## ✅ Nên dùng khi:

- Focus input
- Đo kích thước DOM
- Tích hợp thư viện ngoài
- Gọi method component con (bất khả kháng)

## ❌ Không nên dùng khi:

- Có thể giải quyết bằng props, emit, v-model
- Logic dữ liệu thuần (nên dùng reactivity)

# 🎯 Tóm tắt nhanh

| Nội dung | Ghi nhớ |
| :--- | :--- |
| **Template Ref** | Truy cập DOM / component instance |
| **Vue ≥ 3.5** | Dùng `useTemplateRef()` |
| **Vue < 3.5** | Dùng `ref(null)` |
| **Component con** | Dùng `defineExpose()` |
| **v-for** | Ref → mảng |
| **Best practice** | Dùng khi thật sự cần |

> **Cách đọc bảng này:** mỗi dòng là một tình huống, cột phải là "cách làm chuẩn". Đọc từ trên xuống theo đúng thứ tự bài học — phân vân version nào thì tra cột phải ngay.

> **Tóm gọn 1 câu:** Template ref là con dao phẫu thuật: đúng chỗ (DOM, thư viện ngoài) thì sắc bén, lạm dụng thay props/emit là tự làm rối app.