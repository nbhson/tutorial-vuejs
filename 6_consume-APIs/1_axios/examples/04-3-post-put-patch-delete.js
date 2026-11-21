// POST — tạo mới, body là object JS
const res = await axios.post('/api/posts', {
  title: 'Bài mới',
  body: 'Nội dung...',
})

// PUT — thay toàn bộ tài nguyên
await axios.put(`/api/posts/${id}`, { title: 'Tiêu đề mới', body: '...' })

// PATCH — cập nhật một phần
await axios.patch(`/api/posts/${id}`, { title: 'Chỉ sửa tiêu đề' })

// DELETE
await axios.delete(`/api/posts/${id}`)
