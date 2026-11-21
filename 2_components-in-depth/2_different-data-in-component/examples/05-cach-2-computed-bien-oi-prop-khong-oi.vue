<script setup>
import { computed } from 'vue'

const props = defineProps(['fullName'])

// Không sửa fullName, chỉ tạo bản trình diễn khác
const shortName = computed(() => props.fullName.split(' ').slice(-1)[0])
</script>

<template>
  <p>Tên gọi tắt: {{ shortName }}</p>
</template>
