app.directive('color', (el, binding) => {
  // Logic này sẽ chạy cho cả mounted và updated
  el.style.color = binding.value
})
