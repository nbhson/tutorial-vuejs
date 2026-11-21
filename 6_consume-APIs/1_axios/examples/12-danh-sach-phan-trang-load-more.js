const page = ref(1)
const items = ref([])
const done = ref(false)

async function loadMore() {
  const res = await api.get('/api/products', { params: { page: page.value } })
  items.value.push(...res.data)
  if (res.data.length < 10) done.value = true   // hết dữ liệu
  page.value++
}
