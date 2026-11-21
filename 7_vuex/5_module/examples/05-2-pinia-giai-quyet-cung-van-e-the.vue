<!-- component — gọi trực tiếp, không có tiền tố 'cart/' -->
<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
cart.add(item)
</script>
