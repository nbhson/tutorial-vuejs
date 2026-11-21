import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// ❌ LỖI: Gọi store ở top-level trước khi pinia được cài đặt
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
