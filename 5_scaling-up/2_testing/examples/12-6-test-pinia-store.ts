// stores/cart.spec.ts
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../cart'

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())     // store mới cho mỗi test
  })

  it('thêm sản phẩm', () => {
    const cart = useCartStore()
    cart.add({ id: 1, name: 'Chuột', price: 100 })
    expect(cart.items).toHaveLength(1)
    expect(cart.itemCount).toBe(1)
  })
})
