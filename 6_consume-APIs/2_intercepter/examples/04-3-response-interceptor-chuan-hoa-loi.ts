// api/errors.ts
import { api } from './client'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status
    const messages = {
      400: 'Dữ liệu gửi đi không hợp lệ',
      401: 'Phiên đăng nhập hết hạn',
      403: 'Bạn không có quyền thực hiện',
      404: 'Không tìm thấy tài nguyên',
      422: 'Dữ liệu chưa đúng định dạng',
      500: 'Lỗi máy chủ, vui lòng thử lại',
    }
    const message = messages[status] ?? error.message
    return Promise.reject(new ApiError(message, status))
  }
)
