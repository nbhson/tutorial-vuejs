import { inject } from 'vue'

export default {
  setup() {
    const message = inject('message')
    return { message }
  }
}
