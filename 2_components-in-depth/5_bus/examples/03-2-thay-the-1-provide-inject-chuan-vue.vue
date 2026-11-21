<!-- Sidebar.vue (con sâu trong cây) -->
<script setup>
import { inject } from 'vue'

const { theme, setTheme } = inject('theme')   // "nghe" giá trị reactive
</script>

<template>
  <button @click="setTheme('light')">Chuyển sáng</button>
</template>
