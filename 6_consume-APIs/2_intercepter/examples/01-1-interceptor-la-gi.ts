import { api } from './client'

// Chạy trước MỌI request
api.interceptors.request.use(
  (config) => {
    // thêm header, log, đếm request đang chạy...
    return config                 // BẮT BUỘC return config
  },
  (error) => Promise.reject(error)
)

// Chạy khi NHẬN response (hoặc lỗi)
api.interceptors.response.use(
  (response) => response,         // status 2xx
  (error) => Promise.reject(error) // status ≥ 400, lỗi mạng...
)
