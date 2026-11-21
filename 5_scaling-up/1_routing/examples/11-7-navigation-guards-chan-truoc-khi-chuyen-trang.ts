// Toàn cục — trước MỌI lần điều hướng
router.beforeEach((to, from) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }   // hủy + chuyển hướng
  }
  // return true để cho phép đi tiếp; return false để hủy
})
