import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal })
    .then((data) => {
      // cập nhật data
    })
    .catch((e) => {
      if (e.name !== 'AbortError') throw e
    })

  // Chạy trước khi watcher kích hoạt lần kế tiếp
  onWatcherCleanup(() => {
    controller.abort()
    console.log('Hủy request cũ của id trước đó')
  })
})
