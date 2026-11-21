import { ref, provide } from 'vue'
const count = ref(0)
provide('count', count)
