const routes = [
  {
    path: '/dashboard',
    // Dynamic import — chunk riêng
    component: () => import('./views/Dashboard.vue')
  },
  {
    path: '/admin',
    // Tải nhóm route thành 1 chunk
    component: () => import('./views/Admin.vue'),
    children: [
      { path: 'stats', component: () => import('./views/Stats.vue') }
    ]
  }
]
