import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'

import type { Job } from '@/entities/job'

import JobsPage from './JobsPage.vue'

const getJobsMock = vi.hoisted(() => vi.fn())

vi.mock('@/entities/job', () => ({
  getJobs: getJobsMock,
}))

function createJob(overrides: Partial<Job> = {}): Job {
  return {
    id: 1,
    company: 'Scoot',
    logo: '/logos/scoot.svg',
    logoBackground: '#e99210',
    position: 'Senior Software Engineer',
    postedAt: '5h ago',
    contract: 'Full Time',
    location: 'United Kingdom',
    website: 'https://example.com',
    apply: 'https://example.com/apply',
    description: 'Job description',
    requirements: {
      content: 'Requirements',
      items: [],
    },
    role: {
      content: 'Role',
      items: [],
    },
    ...overrides,
  }
}

async function mountPage(initialUrl = '/') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: {
          template: '<div />',
        },
      },
    ],
  })

  await router.push(initialUrl)
  await router.isReady()

  const wrapper = mount(JobsPage, {
    global: {
      plugins: [router],
      stubs: {
        AppHeader: true,
        JobFilters: true,
        JobsList: true,
        LoadMoreJobsButton: true,
      },
    },
  })

  await flushPromises()

  return {
    router,
    wrapper,
  }
}

describe('JobsPage', () => {
  beforeEach(() => {
    getJobsMock.mockReset()

    getJobsMock.mockResolvedValue([
      createJob(),
      createJob({
        id: 2,
        company: 'Blogr',
        position: 'Frontend Developer',
        location: 'United States',
      }),
    ])
  })

  it('announces the total number of filtered jobs', async () => {
    const { wrapper } = await mountPage()

    expect(wrapper.get('[aria-live="polite"]').text()).toBe('2 jobs found')

    expect(wrapper.find('.jobs-page__empty').exists()).toBe(false)
  })

  it('shows an empty state when no jobs match the filters', async () => {
    const { wrapper } = await mountPage('/?search=nonexistent-job')

    expect(wrapper.get('[aria-live="polite"]').text()).toBe('0 jobs found')

    expect(wrapper.get('.jobs-page__empty-title').text()).toBe('No jobs found')

    expect(wrapper.get('.jobs-page__empty-text').text()).toBe(
      'Try changing your search or clearing one of the filters.',
    )

    expect(
      wrapper
        .findComponent({
          name: 'JobsList',
        })
        .exists(),
    ).toBe(false)
  })

  it('uses the singular job label for one result', async () => {
    const { wrapper } = await mountPage('/?search=frontend')

    expect(wrapper.get('[aria-live="polite"]').text()).toBe('1 job found')
  })
})
