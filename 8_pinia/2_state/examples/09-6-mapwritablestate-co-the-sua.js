import { mapWritableState } from 'pinia'

export default {
  computed: {
    ...mapWritableState(useCounterStore, ['count']),
  }
}
