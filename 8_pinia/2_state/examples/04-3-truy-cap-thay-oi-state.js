const store = useStore()

// Thay đổi trực tiếp
store.count++

// Binding với v-model
// <input v-model="store.count" type="number" />
