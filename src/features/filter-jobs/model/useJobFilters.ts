import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { Job } from '@/entities/job'

import { filterJobs } from './filter-jobs'
import { parseJobFiltersQuery, serializeJobFiltersQuery } from './job-filters-query'
import type { JobFilters } from './job-filters.types'

export function useJobFilters(jobs: MaybeRefOrGetter<readonly Job[]>) {
  const route = useRoute()
  const router = useRouter()

  const filters = computed(() => parseJobFiltersQuery(route.query))

  const filteredJobs = computed(() => filterJobs(toValue(jobs), filters.value))

  async function updateFilters(nextFilters: JobFilters): Promise<void> {
    await router.push({
      query: serializeJobFiltersQuery(nextFilters),
    })
  }

  return {
    filters,
    filteredJobs,
    updateFilters,
  }
}
