# Tutorial Vue.js (Vue 3.5+)

Bộ tutorial Vue 3 đầy đủ bằng tiếng Việt, cập nhật tới **Vue 3.5.x (mới nhất: 3.5.44, tháng 10/2026)** (kèm chú thích Vue 3.4, và hướng nhìn tới Vue 3.6 / Vapor Mode hiện đang ở giai đoạn alpha/beta).

## Bản đồ tổng thể

Mục này là "bản đồ thành phố" của cả tutorial: 9 nhóm bài từ nền tảng đến hệ sinh thái, xếp theo thứ tự học gợi ý. Đọc để biết mình đang đứng đâu và đi tiếp đâu.

| # | Nhóm | Nội dung |
|---|---|---|
| 1 | [`1_essentials`](1_essentials) | Nền tảng: tạo app, template syntax, events, binding, computed, watch, directives, instance, **template refs**, **reactivity fundamentals (ref vs reactive)**, basic component, **Vue 3.5+ features** |
| 2 | [`2_components-in-depth`](2_components-in-depth) | Component chuyên sâu: props & emit, provide/inject, slots, lifecycle, composables... |
| 3 | [`3_reusability`](3_reusability) | Tái sử dụng: composables, custom directives, plugins |
| 4 | [`4_built-in-components`](4_built-in-components) | `<Transition>`, `<KeepAlive>`, `<Teleport>`, `<Suspense>` |
| 5 | [`5_scaling-up`](5_scaling-up) | Mở rộng: **routing**, **testing (Vitest + Vue Test Utils)**, **SSR/Nuxt**, TypeScript, best practices |
| 6 | [`6_consume-APIs`](6_consume-APIs) | Gọi API từ Vue app (fetch, axios, error handling) |
| 7 | [`7_vuex`](7_vuex) | Vuex (legacy): state, getters, mutations, actions, modules |
| 8 | [`8_pinia`](8_pinia) | Pinia: defining stores, state, getters, actions, plugins, Vuex vs Pinia |
| 9 | [`9_vue-ecosystem`](9_vue-ecosystem) | Hệ sinh thái: **Vue Router 4**, **Pinia 2.x/3.x** |

> **Cách đọc bảng này:** mỗi dòng là một "khu" của thành phố, số thứ tự là lộ trình gợi ý (1 → 9); đọc cột Nội dung để xem khu đó có gì — nhóm 7 là bảo tàng legacy, có thể đi vòng.

## ✨ Vue 3.5+ Features (mới)

Nội dung cập nhật theo Vue 3.4/3.5+ nằm ở:

| Bài | Nội dung chính | Phiên bản |
|---|---|---|
| [`1_essentials/13_vue-35-features`](1_essentials/13_vue-35-features) | Tổng quan Vue 3.5: reactivity tối ưu (-56% memory), `useTemplateRef()`, `useId()`, `onWatcherCleanup()`, lazy hydration, Teleport `defer`, custom elements, Vapor Mode (3.6 alpha/beta) | 3.5 / 3.6 alpha |
| [`1_essentials/11_reactivity-fundamentals`](1_essentials/11_reactivity-fundamentals) | Bổ sung: compiler macros (`defineProps`, `defineEmits`, `defineModel`, `defineSlots`, `defineExpose`), `withDefaults()`, **Reactive Props Destructure** | 3.3+ / 3.4 / 3.5 |
| [`9_vue-ecosystem/vue-router-4`](9_vue-ecosystem/vue-router-4) | `createRouter()` + history modes, dynamic/nested routes, lazy loading, navigation guards, custom regex matching | Router 4 |
| [`9_vue-ecosystem/pinia-2`](9_vue-ecosystem/pinia-2) | Pinia vs Vuex, `defineStore()` (Options vs Setup stores), `storeToRefs`, `$patch`/`$reset`/`$subscribe`, plugins, DevTools | Pinia 2.x → 3.x |

## Timeline kiến thức (Vue)

