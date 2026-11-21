const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      { path: 'profile', component: UserProfile },    // /user/42/profile
      { path: 'posts', component: UserPosts },        // /user/42/posts
      { path: '', component: UserHome },              // mặc định khi vào /user/42
    ],
  },
]
