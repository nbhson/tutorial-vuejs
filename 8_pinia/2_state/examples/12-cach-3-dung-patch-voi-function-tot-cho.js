store.$patch(state => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
