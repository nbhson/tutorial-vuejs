<script setup>
const model = defineModel() // thay cho props + emit('update:modelValue')
</script>

<template>
  <input v-model="model" />
</template>
