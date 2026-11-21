<script setup>
// Vue 3.5+: destructured props giữ nguyên tính phản ứng
const { title, likes = 0 } = defineProps(['title', 'likes'])

watchEffect(() => {
  // Vue 3.5+: tự dịch thành props.title — vẫn reactive ✅
  console.log(title)
})
</script>
