const { foo } = defineProps(['foo'])

watchEffect(() => {
  console.log(foo)
})
