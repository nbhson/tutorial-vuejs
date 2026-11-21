import { useUserStore } from '@/stores/user'
import { createRouter } from 'vue-router'

const router = createRouter({ /* ... */ })

router.beforeEach((to) => {
  // ✅ ĐÚNG: Gọi store ngay bên trong navigation guard
  const store = useUserStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return '/login'
  }
})
