<!-- Component giờ chỉ cần hiển thị thông điệp đã "dịch" -->
<script setup>
import { api } from '@/api/client'

try {
  await api.get('/orders')
} catch (e) {
  toast.error(e.message)       // "Bạn không có quyền thực hiện"...
}
</script>
