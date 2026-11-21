// Cấu hình dùng chung: hiện "đang tải" khi còn bất kỳ request nào
let pending = 0

api.interceptors.request.use((config) => {
  if (++pending === 1) window.dispatchEvent(new Event('app:loading-on'))
  return config
})

api.interceptors.response.use(
  (res) => {
    if (--pending === 0) window.dispatchEvent(new Event('app:loading-off'))
    return res
  },
  (error) => {
    if (--pending === 0) window.dispatchEvent(new Event('app:loading-off'))
    return Promise.reject(error)
  }
)
