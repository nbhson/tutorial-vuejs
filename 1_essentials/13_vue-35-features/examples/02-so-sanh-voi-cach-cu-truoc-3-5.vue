<!-- ❌ Cách cũ — tên biến phải trùng chính xác, sai thì ref = null mà không báo lỗi -->
<script setup>
import { ref, onMounted } from 'vue'
const input = ref(null) // phải trùng tên với ref="input"
</script>
