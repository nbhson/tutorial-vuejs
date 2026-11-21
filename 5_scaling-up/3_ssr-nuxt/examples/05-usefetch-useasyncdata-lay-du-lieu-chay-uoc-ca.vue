<!-- pages/posts/[id].vue -->
<script setup lang="ts">
const route = useRoute()

// SSR-safe: chạy trên server khi request đầu, client khi navigate
const { data: post, pending, error } = await useFetch(`/api/posts/${route.params.id}`)
</script>

<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
  </article>
  <p v-else-if="pending">Đang tải...</p>
  <p v-else-if="error">Không tìm thấy bài viết</p>
</template>
