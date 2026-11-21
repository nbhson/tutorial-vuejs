watch(source, () => {
  console.log('DOM đã update')
}, { flush: 'post' })
