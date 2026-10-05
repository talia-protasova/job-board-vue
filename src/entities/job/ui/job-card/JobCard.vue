<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { Job } from '../../model/job.types'

import CompanyLogo from '../company-logo/CompanyLogo.vue'
import JobMeta from '../job-meta/JobMeta.vue'

defineProps<{
  job: Job
}>()
</script>
<template>
  <article class="job-card">
    <CompanyLogo class="job-card__logo" :logo="job.logo" :background-color="job.logoBackground" />

    <JobMeta :posted-at="job.postedAt" :contract="job.contract" />

    <h2 class="job-card__title">
      <RouterLink class="job-card__link" :to="`/jobs/${job.id}`">
        {{ job.position }}
      </RouterLink>
    </h2>

    <p class="job-card__company">
      {{ job.company }}
    </p>

    <p class="job-card__location">
      {{ job.location }}
    </p>
  </article>
</template>

<style lang="scss" src="./job-card.scss"></style>
