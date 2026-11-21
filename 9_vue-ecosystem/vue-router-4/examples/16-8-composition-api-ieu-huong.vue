<script setup>
import { useRouter } from 'vue-router'

const router = useRouter() // điều hướng
const route = useRoute()   // đọc thông tin route hiện tại

function goDetail(id) {
  router.push({ name: 'user', params: { id } })
  // router.replace(...)  — không ghi history
  // router.back() / router.forward()
}
</script>
