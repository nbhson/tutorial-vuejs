# Event Bus — Bus sự kiện (legacy, đã lỗi thời trong Vue 3)

> **Yêu cầu:** Vue 3.x
> **Bài trước:** [`4_props-emit`](../4_props-emit/README.md) · **Bài sau:** [`6_fallthrough-attribute`](../6_fallthrough-attribute/README.md)

---

## ⚠️ Bài học về pattern LỖI THỜI

> **Event Bus (`$on` / `$off` / `$emit` trên một Vue instance rỗng) đã bị LOẠI BỎ khỏi Vue 3.**
>
> Trong Vue 2, bạn tạo một instance rỗng để phát/nghe sự kiện toàn cục. Vue 3 đã xóa hẳn API `$on`/`$off` khỏi instance — pattern này **không thể dùng** và cũng **không nên** dùng nữa.
>
> **Thay thế chính thức:** `provide`/`inject` (truyền dữ liệu theo cây), **Pinia** (state toàn cục), hoặc thư viện ngoài như `mitt` nếu thực sự cần pub/sub. Chi tiết bên dưới.

---

## 1. Event Bus là gì? (bối cảnh lịch sử)

Trong Vue 2, "event bus" là một Vue instance rỗng dùng làm **đài phát thanh trung tâm**:

> 📄 **Code ví dụ:** [`examples/01-1-event-bus-la-gi-boi-canh-lich.js`](examples/01-1-event-bus-la-gi-boi-canh-lich.js)

Mục đích: cho hai component **không có quan hệ cha–con** nói chuyện với nhau (ví dụ: sidebar nghe sự kiện từ một modal ở nhánh khác của cây component).

### Vì sao nó bị xóa khỏi Vue 3?

| Vấn đề | Hậu quả |
|---|---|
| **Không rõ nguồn dữ liệu** | Không thể lần ngược xem ai phát sự kiện — debug "ma" |
| **Memory leak** | Quên `$off` → handler giữ tham chiếu component đã hủy |
| **Trùng lặp với Pinia/`provide-inject`** | Vue 3 cung cấp giải pháp chính thức tốt hơn cho từng nhu cầu |
| **API instance gọn hơn** | Vue 3 tách hẳn các API toàn cục ra khỏi instance |

> **Cách đọc bảng này:** cột trái là "căn bệnh", cột phải là "triệu chứng" — bốn dòng này là lý do nhóm Vue quyết định mổ xóa event bus khỏi Vue 3.

> **Tóm gọn 1 câu:** Event bus là "đài phát thanh không đài gọi, ai cũng nghe được, không ai biết ai phát" — tiện thì tiện nhưng debug thì mệt luôn.

---

## 2. Thay thế 1 — `provide` / `inject` (chuẩn Vue 3, trong cùng cây component)

Mục này nói về giải pháp thay thế đầu tiên: thay vì phát sự kiện ra không khí, cho dữ liệu "chảy" theo đúng cây component từ tổ tiên xuống cháu.

> 📄 **Code ví dụ:** [`examples/02-2-thay-the-1-provide-inject-chuan-vue.vue`](examples/02-2-thay-the-1-provide-inject-chuan-vue.vue)

> 📄 **Code ví dụ:** [`examples/03-2-thay-the-1-provide-inject-chuan-vue.vue`](examples/03-2-thay-the-1-provide-inject-chuan-vue.vue)

📌 Với **app cấp component gốc** (toàn app), `app.provide()` cũng hoạt động. Chi tiết đầy đủ: [`8_provide_inject`](../8_provide_inject/README.md).

> **Tóm gọn 1 câu:** `provide`/`inject` là "đường ống đúng tuyến" — dữ liệu chảy theo cây component, không phát tán lung tung.

---

## 3. Thay thế 2 — Pinia (state toàn cục)

Mục này nói về giải pháp khi dữ liệu thuộc về "cả thành phố": nhiều component cùng đọc/ghi một nguồn chung thì nên để state nằm ở một kho trung tâm duy nhất.

Khi nhiều component cùng đọc/ghi một nguồn dữ liệu (giỏ hàng, user, theme), store là lựa chọn chuẩn:

> 📄 **Code ví dụ:** [`examples/04-3-thay-the-2-pinia-state-toan-cuc.ts`](examples/04-3-thay-the-2-pinia-state-toan-cuc.ts)

