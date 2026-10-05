import { nextTick, ref } from 'vue'
import { describe, expect, it } from 'vitest'

import type { Job } from '@/entities/job'

import { useVisibleJobs } from './useVisibleJobs'

function createJob(id: number): Job {
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
  }
}

function createJobs(count: number): Job[] {
  return Array.from({ length: count }, (_, index) => createJob(index + 1))
}

describe('useVisibleJobs', () => {
  it('shows the initial number of jobs', () => {
    const jobs = ref(createJobs(15))

    const { visibleJobs, hasMore } = useVisibleJobs(jobs)

    expect(visibleJobs.value).toHaveLength(12)
    expect(hasMore.value).toBe(true)
  })

  it('reveals more jobs', () => {
    const jobs = ref(createJobs(15))

    const { visibleJobs, hasMore, loadMore } = useVisibleJobs(jobs)

    loadMore()

    expect(visibleJobs.value).toHaveLength(15)
    expect(hasMore.value).toBe(false)
  })

  it('does not exceed the available number of jobs', () => {
    const jobs = ref(createJobs(13))

    const { visibleJobs, loadMore } = useVisibleJobs(jobs)

    loadMore()

    expect(visibleJobs.value).toHaveLength(13)
  })

  it('resets the visible count when the jobs change', async () => {
    const jobs = ref(createJobs(15))

    const { visibleJobs, loadMore } = useVisibleJobs(jobs)

    loadMore()

    expect(visibleJobs.value).toHaveLength(15)

    jobs.value = createJobs(14)

    await nextTick()

    expect(visibleJobs.value).toHaveLength(12)
  })
})
