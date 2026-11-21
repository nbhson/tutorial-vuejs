<!-- CounterButton.vue -->
<script setup lang="ts">
const count = defineModel<number>({ required: true })
const emit = defineEmits<{ incremented: [] }>()
</script>

<template>
  <button data-test="counter" @click="count++; emit('incremented')">
    {{ count }}
  </button>
</template>
