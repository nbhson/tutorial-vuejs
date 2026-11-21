await api.patch('/me/password', { oldPassword, newPassword })
// Nhiều hệ thống đăng xuất tất cả phiên khác sau đổi mật khẩu
auth.logout()
