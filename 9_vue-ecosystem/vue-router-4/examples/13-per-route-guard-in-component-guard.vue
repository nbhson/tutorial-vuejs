<script setup>
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

onBeforeRouteUpdate((to, from) => {
  // kích hoạt khi route đổi params (VD: /user/1 → /user/2)
})
onBeforeRouteLeave((to, from) => {
  // VD: hỏi xác nhận khi chưa lưu form
  return confirm('Rời trang, thay đổi sẽ mất?') || false
})
</script>
