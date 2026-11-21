export default {
  inject: {
    message: {
      from: 'message',
      default: 'default value'
    },
    user: {
      default: () => ({ name: 'John' })
    }
  }
}
