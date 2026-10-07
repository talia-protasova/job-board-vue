import type { LocationQueryRaw, LocationQueryValue } from 'vue-router'

import type { JobFilters } from './job-filters.types'

function getQueryValue(value: LocationQueryValue | LocationQueryValue[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? ''
  }

  return value ?? ''
}

export function parseJobFiltersQuery(
  query: Record<string, LocationQueryValue | LocationQueryValue[] | undefined>,
): JobFilters {
  return {
    search: getQueryValue(query.search),
    location: getQueryValue(query.location),
    fullTime: getQueryValue(query.fullTime) === 'true',
  }
}

export function serializeJobFiltersQuery(filters: JobFilters): LocationQueryRaw {
  const query: LocationQueryRaw = {}

  if (filters.search !== '') {
    query.search = filters.search
  }

  if (filters.location !== '') {
    query.location = filters.location
  }

  if (filters.fullTime) {
    query.fullTime = 'true'
  }

  return query
}
