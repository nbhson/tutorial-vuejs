// ❌ Vue 2 — KHÔNG hoạt động trong Vue 3
const bus = new Vue()                     // instance rỗng
bus.$on('cart-updated', handler)          // nghe
bus.$emit('cart-updated', payload)        // phát
bus.$off('cart-updated', handler)         // hủy đăng ký
