const routes = [
  // Chỉ nhận số
  { path: '/:id(\\d+)', component: DigitOnly },
  // Nhận 1 trong nhiều path — ưu tiên từ trên xuống
  { path: '/:chapters+/:slug', component: Chapter },
  // Case-insensitive & trailing slash
  { path: '/users', sensitive: false, strict: false },
]
