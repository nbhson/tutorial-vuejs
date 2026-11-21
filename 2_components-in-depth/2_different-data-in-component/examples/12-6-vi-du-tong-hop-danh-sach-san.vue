<!-- ProductCard.vue — mỗi instance nhận 1 object khác nhau -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ buy: [id: number] }>()

const formattedPrice = computed(() =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(props.product.price)
)
</script>

<template>
  <article :class="{ sold: !product.inStock }">
    <h3>{{ product.name }}</h3>
    <p>{{ formattedPrice }}</p>
    <button :disabled="!product.inStock" @click="emit('buy', product.id)">
      {{ product.inStock ? 'Mua' : 'Hết hàng' }}
    </button>
  </article>
</template>
