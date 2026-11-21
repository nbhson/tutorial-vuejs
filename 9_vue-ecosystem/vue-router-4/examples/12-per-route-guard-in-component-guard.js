const routes = [{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from) => {
    return isAdmin() ? true : '/login'
  }
}]
