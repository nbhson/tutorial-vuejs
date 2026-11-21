store.$patch({
  count: store.count + 1,
  items: [...store.items, 'new item']
})

// Dạng function — an toàn khi thao tác với collection
store.$patch((state) => {
  state.items.push('new item')
})
