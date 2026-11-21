<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const loading = ref(false)
const on = () => (loading.value = true)
const off = () => (loading.value = false)

onMounted(() => {
  window.addEventListener('app:loading-on', on)
  window.addEventListener('app:loading-off', off)
})
// Nhớ remove trong onUnmounted để tránh leak
</script>
