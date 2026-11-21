import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // Truy cập trực tiếp
    ...mapState(useCounterStore, ['doubleCount']),
    // Đổi tên
    ...mapState(useCounterStore, {
      myDouble: 'doubleCount',
      doubleFn: store => store.doubleCount,
    }),
  },
}
