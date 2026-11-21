// src/utils/format.spec.ts
import { describe, expect, it } from 'vitest'
import { formatCurrency } from './format'

describe('formatCurrency', () => {
  it('định dạng VND đúng', () => {
    expect(formatCurrency(1_200_000)).toContain('1.200.000')
  })

  it('hỗ trợ USD', () => {
    expect(formatCurrency(99, 'USD')).toContain('$')
  })
})
