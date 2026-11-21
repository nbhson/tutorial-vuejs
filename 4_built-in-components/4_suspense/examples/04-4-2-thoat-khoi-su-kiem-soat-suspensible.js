const AsyncStats = defineAsyncComponent({
  loader: () => import('./Stats.vue'),
  suspensible: false
})
