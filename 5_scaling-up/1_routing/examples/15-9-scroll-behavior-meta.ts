const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition                    // Back/Forward giữ vị trí
    if (to.hash) return { el: to.hash, behavior: 'smooth' }    // cuộn tới anchor
    return { top: 0 }                                           // lên đầu trang
  },
})
