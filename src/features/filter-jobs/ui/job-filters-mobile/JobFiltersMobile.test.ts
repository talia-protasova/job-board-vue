import { afterEach, describe, expect, it } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

import JobFiltersMobile from './JobFiltersMobile.vue'

import type { JobFilters } from '../../model/job-filters.types'

const defaultFilters: JobFilters = {
  search: '',
  location: '',
  fullTime: false,
}

let wrapper: VueWrapper | null = null

afterEach(() => {
  wrapper?.unmount()
  wrapper = null

  document.body.classList.remove('u-no-scroll')
})

describe('JobFiltersMobile', () => {
  it('submits search while preserving active secondary filters', async () => {
    wrapper = mount(JobFiltersMobile, {
      props: {
        filters: {
          search: '',
          location: 'Germany',
          fullTime: true,
        },
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.get('#job-search-mobile').setValue('frontend')

    await wrapper.get('.job-filters-mobile').trigger('submit')

    expect(wrapper.emitted('submit')).toEqual([
      [
        {
          search: 'frontend',
          location: 'Germany',
          fullTime: true,
        },
      ],
    ])
  })

  it('opens secondary filters and submits all filter values', async () => {
    wrapper = mount(JobFiltersMobile, {
      props: {
        filters: defaultFilters,
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.get('#job-search-mobile').setValue('developer')

    await wrapper.get('[aria-label="Open filters"]').trigger('click')

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)

    await wrapper.get('#job-location-mobile').setValue('United Kingdom')

    await wrapper.get('.job-filters-mobile__checkbox-input').setValue(true)

    await wrapper.get('.job-filters-mobile__dialog-form').trigger('submit')

    expect(wrapper.emitted('submit')).toEqual([
      [
        {
          search: 'developer',
          location: 'United Kingdom',
          fullTime: true,
        },
      ],
    ])

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('discards unsubmitted secondary filter changes when reopened', async () => {
    wrapper = mount(JobFiltersMobile, {
      props: {
        filters: {
          search: '',
          location: 'Germany',
          fullTime: false,
        },
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    })

    await wrapper.get('[aria-label="Open filters"]').trigger('click')

    await wrapper.get('#job-location-mobile').setValue('France')

    await wrapper.get('.ui-modal__close').trigger('click')

    await wrapper.get('[aria-label="Open filters"]').trigger('click')

    expect((wrapper.get('#job-location-mobile').element as HTMLInputElement).value).toBe('Germany')
  })
})
