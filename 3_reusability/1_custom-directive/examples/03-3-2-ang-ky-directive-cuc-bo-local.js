export default {
  directives: {
    highlight: {
      mounted(el) {
        el.classList.add('is-highlight')
      }
    }
  }
}
