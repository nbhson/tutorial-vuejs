let refreshing: Promise<string> | null = null

api.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status !== 401) return Promise.reject(error)

  refreshing ??= refreshToken()          // chỉ 1 request refresh tại một thời điểm
  try {
    const token = await refreshing
    error.config.headers.Authorization = `Bearer ${token}`
    return api(error.config)             // gửi lại request gốc
  } catch {
    // refresh cũng thất bại → đăng xuất
  } finally {
    refreshing = null
  }
})
