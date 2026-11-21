<script setup>
import { ref } from 'vue'

const props = defineProps(['initialCounter'])

// counter dùng bản sao cục bộ, chỉ khởi tạo 1 lần từ prop
const counter = ref(props.initialCounter)
</script>

<template>
  <button @click="counter++">{{ counter }}</button>
</template>
