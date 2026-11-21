// ❌ legacy
mutations: {
  addTodo(state, todo) {
    state.todos.push(todo)
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter((t) => t.id !== id)
  },
}
