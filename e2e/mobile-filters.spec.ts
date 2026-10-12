import { expect, test } from '@playwright/test'

test.use({
  viewport: {
    width: 375,
    height: 812,
  },
})

test('filters jobs through the mobile filters dialog', async ({ page }) => {
  await page.goto('/')

  await page
    .getByRole('searchbox', {
      name: 'Search by title or company',
    })
    .fill('Senior Software Engineer')

  await page.getByRole('button', { name: 'Open filters' }).click()

  const dialog = page.getByRole('dialog', {
    name: 'Filter jobs',
  })

  await expect(dialog).toBeVisible()

  await dialog
    .getByRole('searchbox', {
      name: 'Filter by location',
    })
    .fill('United Kingdom')

  await dialog
    .getByRole('checkbox', {
      name: 'Full Time Only',
    })
    .check()

  await dialog.getByRole('button', { name: 'Search' }).click()

  await expect(dialog).not.toBeVisible()

  await expect(page).toHaveURL(/search=Senior(?:\+|%20)Software(?:\+|%20)Engineer/)
  await expect(page).toHaveURL(/location=United(?:\+|%20)Kingdom/)
  await expect(page).toHaveURL(/fullTime=true/)

  await expect(
    page.getByRole('link', {
      name: 'Senior Software Engineer',
    }),
  ).toBeVisible()
})
