import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'

import type { Job } from '@/entities/job'

import JobDetailsPage from './JobDetailsPage.vue'

const getJobByIdMock = vi.hoisted(() => vi.fn())

vi.mock('@/entities/job', () => ({
  getJobById: getJobByIdMock,
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

async function mountPage(jobId: string) {
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

  await router.push('/')
  await router.isReady()

  const wrapper = mount(JobDetailsPage, {
    props: {
      jobId,
    },
    global: {
      plugins: [router],
      stubs: {
        AppHeader: true,
        JobDetailsContent: true,
      },
    },
  })

  await flushPromises()

  return wrapper
}

describe('JobDetailsPage', () => {
  beforeEach(() => {
    getJobByIdMock.mockReset()
    document.title = 'DevJobs'
  })

  it('loads the requested job', async () => {
    const job = createJob()

    getJobByIdMock.mockResolvedValue(job)

    const wrapper = await mountPage('1')

    expect(getJobByIdMock).toHaveBeenCalledWith(1)

    const jobDetails = wrapper.getComponent({
      name: 'JobDetailsContent',
    })

    expect(jobDetails.props('job')).toEqual(job)
  })

  it('sets the document title from the loaded job position', async () => {
    const job = createJob()

    getJobByIdMock.mockResolvedValue(job)

    await mountPage('1')

    expect(document.title).toBe('Senior Software Engineer | DevJobs')
  })

  it('shows the not-found state when the job does not exist', async () => {
    getJobByIdMock.mockResolvedValue(null)

    const wrapper = await mountPage('999')

    expect(wrapper.get('#job-not-found-title').text()).toBe('Job not found')

    expect(wrapper.text()).toContain("The job you're looking for does not exist.")

    expect(wrapper.get('a').attributes('href')).toBe('/')
  })

  it('sets the not-found document title when the job does not exist', async () => {
    getJobByIdMock.mockResolvedValue(null)

    await mountPage('999')

    expect(document.title).toBe('Page not found | DevJobs')
  })

  it('treats an invalid job id as not found without calling the repository', async () => {
    const wrapper = await mountPage('invalid')

    expect(getJobByIdMock).not.toHaveBeenCalled()

    expect(wrapper.get('#job-not-found-title').text()).toBe('Job not found')
    expect(document.title).toBe('Page not found | DevJobs')
  })

  it('shows an error state when loading fails', async () => {
    getJobByIdMock.mockRejectedValue(new Error('Failed to load job'))

    const wrapper = await mountPage('1')

    expect(wrapper.get('#job-error-title').text()).toBe('Something went wrong')

    expect(wrapper.text()).toContain("We couldn't load this job.")
    expect(document.title).toBe('DevJobs')
  })

  it('resets the document title while loading another job', async () => {
    const firstJob = createJob()

    getJobByIdMock.mockResolvedValueOnce(firstJob)

    const wrapper = await mountPage('1')

    expect(document.title).toBe('Senior Software Engineer | DevJobs')

    let resolveJob!: (value: Job | null) => void

    getJobByIdMock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveJob = resolve
        }),
    )

    await wrapper.setProps({
      jobId: '2',
    })

    expect(document.title).toBe('DevJobs')

    resolveJob(
      createJob({
        id: 2,
        position: 'Frontend Developer',
      }),
    )

    await flushPromises()

    expect(document.title).toBe('Frontend Developer | DevJobs')
  })

  it('renders the apply footer for a successfully loaded job', async () => {
    const job = createJob()

    getJobByIdMock.mockResolvedValue(job)

    const wrapper = await mountPage('1')

    const applyFooter = wrapper.get('.job-details-page__apply-bar')

    expect(applyFooter.text()).toContain(job.position)
    expect(applyFooter.text()).toContain(job.company)
  })

  it('uses the job apply URL in the footer link', async () => {
    const job = createJob()

    getJobByIdMock.mockResolvedValue(job)

    const wrapper = await mountPage('1')

    const applyLink = wrapper.get('.job-details-page__apply-link')

    expect(applyLink.attributes('href')).toBe(job.apply)
    expect(applyLink.attributes('target')).toBe('_blank')
    expect(applyLink.attributes('rel')).toBe('noopener noreferrer')
  })

  it('does not render the apply footer when the job is not found', async () => {
    getJobByIdMock.mockResolvedValue(null)

    const wrapper = await mountPage('999')

    expect(wrapper.find('.job-details-page__apply-bar').exists()).toBe(false)
  })

  it('does not render the apply footer for an invalid job id', async () => {
    const wrapper = await mountPage('invalid')

    expect(wrapper.find('.job-details-page__apply-bar').exists()).toBe(false)
  })

  it('does not render the apply footer when loading fails', async () => {
    getJobByIdMock.mockRejectedValue(new Error('Failed to load job'))

    const wrapper = await mountPage('1')

    expect(wrapper.find('.job-details-page__apply-bar').exists()).toBe(false)
  })
})
