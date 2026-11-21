// stores/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as Item[] }),
  actions: {
    add(item: Item) { this.items.push(item) },
  },
})
