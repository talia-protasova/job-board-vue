import { computed, readonly, ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'devjobs-theme'

const theme = ref<Theme>('light')
const isDark = computed(() => theme.value === 'dark')

let initialized = false

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)

    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

function writeStoredTheme(value: Theme): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // storage may be unavailable
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: Theme): void {
  theme.value = value
  document.documentElement.dataset.theme = value
}

export function initTheme(): void {
  if (initialized || typeof window === 'undefined') {
    return
  }

  const storedTheme = readStoredTheme()
  const bootstrappedTheme = document.documentElement.dataset.theme

  const initialTheme =
    storedTheme ?? (isTheme(bootstrappedTheme) ? bootstrappedTheme : getSystemTheme())

  applyTheme(initialTheme)

  initialized = true
}

function toggleTheme(): void {
  const nextTheme: Theme = theme.value === 'dark' ? 'light' : 'dark'

  applyTheme(nextTheme)
  writeStoredTheme(nextTheme)
}

export function useTheme() {
  return {
    theme: readonly(theme),
    isDark,
    toggleTheme,
  }
}
