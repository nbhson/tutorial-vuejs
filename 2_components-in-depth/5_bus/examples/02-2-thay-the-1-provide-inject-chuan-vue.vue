<!-- App.vue (ancestor) — đóng vai trò "broadcaster" -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const setTheme = (t) => { theme.value = t }

provide('theme', { theme, setTheme })   // bất kỳ component con nào cũng có thể lấy
</script>
