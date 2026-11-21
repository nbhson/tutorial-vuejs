import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ OK: pinia đã được cài đặt và active
const userStore = useUserStore()
