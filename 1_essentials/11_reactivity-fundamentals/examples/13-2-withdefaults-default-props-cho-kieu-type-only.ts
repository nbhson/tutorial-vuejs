const props = withDefaults(
  defineProps<{ title?: string; items?: string[] }>(),
  { title: 'Hello', items: () => [] }
)
