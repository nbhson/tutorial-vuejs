<!-- Child: QtyInput.vue -->
<script setup lang="ts">
const model = defineModel<number>({ required: true })
</script>

<template>
  <input v-model="model" type="number" />
</template>
