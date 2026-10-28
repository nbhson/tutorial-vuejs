# Routing — Định tuyến với Vue Router 4

> **Yêu cầu:** Vue 3.5+ · vue-router 4.x
> **Chi tiết đầy đủ về router API:** [`9_vue-ecosystem/vue-router-4`](../9_vue-ecosystem/vue-router-4/README.md)

---

## 1. Routing đơn giản không cần thư viện (hiểu cách hoạt động)

Trước khi cài router, bạn có thể làm "router" bằng cách ánh xạ hash-URL tới component — giúp hiểu nguyên lý của Vue Router:

```vue
<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

📌 Ứng dụng thực tế: **không dùng cách này cho dự án** — thiếu route động, navigation guard, lazy-load. Dùng Vue Router 4. Nhưng nguyên lý (URL → component map → render bằng `<component :is>`) chính là cốt lõi của router.

---

## 2. Cài đặt Vue Router 4

```bash
npm install vue-router@4
```

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') },
  ],
})

export default router
```

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

> 💡 `npm create vue@latest` hỏi có cài router ngay khi tạo dự án — chọn "Yes" để được khung sẵn như trên.

---

## 3. `<RouterLink>` và `<RouterView>`

```vue
<script setup>
// App.vue
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <!-- RouterLink render thành <a>, có class active/router-link-active -->
    <RouterLink to="/">Trang chủ</RouterLink>
    <RouterLink to="/about">Giới thiệu</RouterLink>
    <RouterLink :to="{ name: 'post', params: { id: 42 } }">Bài #42</RouterLink>
  </nav>

  <!-- View tương ứng được render ở đây -->
  <RouterView />
</template>
```

- `to="/about"` — theo đường dẫn; `:to="{ name: 'about' }"` — theo tên route (khuyến nghị, chống hỏng khi đổi path).
- `active-class` — đổi class active mặc định (`router-link-active`).

---

## 4. Route động — tham số trong URL

```ts
const routes = [
  { path: '/posts/:id', component: Post },
  { path: '/users/:userId/posts/:postId', component: UserPost },  // nhiều tham số
  { path: '/docs/:path(*)', component: Doc },                     // bắt mọi thứ còn lại
]
```

```vue
<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
console.log(route.params.id)         // "42" — luôn là STRING, cần Number() nếu so sánh

// Điều quan trọng: cùng component với params khác nhau KHÔNG bị unmount/remount
watch(() => route.params.id, (newId) => {
  fetchPost(newId)                   // tự reload dữ liệu khi id đổi
})
</script>
```

---

## 5. Lazy loading route (code splitting)

Mỗi route một chunk riêng — trang chính tải nhẹ, chỉ tải view khi vào:

```ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),   // ⭐ lazy
  },
  // Nhóm route sang chung một chunk:
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
  },
]
```

> 💡 Đây là tối ưu quan trọng nhất khi dự án lớn lên. Ghi chú `/* webpackChunkName */` (Vite cũng hỗ trợ dạng `/* @vite-ignore */`-tuần tự qua cấu hình `manualChunks`).

---

## 6. Nested routes (route con)

```ts
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      { path: 'profile', component: UserProfile },    // /user/42/profile
      { path: 'posts', component: UserPosts },        // /user/42/posts
      { path: '', component: UserHome },              // mặc định khi vào /user/42
    ],
  },
]
```

```vue
<!-- User.vue — RouterView lồng nhau -->
<template>
  <h2>Người dùng #{{ route.params.id }}</h2>
  <nav>
    <RouterLink :to="`/user/${route.params.id}/profile`">Hồ sơ</RouterLink>
    <RouterLink :to="`/user/${route.params.id}/posts`">Bài viết</RouterLink>
  </nav>
  <RouterView />   <!-- route con render ở đây -->
</template>
```

---

## 7. Navigation guards — chặn trước khi chuyển trang

```ts
// Toàn cục — trước MỌI lần điều hướng
router.beforeEach((to, from) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }   // hủy + chuyển hướng
  }
  // return true để cho phép đi tiếp; return false để hủy
})
```

```ts
// Trong route cụ thể
{
  path: '/admin',
  beforeEnter: () => useAuthStore().isAdmin ? true : { name: 'forbidden' },
}
```

```vue
<!-- Trong component -->
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave(() => {
  if (formDirty.value) {
    return window.confirm('Dữ liệu chưa lưu, chắc chắn rời trang?')
  }
})
</script>
```

Thứ tự chạy: `beforeEach` (toàn cục) → `beforeEnter` (route) → guard trong component (`beforeRouteEnter`/`beforeRouteUpdate`/`beforeRouteLeave`).

---

## 8. Programmatic navigation + đọc thông tin route

```ts
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Đi (giống RouterLink nhưng bằng code)
router.push('/posts/42')
router.push({ name: 'post', params: { id: 42 }, query: { tab: 'comments' } })
router.replace('/login')     // không lưu vào history
router.go(-1)                // quay lại

// Đọc
route.params.id        // tham số động
route.query.page       // ?page=2
route.hash             // #section
route.meta             // dữ liệu tự gắn (requiresAuth...)
route.name             // tên route
```

📌 Luật lịch sử: `push` thêm vào history (nút Back quay về được), `replace` thay thế mục hiện tại.

---

## 9. Scroll behavior + meta

```ts
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition                    // Back/Forward giữ vị trí
    if (to.hash) return { el: to.hash, behavior: 'smooth' }    // cuộn tới anchor
    return { top: 0 }                                           // lên đầu trang
  },
})
```

---

## 10. Use-cases thực tế

### 404 route bắt mọi URL sai

```ts
{ path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
```

### Route nhớ tab qua query

```ts
// /settings?tab=security
const tab = computed(() => route.query.tab ?? 'profile')
```

### Đổi document title theo route

```ts
router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Ứng dụng'} — MyApp`
})
```

### Guard đăng nhập (tóm tắt — chi tiết bài auth)

```ts
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

---

## Nguồn tham khảo

- Vue Router 4: https://router.vuejs.org/
- Getting started: https://router.vuejs.org/guide/
- Navigation Guards: https://router.vuejs.org/guide/advanced/navigation-guards.html
- Dynamic Routing / lazy loading: https://router.vuejs.org/guide/advanced/lazy-loading.html
- Bài chi tiết về API router: [`9_vue-ecosystem/vue-router-4`](../9_vue-ecosystem/vue-router-4/README.md)
