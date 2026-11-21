import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Đi (giống RouterLink nhưng bằng code)
router.push('/posts/42')
router.push({ name: 'post', params: { id: 42 }, query: { tab: 'comments' } })
router.replace('/login')     // không lưu vào history
router.go(-1)                // quay lại

// Đọc
route.params.id        // tham số động
route.query.page       // ?page=2
route.hash             // #section
route.meta             // dữ liệu tự gắn (requiresAuth...)
route.name             // tên route