Mục này là "dòng thời gian phát triển" của Vue: mỗi version một mốc, giúp bạn biết feature nào sinh ra từ bao giờ — hữu ích khi đọc code cũ hoặc chốt version cho dự án.

Ví von: như xem lịch sử đời một chiếc điện thoại — biết model nào có gì thì khỏi mong chờ tính năng máy cũ không có.

| Version | Mốc | Feature nổi bật |
|---|---|---|
| Vue 3.3 | 2023 | `defineSlots`, generics SFC, type-only props/emits cải tiến |
| Vue 3.4 | 12/2023 | `defineModel()` ổn định, v-bind same-name shorthand, parser nhanh 2x |
| Vue 3.5 | 09/2024 | Reactivity tối ưu (**-56% memory**, array lớn 10x), **Reactive Props Destructure ổn định**, `useTemplateRef()`, `useId()`, `onWatcherCleanup()`, lazy hydration, Teleport `defer` — hiện ở bản vá **3.5.44 (10/2026)** |
| Vue 3.6 | **alpha/beta 2026** | **Vapor Mode** (opt-in, không Virtual DOM), reactivity rebuilt trên alien-signals — ổn định dự kiến cuối 2026 |

## Stack chuẩn trong tutorial

Mục này chốt "bộ nguyên liệu" dùng xuyên suốt tutorial: Vite build, TypeScript, Pinia, Vue Router 4 — đọc để hiểu vì sao mọi ví dụ đều viết theo kiểu này.

Ví von: một bếp thống nhất bộ dao kéo — mọi món trong tutorial đều dùng cùng bộ dụng cụ, bạn không phải đổi tay giữa các bài.

- **Build tool**: Vite 6+ (`npm create vue@latest`).
- **Ngôn ngữ**: TypeScript, `<script setup lang="ts">`.
- **State**: Pinia (chuẩn chính thức).
- **Router**: Vue Router 4.
- **Cấu trúc**: mỗi bài 1 thư mục với `README.md` tiếng Việt, có code ví dụ chạy được, ghi rõ **phiên bản Vue** của từng feature, link tài liệu chính thức [vuejs.org](https://vuejs.org/).

## Bắt đầu nhanh

> 📄 **Code ví dụ:** [`examples/01-bat-au-nhanh.sh`](examples/01-bat-au-nhanh.sh)

## Lộ trình gợi ý

Mục này là "chỉ đường theo điểm xuất phát": người mới đi đường dài, người cũ đi tắt, người từ Vuex đi đường chuyển nhà. Đọc dòng đúng hoàn cảnh của bạn.

- **Mới bắt đầu**: `1_essentials` (1 → 12) → `2_components-in-depth` → `8_pinia` → `9_vue-ecosystem`.
- **Đã biết Vue 3 cũ (≤3.3)**: đọc ngay `1_essentials/13_vue-35-features` → phần bổ sung trong `11_reactivity-fundamentals` → `9_vue-ecosystem`.
- **Đến từ Vuex**: `7_vuex` (⚠️ legacy — chỉ để đối chiếu) → `8_pinia` → `9_vue-ecosystem/pinia-2`.
- **Dự án cần test/SSR**: `5_scaling-up/2_testing` (Vitest) → `5_scaling-up/3_ssr-nuxt` (SSR & Nuxt).
- **Dự án lớn**: `5_scaling-up/1_routing` (Vue Router 4) → `5_scaling-up/2_testing` → `5_scaling-up/3_ssr-nuxt`.

> **Tóm gọn 1 câu:** Tutorial chia 9 khu theo lộ trình 1 → 9, stack chuẩn Vite + TS + Pinia + Router 4 — chọn đường trong "Lộ trình gợi ý" theo đúng điểm xuất phát của bạn.

## References

- [Vue.js docs](https://vuejs.org/guide/introduction) • [Announcing Vue 3.5](https://blog.vuejs.org/posts/vue-3-5)
- [Vue Router](https://router.vuejs.org/) • [Pinia](https://pinia.vuejs.org/)
