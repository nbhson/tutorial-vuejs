const routes = [
  // :id là dynamic segment
  { path: '/users/:id', component: UserDetail },
  // Nhiều params
  { path: '/posts/:postId/comments/:commentId', component: Comment },
  // catch-all 404
  { path: '/:pathMatch(.*)*', component: NotFound },
]
