const activeItems = computed(() =>
  items.value.filter(item => item.active)
)
