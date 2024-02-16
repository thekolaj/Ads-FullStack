import { test, expect } from '@playwright/test'

test('Page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible()
})
