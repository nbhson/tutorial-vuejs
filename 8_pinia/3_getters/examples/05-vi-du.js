export const useUserStore = defineStore('users', {
  state: () => ({
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  }),
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find(user => user.id === userId)
    },
  },
})
