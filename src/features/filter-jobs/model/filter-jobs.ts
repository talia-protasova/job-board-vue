import type { Job } from '@/entities/job'

import type { JobFilters } from './job-filters.types'

function normalizeFilterValue(value: string): string {
  return value.trim().toLowerCase()
}

export function filterJobs(jobs: readonly Job[], filters: JobFilters): Job[] {
  const search = normalizeFilterValue(filters.search)
  const location = normalizeFilterValue(filters.location)

  return jobs.filter((job) => {
    const matchesSearch =
      search === '' ||
      job.position.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search)

    const matchesLocation = location === '' || job.location.toLowerCase().includes(location)

    const matchesFullTime = !filters.fullTime || job.contract === 'Full Time'

    return matchesSearch && matchesLocation && matchesFullTime
  })
}
