// ✅ stores/cart.ts (Pinia)
export const useCartStore = defineStore('cart', () => {
  const items = ref<Item[]>([])
  const itemCount = computed(() => items.value.length)
  function add(item: Item) { items.value.push(item) }
  async function checkout() { /* ... */ }
  return { items, itemCount, add, checkout }
})
