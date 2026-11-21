// Sau: composables/useUser.ts
import { ref } from 'vue'
import { fetchUserById } from '@/api/users'

export function useUser(userId: string | number) {
  const user = ref<User | null>(null)
  const loading = ref(false)

  async function load() {
    loading.value = true
    user.value = await fetchUserById(userId)
    loading.value = false
  }
  onMounted(load)

  return { user, loading, reload: load }
}
