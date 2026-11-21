defineProps({
  propA: Number,
  propB: [String, Number],
  propC: {
    type: String,
    required: true
  },
  propE: {
    type: Number,
    default: 100
  },
  propG: {
    validator(value) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  }
})
