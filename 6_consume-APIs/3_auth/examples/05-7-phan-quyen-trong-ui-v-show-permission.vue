<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <button v-if="auth.isAdmin">Xóa người dùng</button>
  <button v-if="auth.isLoggedIn" @click="auth.logout()">Đăng xuất</button>
</template>
