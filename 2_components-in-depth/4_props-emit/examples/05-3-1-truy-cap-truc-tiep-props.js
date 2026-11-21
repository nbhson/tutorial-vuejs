const props = defineProps(['foo'])

watchEffect(() => {
  console.log(props.foo)
})
