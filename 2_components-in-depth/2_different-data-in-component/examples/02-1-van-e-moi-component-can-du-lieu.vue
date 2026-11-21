<!-- Parent: App.vue — mỗi component con nhận dữ liệu khác nhau -->
<script setup lang="ts">
import UserCard from './UserCard.vue'
</script>

<template>
  <UserCard name="Nguyễn Sơn" role="admin" />
  <UserCard name="Lan Anh" role="user" />
  <UserCard name="Minh Tuấn" role="user" />
</template>