> 📄 **Code ví dụ:** [`examples/05-3-thay-the-2-pinia-state-toan-cuc.vue`](examples/05-3-thay-the-2-pinia-state-toan-cuc.vue)

Chi tiết đầy đủ: [`8_pinia`](../../8_pinia/README.md) và [`9_vue-ecosystem/pinia-2`](../../9_vue-ecosystem/pinia-2/README.md).

> **Tóm gọn 1 câu:** Dữ liệu nhiều người dùng chung thì để vào Pinia — một kho, một nguồn sự thật, không cần phát tín hiệu vòng vòng.

---

## 4. Thay thế 3 — `mitt` (nếu thật sự cần pub/sub)

Mục này nói về "trường hợp ngoại lệ cuối cùng": khi bạn chỉ cần cơ chế pub/sub thuần (cầu nối với code ngoài Vue, iframe, Worker), `mitt` thay thế event bus bằng một thư viện nhỏ gọn ngoài framework.

Trong vài tình huống đặc biệt (cầu nối giữa code ngoài Vue và app Vue, iframe, Worker...), pub/sub vẫn hữu ích. Cài một thư viện nhỏ:

> 📄 **Code ví dụ:** [`examples/06-4-thay-the-3-mitt-neu-that-su.sh`](examples/06-4-thay-the-3-mitt-neu-that-su.sh)

> 📄 **Code ví dụ:** [`examples/07-4-thay-the-3-mitt-neu-that-su.ts`](examples/07-4-thay-the-3-mitt-neu-that-su.ts)

> 📄 **Code ví dụ:** [`examples/08-4-thay-the-3-mitt-neu-that-su.ts`](examples/08-4-thay-the-3-mitt-neu-that-su.ts)

> 📄 **Code ví dụ:** [`examples/09-4-thay-the-3-mitt-neu-that-su.vue`](examples/09-4-thay-the-3-mitt-neu-that-su.vue)

> 💡 Quy tắc dùng mitt an toàn:
> - Đăng ký trong `onMounted`, **luôn** `off()` trong `onUnmounted`.
> - Đặt loại sự kiện (`type Events`) vào một file duy nhất.
> - Chỉ dùng khi `provide/inject` + Pinia không giải quyết được — ưu tiên cả hai trước.

> **Tóm gọn 1 câu:** `mitt` là "đài phát thanh có kỷ luật" — vẫn pub/sub, nhưng bạn phải tự gỡ đăng ký, còn không thì memory leak như ngày xưa.

---

## 5. Bảng so sánh — chọn công cụ thay thế

Mục này là bản đồ quyết định: nhìn nhu cầu của bạn ở cột trái, chọn ngay giải pháp ở cột phải.

| Nhu cầu | Giải pháp thay Event Bus |
|---|---|
| Con → cha (thuật ngữ "phát sự kiện lên") | `emit` (xem [`4_props-emit/EMIT.md`](../4_props-emit/EMIT.md)) |
| Cha → con sâu nhiều tầng | `provide` / `inject` |
| Dữ liệu chia sẻ toàn app | **Pinia** |
| Component ngoài Vue cần thông báo vào Vue | `mitt` hoặc một hàm callback được app cung cấp |
| Global event thật sự (sự kiện window, keydown) | addEventListener trực tiếp trong `onMounted` + cleanup |

> **Cách đọc bảng này:** dò theo hàng ngang từ nhu cầu thực tế của bạn — hầu hết mọi trường hợp đều có một "đường chính thống" thay cho event bus, không cần nghĩ thêm.

---

## 6. Mã tham khảo: Event Bus "tự chế" bằng cách nào trong Vue 2 (chỉ để hiểu lịch sử)

Mục này là "bảo tàng": xem cách người ta dựng event bus trong Vue 2 để khi gặp code cũ bạn nhận ra ngay và biết đường chuyển đổi.

> 📄 **Code ví dụ:** [`examples/10-6-ma-tham-khao-event-bus-tu-che.js`](examples/10-6-ma-tham-khao-event-bus-tu-che.js)

Nếu bạn gặp code cũ như vậy khi refactor dự án Vue 2 → Vue 3, hãy:

