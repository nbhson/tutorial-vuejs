watch(id, (newId, oldId, onCleanup) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal })

  onCleanup(() => {
    controller.abort()
  })
})
