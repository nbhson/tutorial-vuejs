import { onMounted } from 'vue'

onMounted(() => {
  console.log('Component đã mount')
  fetchData()
})
