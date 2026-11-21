import { useOtherStore } from './otherStore'

export const useMainStore = defineStore('main', {
  state: () => ({
    localData: 10,
  }),
  getters: {
    totalData(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
