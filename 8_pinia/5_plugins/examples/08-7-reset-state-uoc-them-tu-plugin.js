pinia.use(({ store }) => {
  const originalReset = store.$reset.bind(store)

  return {
    $reset() {
      originalReset() // Reset các state gốc
      store.hasError = false // Reset state của plugin
    }
  }
})
