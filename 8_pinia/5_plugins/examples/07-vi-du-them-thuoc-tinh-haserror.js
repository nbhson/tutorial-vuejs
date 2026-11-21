import { ref, toRef } from 'vue'

pinia.use(({ store }) => {
  if (!store.$state.hasOwnProperty('hasError')) {
    store.$state.hasError = ref(false)
  }

  // Luôn dùng toRef để liên kết giữa store instance và $state
  store.hasError = toRef(store.$state, 'hasError')
})
