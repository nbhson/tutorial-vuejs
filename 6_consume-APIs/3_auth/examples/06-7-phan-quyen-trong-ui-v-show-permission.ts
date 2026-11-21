// main.ts
app.directive('permission', {
  mounted(el, binding) {
    const auth = useAuthStore()
    if (!binding.check(binding.value)) el.remove()
    // ví dụ: v-permission="'admin'"
  },
})
