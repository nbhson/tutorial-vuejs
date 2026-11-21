<script setup>
function formatCurrency(value, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(value)
}
</script>

<template>
  <p>{{ formatCurrency(1200000) }}</p>          <!-- 1.200.000 ₫ -->
  <p>{{ formatCurrency(99, 'USD') }}</p>        <!-- $99,00 -->
</template>
