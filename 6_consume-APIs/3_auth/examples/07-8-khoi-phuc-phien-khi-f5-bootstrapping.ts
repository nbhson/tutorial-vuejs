// main.ts (trước mount)
const auth = useAuthStore()
const savedToken = localStorage.getItem('access_token')

if (savedToken) {
  auth.token = savedToken
  try {
    await auth.fetchProfile()      // GET /me — xác thực token còn hạn
    await router.isReady()         // chờ router trước khi mount
    app.mount('#app')
  } catch {
    auth.logout()                  // token đã hết hạn/hỏng
    app.mount('#app')
  }
}
