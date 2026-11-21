// composables/useHover.ts
import { ref } from 'vue'

export function useHover() {
  const isHover = ref(false)
  return {
    isHover,
    onEnter: () => (isHover.value = true),
    onLeave: () => (isHover.value = false),
  }
}
