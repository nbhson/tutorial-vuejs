# Tutorial Vue.js (Vue 3.5+)

Bộ tutorial Vue 3 đầy đủ bằng tiếng Việt, cập nhật tới **Vue 3.5.x (mới nhất: 3.5.44, tháng 10/2026)** (kèm chú thích Vue 3.4, và hướng nhìn tới Vue 3.6 / Vapor Mode hiện đang ở giai đoạn alpha/beta).

## Bản đồ tổng thể

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

## ✨ Vue 3.5+ Features (mới)

Nội dung cập nhật theo Vue 3.4/3.5+ nằm ở:

| Bài | Nội dung chính | Phiên bản |
|---|---|---|
| [`1_essentials/13_vue-35-features`](1_essentials/13_vue-35-features) | Tổng quan Vue 3.5: reactivity tối ưu (-56% memory), `useTemplateRef()`, `useId()`, `onWatcherCleanup()`, lazy hydration, Teleport `defer`, custom elements, Vapor Mode (3.6 alpha/beta) | 3.5 / 3.6 alpha |
| [`1_essentials/11_reactivity-fundamentals`](1_essentials/11_reactivity-fundamentals) | Bổ sung: compiler macros (`defineProps`, `defineEmits`, `defineModel`, `defineSlots`, `defineExpose`), `withDefaults()`, **Reactive Props Destructure** | 3.3+ / 3.4 / 3.5 |
| [`9_vue-ecosystem/vue-router-4`](9_vue-ecosystem/vue-router-4) | `createRouter()` + history modes, dynamic/nested routes, lazy loading, navigation guards, custom regex matching | Router 4 |
| [`9_vue-ecosystem/pinia-2`](9_vue-ecosystem/pinia-2) | Pinia vs Vuex, `defineStore()` (Options vs Setup stores), `storeToRefs`, `$patch`/`$reset`/`$subscribe`, plugins, DevTools | Pinia 2.x → 3.x |

## Timeline kiến thức (Vue)

| Version | Mốc | Feature nổi bật |
|---|---|---|
| Vue 3.3 | 2023 | `defineSlots`, generics SFC, type-only props/emits cải tiến |
| Vue 3.4 | 12/2023 | `defineModel()` ổn định, v-bind same-name shorthand, parser nhanh 2x |
| Vue 3.5 | 09/2024 | Reactivity tối ưu (**-56% memory**, array lớn 10x), **Reactive Props Destructure ổn định**, `useTemplateRef()`, `useId()`, `onWatcherCleanup()`, lazy hydration, Teleport `defer` — hiện ở bản vá **3.5.44 (10/2026)** |
| Vue 3.6 | **alpha/beta 2026** | **Vapor Mode** (opt-in, không Virtual DOM), reactivity rebuilt trên alien-signals — ổn định dự kiến cuối 2026 |

## Stack chuẩn trong tutorial

- **Build tool**: Vite 6+ (`npm create vue@latest`).
- **Ngôn ngữ**: TypeScript, `<script setup lang="ts">`.
- **State**: Pinia (chuẩn chính thức).
- **Router**: Vue Router 4.
- **Cấu trúc**: mỗi bài 1 thư mục với `README.md` tiếng Việt, có code ví dụ chạy được, ghi rõ **phiên bản Vue** của từng feature, link tài liệu chính thức [vuejs.org](https://vuejs.org/).

## Bắt đầu nhanh

```bash
# Tạo app Vue 3 mới
npm create vue@latest my-vue-app
cd my-vue-app
npm install
npm run dev

# Thêm router & state management
npm install vue-router@4 pinia
```

## Lộ trình gợi ý

- **Mới bắt đầu**: `1_essentials` (1 → 12) → `2_components-in-depth` → `8_pinia` → `9_vue-ecosystem`.
- **Đã biết Vue 3 cũ (≤3.3)**: đọc ngay `1_essentials/13_vue-35-features` → phần bổ sung trong `11_reactivity-fundamentals` → `9_vue-ecosystem`.
- **Đến từ Vuex**: `7_vuex` (⚠️ legacy — chỉ để đối chiếu) → `8_pinia` → `9_vue-ecosystem/pinia-2`.
- **Dự án cần test/SSR**: `5_scaling-up/2_testing` (Vitest) → `5_scaling-up/3_ssr-nuxt` (SSR & Nuxt).
- **Dự án lớn**: `5_scaling-up/1_routing` (Vue Router 4) → `5_scaling-up/2_testing` → `5_scaling-up/3_ssr-nuxt`.

## References

- [Vue.js docs](https://vuejs.org/guide/introduction) • [Announcing Vue 3.5](https://blog.vuejs.org/posts/vue-3-5)
- [Vue Router](https://router.vuejs.org/) • [Pinia](https://pinia.vuejs.org/)
