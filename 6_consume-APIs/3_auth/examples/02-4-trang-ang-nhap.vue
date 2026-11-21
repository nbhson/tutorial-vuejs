<!-- pages/Login.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function submit() {
  loading.value = true
  error.value = ''
  try {
    const auth = useAuthStore()
    await auth.login(email.value, password.value)
    router.push('/')                       // hoặc redirect về ?redirect=... trước đó
  } catch (e) {
    error.value = e.response?.status === 401
      ? 'Email hoặc mật khẩu không đúng'
      : 'Không thể đăng nhập, thử lại sau'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="email" type="email" required placeholder="Email" />
    <input v-model="password" type="password" required placeholder="Mật khẩu" />
    <button :disabled="loading">
      {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
    </button>
    <p v-if="error" class="err">{{ error }}</p>
  </form>
</template>
