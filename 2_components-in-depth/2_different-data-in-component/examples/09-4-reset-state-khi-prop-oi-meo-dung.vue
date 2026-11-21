<script setup>
import { ref } from 'vue'
import UserForm from './UserForm.vue'

const userId = ref(1)
</script>

<template>
  <!-- đổi userId → component bị hủy và tạo lại → state khởi tạo lại từ đầu -->
  <UserForm :key="userId" :initial-user-id="userId" />
</template>
