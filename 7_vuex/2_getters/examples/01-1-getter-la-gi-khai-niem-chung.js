// ❌ Vuex 4 — legacy
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [
      { id: 1, text: 'Học Vue', done: true },
      { id: 2, text: 'Viết báo cáo', done: false },
    ],
  },
  getters: {
    doneTodos: (state) => state.todos.filter((t) => t.done),
    doneCount: (state) => state.todos.filter((t) => t.done).length,
  },
})
