api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = localStorage.getItem('lang') ?? 'vi'
  if (config.method === 'post') {
    config.headers['Idempotency-Key'] = crypto.randomUUID()   // chống tạo trùng khi retry
  }
  return config
})
