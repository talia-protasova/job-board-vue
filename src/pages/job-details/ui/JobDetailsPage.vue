<script setup lang="ts">
import {
  ref,
  watch,
} from 'vue'
import { RouterLink } from 'vue-router'

import {
  getJobById,
  type Job,
} from '@/entities/job'
import { UiContainer } from '@/shared/ui/ui-container'
import { AppHeader } from '@/widgets/app-header'
import { JobDetailsContent } from '@/widgets/job-details-content'

interface Props {
  jobId: string
}

type LoadStatus = 'loading' | 'success' | 'not-found' | 'error'

const props = defineProps<Props>()

const job = ref<Job | null>(null)
const status = ref<LoadStatus>('loading')

async function loadJob(jobId: string) {
  status.value = 'loading'
  job.value = null

  const parsedJobId = Number(jobId)

  if (!Number.isInteger(parsedJobId) || parsedJobId <= 0) {
    status.value = 'not-found'
    return
  }

  try {
    const loadedJob = await getJobById(parsedJobId)

    if (!loadedJob) {
      status.value = 'not-found'
      return
    }

    job.value = loadedJob
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}

watch(
  () => props.jobId,
  (jobId) => {
    void loadJob(jobId)
  },
  { immediate: true },
)
</script>

<template>
  <AppHeader />

  <main id="main-content" class="job-details-page">
    <UiContainer>
      <div class="job-details-page__content">
        <p v-if="status === 'loading'" class="job-details-page__status">
          Loading job...
        </p>

        <section v-else-if="status === 'not-found'" class="job-details-page__state"
          aria-labelledby="job-not-found-title">
          <h1 id="job-not-found-title" class="job-details-page__state-title">
            Job not found
          </h1>

          <p class="job-details-page__state-text">
            The job you're looking for does not exist.
          </p>

          <RouterLink class="job-details-page__back-link" to="/">
            Back to all jobs
          </RouterLink>
        </section>

        <section v-else-if="status === 'error'" class="job-details-page__state" aria-labelledby="job-error-title">
          <h1 id="job-error-title" class="job-details-page__state-title">
            Something went wrong
          </h1>

          <p class="job-details-page__state-text">
            We couldn't load this job.
          </p>
        </section>

        <JobDetailsContent v-else-if="job" :job="job" />
      </div>
    </UiContainer>
  </main>

  <footer v-if="job && status === 'success'" class="job-details-page__apply-bar">
    <div class="job-details-page__apply-inner">
      <div class="job-details-page__apply-info">
        <h2 class="job-details-page__apply-title">
          {{ job.position }}
        </h2>

        <p class="job-details-page__apply-company">
          {{ job.company }}
        </p>
      </div>

      <a class="job-details-page__apply-link" :href="job.apply" target="_blank" rel="noopener noreferrer">
        Apply Now
      </a>
    </div>
  </footer>
</template>

<style lang="scss" src="./job-details-page.scss"></style>
