// Vue 2 — khai báo filter cục bộ
export default {
  filters: {
    capitalize: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  },
}
