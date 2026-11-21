// api/client.ts
let refreshing: Promise<string> | null = null

api.interceptors.response.use(undefined, async (error) => {
  const original = error.config

  // KHÔNG retry cho chính endpoint refresh → tránh vòng lặp
  if (error.response?.status !== 401 || original.url === '/auth/refresh') {
    return Promise.reject(error)
  }

  try {
    refreshing ??= api.post('/auth/refresh').then((r) => r.data.accessToken)
    const token = await refreshing
    localStorage.setItem('access_token', token)
    original.headers.Authorization = `Bearer ${token}`
    return api(original)                 // gửi lại request gốc bằng token mới
  } catch {
    useAuthStore().logout()
    return Promise.reject(error)
  } finally {
    refreshing = null
  }
})
