<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const doneCount = computed(() => store.getters.doneCount)
</script>

<template>
  <p>Hoàn thành: {{ doneCount }}</p>
</template>
