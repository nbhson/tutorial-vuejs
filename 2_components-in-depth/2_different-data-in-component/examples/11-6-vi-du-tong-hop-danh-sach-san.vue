<!-- ProductList.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

const products = ref<Product[]>([
  { id: 1, name: 'Bàn phím cơ', price: 1_200_000, inStock: true },
  { id: 2, name: 'Chuột không dây', price: 450_000, inStock: false },
])
</script>

<template>
  <ProductCard v-for="p in products" :key="p.id" :product="p" />
</template>
