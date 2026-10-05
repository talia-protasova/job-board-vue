<script setup lang="ts">
import { onMounted, ref } from 'vue'

import {
  getJobs,
  type Job,
} from '@/entities/job'
import {
  LoadMoreJobsButton,
  useVisibleJobs,
} from '@/features/load-more-jobs'
import { UiContainer } from '@/shared/ui/ui-container'
import { AppHeader } from '@/widgets/app-header'
import { JobsList } from '@/widgets/jobs-list'

const jobs = ref<Job[]>([])

const {
  visibleJobs,
  hasMore,
  loadMore,
} = useVisibleJobs(jobs)

onMounted(async () => {
  jobs.value = await getJobs()
})
</script>

<template>
  <AppHeader />

  <main id="main-content" class="jobs-page">
    <UiContainer>
      <section aria-labelledby="jobs-heading">
        <h1 id="jobs-heading" class="u-visually-hidden">
          Open positions
        </h1>

        <JobsList :jobs="visibleJobs" />

        <div v-if="hasMore" class="jobs-page__load-more">
          <LoadMoreJobsButton @load-more="loadMore" />
        </div>
      </section>
    </UiContainer>
  </main>
</template>

<style lang="scss" src="./jobs-page.scss"></style>
