// router/index.ts
{
  path: '/admin',
  beforeEnter: () => {
    const auth = useAuthStore()
    return auth.isAdmin ? true : { name: 'forbidden' }
  },
}
