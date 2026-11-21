// composables/useEventBus.ts
import { onScopeDispose } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()

/** Đăng ký handler và tự hủy khi scope (component) bị hủy */
export function onBus(type, handler) {
  emitter.on(type, handler)
  onScopeDispose(() => emitter.off(type, handler))   // ⭐ tự dọn dẹp
}

export const emitBus = emitter.emit
