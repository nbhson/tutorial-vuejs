import { mapState } from 'pinia'
import { useCounterStore } from './counterStore'

export default {
  computed: {
    // Chỉ đọc (readonly)
    ...mapState(useCounterStore, ['count']),
    
    // Đổi tên & viết logic bổ sung
    ...mapState(useCounterStore, {
      myCount: 'count',
      double: store => store.count * 2,
    }),
  }
}
