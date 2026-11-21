<script setup>
useSeoMeta({
  title: () => `${post.value?.title} — MyApp`,
  description: () => post.value?.summary,
  ogTitle: () => post.value?.title,
})
</script>
