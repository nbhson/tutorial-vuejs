getters: {
  getActiveUserById(state) {
    // Phần này được cache
    const activeUsers = state.users.filter(u => u.active)
    
    // Phần này không được cache
    return (id) => activeUsers.find(u => u.id === id)
  },
}
