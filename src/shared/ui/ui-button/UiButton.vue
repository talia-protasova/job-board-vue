<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button class="ui-button" :class="`ui-button--${variant}`" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use './ui-button';
</style>
