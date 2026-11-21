<!-- Trong component -->
<script setup>
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave(() => {
  if (formDirty.value) {
    return window.confirm('Dữ liệu chưa lưu, chắc chắn rời trang?')
  }
})
</script>
