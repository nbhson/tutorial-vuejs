// src/components/__tests__/CounterButton.spec.ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CounterButton from '../CounterButton.vue'

describe('CounterButton', () => {
  it('render số ban đầu', () => {
    const wrapper = mount(CounterButton, {
      props: { modelValue: 3 },
    })
    expect(wrapper.get('[data-test="counter"]').text()).toBe('3')
  })

  it('tăng count và emit khi click', async () => {
    const wrapper = mount(CounterButton, {
      props: { modelValue: 0, 'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }) },
    })
    await wrapper.get('[data-test="counter"]').trigger('click')
    expect(wrapper.emitted('incremented')).toHaveLength(1)
  })
})
