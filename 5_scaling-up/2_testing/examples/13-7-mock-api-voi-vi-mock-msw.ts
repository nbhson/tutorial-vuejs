import { vi, describe, expect, it } from 'vitest'
import { api } from '@/api/client'

vi.mock('@/api/client', () => ({
  api: { get: vi.fn().mockResolvedValue({ data: [{ id: 1, title: 'Bài 1' }] }) },
}))

import { postsApi } from '@/api/posts'

it('list() trả dữ liệu đã mock', async () => {
  const posts = await postsApi.list()
  expect(posts[0].title).toBe('Bài 1')
})
