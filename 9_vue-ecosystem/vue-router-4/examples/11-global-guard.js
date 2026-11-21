router.beforeEach(async (to, from) => {
  // Kiểm tra đăng nhập
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // return giá trị thay vì done() callback như v3
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // return true / undefined → cho phép đi tiếp
})
