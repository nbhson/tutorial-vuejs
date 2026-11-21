created() {
  const unwatch = this.$watch('count', (val) => {
    console.log(val)
  })

  unwatch() // dừng watcher
}
