import { defineStore } from 'pinia'
import { mande } from 'mande' // hoặc axios, fetch...

const api = mande('/api/users')

export const useUsersStore = defineStore('users', {
  state: () => ({
    userData: null,
  }),
  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        alert(`Chào mừng ${this.userData.name}!`)
      } catch (error) {
        alert('Đăng ký thất bại: ' + error)
        return error // Trả về lỗi để component xử lý thêm nếu cần
      }
    },
  },
})
