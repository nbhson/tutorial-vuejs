pinia.use(() => ({
  hello: 'world'
}))

// Sử dụng
const store = useStore()
console.log(store.hello) // 'world'
