export default {
  inject: ['message'],
  created() {
    console.log(this.message)
  }
}
