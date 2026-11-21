<!-- ❌ SAI — cảnh báo runtime: "Set operation on key 'name' failed" -->
<script setup>
defineProps(['name'])
</script>

<template>
  <input v-model="name" />   <!-- v-model ghi vào prop → lỗi -->
</template>
