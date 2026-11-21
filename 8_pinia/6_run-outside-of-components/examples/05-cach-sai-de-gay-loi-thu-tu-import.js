import { useUserStore } from '@/stores/user'
import { createRouter } from 'vue-router'

const router = createRouter({ /* ... */ })

// ❌ SAI: gọi store ở ngoài, có thể chạy trước khi pinia sẵn sàng
const store = useUserStore()

router.beforeEach((to, from, next) => {
  if (store.isLoggedIn) next()
  else next('/login')
})
