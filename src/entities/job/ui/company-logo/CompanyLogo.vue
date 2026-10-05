<script setup lang="ts">
import { computed } from 'vue'

import { getJobLogoMeta } from '../../model/job.lib'

interface Props {
  logo: string
  backgroundColor: string
}

const props = defineProps<Props>()

const logoMeta = computed(() => getJobLogoMeta(props.logo))
</script>

<template>
  <div class="company-logo" :style="{ backgroundColor: props.backgroundColor }">
    <svg
class="company-logo__image" :width="logoMeta.width" :height="logoMeta.height"
      :viewBox="`0 0 ${logoMeta.width} ${logoMeta.height}`" aria-hidden="true" focusable="false">
      <use :href="`/sprite.svg#${logoMeta.id}`" />
    </svg>
  </div>
</template>

<style lang="scss" src="./company-logo.scss"></style>
