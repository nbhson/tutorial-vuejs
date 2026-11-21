import 'pinia'
import type { Router } from 'vue-router'

declare module 'pinia' {
  // Cho các thuộc tính (actions, getters,...)
  export interface PiniaCustomProperties {
    router: Router
  }

  // Cho các state mới
  export interface PiniaCustomStateProperties<S> {
    hasError: boolean
  }
}
