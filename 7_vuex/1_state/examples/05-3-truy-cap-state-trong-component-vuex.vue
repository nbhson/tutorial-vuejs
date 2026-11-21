<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const count = computed(() => store.state.count)
</script>

<template>
  <p>Count: {{ count }}</p>
</template>
