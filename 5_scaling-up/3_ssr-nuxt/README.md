# SSR & Nuxt — Render phía server trong hệ sinh thái Vue

> **Yêu cầu:** Vue 3.5+ · hiểu cơ bản Vite · Pinia · Vue Router
> **Bài trước:** [`2_testing`](../2_testing/README.md)

---

## 1. CSR vs SSR vs SSG — chọn gì cho ứng dụng của bạn?

| Mô hình | Viết tắt | Trình duyệt nhận | Ưu | Nhược |
|---|---|---|---|---|
| Client-Side Rendering | CSR (SPA thuần) | HTML rỗng + JS bundle | Đơn giản, tương tác tức thì sau lần tải | First paint chậm, SEO kém |
| Server-Side Rendering | **SSR** | HTML đã render sẵn | Nhanh đầu trang, SEO tốt | Server phải chạy Node, phức tạp |
| Static Site Generation | SSG | HTML tĩnh dựng lúc build | Rất nhanh, hosting rẻ, SEO tốt | Nội dung đổi phải rebuild |
| Hybrid (Islands / ISR) | — | Kết hợp theo trang | Nuxt 3+ hỗ trợ `nuxt generate`, hybrid rendering | Cần hiểu rõ từng chế độ |

> 💡 Quy tắc chọn nhanh: **landing/blog/docs** → SSG; **dashboard nội bộ** (đăng nhập, ít SEO) → CSR; **trang bán hàng/nội dung cần SEO + dữ liệu động** → SSR.

---

## 2. SSR "thủ công" với Vue — hiểu cơ chế

Vue 3 có gói `@vue/server-renderer` — render component thành chuỗi HTML phía Node:

```bash
npm install vue @vue/server-renderer express
```

```js
// server.js — SSR tối giản (chỉ để hiểu)
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import express from 'express'
import App from './App.vue'

const app = express()

app.get('*', async (req, res) => {
  const vueApp = createSSRApp(App)
  const html = await renderToString(vueApp)
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
      <body>
        <div id="app">${html}</div>
        <script type="module" src="/src/client.js"></script>
      </body>
    </html>
  `)
})

app.listen(3000)
```

### Hai khác biệt bắt buộc khi code chạy trên server

1. **`createSSRApp` thay vì `createApp`** — mỗi request cần một **instance mới** (tránh "state chia sẻ giữa user này với user khác" — lỗ hổng bảo mật kinh điển).
2. **Không dùng `window`/`document`** trong code chạy ở server — bọc trong `onMounted` (chỉ chạy trên client) hoặc kiểm tra `import.meta.env.SSR`.

```ts
// ✅ code an toàn SSR
onMounted(() => {
  // window chỉ tồn tại ở client
  window.addEventListener('resize', onResize)
})
```

### Hydration — "gắn sự sống" vào HTML server gửi

Client bundle chạy và **hyd** vào HTML có sẵn: Vue so khớp DOM server với cây component, **gắn event listener mà không re-render**. Lỗi hydration (server render khác client) gây warning và tối ưu kém — nguyên nhân thường gặp: `Date.now()`, `Math.random()`, `localStorage` đọc lúc render.

---

## 3. Nuxt — khung SSR/SSG chính thức của Vue

Tự dựng SSR thủ công chỉ để **hiểu**. Thực tế, hệ sinh thái Vue dùng **Nuxt** (khung "meta-framework" của Vue, tương tự Next.js với React).

```bash
npx nuxi@latest init my-nuxt-app
cd my-nuxt-app && npm run dev
```

### File-based routing

```text
pages/
├── index.vue          → /
├── about.vue          → /about
└── posts/
    ├── index.vue      → /posts
    └── [id].vue       → /posts/42   (route động, như :id của Vue Router)
```

📌 Không cần `vue-router` thủ công — Nuxt tự sinh routes từ cấu trúc thư mục `pages/`.

### `useFetch` / `useAsyncData` — lấy dữ liệu chạy được cả server lẫn client

```vue
<!-- pages/posts/[id].vue -->
<script setup lang="ts">
const route = useRoute()

// SSR-safe: chạy trên server khi request đầu, client khi navigate
const { data: post, pending, error } = await useFetch(`/api/posts/${route.params.id}`)
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </article>
  <p v-else-if="pending">Đang tải...</p>
  <p v-else-if="error">Không tìm thấy bài viết</p>
