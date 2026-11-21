<script setup>
import { useStore } from 'vuex'

const store = useStore()

function increment() {
  store.commit('increment')            // BẮT BUỘC gọi qua mutation
}
</script>
