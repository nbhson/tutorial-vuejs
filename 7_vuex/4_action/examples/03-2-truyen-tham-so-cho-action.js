// legacy
actions: {
  async createPost({ commit }, payload) {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    commit('addPost', await res.json())
  },
}
