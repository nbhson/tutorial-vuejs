// ✅ Pinia
async function fetchPosts() {
  try {
    posts.value = await postsApi.list()
  } catch (e) {
    error.value = 'Không tải được danh sách bài'
    throw e
  }
}
