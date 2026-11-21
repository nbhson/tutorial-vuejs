// Vue 2 — KHÔNG chạy được trên Vue 3
const bus = new Vue()
bus.$emit('hello', 42)                 // phát
bus.$on('hello', (v) => console.log(v)) // nghe
