// legacy
actions: {
  async fetchPosts({ commit }) {
    try {
      const res = await fetch('/api/posts')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      commit('setPosts', await res.json())
    } catch (e) {
      commit('setError', 'Không tải được danh sách bài')
      // ⚠️ Hãy re-throw nếu component cần biết để hiển thị UI lỗi riêng
      throw e
    }
  },
}
