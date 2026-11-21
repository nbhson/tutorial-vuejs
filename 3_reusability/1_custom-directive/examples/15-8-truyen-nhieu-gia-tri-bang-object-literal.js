app.directive('demo', (el, binding) => {
  el.style.color = binding.value.color
  el.textContent = binding.value.text
})
