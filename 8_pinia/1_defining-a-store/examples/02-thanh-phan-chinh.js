import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // State phải là một hàm trả về object
  state: () => ({
    count: 0,
    name: 'Eduardo',
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
  },

  actions: {
    increment() {
      this.count++
    },
  },
})
