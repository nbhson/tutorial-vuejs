<script setup>
// Bật mặc định từ 3.5 — không cần flag compiler
const { title, likes = 0 } = defineProps(['title', 'likes'])
// title, likes vẫn reactive (compiler dịch thành props.title, props.likes)
</script>
