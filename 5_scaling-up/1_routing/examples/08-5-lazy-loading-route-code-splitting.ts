const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),   // ⭐ lazy
  },
  // Nhóm route sang chung một chunk:
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
  },
]
