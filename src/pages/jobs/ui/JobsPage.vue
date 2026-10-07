<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from 'vue'

import {
  getJobs,
  type Job,
} from '@/entities/job'
import {
  JobFilters,
  useJobFilters,
} from '@/features/filter-jobs'
import {
  LoadMoreJobsButton,
  useVisibleJobs,
} from '@/features/load-more-jobs'
import { UiContainer } from '@/shared/ui/ui-container'
import { AppHeader } from '@/widgets/app-header'
import { JobsList } from '@/widgets/jobs-list'

const jobs = ref<Job[]>([])
const hasLoadedJobs = ref(false)

const {
  filters,
  filteredJobs,
  updateFilters,
} = useJobFilters(jobs)

const {
  visibleJobs,
  hasMore,
  loadMore,
} = useVisibleJobs(filteredJobs)

const resultCountMessage = computed(() => {
  const count = filteredJobs.value.length
  const label = count === 1 ? 'job' : 'jobs'

  return `${count} ${label} found`
})

onMounted(async () => {
  jobs.value = await getJobs()
  hasLoadedJobs.value = true
})
</script>

<template>
  <AppHeader />

  <main id="main-content" class="jobs-page">
    <UiContainer>
      <div class="jobs-page__filters">
        <JobFilters :filters="filters" @submit="updateFilters" />
      </div>

      <section class="jobs-page__results" aria-labelledby="jobs-heading">
        <h1 id="jobs-heading" class="u-visually-hidden">
          Open positions
        </h1>

        <template v-if="hasLoadedJobs">
          <p class="u-visually-hidden" aria-live="polite" aria-atomic="true">
            {{ resultCountMessage }}
          </p>

          <div v-if="filteredJobs.length === 0" class="jobs-page__empty">
            <h2 class="jobs-page__empty-title">
              No jobs found
            </h2>

            <p class="jobs-page__empty-text">
              Try changing your search or clearing one of the filters.
            </p>
          </div>

          <template v-else>
            <JobsList :jobs="visibleJobs" />

            <div v-if="hasMore" class="jobs-page__load-more">
              <LoadMoreJobsButton @load-more="loadMore" />
            </div>
          </template>
        </template>
      </section>
    </UiContainer>
  </main>
</template>

<style lang="scss" src="./jobs-page.scss"></style>
