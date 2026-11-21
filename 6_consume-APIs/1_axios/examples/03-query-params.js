const res = await axios.get('/api/posts', {
  params: { page: 2, limit: 10 },
  // → /api/posts?page=2&limit=10 (axios tự encode)
})
