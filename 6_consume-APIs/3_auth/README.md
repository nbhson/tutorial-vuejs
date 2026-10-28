# Auth — Xác thực và phân quyền trong Vue (JWT, token, guard)

> **Yêu cầu:** Vue 3.5+ · axios · Vue Router 4 · Pinia
> **Bài trước:** [`2_intercepter`](../2_intercepter/README.md)

---

## 1. Tổng quan kiến trúc auth ở phía Vue

Front-end không "xác thực" — xác thực diễn ra ở **server**. Vue app chỉ:

1. Gửi thông tin đăng nhập (email + mật khẩu) qua HTTPS.
2. Nhận **token** (thường là JWT) hoặc **cookie phiên** từ server.
3. **Lưu** token an toàn nhất có thể.
4. **Gắn** token vào mỗi request (interceptor — xem bài trước).
5. **Điều hướng** dựa trên trạng thái đăng nhập (route guard).

```
┌─────────┐  POST /login   ┌──────────┐
│ Vue app │ ─────────────▶ │  Server  │ ── trả { accessToken, refreshToken }
│         │ ◀───────────── │          │
└────┬────┘   JSON token   └──────────┘
     │ lưu token + interceptor
     ▼
  mọi request: Authorization: Bearer <accessToken>
```

> ⚠️ **Mật khẩu chỉ gửi qua HTTPS.** Front-end chỉ là lớp hiển thị — mọi kiểm tra quyền thực sự phải có ở backend.

---

## 2. Auth store với Pinia — nguồn sự thật

```ts
// stores/auth.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '@/api/client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })
    token.value = data.accessToken
    user.value = data.user
    localStorage.setItem('access_token', data.accessToken)   // xem mục 3
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('access_token')
  }

  return { user, token, isLoggedIn, isAdmin, login, logout }
})
```

Chi tiết Pinia: [`8_pinia/1_defining-a-store`](../../8_pinia/1_defining-a-store/README.md).

---

## 3. Lưu token — lựa chọn và rủi ro

| Cách lưu | Ưu | Nhược |
|---|---|---|
| `localStorage` | Đơn giản, sống sót qua refresh | ❌ Đọc được bằng **mọi JS trên trang** — XSS đọc trộm được |
| **`httpOnly` cookie** (server set) | ⭐ JS không đọc được — an toàn nhất với XSS | Cần cấu hình backend `SameSite`, `CSRF` |
| State trong memory (Pinia) | Không lưu bền | Mất khi refresh trang |

**Khuyến nghị thực chiến:**

- **Access token ngắn hạn** (5–15 phút): lưu trong memory, hoặc cookie httpOnly do server phát hành.
- **Refresh token dài hạn**: chỉ trong **httpOnly cookie** (server đảm nhiệm), front-end không chạm vào.
- Nếu dự án đơn giản dùng `localStorage`: hiểu rõ rủi ro XSS và giữ các thư viện phụ thuộc kiểm soát (audit `npm audit`).

---

## 4. Trang đăng nhập

```vue
<!-- pages/Login.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function submit() {
  loading.value = true
  error.value = ''
  try {
    const auth = useAuthStore()
    await auth.login(email.value, password.value)
    router.push('/')                       // hoặc redirect về ?redirect=... trước đó
  } catch (e) {
    error.value = e.response?.status === 401
      ? 'Email hoặc mật khẩu không đúng'
      : 'Không thể đăng nhập, thử lại sau'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="email" type="email" required placeholder="Email" />
    <input v-model="password" type="password" required placeholder="Mật khẩu" />
    <button :disabled="loading">
      {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
    </button>
    <p v-if="error" class="err">{{ error }}</p>
  </form>
</template>
```

📌 Không tự đặt mật khẩu trong state lâu hơn cần; sau `login()` thành công, xóa `password.value` khỏi bộ nhớ component.

---

## 5. Bảo vệ route — Navigation Guard

```ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    {
      path: '/admin',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }   // nhớ lại đích
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { name: 'forbidden' }     // trang 403
  }
})
```

Chi tiết navigation guards: [`9_vue-ecosystem/vue-router-4`](../../9_vue-ecosystem/vue-router-4/README.md).

> 💡 Sau login thành công với query `redirect`, quay lại đúng trang user định vào:
> `router.push(route.query.redirect ?? '/')`.

---

## 6. Refresh token — tự động đổi token khi 401

