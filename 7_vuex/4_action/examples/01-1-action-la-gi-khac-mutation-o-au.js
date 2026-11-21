// ❌ Vuex 4 — legacy
import { createStore } from 'vuex'

export default createStore({
  state: () => ({ posts: [], loading: false }),
  mutations: {
    setPosts(state, posts) { state.posts = posts },
    setLoading(state, v)   { state.loading = v },
  },
  actions: {
    // context có: commit, dispatch, state, rootState, rootGetters...
    async fetchPosts({ commit }) {
      commit('setLoading', true)
      try {
        const res = await fetch('/api/posts')
        commit('setPosts', await res.json())
      } finally {
        commit('setLoading', false)
      }
    },
  },
})
