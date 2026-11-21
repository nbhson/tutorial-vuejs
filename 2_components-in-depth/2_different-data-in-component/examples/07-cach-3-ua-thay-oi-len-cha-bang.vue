<!-- Parent — giữ nguồn sự thật -->
<script setup>
import { ref } from 'vue'
import QtyInput from './QtyInput.vue'

const qty = ref(1)
</script>

<template>
  <QtyInput v-model="qty" />   <!-- với 2 chiều, dùng luôn defineModel — xem bên dưới -->
</template>
