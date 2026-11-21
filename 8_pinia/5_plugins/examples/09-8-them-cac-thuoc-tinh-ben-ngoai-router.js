import { markRaw } from 'vue'
import { router } from '@/router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
