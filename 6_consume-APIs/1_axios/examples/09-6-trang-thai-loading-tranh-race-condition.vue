<script setup>
import { ref } from 'vue'
import { api } from '@/api/client'

const keyword = ref('')
const results = ref([])
const loading = ref(false)
let controller

async function search() {
  loading.value = true
  try {
    const res = await api.get('/search', {
      params: { q: keyword.value },
      signal: AbortSignal.timeout(5000),   // tự hủy sau 5s
    })
    results.value = res.data
  } catch (e) {
    if (e.code !== 'ERR_CANCELED') console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
