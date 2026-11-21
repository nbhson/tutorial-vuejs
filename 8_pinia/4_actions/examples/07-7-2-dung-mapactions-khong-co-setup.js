import { mapActions } from 'pinia'
import { useCounterStore } from '@/stores/counter'

export default {
  methods: {
    // Truy cập trực tiếp qua this.increment()
    ...mapActions(useCounterStore, ['increment']),
    
    // Đổi tên action sang this.increase()
    ...mapActions(useCounterStore, {
      increase: 'increment',
    }),
  },
}
