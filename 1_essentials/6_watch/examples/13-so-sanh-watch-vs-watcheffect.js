watch(id, async () => {
  const res = await fetch(`/api/${id.value}`)
  data.value = await res.json()
})
