watch(source, () => {
  console.log('sync')
}, { flush: 'sync' })
