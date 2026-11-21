<script setup>
import { ref } from 'vue'

const file = ref(null)
const progress = ref(0)

async function upload() {
  const fd = new FormData()
  fd.append('avatar', file.value)
  await api.post('/upload', fd, {
    onUploadProgress: (e) => {
      progress.value = Math.round((e.loaded * 100) / e.total)
    },
  })
}
</script>

<template>
  <input type="file" @change="file = $event.target.files[0]" />
  <progress :value="progress" max="100">{{ progress }}%</progress>
  <button @click="upload">Tải lên</button>
</template>
