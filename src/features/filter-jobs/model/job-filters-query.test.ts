import { describe, expect, it } from 'vitest'

import { parseJobFiltersQuery, serializeJobFiltersQuery } from './job-filters-query'

describe('parseJobFiltersQuery', () => {
  it('returns default filters for an empty query', () => {
    expect(parseJobFiltersQuery({})).toEqual({
      search: '',
      location: '',
      fullTime: false,
    })
  })

  it('parses search and location', () => {
    expect(
      parseJobFiltersQuery({
        search: 'frontend',
        location: 'Germany',
      }),
    ).toEqual({
      search: 'frontend',
      location: 'Germany',
      fullTime: false,
    })
  })

  it('parses fullTime when its value is true', () => {
    expect(
      parseJobFiltersQuery({
        fullTime: 'true',
      }),
    ).toEqual({
      search: '',
      location: '',
      fullTime: true,
    })
  })

  it('does not treat unsupported fullTime values as true', () => {
    expect(
      parseJobFiltersQuery({
        fullTime: 'yes',
      }),
    ).toEqual({
      search: '',
      location: '',
      fullTime: false,
    })
  })

  it('handles null query values', () => {
    expect(
      parseJobFiltersQuery({
        search: null,
        location: null,
        fullTime: null,
      }),
    ).toEqual({
      search: '',
      location: '',
      fullTime: false,
    })
  })

  it('uses the first value when query params are arrays', () => {
    expect(
      parseJobFiltersQuery({
        search: ['frontend', 'backend'],
        location: ['Germany', 'France'],
        fullTime: ['true', 'false'],
      }),
    ).toEqual({
      search: 'frontend',
      location: 'Germany',
      fullTime: true,
    })
  })
})

describe('serializeJobFiltersQuery', () => {
  it('returns an empty query for default filters', () => {
    expect(
      serializeJobFiltersQuery({
        search: '',
        location: '',
        fullTime: false,
      }),
    ).toEqual({})
  })

  it('serializes active filters', () => {
    expect(
      serializeJobFiltersQuery({
        search: 'frontend',
        location: 'Germany',
        fullTime: true,
      }),
    ).toEqual({
      search: 'frontend',
      location: 'Germany',
      fullTime: 'true',
    })
  })

  it('omits inactive filters', () => {
    expect(
      serializeJobFiltersQuery({
        search: 'frontend',
        location: '',
        fullTime: false,
      }),
    ).toEqual({
      search: 'frontend',
    })
  })
})
