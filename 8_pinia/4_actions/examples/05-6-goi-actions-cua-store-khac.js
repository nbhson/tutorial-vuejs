import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()

      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
