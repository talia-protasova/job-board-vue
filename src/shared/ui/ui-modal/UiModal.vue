<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'

const props = defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

const dialogRef = ref<HTMLElement | null>(null)

let previouslyFocusedElement: HTMLElement | null = null

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements(): HTMLElement[] {
  if (!dialogRef.value) {
    return []
  }

  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    ),
  )
}

function closeModal() {
  emit('close')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeModal()

    return
  }

  if (event.key !== 'Tab') {
    return
  }

  const focusableElements = getFocusableElements()

  if (focusableElements.length === 0) {
    event.preventDefault()
    dialogRef.value?.focus()

    return
  }

  const firstElement = focusableElements[0]
  const lastElement =
    focusableElements[focusableElements.length - 1]

  if (!firstElement || !lastElement) {
    return
  }

  if (
    event.shiftKey &&
    document.activeElement === firstElement
  ) {
    event.preventDefault()
    lastElement.focus()

    return
  }

  if (
    !event.shiftKey &&
    document.activeElement === lastElement
  ) {
    event.preventDefault()
    firstElement.focus()
  }
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      previouslyFocusedElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null

      document.body.classList.add('u-no-scroll')

      await nextTick()

      const [firstFocusableElement] =
        getFocusableElements()

      if (firstFocusableElement) {
        firstFocusableElement.focus()
      } else {
        dialogRef.value?.focus()
      }

      return
    }

    document.body.classList.remove('u-no-scroll')

    previouslyFocusedElement?.focus()
    previouslyFocusedElement = null
  },
)

onBeforeUnmount(() => {
  document.body.classList.remove('u-no-scroll')
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="ui-modal" @click.self="closeModal">
      <div
ref="dialogRef" class="ui-modal__dialog" role="dialog" aria-modal="true" :aria-label="title" tabindex="-1"
        @keydown="handleKeydown">
        <header class="ui-modal__header">
          <h2 class="ui-modal__title">
            {{ title }}
          </h2>

          <button class="ui-modal__close" type="button" @click="closeModal">
            Close
          </button>
        </header>

        <div class="ui-modal__content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" src="./ui-modal.scss"></style>
