import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'Son'
  }
})

state.count++
