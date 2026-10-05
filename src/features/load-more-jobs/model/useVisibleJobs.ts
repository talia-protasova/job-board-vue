import { computed, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

import type { Job } from '@/entities/job'

const INITIAL_VISIBLE_JOBS = 12
const LOAD_MORE_STEP = 3

export function useVisibleJobs(jobs: MaybeRefOrGetter<readonly Job[]>) {
  const visibleCount = ref(INITIAL_VISIBLE_JOBS)

  const allJobs = computed(() => toValue(jobs))

  const visibleJobs = computed(() => allJobs.value.slice(0, visibleCount.value))

  const hasMore = computed(() => visibleCount.value < allJobs.value.length)

  function loadMore() {
    visibleCount.value = Math.min(visibleCount.value + LOAD_MORE_STEP, allJobs.value.length)
  }

  function resetVisibleCount() {
    visibleCount.value = INITIAL_VISIBLE_JOBS
  }

  watch(allJobs, resetVisibleCount)

  return {
    visibleJobs,
    hasMore,
    loadMore,
  }
}
