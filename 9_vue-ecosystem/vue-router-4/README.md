# Vue Router 4 — Router chính thức cho Vue 3

Vue Router 4 là bản viết lại (rewrite) hoàn toàn để tương thích với Vue 3 và Composition API. API phần lớn giữ nguyên so với v3, nhưng khởi tạo, history mode và navigation guards đều mới.

> 🔗 Tham khảo chính thức:
> - [Vue Router — Getting Started](https://router.vuejs.org/)
> - [Migrating from Vue Router 3](https://router.vuejs.org/guide/migration)

## 1. Cài đặt & khởi tạo

```bash
npm install vue-router@4
```

```js
// main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ]
})

createApp(App).use(router).mount('#app')
```

> ⚠️ Khác biệt lớn so với v3: `new VueRouter({ mode: 'history' })` đã **không còn** — thay bằng hàm factory `createRouter()` + hàm history riêng.

## 2. History Modes (Vue Router 4)

| Mode | Factory | URL | Dùng khi nào |
| :--- | :--- | :--- | :--- |
| HTML5 | `createWebHistory()` | `/about` (sạch, đẹp) | Mặc định, cần cấu hình server fallback |
| Hash | `createWebHashHistory()` | `/#/about` | Host tĩnh không cấu hình được server (GitHub Pages...) |
| Memory | `createMemoryHistory()` | (không có URL) | SSR, test, môi trường không có DOM |

```js
import { createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'

createRouter({ history: createWebHistory() })   // HTML5 — khuyến nghị
createRouter({ history: createWebHashHistory() }) // Hash — không cần cấu hình server
```

📌 Với `createWebHistory`, server phải trả về `index.html` cho mọi route (Vite dev server tự xử lý; production cần cấu hình nginx/vercel...).

## 3. Dynamic Routes (định tuyến động)

### Route params

```js
const routes = [
  // :id là dynamic segment
  { path: '/users/:id', component: UserDetail },
  // Nhiều params
  { path: '/posts/:postId/comments/:commentId', component: Comment },
  // catch-all 404
  { path: '/:pathMatch(.*)*', component: NotFound },
]
```

Truy cập params bằng Composition API (Vue 3):

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id)
</script>
```

### Thêm route lúc runtime (`router.addRoute()`)

Vue Router 4 hỗ trợ dynamic routing — thêm/xóa route khi app đang chạy (hữu ích cho phân quyền):

```js
// Sau khi đăng nhập, thêm route theo quyền
router.addRoute({
  path: '/admin',
  component: AdminPanel,
  meta: { requiresAdmin: true }
})
```

> 🔗 [Dynamic Routing](https://router.vuejs.org/guide/advanced/dynamic-routing.html)

## 4. Nested Routes (routes lồng nhau)

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // /user/:id/profile
      { path: 'profile', component: UserProfile },
      // /user/:id/posts
      { path: 'posts', component: UserPosts },
      // /user/:id → mặc định hiển thị profile
      { path: '', redirect: 'profile' },
    ]
  }
]
```

```vue
<!-- User.vue -->
<template>
  <div>
    <h2>User {{ $route.params.id }}</h2>
    <!-- Component con render tại đây -->
    <router-view />
  </div>
</template>
```

> 📌 Vue Router 4: `<transition>` và `<keep-alive>` phải đặt **bên trong** `<router-view>` qua v-slot API:

```vue
<router-view v-slot="{ Component }">
  <transition name="fade">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>
```

## 5. Lazy Loading Routes (code splitting)

Chỉ tải component khi người dùng truy cập route — giảm bundle ban đầu:

```js
const routes = [
  {
    path: '/dashboard',
    // Dynamic import — chunk riêng
    component: () => import('./views/Dashboard.vue')
  },
  {
    path: '/admin',
    // Tải nhóm route thành 1 chunk
    component: () => import('./views/Admin.vue'),
    children: [
      { path: 'stats', component: () => import('./views/Stats.vue') }
    ]
  }
]
```

👉 Khuyến nghị: lazy load mọi trang lớn, giữ các trang "lối vào" (home, login) nạp ngay.

## 6. Navigation Guards (chặn & kiểm soát điều hướng)

Luồng điều hướng đầy đủ: `beforeRouteLeave` → `beforeEach` → `beforeRouteUpdate` → `beforeEnter` (per-route) → `beforeRouteEnter` → `beforeResolve` → điều hướng xác nhận → `afterEach`.

### Global guard

```js
router.beforeEach(async (to, from) => {
  // Kiểm tra đăng nhập
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // return giá trị thay vì done() callback như v3
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // return true / undefined → cho phép đi tiếp
})
```

### Per-route guard & in-component guard

```js
const routes = [{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from) => {
    return isAdmin() ? true : '/login'
  }
}]
```

```vue
<script setup>
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

onBeforeRouteUpdate((to, from) => {
  // kích hoạt khi route đổi params (VD: /user/1 → /user/2)
})
onBeforeRouteLeave((to, from) => {
  // VD: hỏi xác nhận khi chưa lưu form
  return confirm('Rời trang, thay đổi sẽ mất?') || false
})
</script>
```

> 📌 Khác v3: guards ủng hộ **async/await** và return giá trị (`false` | route location | `undefined`) thay vì callback `next()`.

## 7. Route Matching với custom regex

Đường dẫn params hỗ trợ regex tùy chỉnh qua cú pháp `:param(regex)`:

```js
const routes = [
  // Chỉ nhận số
  { path: '/:id(\\d+)', component: DigitOnly },
  // Nhận 1 trong nhiều path — ưu tiên từ trên xuống
  { path: '/:chapters+/:slug', component: Chapter },
  // Case-insensitive & trailing slash
  { path: '/users', sensitive: false, strict: false },
]
```

Định tuyến với **mảng** (một path → nhiều aliases):

```js
{ path: '/', component: Home, alias: ['/home', '/trang-chu'] }
```

> 🔗 [Route Matching Syntax](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)

## 8. Composition API & điều hướng

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter() // điều hướng
const route = useRoute()   // đọc thông tin route hiện tại

function goDetail(id) {
  router.push({ name: 'user', params: { id } })
  // router.replace(...)  — không ghi history
  // router.back() / router.forward()
}
</script>
```

> 📌 `useRoute()` trả về object **reactive** — dùng trong template/computed được; không destructure nó (sẽ mất reactivity).

## 9. Tổng kết

- ✔ `createRouter()` + history factory (`createWebHistory` / `createWebHashHistory` / `createMemoryHistory`) thay cho `new VueRouter({ mode })`.
- ✔ `addRoute()` cho dynamic routing (phân quyền, plugin).
- ✔ Nested routes + `<router-view>` lồng nhau.
- ✔ Lazy loading bằng dynamic `import()` — mỗi route 1 chunk.
- ✔ Guards hiện đại: return giá trị, async/await, không cần `next()`.
- ✔ Custom regex trong path params + catch-all 404.
- ✔ Composition API: `useRoute()`, `useRouter()`, `onBeforeRouteUpdate/Leave`.

## 🔗 References

- [Vue Router 4 docs](https://router.vuejs.org/)
- [Migrating from Vue 2 / Router 3](https://router.vuejs.org/guide/migration)
- [Dynamic Routing](https://router.vuejs.org/guide/advanced/dynamic-routing.html)
- [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Route Matching Syntax](https://router.vuejs.org/guide/essentials/route-matching-syntax.html)
