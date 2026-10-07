<script setup lang="ts">
import { ref, watch } from 'vue'

import { UiButton } from '@/shared/ui/ui-button'

import type { JobFilters } from '../../model/job-filters.types'

const props = defineProps<{
  filters: JobFilters
}>()

const emit = defineEmits<{
  submit: [filters: JobFilters]
}>()

const search = ref(props.filters.search)
const location = ref(props.filters.location)
const fullTime = ref(props.filters.fullTime)

watch(
  () => props.filters,
  (filters) => {
    search.value = filters.search
    location.value = filters.location
    fullTime.value = filters.fullTime
  },
)

function submitFilters() {
  emit('submit', {
    search: search.value,
    location: location.value,
    fullTime: fullTime.value,
  })
}
</script>

<template>
  <form class="job-filters-desktop" role="search" @submit.prevent="submitFilters">
    <div class="job-filters-desktop__field">
      <svg class="job-filters-desktop__search-icon" aria-hidden="true">
        <use href="/sprite.svg#icon-search" />
      </svg>

      <label class="u-visually-hidden" for="job-search">
        Search by title or company
      </label>

      <input
id="job-search" v-model="search" class="job-filters-desktop__input" name="search" type="search"
        placeholder="Filter by title or company…">
    </div>

    <div
class="
        job-filters-desktop__field
        job-filters-desktop__field--location
      ">
      <svg class="job-filters-desktop__location-icon" aria-hidden="true">
        <use href="/sprite.svg#icon-location" />
      </svg>

      <label class="u-visually-hidden" for="job-location">
        Filter by location
      </label>

      <input
id="job-location" v-model="location" class="job-filters-desktop__input" name="location" type="search"
        placeholder="Filter by location…">
    </div>

    <div class="job-filters-desktop__actions">
      <label class="job-filters-desktop__checkbox">
        <input v-model="fullTime" class="job-filters-desktop__checkbox-input" name="fullTime" type="checkbox">

        <span class="job-filters-desktop__checkbox-control" aria-hidden="true">
          <svg class="job-filters-desktop__check-icon">
            <use href="/sprite.svg#icon-check" />
          </svg>
        </span>

        <span class="job-filters-desktop__checkbox-label">
          Full Time Only
        </span>
      </label>

      <UiButton type="submit">
        Search
      </UiButton>
    </div>
  </form>
</template>

<style lang="scss" src="./job-filters-desktop.scss"></style>
