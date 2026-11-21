const wrapper = mount(ComponentWithLink, {
  global: {
    mocks: { $route: { params: { id: '42' } } },
    stubs: { RouterLink: true },
  },
})
