<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { ThemeToggle } from '@/features/theme-toggle';
import { UiContainer } from '@/shared/ui/ui-container'
</script>

<template>
  <header class="app-header">
    <svg
class="app-header__background app-header__background--mobile" viewBox="0 0 375 136"
      preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <use href="/sprite.svg#bg-pattern-header-mobile" />
    </svg>

    <svg
class="app-header__background app-header__background--tablet" viewBox="0 0 768 160"
      preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <use href="/sprite.svg#bg-pattern-header-tablet" />
    </svg>

    <svg
class="app-header__background app-header__background--desktop" viewBox="0 0 1440 160"
      preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <use href="/sprite.svg#bg-pattern-header" />
    </svg>

    <UiContainer>
      <div class="app-header__inner">
        <RouterLink class="app-header__logo-link" to="/" aria-label="DevJobs home">
          <svg
class="app-header__logo" viewBox="0 0 115 32" width="115" height="32" aria-hidden="true"
            focusable="false">
            <use href="/sprite.svg#logo" />
          </svg>
        </RouterLink>

        <ThemeToggle />
      </div>
    </UiContainer>
  </header>
</template>

<style lang="scss" src="./app-header.scss"></style>
