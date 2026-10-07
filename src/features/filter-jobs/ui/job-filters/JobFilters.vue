<script setup lang="ts">
import type { JobFilters } from '../../model/job-filters.types'
import JobFiltersDesktop from '../job-filters-desktop/JobFiltersDesktop.vue'
import JobFiltersMobile from '../job-filters-mobile/JobFiltersMobile.vue'

defineProps<{
  filters: JobFilters
}>()

const emit = defineEmits<{
  submit: [filters: JobFilters]
}>()

function submitFilters(filters: JobFilters) {
  emit('submit', filters)
}
</script>

<template>
  <JobFiltersMobile :filters="filters" @submit="submitFilters" />

  <JobFiltersDesktop :filters="filters" @submit="submitFilters" />
</template>
