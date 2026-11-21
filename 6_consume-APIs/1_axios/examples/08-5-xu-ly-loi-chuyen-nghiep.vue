<script setup>
import { api } from '@/api/client'
import { ref } from 'vue'

const error = ref('')

async function save(data) {
  try {
    await api.post('/posts', data)
  } catch (e) {
    if (e.response) {
      // Server có phản hồi (status ngoài 2xx)
      const { status, data } = e.response
      if (status === 401) error.value = 'Chưa đăng nhập'
      else if (status === 422) error.value = Object.values(data.errors ?? {}).join(', ')
      else error.value = `Lỗi server (${status})`
    } else if (e.request) {
      // Gửi được request nhưng không có phản hồi
      error.value = 'Không kết nối được máy chủ'
    } else {
      error.value = e.message
    }
  }
}
</script>
