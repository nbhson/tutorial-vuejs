import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // ref() → state
  const count = ref(0)
  // computed() → getters
  const double = computed(() => count.value * 2)
  // function → actions
  function increment() {
    count.value++
  }
  async function fetchItems() {
    const res = await fetch('/api/items')
    items.value = await res.json()
  }

  // BẮT BUỘC return mọi thứ muốn dùng được trong store
  return { count, double, increment, fetchItems }
})
