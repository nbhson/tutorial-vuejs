export default {
  setup() {
    const { x, y } = useMouse()
    return { x, y }
  },
  mounted() {
    console.log(this.x)
  }
}
