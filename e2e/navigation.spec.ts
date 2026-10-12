import { expect, test } from '@playwright/test'

test('restores filters after returning from job details', async ({ page }) => {
  await page.goto('/')

  const searchInput = page.getByRole('searchbox', {
    name: 'Search by title or company',
  })
  const fullTimeCheckbox = page.getByRole('checkbox', {
    name: 'Full Time Only',
  })

  await searchInput.fill('Senior Software Engineer')
  await fullTimeCheckbox.check()

  await page.getByRole('button', { name: 'Search' }).click()

  await page
    .getByRole('link', {
      name: 'Senior Software Engineer',
    })
    .click()

  await expect(page).toHaveURL('/jobs/1')

  await page.goBack()

  await expect(page).toHaveURL(/search=Senior(?:\+|%20)Software(?:\+|%20)Engineer/)

  await expect(
    page.getByRole('searchbox', {
      name: 'Search by title or company',
    }),
  ).toHaveValue('Senior Software Engineer')

  await expect(
    page.getByRole('checkbox', {
      name: 'Full Time Only',
    }),
  ).toBeChecked()

  await expect(
    page.getByRole('link', {
      name: 'Senior Software Engineer',
    }),
  ).toBeVisible()
})

test('handles a missing job and returns to all jobs', async ({ page }) => {
  await page.goto('/jobs/999')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Job not found',
    }),
  ).toBeVisible()

  await expect(page.getByText("The job you're looking for does not exist.")).toBeVisible()

  await page.getByRole('link', { name: 'Back to all jobs' }).click()

  await expect(page).toHaveURL('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Open positions',
    }),
  ).toBeAttached()
})
