import { describe, expect, it } from 'vitest'

import type { Job } from '@/entities/job'

import { filterJobs } from './filter-jobs'
import type { JobFilters } from './job-filters.types'

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

function createFilters(overrides: Partial<JobFilters> = {}): JobFilters {
  return {
    search: '',
    location: '',
    fullTime: false,
    ...overrides,
  }
}

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
  createJob(3, {
    company: 'Gamma Works',
    position: 'Product Designer',
    location: 'United States',
    contract: 'Freelance',
  }),
]

describe('filterJobs', () => {
  it('returns all jobs when no filters are active', () => {
    const result = filterJobs(jobs, createFilters())

    expect(result).toEqual(jobs)
  })

  it('matches search by position', () => {
    const result = filterJobs(jobs, createFilters({ search: 'Frontend' }))

    expect(result).toEqual([jobs[0]])
  })

  it('matches search by company', () => {
    const result = filterJobs(jobs, createFilters({ search: 'Beta' }))

    expect(result).toEqual([jobs[1]])
  })

  it('matches search case-insensitively', () => {
    const result = filterJobs(jobs, createFilters({ search: 'FRONTEND' }))

    expect(result).toEqual([jobs[0]])
  })

  it('ignores surrounding whitespace in search', () => {
    const result = filterJobs(jobs, createFilters({ search: '  frontend  ' }))

    expect(result).toEqual([jobs[0]])
  })

  it('matches location case-insensitively', () => {
    const result = filterJobs(jobs, createFilters({ location: 'gErMaNy' }))

    expect(result).toEqual([jobs[1]])
  })

  it('returns only full-time jobs when fullTime is enabled', () => {
    const result = filterJobs(jobs, createFilters({ fullTime: true }))

    expect(result).toEqual([jobs[0]])
  })

  it('combines search and location with AND', () => {
    const result = filterJobs(
      jobs,
      createFilters({
        search: 'Engineer',
        location: 'Germany',
      }),
    )

    expect(result).toEqual([jobs[1]])
  })

  it('combines all active filters with AND', () => {
    const result = filterJobs(
      jobs,
      createFilters({
        search: 'Alpha',
        location: 'United',
        fullTime: true,
      }),
    )

    expect(result).toEqual([jobs[0]])
  })

  it('returns an empty array when no jobs match', () => {
    const result = filterJobs(jobs, createFilters({ search: 'iOS Developer' }))

    expect(result).toEqual([])
  })
})
