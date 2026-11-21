<!-- Dùng — không cần onUnmounted nữa -->
<script setup>
import { onBus, emitBus } from '@/composables/useEventBus'

onBus('cart-updated', (payload) => console.log(payload))
emitBus('cart-updated', { count: 1 })
</script>
