const myDirective = {
  created(el, binding, vnode, prevVnode) {}, // Trước khi các attribute được áp dụng
  beforeMount(el, binding, vnode, prevVnode) {}, // Trước khi gắn vào DOM
  mounted(el, binding, vnode, prevVnode) {}, // Đã gắn vào DOM (Thường dùng nhất)
  beforeUpdate(el, binding, vnode, prevVnode) {}, // Trước khi element cập nhật
  updated(el, binding, vnode, prevVnode) {}, // Sau khi element đã cập nhật xong (Thường dùng nhất)
  beforeUnmount(el, binding, vnode, prevVnode) {}, // Trước khi tháo khỏi DOM
  unmounted(el, binding, vnode, prevVnode) {} // Đã tháo khỏi DOM hoàn toàn
}
