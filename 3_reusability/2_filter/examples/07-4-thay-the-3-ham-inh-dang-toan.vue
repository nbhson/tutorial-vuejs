<script setup>
import { formatCurrency, formatDate, capitalize } from '@/utils/format'
</script>

<template>
  <p>{{ formatCurrency(order.total) }} — {{ formatDate(order.createdAt) }}</p>
</template>
