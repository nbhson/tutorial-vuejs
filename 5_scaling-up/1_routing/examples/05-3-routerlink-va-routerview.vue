<script setup>
// App.vue
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <!-- RouterLink render thành <a>, có class active/router-link-active -->
    <RouterLink to="/">Trang chủ</RouterLink>
    <RouterLink to="/about">Giới thiệu</RouterLink>
    <RouterLink :to="{ name: 'post', params: { id: 42 } }">Bài #42</RouterLink>
  </nav>

  <!-- View tương ứng được render ở đây -->
  <RouterView />
</template>
