import { test, expect } from '@playwright/test'

test('Reset page exists', async ({ page }) => {
  await page.goto('/reset')
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible()
})
