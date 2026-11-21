// eventBus.ts
import mitt from 'mitt'

type Events = {
  'cart-updated': { count: number }
}

export const emitter = mitt<Events>()
