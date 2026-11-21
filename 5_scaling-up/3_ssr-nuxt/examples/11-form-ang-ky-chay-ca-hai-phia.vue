<script setup>
async function submit() {
  // $fetch của Nuxt: server dùng http nội bộ, client dùng URL đầy đủ
  await $fetch('/api/register', { method: 'POST', body: formData })
}
</script>
