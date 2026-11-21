store.commit('add', { id: 3, text: 'Nhiệm vụ mới', done: false })
store.commit('todo/remove', 2, { root: true })   // gọi từ module khác
