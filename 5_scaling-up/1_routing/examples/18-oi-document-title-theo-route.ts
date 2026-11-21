router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Ứng dụng'} — MyApp`
})
