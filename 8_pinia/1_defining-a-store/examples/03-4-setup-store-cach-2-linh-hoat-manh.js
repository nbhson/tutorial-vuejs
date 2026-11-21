import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // ref() tương đương với state
  const count = ref(0)
  const name = ref('Eduardo')

  // computed() tương đương với getters
  const doubleCount = computed(() => count.value * 2)

  // function() tương đương với actions
  function increment() {
    count.value++
  }

  // Bắt buộc phải return tất cả các thuộc tính muốn expose ra ngoài
  return {
    count,
    name,
    doubleCount,
    increment,
  }
})
