import { ref } from 'vue'

pinia.use(({ store }) => {
  store.count = ref(1)
})

console.log(store.count) // 1 (tự động unwrap)
