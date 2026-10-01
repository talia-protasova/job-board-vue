import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from './App.vue'

describe('App', () => {
  it('renders router view', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