1. Tìm nơi `bus.$on` — thường là các component lắng nghe.
2. Xác định dữ liệu có phải **state chia sẻ** không → đưa vào Pinia.
3. Nếu chỉ là **thông báo một chiều** → chuyển sang `emit`/`provide-inject`.
4. Nếu là cầu nối với mã ngoài → dùng `mitt` + dọn dẹp trong `onUnmounted`.

> **Tóm gọn 1 câu:** Gặp bus trong code cũ đừng xóa vội — phân loại nhu cầu (emit / Pinia / provide-inject / mitt) rồi chuyển từng cụm một.

---

## Nguồn tham khảo

- Vue 3 migration — `listens-to-emit` đã bị xóa: https://v3-migration.vuejs.org/breaking-changes/events-api.html
- provide/inject: https://vuejs.org/guide/components/provide-inject.html
- mitt: https://github.com/developit/mitt
- Pinia (state chính thức): https://pinia.vuejs.org/

---

## 7. Gói pub/sub thành composable (thay bus bằng API của Vue)

Mục này nói về cách "dọn dẹp tự động": bọc pub/sub vào composable để listener tự hủy theo vòng đời component — không ai phải nhớ `off()` nữa.

Nếu dự án bạn dùng pub/sub ở nhiều chỗ, đóng gói vào một composable để các component **tự dọn dẹp** — không ai quên `off()`:

> 📄 **Code ví dụ:** [`examples/11-7-goi-pub-sub-thanh-composable-thay-bus.ts`](examples/11-7-goi-pub-sub-thanh-composable-thay-bus.ts)

> 📄 **Code ví dụ:** [`examples/12-7-goi-pub-sub-thanh-composable-thay-bus.vue`](examples/12-7-goi-pub-sub-thanh-composable-thay-bus.vue)

📌 `onScopeDispose` chạy khi scope hiệu ứng (component) bị hủy — đây là cách "unmount" của composition world. Mọi listener trong composable nên đi kèm nó.

---

## 8. Anti-pattern cần tránh

Mục này là "danh sách đen": những thói quen dễ tạo ra "event bus biến tướng" mới — đọc để khỏi lặp lại sai lầm của các dự án trước.

- **Bus làm "kênh mặc định"**: dự án mới chớ thiết kế giao tiếp qua sự kiện toàn cục — hãy bắt đầu từ props/emit + Pinia, chỉ "nới lỏng" khi thật sự cần.
- **Sự kiện lặp tên trùng** ở nhiều nơi (`'update'` được mọi component phát) → không thể phân biệt nguồn. Đặt tên sự kiện theo domain: `'order:created'`, `'cart:updated'`.
- **Payload "bá đạo"**: gửi nguyên component/state qua bus khiến listener nắm tham chiếu tới state cũ — hãy gửi dữ liệu phẳng, tối thiểu cần thiết.
- **Đăng ký trong `setup` root nhưng không dọn**: với `mitt` bạn phải tự `off()`; quên là leak. Composable ở mục 7 giải quyết triệt để.

### Checklist khi gặp code cũ dùng Event Bus (Vue 2 → 3)

1. ✅ Tìm toàn bộ `\$on`, `\$off`, `\$emit` trên instance dùng làm bus (`grep -rn "\$on(" src`).
2. ✅ Phân loại: giao tiếp con→cha? (→ `emit`) — dữ liệu chia sẻ? (→ Pinia) — cầu nối ngoài? (→ mitt).
3. ✅ Thay từng cụm một và chạy test sau mỗi thay đổi.
4. ✅ Kiểm tra `onUnmounted`/`onScopeDispose` với mọi listener còn lại.

> **Tóm gọn 1 câu:** Anti-pattern của bus đều xoay quanh "ẩn và quên" — nguồn ẩn, tên trùng, payload nặng, quên dọn; composable ở mục 7 là thuốc chữa cả bốn.

---

## Nguồn tham khảo (bổ sung)

- Vue 3 — Breaking changes: Events API: https://v3-migration.vuejs.org/breaking-changes/events-api.html
- `onScopeDispose`: https://vuejs.org/api/reactivity-core.html#onscopedispose
- Event emitter pattern ( mitt ): https://github.com/developit/mitt
- Vue style guide — avoid event bus: https://vuejs.org/style-guide/
