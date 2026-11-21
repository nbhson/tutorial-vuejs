import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('count', readonly(count))
