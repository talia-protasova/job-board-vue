<script setup lang="ts">
import { JobCard, type Job } from '@/entities/job'

defineProps<{
  jobs: readonly Job[]
}>()
</script>

<template>
  <TransitionGroup name="jobs-list" tag="ul" class="jobs-list">
    <li v-for="job in jobs" :key="job.id" class="jobs-list__item">
      <JobCard :job="job" />
    </li>
  </TransitionGroup>
</template>

<style lang="scss" src="./jobs-list.scss"></style>
