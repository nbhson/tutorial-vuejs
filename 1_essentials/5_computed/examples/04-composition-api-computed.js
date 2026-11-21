import { reactive, computed } from 'vue'

const author = reactive({
  books: ['Vue 3 Guide']
})

const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