</template>
```

### Auto-imports

Nuxt tự import `ref`, `computed`, `useFetch`... và mọi composable trong `composables/` — không cần dòng `import` lặp đi lặp lại.

---

## 4. Render mode theo từng trang (Nuxt 3+)

```vue
<!-- SSG cho trang tĩnh -->
<script setup>
defineRouteRules({ prerender: true })
</script>
```

```ts
// nuxt.config.ts — chọn chế độ tổng thể
export default defineNuxtConfig({
  ssr: true,      // false → SPA (CSR) thuần
  routeRules: {
    '/': { prerender: true },                        // SSG
    '/products/**': { swr: 600 },                    // SSR + cache 10 phút
    '/admin/**': { ssr: false },                     // CSR cho dashboard
  },
})
```

📌 Đây là **hybrid rendering** — điểm mạnh lớn nhất của Nuxt hiện nay: mỗi nhóm đường dẫn dùng chế độ render phù hợp.

---

## 5. SSR + Pinia — state chia sẻ an toàn

Pinia hỗ trợ SSR tốt: mỗi request tạo một instance Pinia riêng, state serialize về client.

```ts
// stores/user.ts — chuẩn Pinia hoạt động cả SSR
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  return { user }
})
```

Trong Nuxt, store được tự cấp phát mỗi request — bạn chỉ cần dùng như thông thường. Chi tiết: [`8_pinia/6_run-outside-of-components`](../8_pinia/6_run-outside-of-components/README.md).

---

## 6. SEO với SSR/Nuxt

- **Nuxt tự render nội dung** vào HTML đầu tiên — Google thu thập được nội dung ngay cả khi JS không chạy.
- `useSeoMeta` — đặt meta từ component:

```vue
<script setup>
useSeoMeta({
  title: () => `${post.value?.title} — MyApp`,
  description: () => post.value?.summary,
  ogTitle: () => post.value?.title,
})
</script>
```

- `useHead` cho link/JSON-LD chi tiết hơn.

---

## 7. Lưu ý khi migrate SPA → Nuxt

| SPA (Vue + Vite) | Nuxt |
|---|---|
| `vue-router` thủ công | File-based routing trong `pages/` |
| `main.ts` (`createApp`) | `nuxt.config.ts` + plugin tự nhiên |
| `axios.get` trong `onMounted` | `useFetch` / `useAsyncData` (SSR-safe) |
| `window` dùng thoải mái | Bọc trong `onMounted` / kiểm tra `import.meta.env.SSR` |
| `document.title` thủ công | `useHead` / `useSeoMeta` |

### Checklist trước khi chuyển

1. ✅ Toàn bộ code chạm `window`/`document` đã an toàn SSR chưa?
2. ✅ API base URL xử lý cả server (absolute URL khi gọi từ Node)?
3. ✅ State toàn cục (Pinia) không giữ dữ liệu "một user" lúc module-level?
4. ✅ CSS-in-JS hoặc thư viện phụ thuộc có hỗ trợ SSR không?

---

## 8. Use-cases thực tế

### Trang blog SSG + cập nhật ISR-style

```ts
// nuxt.config.ts
routeRules: { '/blog/**': { swr: 3600 } }   // HTML cache 1h, làm mới ngầm
```

### Form đăng ký chạy cả hai phía

```vue
<script setup>
async function submit() {
  // $fetch của Nuxt: server dùng http nội bộ, client dùng URL đầy đủ
  await $fetch('/api/register', { method: 'POST', body: formData })
}
</script>
```

### API backend nhẹ ngay trong Nuxt

```ts
// server/api/hello.ts — server route tự động
export default defineEventHandler(() => ({ message: 'Xin chào' }))
// Truy cập: GET /api/hello
```

---

## Nguồn tham khảo

- Vue SSR Guide: https://vuejs.org/guide/scaling-up/ssr.html
- Nuxt docs: https://nuxt.com/docs
- Nuxt rendering modes (hybrid): https://nuxt.com/docs/guide/concepts/rendering
- `@vue/server-renderer`: https://www.npmjs.com/package/@vue/server-renderer
- Pinia SSR: https://pinia.vuejs.org/ssr.html
