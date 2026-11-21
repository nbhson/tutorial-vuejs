import { defineAsyncComponent, type HydrationStrategy } from 'vue'

const myStrategy: HydrationStrategy = (hydrate, forEachElement) => {
  forEachElement(el => {
    // logic kiểm tra custom của bạn ở đây...
  })

  hydrate() // Gọi hàm này để bắt đầu quá trình

  return () => {
    // dọn dẹp (cleanup) nếu cần
  }
}

const AsyncComp = defineAsyncComponent({
  loader: () => import('./Comp.vue'),
  hydrate: myStrategy
})
