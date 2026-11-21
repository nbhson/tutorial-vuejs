<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
}

const posts = ref<Post[]>([])
const loading = ref(false)
const error = ref('')

async function fetchPosts() {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    posts.value = res.data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Lỗi không rõ'
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)
</script>

<template>
  <p v-if="loading">Đang tải...</p>
  <p v-else-if="error" class="err">{{ error }}</p>
  <ul v-else>
    <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
  </ul>
</template>
