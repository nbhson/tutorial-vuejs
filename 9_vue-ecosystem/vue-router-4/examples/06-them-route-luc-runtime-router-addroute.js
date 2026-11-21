// Sau khi đăng nhập, thêm route theo quyền
router.addRoute({
  path: '/admin',
  component: AdminPanel,
  meta: { requiresAdmin: true }
})
