import { createPinia } from 'pinia'

const pinia = createPinia()

// Đăng ký plugin
pinia.use(myPiniaPlugin)
