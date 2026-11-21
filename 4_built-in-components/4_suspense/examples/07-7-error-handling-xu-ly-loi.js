import { onErrorCaptured, ref } from 'vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
  console.error('Phát hiện lỗi async:', err)
  return false // Ngăn lỗi lan lên cấp cao hơn
})
