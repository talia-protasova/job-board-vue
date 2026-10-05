<script setup lang="ts">
import {
  JobCard,
  type Job,
} from '@/entities/job'

defineProps<{
  jobs: readonly Job[]
}>()
</script>

<template>
  <ul class="jobs-list">
    <li v-for="job in jobs" :key="job.id" class="jobs-list__item">
      <JobCard :job="job" />
    </li>
  </ul>
</template>

<style lang="scss" src="./jobs-list.scss"></style>
