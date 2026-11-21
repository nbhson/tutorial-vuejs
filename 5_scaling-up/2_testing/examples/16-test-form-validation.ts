it('hiện lỗi khi email không hợp lệ', async () => {
  const wrapper = mount(LoginForm)
  await wrapper.get('[type="email"]').setValue('khong-hople')
  await wrapper.get('form').trigger('submit')
  expect(wrapper.text()).toContain('Email không hợp lệ')
})
