# Different Data in Component — Dữ liệu khác nhau trong component (one-way data flow)

> **Yêu cầu:** Vue 3.x (khuyến nghị 3.5+) · `<script setup>` · TypeScript
> **Bài trước:** [`1_registration`](../1_registration/README.md) · **Bài sau:** [`3_scoped-style`](../3_scoped-style/README.md)

---

## 1. Vấn đề: mỗi component cần dữ liệu riêng

Mục này nói về lý do tồn tại của props: cùng một "khuôn" component nhưng mỗi lần dùng phải đổ "nguyên liệu" khác vào — giống một cái khuôn bánh dùng chung, nhân bánh thì mỗi mẻ mỗi khác.

Cùng một component (`UserCard`, `ProductCard`, `TodoItem`...) được dùng nhiều lần, nhưng **mỗi lần dùng hiển thị dữ liệu khác nhau**. Bạn không thể viết cứng dữ liệu vào component — phải **truyền từ cha xuống con qua props**.

> 📄 **Code ví dụ:** [`examples/01-1-van-e-moi-component-can-du-lieu.vue`](examples/01-1-van-e-moi-component-can-du-lieu.vue)

> 📄 **Code ví dụ:** [`examples/02-1-van-e-moi-component-can-du-lieu.vue`](examples/02-1-van-e-moi-component-can-du-lieu.vue)

📌 **Điểm cốt lõi:** component con không "biết" dữ liệu là gì — nó chỉ khai báo **hợp đồng** (`defineProps`) và render theo dữ liệu được truyền vào.

> **Tóm gọn 1 câu:** Component là khuôn, props là nguyên liệu đổ vào — cùng một khuôn, mỗi lần dùng một mẻ bánh khác nhau.

---

## 2. One-way data flow — dòng dữ liệu một chiều

Mục này nói về quy tắc vàng của Vue: dữ liệu chỉ chảy một chiều từ cha xuống con như nước trong ống — bạn không được làm nước chảy ngược bằng cách tự sửa prop.

Quy tắc nền tảng của Vue: **props chảy một chiều từ cha xuống con**.

- Cha thay đổi prop → con tự render lại theo giá trị mới.
- Con **KHÔNG được tự sửa** prop.

> 📄 **Code ví dụ:** [`examples/03-2-one-way-data-flow-dong-du-lieu.vue`](examples/03-2-one-way-data-flow-dong-du-lieu.vue)

### Vì sao Vue cấm?

| Lý do | Giải thích |
|---|---|
| **Dễ đoán** | Dữ liệu chỉ có một nguồn sự thật (cha). Con thay đổi âm thầm → cha không biết |
| **Debug dễ** | Lỗi dữ liệu luôn ở nơi dữ liệu được thay đổi |
| **Render đúng** | Vue re-render con khi prop của cha đổi — bản ghi cục bộ của con sẽ bị **ghi đè** |

> **Cách đọc bảng này:** cột trái trả lời "quy tắc này mang lại gì", cột phải giải thích cơ chế phía sau — đọc từ trên xuống để thấy cả ba lý do dồn về một điểm: một nguồn sự thật duy nhất.

> **Tóm gọn 1 câu:** Props là "hàng được giao đến" — chỉ nhận, không sửa; muốn đổi hàng phải đặt lại với người giao (cha).

---

## 3. Cần chỉnh sửa dữ liệu từ prop? 4 cách đúng

Mục này là phần thực chiến nhất của bài: liệt kê bốn lối đi hợp lệ khi bạn muốn "đụng" vào dữ liệu từ prop, xếp từ rẻ nhất đến chuẩn nhất.

### Cách 1 — State cục bộ khởi tạo từ prop (khi prop là "giá trị ban đầu")

> 📄 **Code ví dụ:** [`examples/04-cach-1-state-cuc-bo-khoi-tao-tu.vue`](examples/04-cach-1-state-cuc-bo-khoi-tao-tu.vue)

> ⚠️ `counter` sẽ **không tự cập nhật** khi `initialCounter` của cha đổi — nó chỉ là giá trị khởi tạo. Nếu cần đồng bộ tiếp tục, xem cách 4.

### Cách 2 — Computed "biến đổi" prop (không đổi prop)

> 📄 **Code ví dụ:** [`examples/05-cach-2-computed-bien-oi-prop-khong-oi.vue`](examples/05-cach-2-computed-bien-oi-prop-khong-oi.vue)

### Cách 3 — Đưa thay đổi lên cha bằng `emit` (chuẩn nhất)

> 📄 **Code ví dụ:** [`examples/06-cach-3-ua-thay-oi-len-cha-bang.vue`](examples/06-cach-3-ua-thay-oi-len-cha-bang.vue)

> 📄 **Code ví dụ:** [`examples/07-cach-3-ua-thay-oi-len-cha-bang.vue`](examples/07-cach-3-ua-thay-oi-len-cha-bang.vue)

### Cách 4 — `defineModel()` (Vue 3.4+, ổn định — chuẩn hiện nay)

