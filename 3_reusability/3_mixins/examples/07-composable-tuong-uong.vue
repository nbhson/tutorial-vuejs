<!-- ✅ Rõ nguồn gốc, có kiểu, tự đặt tên biến -->
<script setup>
import { useHover } from '@/composables/useHover'

const { isHover, onEnter, onLeave } = useHover()
</script>

<template>
  <div @mouseenter="onEnter" @mouseleave="onLeave">{{ isHover }}</div>
</template>
