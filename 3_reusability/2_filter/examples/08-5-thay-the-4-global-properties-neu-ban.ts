// main.ts
import { createApp } from 'vue'
import { formatCurrency } from '@/utils/format'

const app = createApp(App)
app.config.globalProperties.$currency = formatCurrency   // ⚠️ chỉ dùng khi cần
app.mount('#app')
