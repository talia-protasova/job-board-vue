<script setup lang="ts">
import { ref, watch } from 'vue'

import { UiButton } from '@/shared/ui/ui-button'
import { UiIconButton } from '@/shared/ui/ui-icon-button'
import { UiModal } from '@/shared/ui/ui-modal'

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
const isFiltersOpen = ref(false)

watch(
  () => props.filters,
  (filters) => {
    search.value = filters.search
    location.value = filters.location
    fullTime.value = filters.fullTime
  },
)

function submitSearch() {
  emit('submit', {
    search: search.value,
    location: props.filters.location,
    fullTime: props.filters.fullTime,
  })
}

function openFilters() {
  location.value = props.filters.location
  fullTime.value = props.filters.fullTime
  isFiltersOpen.value = true
}

function closeFilters() {
  isFiltersOpen.value = false
}

function applyFilters() {
  emit('submit', {
    search: search.value,
    location: location.value,
    fullTime: fullTime.value,
  })

  closeFilters()
}
</script>

<template>
  <form class="job-filters-mobile" role="search" @submit.prevent="submitSearch">
    <label class="u-visually-hidden" for="job-search-mobile">
      Search by title or company
    </label>

    <input
id="job-search-mobile" v-model="search" class="job-filters-mobile__input" name="search" type="search"
      placeholder="Filter by title…">

    <div class="job-filters-mobile__actions">
      <UiIconButton aria-label="Open filters" @click="openFilters">
        <svg class="job-filters-mobile__filter-icon" aria-hidden="true">
          <use href="/sprite.svg#icon-filter" />
        </svg>
      </UiIconButton>

      <UiIconButton variant="primary" type="submit" aria-label="Search jobs">
        <svg class="job-filters-mobile__search-icon" aria-hidden="true">
          <use href="/sprite.svg#icon-search" />
        </svg>
      </UiIconButton>
    </div>
  </form>

  <UiModal :open="isFiltersOpen" title="Filter jobs" @close="closeFilters">
    <form class="job-filters-mobile__dialog-form" @submit.prevent="applyFilters">
      <div class="job-filters-mobile__location-field">
        <svg class="job-filters-mobile__location-icon" aria-hidden="true">
          <use href="/sprite.svg#icon-location" />
        </svg>

        <label class="u-visually-hidden" for="job-location-mobile">
          Filter by location
        </label>

        <input
id="job-location-mobile" v-model="location" class="job-filters-mobile__dialog-input" name="location"
          type="search" placeholder="Filter by location…">
      </div>

      <div class="job-filters-mobile__dialog-actions">
        <label class="job-filters-mobile__checkbox">
          <input v-model="fullTime" class="job-filters-mobile__checkbox-input" name="fullTime" type="checkbox">

          <span class="job-filters-mobile__checkbox-control" aria-hidden="true">
            <svg class="job-filters-mobile__check-icon">
              <use href="/sprite.svg#icon-check" />
            </svg>
          </span>

          <span>Full Time Only</span>
        </label>

        <UiButton class="job-filters-mobile__apply" type="submit">
          Search
        </UiButton>
      </div>
    </form>
  </UiModal>
</template>

<style lang="scss" src="./job-filters-mobile.scss"></style>
