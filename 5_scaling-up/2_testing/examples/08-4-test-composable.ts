// src/composables/useCounter.ts
import { ref } from 'vue'
export function useCounter(start = 0) {
  const count = ref(start)
  const inc = () => count.value++
  return { count, inc }
}
