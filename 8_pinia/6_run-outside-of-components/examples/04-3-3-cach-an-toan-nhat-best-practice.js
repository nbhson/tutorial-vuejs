// utils.js
import { useUserStore } from '@/stores/user'

export function getUserData() {
  // ✅ Gọi store bên trong hàm
  const userStore = useUserStore()
  return userStore.data
}
