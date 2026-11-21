const routes = [
  { path: '/posts/:id', component: Post },
  { path: '/users/:userId/posts/:postId', component: UserPost },  // nhiều tham số
  { path: '/docs/:path(*)', component: Doc },                     // bắt mọi thứ còn lại
]
