<script>
// ❌ Style cũ — vẫn chạy trong Vue 3 nhưng KHÔNG khuyến nghị
import { hoverMixin } from '@/mixins/hover'

export default {
  mixins: [hoverMixin],
}
</script>

<template>
  <div @mouseenter="isHover = true" @mouseleave="onHover(false)">
    {{ isHover ? 'Đang hover' : '' }}
  </div>
</template>
