<script setup>
import { computed } from 'vue'

const price = ref(1_200_000)
const message = ref('xin chào')

const formattedPrice = computed(() =>
  price.value.toLocaleString('vi-VN') + ' VND'
)

const capitalized = computed(() =>
  message.value.charAt(0).toUpperCase() + message.value.slice(1)
)
</script>

<template>
  <p>{{ formattedPrice }}</p>       <!-- "1.200.000 VND" -->
  <p>{{ capitalized }}</p>          <!-- "Xin chào" -->
</template>
