import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { inject } from 'vue'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute() // Lấy thông tin route hiện tại
  const appProvided = inject('appProvided') // Lấy dữ liệu được inject toàn cục

  return {
    // Lưu ý: Thường không nên return route hoặc inject() 
    // vì chúng không phải là trạng thái thuộc quyền quản lý của store này.
  }
})
