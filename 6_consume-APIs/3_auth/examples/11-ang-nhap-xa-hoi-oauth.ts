// Chuyển hướng người dùng tới provider; server callback trả token qua query
window.location.href = `${API}/auth/google?redirect=${encodeURIComponent(location.origin)}`
// Server redirect về /auth/callback?token=... → gọi login() của store
