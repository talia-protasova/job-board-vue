import { expect, test } from '@playwright/test'

test('persists selected theme after reload', async ({ page }) => {
  await page.goto('/')

  const themeToggle = page.getByRole('switch', {
    name: 'Dark mode',
  })

  const initialTheme = await page.locator('html').getAttribute('data-theme')
  const nextTheme = initialTheme === 'dark' ? 'light' : 'dark'

  await themeToggle.click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme)

  await expect(themeToggle).toHaveAttribute('aria-checked', nextTheme === 'dark' ? 'true' : 'false')

  await page.reload()

  await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme)

  await expect(page.getByRole('switch', { name: 'Dark mode' })).toHaveAttribute(
    'aria-checked',
    nextTheme === 'dark' ? 'true' : 'false',
  )
})
