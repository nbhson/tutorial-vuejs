<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

// ❌ destructuring trực tiếp sẽ MẤT reactivity (store là reactive object)
// const { count } = store

// ✅ Dùng storeToRefs() cho state & getters
const { count, double } = storeToRefs(store)
// ✅ actions có thể destructuring trực tiếp
const { increment } = store
</script>

<template>
  <button @click="increment">{{ count }} — x2: {{ double }}</button>
</template>
