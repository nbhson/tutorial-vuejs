// stores/user.ts — chuẩn Pinia hoạt động cả SSR
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  return { user }
})
