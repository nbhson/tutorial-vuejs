export default {
  inject: ['message'],
  data() {
    return {
      fullMessage: this.message + '!!!'
    }
  }
}
