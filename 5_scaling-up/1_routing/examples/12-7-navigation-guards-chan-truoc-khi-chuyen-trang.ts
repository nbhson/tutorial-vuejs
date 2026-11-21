// Trong route cụ thể
{
  path: '/admin',
  beforeEnter: () => useAuthStore().isAdmin ? true : { name: 'forbidden' },
}
