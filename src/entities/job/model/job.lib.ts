import type { Job, JobContract } from './job.types'

type RawJob = Omit<Job, 'contract'> & {
  contract: string
}

const JOB_LOGO_DIMENSIONS = {
  blogr: { width: 21, height: 17 },
  coffeeroasters: { width: 24, height: 24 },
  creative: { width: 26, height: 26 },
  crowdfund: { width: 38, height: 6 },
  maker: { width: 22, height: 22 },
  mastercraft: { width: 26, height: 26 },
  officelite: { width: 30, height: 20 },
  pod: { width: 24, height: 24 },
  pomodoro: { width: 34, height: 7 },
  scoot: { width: 40, height: 12 },
  typemaster: { width: 24, height: 24 },
  vector: { width: 38, height: 3 },
} as const

type JobLogoId = keyof typeof JOB_LOGO_DIMENSIONS

export interface JobLogoMeta {
  id: JobLogoId
  width: number
  height: number
}

function isJobContract(value: string): value is JobContract {
  return value === 'Full Time' || value === 'Part Time' || value === 'Freelance'
}

function isJobLogoId(value: string): value is JobLogoId {
  return value in JOB_LOGO_DIMENSIONS
}

export function mapJob(rawJob: RawJob): Job {
  if (!isJobContract(rawJob.contract)) {
    throw new Error(`Unsupported job contract: ${rawJob.contract}`)
  }

  return {
    ...rawJob,
    contract: rawJob.contract,
  }
}

export function getJobLogoMeta(logoPath: string): JobLogoMeta {
  const id = logoPath.slice(logoPath.lastIndexOf('/') + 1).replace(/\.svg$/, '')

  if (!isJobLogoId(id)) {
    throw new Error(`Unsupported job logo: ${logoPath}`)
  }

  return {
    id,
    ...JOB_LOGO_DIMENSIONS[id],
  }
}
