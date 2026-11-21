const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // /user/:id/profile
      { path: 'profile', component: UserProfile },
      // /user/:id/posts
      { path: 'posts', component: UserPosts },
      // /user/:id → mặc định hiển thị profile
      { path: '', redirect: 'profile' },
    ]
  }
]
