// ✅ code an toàn SSR
onMounted(() => {
  // window chỉ tồn tại ở client
  window.addEventListener('resize', onResize)
})
