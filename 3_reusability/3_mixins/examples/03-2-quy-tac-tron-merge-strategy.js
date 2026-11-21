const mixin = {
  data: () => ({ shared: 'từ mixin' }),
  created() { console.log('mixin hook') },
}
export default {
  mixins: [mixin],
  data: () => ({ shared: 'của component' }),   // đè lên nếu trùng tên
  created() { console.log('hook component chạy SAU mixin') },
}
