# Vue 3.5+ Features (Tengen Toppa Gurren Lagann)

File này tổng hợp toàn bộ đồ chơi mới của Vue 3.4/3.5: cái nào tối ưu ngầm, cái nào là API mới xài được ngay. Đọc để biết công cụ nào nên đưa vào dự án của mình.

Vue 3.5 (phát hành **01/09/2024**) là bản minor **không có breaking changes**, tập trung vào tối ưu hiệu năng hệ thống reactivity, SSR và một loạt API tiện dụng cho Composition API.

> 🔗 Tham khảo chính thức:
> - [Announcing Vue 3.5 — blog.vuejs.org](https://blog.vuejs.org/posts/vue-3-5)
> - [Composition API: Helpers](https://vuejs.org/api/composition-api-helpers)
> - [Template Refs](https://vuejs.org/guide/essentials/template-refs.html)

---

## 1. Tối ưu Reactivity System (Vue 3.5)

Vue 3.5 refactor toàn bộ hệ thống reactivity với các kết quả:

- **Giảm 56% memory usage** cho các reactive object, không thay đổi hành vi.
- **Fix lỗi computed stale** (giá trị computed cũ) và rò rỉ bộ nhớ do computed "treo" (hanging computeds) trong SSR.
- **Tối ưu tracking cho array lớn, deeply reactive**: các thao tác push/splice trên array lớn nhanh tới **10x** trong một số trường hợp.

👉 Bạn **không cần đổi code** — mọi ứng dụng Vue 3.5+ đều hưởng lợi tự động. Đây là nền tảng cho các cải tiến tiếp theo (Vue 3.6 sẽ tiếp tục refactor sang hệ "alien-signals" phục vụ Vapor Mode).

> 📌 Lưu ý thuật ngữ: "Reactivity Transform" gốc (syntax `$ref` / sugar bỏ `.value`) đã bị **loại bỏ** — không nên nhầm với **Reactive Props Destructure** ổn định từ 3.5 (xem `11_reactivity-fundamentals`).

## 2. `useTemplateRef()` — Template refs kiểu mới (Vue 3.5) ⭐

Mục này nói về cách mới để "chạm tay" vào phần tử DOM trong template — thay vì phải đặt tên biến trùng khớp với attribute `ref`, giờ bạn gọi hàm và truyền tên vào.

Thay vì phải khai báo một `ref()` **trùng tên** với `ref` attribute trong template (dễ gãy khi refactor, không có lỗi báo khi tên không khớp), Vue 3.5 giới thiệu `useTemplateRef()`:

Ví von: cách cũ giống như **dán giấy nhớ "biến này trùng tên với thẻ ref nhé"** rồi cầu mong không ai đổi tên — đổi là im lặng gãy. `useTemplateRef()` thì như **đưa danh sách có đánh số**: bạn nói đích danh "hộp nào" và Vue trả đúng hộp đó, sai tên là báo lỗi.

> 📄 **Code ví dụ:** [`examples/01-2-usetemplateref-template-refs-kieu-moi-vue-3.vue`](examples/01-2-usetemplateref-template-refs-kieu-moi-vue-3.vue)

### So sánh với cách cũ (trước 3.5)

> 📄 **Code ví dụ:** [`examples/02-so-sanh-voi-cach-cu-truoc-3-5.vue`](examples/02-so-sanh-voi-cach-cu-truoc-3-5.vue)

Ưu điểm của `useTemplateRef()`:
- **Binding tường minh** qua tham số đầu tiên — không phụ thuộc tên biến.
- **TypeScript**: `vue-tsc` và IDE tự suy luận kiểu `input.value` dựa trên phần tử component được ref.
- Trả về `ShallowRef` **readonly** — không thể vô tình gán đè.

### Refs trong `v-for` (Vue 3.5+)

Cách truy cập danh sách refs cho `v-for` cũng mới trong 3.5:

> 📄 **Code ví dụ:** [`examples/03-refs-trong-v-for-vue-3-5.vue`](examples/03-refs-trong-v-for-vue-3-5.vue)

> 🔗 [Template Refs — vuejs.org](https://vuejs.org/guide/essentials/template-refs.html)

## 3. `useId()` — Sinh ID unique cho toàn app (Vue 3.5)

Mục này nói về API sinh ID tự động — tưởng nhỏ xíu nhưng cứu được cả rổ lỗi trùng ID trong form và a11y.

`useId()` sinh ID **duy nhất trong phạm vi app** và **ổn định giữa server render và client render** (SSR-safe) — lý tưởng cho a11y và form:

> 📄 **Code ví dụ:** [`examples/04-3-useid-sinh-id-unique-cho-toan-app.vue`](examples/04-3-useid-sinh-id-unique-cho-toan-app.vue)

Đặc điểm:
- ID unique-per-application — an toàn kể cả khi component render nhiều lần.
- Chạy nhiều app Vue trên một trang? Đặt prefix riêng cho từng app qua `app.config.idPrefix` để tránh trùng ID.
- ⚠️ **Không gọi `useId()` trong `computed()`** — có thể gây xung đột instance.

Trường hợp thực dụng nhất: ghép nối `label` ↔ `input` (a11y), `aria-*` attributes, và form elements lặp qua `v-for`.

> 🔗 [Composition API: Helpers — useId](https://vuejs.org/api/composition-api-helpers.html#useid)

## 4. `onWatcherCleanup()` — Dọn dẹp watcher (Vue 3.5)

API toàn cục giúp đăng ký logic dọn dẹp chạy trước khi watcher chạy lại lần tiếp theo hoặc khi bị dispose:

> 📄 **Code ví dụ:** [`examples/05-4-onwatchercleanup-don-dep-watcher-vue-3-5.js`](examples/05-4-onwatchercleanup-don-dep-watcher-vue-3-5.js)

👉 Thay thế cho pattern `onCleanup` trong `watch()` — dùng được trong **composables tách riêng**.

## 5. Reactive Props Destructure (ổn định từ Vue 3.5)

Chi tiết đầy đủ đã có trong `11_reactivity-fundamentals/README.md`. Tóm tắt:

> 📄 **Code ví dụ:** [`examples/06-5-reactive-props-destructure-on-inh-tu-vue.vue`](examples/06-5-reactive-props-destructure-on-inh-tu-vue.vue)

⚠️ Nhớ: `watch(() => title, ...)` chứ không `watch(title, ...)`.

## 6. SSR: Lazy Hydration & `data-allow-mismatch` (Vue 3.5)

Mục này nói về những "không khớp" giữa server và client khi render — và cách Vue 3.5 cho bạn hai công cụ để xử lý: hydrate đúng lúc và chấp nhận khác biệt có kiểm soát.

### Lazy Hydration cho async components

`defineAsyncComponent()` nhận thêm option `hydrate` để kiểm soát **khi nào component mới được hydrate** trên client:

> 📄 **Code ví dụ:** [`examples/07-lazy-hydration-cho-async-components.js`](examples/07-lazy-hydration-cho-async-components.js)

Các strategy có sẵn: `hydrateOnVisible()`, `hydrateOnInteraction()`, `hydrateOnMediaQuery()`, `hydrateOnIdle()` — giảm Time-to-Interactive đáng kể cho app lớn.

### `data-allow-mismatch`

Cho phép chấp nhận sự khác biệt giữa server/client render ở node cụ thể (ví dụ thời gian hiển thị):

> 📄 **Code ví dụ:** [`examples/08-data-allow-mismatch.html`](examples/08-data-allow-mismatch.html)

## 7. Teleport `defer` (Vue 3.5)

Props `defer` khiến Teleport mount **sau vòng render hiện tại** — giải quyết lỗi "target not found" khi target được render sau (VD: portal vào phần tử do component khác render):

> 📄 **Code ví dụ:** [`examples/09-7-teleport-defer-vue-3-5.vue`](examples/09-7-teleport-defer-vue-3-5.vue)

## 8. `<script setup>` macros liên quan (Vue 3.4 — nền tảng cho 3.5)

- **`defineModel()`** ổn định: two-way binding trong 1 dòng (đã trình bày trong `11_reactivity-fundamentals`).
- **v-bind same-name shorthand**: `:id="id"` → `:id`, `:item="item"` → `:item`.
- **`useTemplateRef()` + `defineExpose()`**: cặp đôi chuẩn để component cha truy cập public API của component con.

## 9. Custom Elements (Vue 3.5)

- `configureApp` option trong `defineCustomElement()` — cấu hình plugin/config cho custom element.
- `shadowRoot: false` — tắt Shadow DOM khi cần.
- `useHost()` / `useShadowRoot()` composables cho custom element internals.

## 10. Hướng tới Vue 3.6: Vapor Mode (chưa production)

- Vapor Mode là chế độ compile **opt-in** cho SFC: compiler sinh code cập nhật DOM trực tiếp, **không Virtual DOM, không diffing** — mô hình fine-grained kiểu Solid/Svelte.
- Chỉ render lại đúng node bị ảnh hưởng khi reactive value đổi.
- **Code không đổi**: vẫn viết `<script setup>` và template như bình thường.
- Hỗ trợ cây component **lai**: Vapor và vdom components cùng tồn tại qua `vaporInteropPlugin`.
- ⚠️ Vapor Mode hiện ở giai đoạn **Vue 3.6 (alpha/beta)** — với Vue 3.5, hệ reactivity mới (đã tối ưu ở mục 1) chính là nền móng của nó. Đừng nhầm lẫn các cải tiến 3.5 là Vapor.

> 🔗 Theo dõi: [vuejs/core releases](https://github.com/vuejs/core/releases)

## 11. Tổng kết

| Feature | Phiên bản | Dùng khi nào |
| :--- | :--- | :--- |
| Reactive Props Destructure | **3.5** (ổn định, mặc định bật) | Đọc props gọn, có default |
| `useTemplateRef()` | **3.5** | Mọi template ref trong `<script setup>` |
| `useId()` | **3.5** | a11y, form labels, SSR-safe IDs |
| `onWatcherCleanup()` | **3.5** | Cleanup logic trong composables |
| `defineModel()` | **3.4** | Two-way binding của component |
| v-bind same-name shorthand | **3.4** | Giảm lặp trong template |
| Lazy hydration | **3.5** | SSR, tối ưu TTI |
| Teleport `defer` | **3.5** | Teleport target render sau |
| Vapor Mode | **3.6 alpha/beta** (chưa stable, dự kiến cuối 2026) | Thử nghiệm, theo dõi release |

> **Cách đọc bảng này:** mỗi dòng một feature, cột giữa trả lời "version nào dùng được", cột phải trả lời "dùng vào việc gì". Hàng cuối (Vapor Mode) chưa stable — chỉ theo dõi, chưa đưa vào production.

> **Tóm gọn 1 câu:** Vue 3.5 là bản "tăng sức mạnh ngầm": reactivity nhẹ hơn tự động, còn `useTemplateRef`, `useId`, `onWatcherCleanup`, props destructure là bốn công cụ nên đưa vào thói quen code mới.

## ✅ Checklist thực hành

- [x] Dùng `useTemplateRef()` thay cho khai báo ref trùng tên.
- [x] Sinh ID form/a11y bằng `useId()` thay vì tự đếm.
- [x] Destructure props thoải mái (3.5) nhưng vẫn watch qua getter.
- [x] Dùng `defineModel()` cho two-way binding thay vì viết tay props + emit.
- [x] Với SSR lớn, dùng lazy hydration để giảm JS chạy sớm.

## 🔗 Bài tập nhỏ

1. Viết component `CustomInput` dùng `useTemplateRef()` để focus input khi mount.
2. Tạo form đăng ký dùng `useId()` để nối `label` ↔ `input` (name, email, password).
3. Refactor một component dùng `props` + `emit('update:modelValue')` sang `defineModel()`.
4. Dùng reactive props destructure kèm default value, và chứng minh giá trị vẫn cập nhật khi props cha thay đổi.

## 📚 References

- [Announcing Vue 3.5 (blog chính thức)](https://blog.vuejs.org/posts/vue-3-5)
- [Composition API Helpers — useTemplateRef / useId](https://vuejs.org/api/composition-api-helpers.html)
- [Template Refs](https://vuejs.org/guide/essentials/template-refs.html)
- [Reactive Props Destructure](https://vuejs.org/guide/components/props.html#reactive-props-destructure)
- [onWatcherCleanup](https://vuejs.org/api/reactivity-core.html#onwatchercleanup)
- [Vue changelog](https://github.com/vuejs/core/blob/main/CHANGELOG.md)
