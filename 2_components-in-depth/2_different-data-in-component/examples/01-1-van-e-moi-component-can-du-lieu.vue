<!-- Child: UserCard.vue -->
<script setup lang="ts">
defineProps<{
  name: string
  role: 'admin' | 'user'
}>()
</script>

<template>
  <div class="card">
    <strong>{{ name }}</strong>
    <span class="badge">{{ role }}</span>
  </div>
</template>
