# Axios Interceptors — Chặn và xử lý request/response tập trung

> **Yêu cầu:** Vue 3.5+ · axios 1.x · đã đọc [`1_axios`](../1_axios/README.md)
> **Bài sau:** [`3_auth`](../3_auth/README.md)

---

## 1. Interceptor là gì?

**Interceptor** là hàm chạy **trước khi request đi ra** hoặc **khi response về tới** — cho phép xử lý xuyên suốt (tự động thêm token, refresh token, log, dịch lỗi...) **tại một chỗ duy nhất** thay vì lặp code trong từng component.

```ts
import { api } from './client'

// Chạy trước MỌI request
api.interceptors.request.use(
  (config) => {
    // thêm header, log, đếm request đang chạy...
    return config                 // BẮT BUỘC return config
  },
  (error) => Promise.reject(error)
)

// Chạy khi NHẬN response (hoặc lỗi)
api.interceptors.response.use(
  (response) => response,         // status 2xx
  (error) => Promise.reject(error) // status ≥ 400, lỗi mạng...
)
```

📌 Có thể đăng ký **nhiều** interceptor cho cùng một instance — chúng chạy theo thứ tự đăng ký (FIFO với request, LIFO với response).

---

## 2. Request interceptor — tự động gắn token

Đây là use-case phổ biến nhất: mọi request cần header `Authorization`.

```ts
// api/client.ts
import axios from 'axios'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

📌 **Đọc token lúc gửi** (không cache khi tạo interceptor) — để interceptor luôn dùng token mới nhất sau khi đăng nhập lại.

### Idempotency-Key, ngôn ngữ, tenant

```ts
api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = localStorage.getItem('lang') ?? 'vi'
  if (config.method === 'post') {
    config.headers['Idempotency-Key'] = crypto.randomUUID()   // chống tạo trùng khi retry
  }
  return config
})
```

---

## 3. Response interceptor — chuẩn hóa lỗi

Thay vì mỗi component xử lý `e.response.status`, interceptor dịch lỗi về **thông điệp tiếng Việt** và trả lỗi đồng nhất:

```ts
// api/errors.ts
import { api } from './client'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status
    const messages = {
      400: 'Dữ liệu gửi đi không hợp lệ',
      401: 'Phiên đăng nhập hết hạn',
      403: 'Bạn không có quyền thực hiện',
      404: 'Không tìm thấy tài nguyên',
      422: 'Dữ liệu chưa đúng định dạng',
      500: 'Lỗi máy chủ, vui lòng thử lại',
    }
    const message = messages[status] ?? error.message
    return Promise.reject(new ApiError(message, status))
  }
)
```

```vue
<!-- Component giờ chỉ cần hiển thị thông điệp đã "dịch" -->
<script setup>
import { api } from '@/api/client'

try {
  await api.get('/orders')
} catch (e) {
  toast.error(e.message)       // "Bạn không có quyền thực hiện"...
}
</script>
```

---

## 4. Pattern phổ biến: log + đếm request đang chạy

```ts
// Cấu hình dùng chung: hiện "đang tải" khi còn bất kỳ request nào
let pending = 0

api.interceptors.request.use((config) => {
  if (++pending === 1) window.dispatchEvent(new Event('app:loading-on'))
  return config
})

api.interceptors.response.use(
  (res) => {
    if (--pending === 0) window.dispatchEvent(new Event('app:loading-off'))
    return res
  },
  (error) => {
    if (--pending === 0) window.dispatchEvent(new Event('app:loading-off'))
    return Promise.reject(error)
  }
)
```

Và trong component root hoặc store UI:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const loading = ref(false)
const on = () => (loading.value = true)
const off = () => (loading.value = false)

onMounted(() => {
  window.addEventListener('app:loading-on', on)
  window.addEventListener('app:loading-off', off)
})
// Nhớ remove trong onUnmounted để tránh leak
</script>
```

> 💡 Với dự án dùng Pinia: thay `dispatchEvent` bằng một store `ui` với state `isLoading` — interceptor chỉ gọi `uiStore.start()`/`uiStore.stop()`. Chi tiết: [`8_pinia`](../../8_pinia/README.md).

---

## 5. Interceptor + refresh token (tổng quan, chi tiết ở bài sau)

Mỗi lần nhận `401`, interceptor cố gắng **làm mới token** rồi gửi lại request gốc:

```ts
let refreshing: Promise<string> | null = null

api.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status !== 401) return Promise.reject(error)

  refreshing ??= refreshToken()          // chỉ 1 request refresh tại một thời điểm
  try {
    const token = await refreshing
    error.config.headers.Authorization = `Bearer ${token}`
    return api(error.config)             // gửi lại request gốc
  } catch {
    // refresh cũng thất bại → đăng xuất
  } finally {
    refreshing = null
  }
})
```

Chi tiết đầy đủ (lưu token, logout, tránh vòng lặp refresh): [`3_auth`](../3_auth/README.md).

---

## 6. Hủy và loại bỏ interceptor

```ts
// Hủy khi không còn cần (ví dụ logout)
const id = api.interceptors.request.use(requestLogger)
api.interceptors.request.eject(requestInterceptorId)
```

📌 Interceptor sống cùng vòng đời **instance** — với SPA thường đăng ký một lần khi khởi tạo app (trong `main.ts` hoặc module `api/client.ts`), hiếm khi cần eject.

---

## 7. Đừng lạm dụng interceptor

Interceptor là "điểm chặn toàn cục" — quyền lực lớn, dễ phá code:

| Nên | Tránh |
|---|---|
| Gắn token, refresh token | Gọi API thứ hai bên trong interceptor của API thứ nhất |
| Dịch lỗi sang thông điệp UI | Điều hướng trang (`router.push`) từ interceptor — gây khó đoán hành vi |
| Log/đếm request | Retry vô điều kiện (dễ spam server) — nếu retry, giới hạn số lần + backoff |
| Thêm header chuẩn chung | Thay đổi **body** request cho từng endpoint trong interceptor |

> ⚠️ Nguyên tắc: interceptor chỉ làm những việc **áp dụng cho mọi request/response**. Logic riêng từng endpoint nên nằm ở module API (`api/posts.ts`), không nằm trong interceptor.

---

## 8. Ví dụ tổng hợp: client hoàn chỉnh cho dự án thật

```ts
// api/client.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'   // Pinia — xem 8_pinia

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore().logout()      // token hết hạn → đăng xuất
    }
    return Promise.reject(error)
  }
)
```

📌 Chú ý gọi `useAuthStore()` **bên trong** interceptor (mỗi lần chạy) chứ không ở cấp module — vì store cần app đã mount.

---

## Nguồn tham khảo

- Axios interceptors: https://axios-http.com/docs/interceptors
- Axios headers config: https://axios-http.com/docs/handling_errors
- Pinia stores (thay state toàn cục): https://pinia.vuejs.org/
- AbortController/timeout: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout
