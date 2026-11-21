import { onBeforeUpdate } from 'vue'

onBeforeUpdate(() => {
  console.log('Dữ liệu đổi, DOM sắp update')
})
