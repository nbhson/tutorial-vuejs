// Dùng ở component
import { api } from '@/api/client'

const res = await api.get('/posts')    // → https://api.example.com/posts
