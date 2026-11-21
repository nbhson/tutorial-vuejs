// ❌ Vuex 4 — legacy
const cart = {
  namespaced: true,        // ⭐ BẮT BUỘC nếu muốn gọi qua 'cart/...'
  state: () => ({ items: [] }),
  getters: { itemCount: (s) => s.items.length },
  mutations: { add(s, item) { s.items.push(item) } },
  actions: { checkout({ state, commit }) { /* ... */ } },
}

const user = {
  namespaced: true,
  state: () => ({ name: '' }),
}

export default createStore({
  modules: { cart, user },
})
