// legacy
actions: {
  async login({ dispatch }, credentials) {
    await dispatch('auth/requestToken', credentials, { root: true })
    await dispatch('loadProfile')
  },
  async loadProfile({ commit }) { /* ... */ },
}
