function useLogger() {
  onMounted(() => {
    console.log('Mounted từ composable')
  })
}

export default {
  setup() {
    useLogger()
  }
}
