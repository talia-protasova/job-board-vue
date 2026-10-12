import { expect, test } from '@playwright/test'

test('filters jobs and opens matching job details', async ({ page }) => {
  await page.goto('/')

  const searchInput = page.getByRole('searchbox', {
    name: 'Search by title or company',
  })
  const locationInput = page.getByRole('searchbox', {
    name: 'Filter by location',
  })
  const fullTimeCheckbox = page.getByRole('checkbox', {
    name: 'Full Time Only',
  })

  await searchInput.fill('Senior Software Engineer')
  await locationInput.fill('United Kingdom')
  await fullTimeCheckbox.check()

  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page).toHaveURL(/search=Senior(?:\+|%20)Software(?:\+|%20)Engineer/)
  await expect(page).toHaveURL(/location=United(?:\+|%20)Kingdom/)
  await expect(page).toHaveURL(/fullTime=true/)

  const jobLink = page.getByRole('link', {
    name: 'Senior Software Engineer',
  })

  await expect(jobLink).toBeVisible()
  await jobLink.click()

  await expect(page).toHaveURL('/jobs/1')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Senior Software Engineer',
    }),
  ).toBeVisible()

  await expect(page.getByText('United Kingdom')).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Requirements' })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'What You Will Do' })).toBeVisible()

  await expect(page.getByRole('link', { name: 'Apply Now' }).first()).toBeVisible()
})
