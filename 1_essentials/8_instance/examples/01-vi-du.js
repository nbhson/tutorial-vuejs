const app1 = createApp({ data: () => ({ msg: 'App 1' }) })
app1.mount('#container-1')

const app2 = createApp({ data: () => ({ msg: 'App 2' }) })
app2.mount('#container-2')
