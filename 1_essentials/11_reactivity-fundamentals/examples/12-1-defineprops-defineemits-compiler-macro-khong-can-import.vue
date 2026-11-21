<script setup lang="ts">
// ❌ Không cần: import { defineProps, defineEmits } from 'vue'
// ✅ Compiler tự biết đây là macro

// Kiểu "type-only" — TypeScript-only, hiệu năng tốt hơn (Vue 3.3+)
const props = defineProps<{
  title: string
  likes?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
