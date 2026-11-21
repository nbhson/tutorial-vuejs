import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // state → như data()
  state: () => ({
    count: 0,
    items: []
  }),
  // getters → như computed
  getters: {
    double: (state) => state.count * 2
  },
  // actions → như methods, có thể async
  actions: {
    increment() {
      this.count++ // sửa state trực tiếp, không cần mutation!
    },
    async fetchItems() {
      this.items = await fetch('/api/items').then(r => r.json())
    }
  }
})
