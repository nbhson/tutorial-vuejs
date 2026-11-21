// Hủy khi không còn cần (ví dụ logout)
const id = api.interceptors.request.use(requestLogger)
api.interceptors.request.eject(requestInterceptorId)
