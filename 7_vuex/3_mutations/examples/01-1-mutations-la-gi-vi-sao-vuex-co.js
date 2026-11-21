// ❌ Vuex 4 — legacy
import { createStore } from 'vuex'

export default createStore({
  state: () => ({ count: 0 }),
  mutations: {
    increment(state) {
      state.count++                       // thay đổi state ở đây
    },
    incrementBy(state, amount) {
      state.count += amount
    },
  },
})
