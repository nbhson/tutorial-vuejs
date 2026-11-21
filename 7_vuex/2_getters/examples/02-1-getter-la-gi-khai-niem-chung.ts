// ✅ Pinia tương đương — see 8_pinia/3_getters
export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  const doneTodos = computed(() => todos.value.filter((t) => t.done))
  return { todos, doneTodos }
})
