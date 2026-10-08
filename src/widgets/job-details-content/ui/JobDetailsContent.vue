<script setup lang="ts">
import {
  CompanyLogo,
  JobMeta,
  type Job,
} from '@/entities/job'

defineProps<{
  job: Job
}>()
</script>

<template>
  <article class="job-details">
    <header class="job-details__company">
      <CompanyLogo class="job-details__company-logo" :logo="job.logo" :background-color="job.logoBackground" />

      <div class="job-details__company-info">
        <h2 class="job-details__company-name">
          {{ job.company }}
        </h2>

        <a class="job-details__company-website" :href="job.website" target="_blank" rel="noopener noreferrer">
          {{ job.website }}
        </a>
      </div>

      <a class="job-details__company-link" :href="job.website" target="_blank" rel="noopener noreferrer">
        Company Site
      </a>
    </header>

    <div class="job-details__main">
      <header class="job-details__header">
        <div class="job-details__heading">
          <JobMeta :posted-at="job.postedAt" :contract="job.contract" />

          <h1 class="job-details__title">
            {{ job.position }}
          </h1>

          <p class="job-details__location">
            {{ job.location }}
          </p>
        </div>

        <a class="job-details__apply" :href="job.apply" target="_blank" rel="noopener noreferrer">
          Apply Now
        </a>
      </header>

      <section class="job-details__section" aria-labelledby="description-heading">
        <h2 id="description-heading" class="u-visually-hidden">
          Job description
        </h2>

        <p class="job-details__description">
          {{ job.description }}
        </p>
      </section>

      <section class="job-details__section" aria-labelledby="requirements-heading">
        <h2 id="requirements-heading" class="job-details__section-title">
          Requirements
        </h2>

        <p class="job-details__section-text">
          {{ job.requirements.content }}
        </p>

        <ul v-if="job.requirements.items.length > 0" class="job-details__list">
          <li v-for="item in job.requirements.items" :key="item" class="job-details__list-item">
            {{ item }}
          </li>
        </ul>
      </section>

      <section class="job-details__section" aria-labelledby="role-heading">
        <h2 id="role-heading" class="job-details__section-title">
          What You Will Do
        </h2>

        <p class="job-details__section-text">
          {{ job.role.content }}
        </p>

        <ol v-if="job.role.items.length > 0" class="job-details__list job-details__list--ordered">
          <li v-for="item in job.role.items" :key="item" class="job-details__list-item">
            {{ item }}
          </li>
        </ol>
      </section>
    </div>
  </article>
</template>

<style lang="scss" src="./job-details-content.scss"></style>
