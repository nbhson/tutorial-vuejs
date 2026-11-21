<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { postsApi } from '@/api/posts'

const posts = ref<Post[]>([])
onMounted(async () => {
  posts.value = await postsApi.list()
})
</script>
