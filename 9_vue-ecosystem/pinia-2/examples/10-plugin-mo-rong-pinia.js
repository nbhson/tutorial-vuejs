const pinia = createPinia()
pinia.use(({ store }) => {
  // VD: auto-persist mọi store
  store.$subscribe(() => {
    localStorage.setItem(store.$id, JSON.stringify(store.$state))
  })
})
