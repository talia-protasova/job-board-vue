export type JobContract = 'Full Time' | 'Part Time' | 'Freelance'

export interface JobSection {
  content: string
  items: string[]
}

export interface Job {
  id: number
  company: string
  logo: string
  logoBackground: string
  position: string
  postedAt: string
  contract: JobContract
  location: string
  website: string
  apply: string
  description: string
  requirements: JobSection
  role: JobSection
}
