import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('Component sắp bị hủy')
})
