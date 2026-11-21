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
