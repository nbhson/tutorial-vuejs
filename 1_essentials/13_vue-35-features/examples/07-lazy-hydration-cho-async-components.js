import { defineAsyncComponent, hydrateOnVisible } from 'vue'

const LazyComp = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  // Chỉ hydrate khi phần tử xuất hiện trong viewport
  hydrate: hydrateOnVisible()
})
