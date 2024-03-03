import { test, expect } from '@playwright/test'

test('Reset button exists', async ({ page }) => {
  await page.goto('/debug')
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible()
})
