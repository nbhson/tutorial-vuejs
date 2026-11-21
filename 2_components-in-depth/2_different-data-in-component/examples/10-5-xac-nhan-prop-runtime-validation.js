defineProps({
  status: {
    type: String,
    default: 'active',
    validator: (v) => ['active', 'banned'].includes(v),
  },
})
