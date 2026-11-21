import { defineAsyncComponent } from 'vue'

const AsyncStats = defineAsyncComponent(() =>
  import('./Stats.vue')
)
