<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'plain' | 'primary'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'plain',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button class="ui-icon-button" :class="`ui-icon-button--${variant}`" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<style lang="scss" src="./ui-icon-button.scss"></style>
