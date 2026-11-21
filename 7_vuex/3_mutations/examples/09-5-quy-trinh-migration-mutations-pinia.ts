// ✅ Pinia action tương đương
export const useCartStore = defineStore('cart', () => {
  const items = ref<Item[]>([])
  function addItem(item: Item) { items.value.push(item) }   // không cần mutation
  return { items, addItem }
})
