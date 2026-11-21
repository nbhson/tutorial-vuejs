export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    // Truy cập getter khác qua 'this'
    doublePlusOne(): number {
      return this.doubleCount + 1
    },
  },
})
