import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // Tải component từ server...
    resolve({
      template: '<div>Async Component</div>'
    })
  })
})
