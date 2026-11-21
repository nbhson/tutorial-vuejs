export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark.'
    }
  },
  watch: {
    question(newVal, oldVal) {
      if (newVal.includes('?')) {
        this.answer = 'You asked a question!'
      }
    }
  }
}
