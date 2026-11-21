const { foo } = defineProps(['foo'])
watch(foo, () => {}) // ❌
