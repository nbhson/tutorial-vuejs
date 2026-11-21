pinia.use(({ store }) => {
  // Lắng nghe thay đổi state
  store.$subscribe((mutation, state) => {
    console.log(`Store ${mutation.storeId} đã thay đổi`)
  })

  // Lắng nghe các actions
  store.$onAction(({ name, args, after, onError }) => {
    console.log(`Action "${name}" được gọi với tham số:`, args)
  })
})
