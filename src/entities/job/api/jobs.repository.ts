import jobsData from './data/jobs.json'

import { mapJob } from '../model/job.lib'
import type { Job } from '../model/job.types'

const jobs: readonly Job[] = jobsData.map(mapJob)

export function getJobs(): Promise<Job[]> {
  return Promise.resolve([...jobs])
}

export function getJobById(id: number): Promise<Job | null> {
  const job = jobs.find((item) => item.id === id)

  return Promise.resolve(job ?? null)
}