> 📄 **Code ví dụ:** [`examples/08-cach-4-definemodel-vue-3-4-on-inh.vue`](examples/08-cach-4-definemodel-vue-3-4-on-inh.vue)

Cha vẫn giữ quyền sở hữu dữ liệu: `<QtyInput v-model="qty" />`. Chi tiết luồng v-model qua component xem [`10_component-v-model/V-MODEL-FLOW.md`](../10_component-v-model/V-MODEL-FLOW.md).

> **Tóm gọn 1 câu:** Không sửa prop trực tiếp — chụp lại (state), biến đổi (computed), báo lên cha (emit), hoặc ký hợp đồng hai chiều (`defineModel`).

---

## 4. Reset state khi prop đổi — mẹo dùng `key`

Mục này giải quyết một tình huống gây bất ngờ: state cục bộ "dính" lại giữa các lần dùng khác nhau, và cách ép Vue tạo lại component bằng `key` — như đổi số phòng để khách cũ buồn phải dọn vali đi, khách mới nhận phòng sạch.

State cục bộ không tự reset khi prop thay đổi (component bị **tái sử dụng** chứ không tái tạo). Muốn component con "bắt đầu lại" mỗi lần dữ liệu khác nhau, ép Vue **tạo lại component** bằng `key`:

> 📄 **Code ví dụ:** [`examples/09-4-reset-state-khi-prop-oi-meo-dung.vue`](examples/09-4-reset-state-khi-prop-oi-meo-dung.vue)

> 📌 Đây là cách chính thức khuyến nghị trong docs — đơn giản hơn nhiều so với `watch` prop để gán lại state.

> **Tóm gọn 1 câu:** Muốn state "làm lại từ đầu" khi dữ liệu đổi, hãy đổi `:key` — Vue sẽ đập đi xây lại component thay vì cố sửa trong ấy.

---

## 5. Xác nhận prop (runtime validation)

Mục này nói về "kiểm hàng khi nhận": khai báo kiểu và validator để dữ liệu sai bị cảnh báo ngay trong lúc phát triển, trước khi kịp trôi ra production.

Với Options API / runtime props, bạn có thể khai báo kiểu + validator. Con nhận dữ liệu sai sẽ được cảnh báo ngay khi phát triển:

> 📄 **Code ví dụ:** [`examples/10-5-xac-nhan-prop-runtime-validation.js`](examples/10-5-xac-nhan-prop-runtime-validation.js)

Với TypeScript + `<script setup>`, dùng type-only props (khuyến nghị, đã đề cập trong [`11_reactivity-fundamentals`](../../1_essentials/11_reactivity-fundamentals/README.md)) — validator không có nhưng trình biên dịch chặn ngay lúc build.

> **Tóm gọn 1 câu:** Runtime validator là "nhân viên kiểm hàng" lúc chạy, còn type-only props là "cửa tự động" chặn sai ngay lúc build — kiểu nào cũng tốt hơn không kiểm.

---

## 6. Ví dụ tổng hợp: danh sách sản phẩm

Mục này ghép tất cả lại thành một ví dụ thật: một component render cả danh sách, mỗi sản phẩm một instance có dữ liệu riêng.

> 📄 **Code ví dụ:** [`examples/11-6-vi-du-tong-hop-danh-sach-san.vue`](examples/11-6-vi-du-tong-hop-danh-sach-san.vue)

> 📄 **Code ví dụ:** [`examples/12-6-vi-du-tong-hop-danh-sach-san.vue`](examples/12-6-vi-du-tong-hop-danh-sach-san.vue)

📌 Điểm mấu chốt: mỗi instance có **props riêng** nhưng dùng chung logic/khuôn render.

---

## 7. Bẫy thường gặp

Mục này liệt kê những "hố" người mới hay sa vào khi làm việc với props — đọc trước để khỏi phải tự té mới học được.

- **Mutate object prop**: `props.user.name = 'X'` **không báo lỗi** (vì mutate lồng nhau) nhưng phá vỡ nguồn sự thật. Hãy emit lên cha hoặc giữ bản copy trong state cục bộ.
- **Quên `:key` trong `v-for`** khi mỗi item có state riêng → state "dính" sai giữa các item khi danh sách sắp xếp/xóa.
- **Nhầm lẫn giữa "khởi tạo" và "liên kết"**: `ref(props.initialValue)` không tạo liên kết reactive với prop — chỉ lấy giá trị tại thời điểm tạo.
- **Xác nhận kiểu thiếu**: props bắt buộc nên khai báo trong `defineProps<{...}>()`, không để `any`.

> **Tóm gọn 1 câu:** Bẫy lớn nhất là "sửa lén" object prop — không lỗi nhưng vỡ nguồn sự thật; mọi thay đổi đều phải đi đường chính thống: emit hoặc defineModel.

---

## Nguồn tham khảo

- One-Way Data Flow: https://vuejs.org/guide/components/props.html#one-way-data-flow
- `defineModel()`: https://vuejs.org/guide/components/v-model.html
- Props: https://vuejs.org/guide/components/props.html
