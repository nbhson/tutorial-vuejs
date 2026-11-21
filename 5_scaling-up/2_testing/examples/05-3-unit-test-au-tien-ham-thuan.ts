// src/utils/format.ts
export function formatCurrency(v: number, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(v)
}