```ts
// api/client.ts
let refreshing: Promise<string> | null = null

api.interceptors.response.use(undefined, async (error) => {
  const original = error.config

  // KHÔNG retry cho chính endpoint refresh → tránh vòng lặp
  if (error.response?.status !== 401 || original.url === '/auth/refresh') {
    return Promise.reject(error)
  }

  try {
    refreshing ??= api.post('/auth/refresh').then((r) => r.data.accessToken)
    const token = await refreshing
    localStorage.setItem('access_token', token)
    original.headers.Authorization = `Bearer ${token}`
    return api(original)                 // gửi lại request gốc bằng token mới
  } catch {
    useAuthStore().logout()
    return Promise.reject(error)
  } finally {
    refreshing = null
  }
})
```

📌 Hai điểm kỹ thuật quan trọng:

- **`refreshing ??=`** — nếu 3 request đồng thời nhận 401, chỉ một request `/auth/refresh` được gửi; hai request còn lại chờ dùng chung token mới.
- **Kiểm tra URL** để không refresh vô hạn khi chính endpoint refresh trả 401.

---

## 7. Phân quyền trong UI (v-show/permission)

Ẩn/hiện nút theo vai trò — nhưng nhớ **UI không phải bảo mật**, chỉ là trải nghiệm:

```vue
<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <button v-if="auth.isAdmin">Xóa người dùng</button>
  <button v-if="auth.isLoggedIn" @click="auth.logout()">Đăng xuất</button>
</template>
```

Cách gọn hơn — đăng ký directive toàn cục `v-permission`:

```ts
// main.ts
app.directive('permission', {
  mounted(el, binding) {
    const auth = useAuthStore()
    if (!binding.check(binding.value)) el.remove()
    // ví dụ: v-permission="'admin'"
  },
})
```

---

## 8. Khôi phục phiên khi F5 — bootstrapping

Sau khi refresh trang, Pinia state rỗng → đọc lại token và lấy thông tin user:

```ts
// main.ts (trước mount)
const auth = useAuthStore()
const savedToken = localStorage.getItem('access_token')

if (savedToken) {
  auth.token = savedToken
  try {
    await auth.fetchProfile()      // GET /me — xác thực token còn hạn
    await router.isReady()         // chờ router trước khi mount
    app.mount('#app')
  } catch {
    auth.logout()                  // token đã hết hạn/hỏng
    app.mount('#app')
  }
}
```

📌 Hoặc dùng `router.beforeEach` để gọi `fetchProfile()` lần đầu khi cần — tránh treo trang nếu `/me` chậm.

---

## 9. Use-cases thực tế

### Đăng ký tài khoản

```ts
await api.post('/auth/register', { name, email, password })
router.push({ name: 'login', query: { registered: '1' } })
```

### Đổi mật khẩu (yêu cầu đang đăng nhập)

```ts
await api.patch('/me/password', { oldPassword, newPassword })
// Nhiều hệ thống đăng xuất tất cả phiên khác sau đổi mật khẩu
auth.logout()
```

### Bảo vệ route của admin (chi tiết)

```ts
// router/index.ts
{
  path: '/admin',
  beforeEnter: () => {
    const auth = useAuthStore()
    return auth.isAdmin ? true : { name: 'forbidden' }
  },
}
```

### Đăng nhập xã hội (OAuth)

```ts
// Chuyển hướng người dùng tới provider; server callback trả token qua query
window.location.href = `${API}/auth/google?redirect=${encodeURIComponent(location.origin)}`
// Server redirect về /auth/callback?token=... → gọi login() của store
```

---

## 10. Checklist bảo mật auth front-end

- ✅ **HTTPS** bắt buộc cho mọi request.
- ✅ Token trong **httpOnly cookie** nếu có thể (hợp tác backend), không tự lưu trong `localStorage` nếu có cookie.
- ✅ Access token ngắn hạn + **refresh token** tự động (interceptor, bài trước).
- ✅ Mọi route nhạy cảm có `meta.requiresAuth` + guard.
- ✅ Mọi kiểm tra quyền quan trọng **phải lặp lại ở backend** (UI chỉ để trải nghiệm).
- ✅ Logout dọn dẹp sạch: token, store, header mặc định, cache của interceptor (`refreshing = null`).
- ❌ Không nhúng mật khẩu hay secret trong bundle (`VITE_` env là **công khai**!).

---

## Nguồn tham khảo

- JWT best practices: https://jwt.io/introduction
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- Navigation Guards: https://router.vuejs.org/guide/advanced/navigation-guards.html
- Pinia (auth store): https://pinia.vuejs.org/
- axios interceptors: https://axios-http.com/docs/interceptors
