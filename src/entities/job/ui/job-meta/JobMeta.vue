<script setup lang="ts">
import type { JobContract } from '../../model/job.types'

defineProps<{
  postedAt: string
  contract: JobContract
}>()
</script>

<template>
  <p class="job-meta">
    <span>{{ postedAt }}</span>
    <span class="job-meta__contract">{{ contract }}</span>
  </p>
</template>

<style lang="scss" src="./job-meta.scss"></style>
