<script setup lang="ts">
import { UiButton } from '@/shared/ui/ui-button'

const emit = defineEmits<{
  loadMore: []
}>()
</script>

<template>
  <UiButton type="button" variant="primary" @click="emit('loadMore')">
    Load More
  </UiButton>
</template>
