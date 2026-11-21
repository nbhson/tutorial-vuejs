// stores/user.ts — hoàn toàn độc lập
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  return { name }
})
