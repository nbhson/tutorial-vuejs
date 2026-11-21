export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  provide() {
    return {
      message: this.message
    }
  }
}
