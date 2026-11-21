const store = useCounterStore()

store.$subscribe((mutation, state) => {
  // mutation.type: 'direct' | 'patch object' | 'patch function'
  localStorage.setItem('counter', JSON.stringify(state))
}, { detached: true }) // detached: subscription sống cả khi component unmount
