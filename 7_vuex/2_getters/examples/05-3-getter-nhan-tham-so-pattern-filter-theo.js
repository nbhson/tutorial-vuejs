// ❌ legacy Vuex
getters: {
  todoById: (state) => (id) => state.todos.find((t) => t.id === id),
}
