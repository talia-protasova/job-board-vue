import { ref, type Ref } from 'vue'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter, type Router } from 'vue-router'
import { describe, expect, it } from 'vitest'

import type { Job } from '@/entities/job'

import { useJobFilters } from './useJobFilters'

function createJob(id: number, overrides: Partial<Job> = {}): Job {
  return {
    id,
    company: `Company ${id}`,
    logo: './assets/logos/scoot.svg',
    logoBackground: 'hsl(36, 87%, 49%)',
    position: `Position ${id}`,
    postedAt: '1d ago',
    contract: 'Full Time',
    location: 'Remote',
    website: `https://example.com/company-${id}`,
    apply: `https://example.com/company-${id}/apply`,
    description: `Description ${id}`,
    requirements: {
      content: '',
      items: [],
    },
    role: {
      content: '',
      items: [],
    },
    ...overrides,
  }
}

function createTestRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: { template: '<div />' },
      },
    ],
  })
}

interface JobFiltersResult {
  filters: ReturnType<typeof useJobFilters>['filters']
  filteredJobs: ReturnType<typeof useJobFilters>['filteredJobs']
  updateFilters: ReturnType<typeof useJobFilters>['updateFilters']
}

async function setup(jobs: Ref<Job[]>, initialRoute = '/') {
  const router = createTestRouter()

  await router.push(initialRoute)
  await router.isReady()

  let result: JobFiltersResult | undefined

  mount(
    {
      setup() {
        result = useJobFilters(jobs)

        return {}
      },
      template: '<div />',
    },
    {
      global: {
        plugins: [router],
      },
    },
  )

  if (!result) {
    throw new Error('useJobFilters was not initialized')
  }

  return {
    router,
    result,
  }
}

describe('useJobFilters', () => {
  const jobs = [
    createJob(1, {
      company: 'Alpha Labs',
      position: 'Frontend Developer',
      location: 'United Kingdom',
      contract: 'Full Time',
    }),
    createJob(2, {
      company: 'Beta Studio',
      position: 'Backend Engineer',
      location: 'Germany',
      contract: 'Part Time',
    }),
  ]

  it('initializes filters from the route query', async () => {
    const { result } = await setup(ref(jobs), '/?search=frontend&location=United&fullTime=true')

    expect(result.filters.value).toEqual({
      search: 'frontend',
      location: 'United',
      fullTime: true,
    })
  })

  it('filters jobs using the route query', async () => {
    const { result } = await setup(ref(jobs), '/?search=frontend')

    expect(result.filteredJobs.value).toEqual([jobs[0]])
  })

  it('updates the route query when filters change', async () => {
    const { router, result } = await setup(ref(jobs))

    await result.updateFilters({
      search: 'backend',
      location: 'Germany',
      fullTime: false,
    })

    expect(router.currentRoute.value.query).toEqual({
      search: 'backend',
      location: 'Germany',
    })
  })

  it('reacts to route query changes', async () => {
    const { router, result } = await setup(ref(jobs))

    expect(result.filteredJobs.value).toEqual(jobs)

    await router.push({
      query: {
        location: 'Germany',
      },
    })

    expect(result.filters.value.location).toBe('Germany')
    expect(result.filteredJobs.value).toEqual([jobs[1]])
  })
})
