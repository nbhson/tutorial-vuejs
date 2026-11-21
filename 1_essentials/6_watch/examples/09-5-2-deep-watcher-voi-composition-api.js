watch(
  () => state.user,
  () => {
    console.log('user changed')
  },
  { deep: true }
)
