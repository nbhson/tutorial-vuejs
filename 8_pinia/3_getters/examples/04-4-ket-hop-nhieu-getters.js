getters: {
  doubleCount(state) {
    return state.count * 2
  },
  doubleCountPlusOne(): number {
    return this.doubleCount + 1
  },
}
