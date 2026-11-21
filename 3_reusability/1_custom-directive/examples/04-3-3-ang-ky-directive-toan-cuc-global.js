import { createApp } from 'vue'

const app = createApp({})

app.directive('highlight', {
  mounted(el) {
    el.classList.add('is-highlight')
  }
})
