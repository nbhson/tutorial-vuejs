// utils/format.ts
export const formatCurrency = (v: number, currency = 'VND') =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(v)

export const formatDate = (d: Date | string) =>
  new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(d))

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
