<script setup>
import { useTemplateRef, onMounted } from 'vue'

// Tham số đầu tiên PHẢI khớp với giá trị ref trong template
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
