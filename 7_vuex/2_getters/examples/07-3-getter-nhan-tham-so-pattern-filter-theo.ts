// ✅ Pinia
const todoById = computed(() => (id) => todos.value.find((t) => t.id === id))
