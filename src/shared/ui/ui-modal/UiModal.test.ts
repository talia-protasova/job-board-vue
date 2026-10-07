import { afterEach, describe, expect, it } from 'vitest'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'

import UiModal from './UiModal.vue'

let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null

  document.body.classList.remove('u-no-scroll')
  document.body.innerHTML = ''
})

describe('UiModal', () => {
  it('locks page scrolling and moves focus into the modal when opened', async () => {
    const trigger = document.createElement('button')

    trigger.textContent = 'Open modal'
    document.body.append(trigger)
    trigger.focus()

    wrapper = mount(UiModal, {
      attachTo: document.body,
      props: {
        open: false,
        title: 'Filter jobs',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
      slots: {
        default: '<input aria-label="Location">',
      },
    })

    await wrapper.setProps({
      open: true,
    })

    await flushPromises()

    expect(document.body.classList.contains('u-no-scroll')).toBe(true)

    expect(wrapper.get('[role="dialog"]').attributes()).toMatchObject({
      'aria-modal': 'true',
      'aria-label': 'Filter jobs',
    })

    expect(document.activeElement).toBe(wrapper.get('.ui-modal__close').element)
  })

  it('emits close when Escape is pressed', async () => {
    wrapper = mount(UiModal, {
      attachTo: document.body,
      props: {
        open: true,
        title: 'Filter jobs',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.get('.ui-modal__dialog').trigger('keydown', {
      key: 'Escape',
    })

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('restores focus and unlocks page scrolling when closed', async () => {
    const trigger = document.createElement('button')

    trigger.textContent = 'Open modal'
    document.body.append(trigger)
    trigger.focus()

    wrapper = mount(UiModal, {
      attachTo: document.body,
      props: {
        open: false,
        title: 'Filter jobs',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.setProps({
      open: true,
    })

    await flushPromises()

    expect(document.activeElement).not.toBe(trigger)

    await wrapper.setProps({
      open: false,
    })

    await flushPromises()

    expect(document.body.classList.contains('u-no-scroll')).toBe(false)

    expect(document.activeElement).toBe(trigger)
  })
})
