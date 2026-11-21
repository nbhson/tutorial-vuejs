<script setup>
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
console.log(route.params.id)         // "42" — luôn là STRING, cần Number() nếu so sánh

// Điều quan trọng: cùng component với params khác nhau KHÔNG bị unmount/remount
watch(() => route.params.id, (newId) => {
  fetchPost(newId)                   // tự reload dữ liệu khi id đổi
})
</script>
