// defineSlots() — khai báo type cho slots (Vue 3.3+)
const slots = defineSlots<{
  default(props: { item: string }): any
  header?: (props: Record<string, never>) => any
}>()

// defineExpose() — chủ động expose property cho parent (dùng với template refs)
defineExpose({ publicMethod, publicData })
