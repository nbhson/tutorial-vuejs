export default {
  data() {
    return {
      author: {
        books: ['Vue 3 Guide']
      }
    }
  },
  computed: {
    publishedBooksMessage() {
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
