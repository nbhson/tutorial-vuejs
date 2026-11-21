watch(id, async (newId) => {
  fetch(`/api/${newId}`)
})
