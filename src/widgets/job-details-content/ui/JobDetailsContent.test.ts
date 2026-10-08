import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import type { Job } from '@/entities/job'

import JobDetailsContent from './JobDetailsContent.vue'

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
    description: 'Build and maintain high-quality frontend applications.',
    requirements: {
      content: 'You should have strong frontend fundamentals.',
      items: ['Strong JavaScript knowledge', 'Experience with modern frontend frameworks'],
    },
    role: {
      content: 'You will work closely with the product team.',
      items: ['Build reusable interface components', 'Improve frontend architecture'],
    },
    ...overrides,
  }
}

function mountContent(job: Job = createJob()) {
  return mount(JobDetailsContent, {
    props: {
      job,
    },
    global: {
      stubs: {
        CompanyLogo: true,
        JobMeta: true,
      },
    },
  })
}

describe('JobDetailsContent', () => {
  it('renders the main job information', () => {
    const wrapper = mountContent()

    expect(wrapper.get('.job-details__company-name').text()).toBe('Scoot')
    expect(wrapper.get('.job-details__title').text()).toBe('Senior Software Engineer')
    expect(wrapper.get('.job-details__location').text()).toBe('United Kingdom')
    expect(wrapper.get('.job-details__description').text()).toBe(
      'Build and maintain high-quality frontend applications.',
    )
  })

  it('renders the company website links correctly', () => {
    const wrapper = mountContent()

    const websiteLinks = wrapper.findAll('a[href="https://example.com"]')

    expect(websiteLinks).toHaveLength(2)

    for (const link of websiteLinks) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }
  })

  it('renders the apply link correctly', () => {
    const wrapper = mountContent()

    const applyLink = wrapper.get('.job-details__apply')

    expect(applyLink.attributes('href')).toBe('https://example.com/apply')
    expect(applyLink.attributes('target')).toBe('_blank')
    expect(applyLink.attributes('rel')).toBe('noopener noreferrer')
    expect(applyLink.text()).toBe('Apply Now')
  })

  it('renders requirements as an unordered list', () => {
    const wrapper = mountContent()

    const requirementsSection = wrapper.get('[aria-labelledby="requirements-heading"]')

    expect(requirementsSection.text()).toContain('You should have strong frontend fundamentals.')

    const items = requirementsSection.findAll('ul li')

    expect(items.map((item) => item.text())).toEqual([
      'Strong JavaScript knowledge',
      'Experience with modern frontend frameworks',
    ])
  })

  it('renders role items as an ordered list', () => {
    const wrapper = mountContent()

    const roleSection = wrapper.get('[aria-labelledby="role-heading"]')

    expect(roleSection.text()).toContain('You will work closely with the product team.')

    const items = roleSection.findAll('ol li')

    expect(items.map((item) => item.text())).toEqual([
      'Build reusable interface components',
      'Improve frontend architecture',
    ])
  })
})
