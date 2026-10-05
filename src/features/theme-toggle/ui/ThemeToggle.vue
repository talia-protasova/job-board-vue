<script setup lang="ts">
import { useTheme } from '../model/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
class="theme-toggle" type="button" role="switch" aria-label="Dark mode" :aria-checked="isDark"
    @click="toggleTheme">
    <svg class="theme-toggle__sun" width="20" height="19" aria-hidden="true">
      <use href="/sprite.svg#icon-sun" />
    </svg>

    <span class="theme-toggle__track" aria-hidden="true">
      <span class="theme-toggle__thumb" :class="{ 'theme-toggle__thumb--active': isDark }" />
    </span>

    <svg class="theme-toggle__moon" width="12" height="12" aria-hidden="true">
      <use href="/sprite.svg#icon-moon" />
    </svg>
  </button>
</template>

<style scoped lang="scss">
@use './theme-toggle';
</style>
