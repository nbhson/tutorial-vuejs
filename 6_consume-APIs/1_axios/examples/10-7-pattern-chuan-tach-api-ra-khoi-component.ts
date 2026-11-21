// api/posts.ts
import { api } from './client'

export interface Post { id: number; title: string; body: string }

export const postsApi = {
  list: (params = {}) => api.get<Post[]>('/posts', { params }).then((r) => r.data),
  get: (id: number) => api.get<Post>(`/posts/${id}`).then((r) => r.data),
  create: (body: Omit<Post, 'id'>) => api.post<Post>('/posts', body).then((r) => r.data),
  remove: (id: number) => api.delete(`/posts/${id}`),
}
