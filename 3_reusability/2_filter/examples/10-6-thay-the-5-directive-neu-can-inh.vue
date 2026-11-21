<script setup>
const vUppercase = {
  mounted: (el) => (el.style.textTransform = 'uppercase'),
}
</script>

<template>
  <p v-uppercase>chữ này sẽ in hoa</p>
</template>
