// src/composables/useCounter.spec.ts
import { describe, expect, it } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('tăng giá trị', () => {
    const { count, inc } = useCounter(10)
    inc()
    inc()
    expect(count.value).toBe(12)
  })
})
