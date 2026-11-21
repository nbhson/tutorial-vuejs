<!-- Nghe sự kiện — luôn hủy đăng ký khi component unmount -->
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { eventBus } from '@/eventBus'

const onCartUpdated = (payload) => console.log('cart:', payload)

onMounted(() => eventBus.on('cart-updated', onCartUpdated))
onUnmounted(() => eventBus.off('cart-updated', onCartUpdated))  // ⚠️ BẮT BUỘC
</script>
