<!-- Component nào cũng gọi cùng store — không cần bus, không cần prop drilling -->
<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <button @click="cart.add(product)">Thêm vào giỏ ({{ cart.items.length }})</button>
</template>
