# Axios — Gọi REST API trong Vue

> **Yêu cầu:** Vue 3.5+ · Vite · TypeScript · axios 1.x
> **Bài sau:** [`2_intercepter`](../2_intercepter/README.md)

---

## 1. Cài đặt và khi nào dùng axios

```bash
npm install axios
```

Axios là thư viện HTTP client phổ biến nhất với Vue, khác `fetch` ở:

| Tiêu chí | axios | fetch (native) |
|---|---|---|
| JSON parse | **Tự động** (`response.data`) | Phải `await res.json()` thủ công |
| HTTP status lỗi | Reject tự động khi status ≥ 400 | Chỉ reject khi lỗi mạng — phải tự kiểm tra `res.ok` |
| Interceptor | ✅ Có sẵn | ❌ Tự viết wrapper |
| Timeout | ✅ `timeout: 5000` | Phải qua `AbortController` |
| Upload progress | ✅ `onUploadProgress` | ❌ |
| Kích thước | ~13 kB | 0 kB |

> 💡 Chỉ cần GET/POST đơn giản, `fetch` của trình duyệt là đủ (đã trình bày trong các bài về async component). axios đáng giá khi bạn cần **interceptor, instance cấu hình chung, upload progress** — nội dung của bài này và bài sau.

---

## 2. GET — lấy dữ liệu

```vue
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
}

const posts = ref<Post[]>([])
const loading = ref(false)
const error = ref('')

async function fetchPosts() {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    posts.value = res.data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Lỗi không rõ'
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)
</script>

<template>
  <p v-if="loading">Đang tải...</p>
  <p v-else-if="error" class="err">{{ error }}</p>
  <ul v-else>
    <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
  </ul>
</template>
```

📌 Luôn có **3 trạng thái** trong template: loading / error / data — đây là pattern nền của mọi trang gọi API.

### Query params

```js
const res = await axios.get('/api/posts', {
  params: { page: 2, limit: 10 },
  // → /api/posts?page=2&limit=10 (axios tự encode)
})
```

---

## 3. POST / PUT / PATCH / DELETE

```js
// POST — tạo mới, body là object JS
const res = await axios.post('/api/posts', {
  title: 'Bài mới',
  body: 'Nội dung...',
})

// PUT — thay toàn bộ tài nguyên
await axios.put(`/api/posts/${id}`, { title: 'Tiêu đề mới', body: '...' })

// PATCH — cập nhật một phần
await axios.patch(`/api/posts/${id}`, { title: 'Chỉ sửa tiêu đề' })

// DELETE
await axios.delete(`/api/posts/${id}`)
```

📌 Lưu ý ngữ nghĩa: `POST` tạo, `PUT` thay toàn bộ, `PATCH` sửa một phần, `DELETE` xóa — API backend của bạn nên theo đúng REST convention để code front-end dễ đọc.

---

## 4. Tạo instance riêng cho dự án

Đừng gọi `axios.get(...)` với URL đầy đủ khắp nơi. Tạo một instance cấu hình một lần:

```ts
// api/client.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // .env: VITE_API_URL=https://api.example.com
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})
```

```ts
// Dùng ở component
import { api } from '@/api/client'

const res = await api.get('/posts')    // → https://api.example.com/posts
```

```bash
# .env.development / .env.production
VITE_API_URL=http://localhost:3000/api
```

📌 Lợi ích: đổi môi trường dev/staging/prod không cần sửa code; timeout và header áp dụng cho mọi request.

---

## 5. Xử lý lỗi chuyên nghiệp

```vue
<script setup>
import { api } from '@/api/client'
import { ref } from 'vue'

const error = ref('')

async function save(data) {
  try {
    await api.post('/posts', data)
  } catch (e) {
    if (e.response) {
      // Server có phản hồi (status ngoài 2xx)
      const { status, data } = e.response
      if (status === 401) error.value = 'Chưa đăng nhập'
      else if (status === 422) error.value = Object.values(data.errors ?? {}).join(', ')
      else error.value = `Lỗi server (${status})`
    } else if (e.request) {
      // Gửi được request nhưng không có phản hồi
      error.value = 'Không kết nối được máy chủ'
    } else {
      error.value = e.message
    }
  }
}
</script>
```

Cấu trúc lỗi của axios — khi xử lý lỗi luôn phân biệt:

| Thuộc tính | Khi nào có | Ý nghĩa |
|---|---|---|
| `e.response` | Server đã trả lời (kể cả 4xx/5xx) | `{ status, data, headers }` |
| `e.request` | Request đã gửi, không nhận được response | Timeout, mạng đứt |
| `e.message` | Lỗi trước khi gửi (cấu hình sai) | |

---

## 6. Trạng thái loading & tránh race condition

Người dùng bấm nhanh nhiều lần → nhiều request cùng chạy → kết quả "chạy đua". Dùng cờ + token hủy:

```vue
<script setup>
import { ref } from 'vue'
import { api } from '@/api/client'

const keyword = ref('')
const results = ref([])
const loading = ref(false)
let controller

async function search() {
  loading.value = true
  try {
    const res = await api.get('/search', {
      params: { q: keyword.value },
      signal: AbortSignal.timeout(5000),   // tự hủy sau 5s
    })
    results.value = res.data
  } catch (e) {
    if (e.code !== 'ERR_CANCELED') console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
```

Với debounce ô tìm kiếm, kết hợp `@input` + timer (hoặc thư viện `@vueuse/core` — `useDebounceFn`).

---

## 7. Pattern chuẩn: tách API ra khỏi component

Component nên "mỏng" — chỉ lo render. Đưa lời gọi API vào module riêng:

```ts
// api/posts.ts
import { api } from './client'

export interface Post { id: number; title: string; body: string }

export const postsApi = {
  list: (params = {}) => api.get<Post[]>('/posts', { params }).then((r) => r.data),
  get: (id: number) => api.get<Post>(`/posts/${id}`).then((r) => r.data),
  create: (body: Omit<Post, 'id'>) => api.post<Post>('/posts', body).then((r) => r.data),
  remove: (id: number) => api.delete(`/posts/${id}`),
}
```

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { postsApi } from '@/api/posts'

const posts = ref<Post[]>([])
onMounted(async () => {
  posts.value = await postsApi.list()
})
</script>
```

📌 Component không biết axios tồn tại → đổi thư viện HTTP hay mock API khi test đều dễ.

---

## 8. Use-cases thực tế

### Danh sách phân trang + load-more

```js
const page = ref(1)
const items = ref([])
const done = ref(false)

async function loadMore() {
  const res = await api.get('/api/products', { params: { page: page.value } })
  items.value.push(...res.data)
  if (res.data.length < 10) done.value = true   // hết dữ liệu
  page.value++
}
```

### Upload file kèm tiến trình

```vue
<script setup>
import { ref } from 'vue'

const file = ref(null)
const progress = ref(0)

async function upload() {
  const fd = new FormData()
  fd.append('avatar', file.value)
  await api.post('/upload', fd, {
    onUploadProgress: (e) => {
      progress.value = Math.round((e.loaded * 100) / e.total)
    },
  })
}
</script>

<template>
  <input type="file" @change="file = $event.target.files[0]" />
  <progress :value="progress" max="100">{{ progress }}%</progress>
  <button @click="upload">Tải lên</button>
</template>
```

---

## Nguồn tham khảo

- Axios docs: https://axios-http.com/docs/intro
- Instance API: https://axios-http.com/docs/instance
- Xử lý lỗi: https://axios-http.com/docs/handling_errors
- fetch API (phương án native): https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
