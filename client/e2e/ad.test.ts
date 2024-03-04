import { test, expect } from '@playwright/test'
import { loginNewUser } from 'utils/api'
import { fakeAd, fakeUser } from 'utils/fakeData'

test.describe.serial('Ad CRUD', () => {
  const ad = fakeAd()
  const user = fakeUser()
  test('user can create an Ad', async ({ page }) => {
    // Given
    await loginNewUser(page, user)
    await page.goto('/create')

    // When
    await page.locator('input[data-testid="titleInput"]').fill(ad.title)
    await page.getByTestId('textInput').fill(ad.text)
    await page.locator('input[data-testid="priceInput"]').fill(ad.price)
    await page.getByRole('button', { name: '+' }).click()
    await page.locator('input[data-testid="image-0"]').fill(ad.url)
    await page.getByRole('button', { name: 'Create Ad' }).click()

    // Then
    await expect(page).toHaveURL(/\/ad\/\d+/)
    await expect(page.getByRole('heading', { name: ad.title })).toBeVisible()
    await expect(page.getByText(ad.text)).toBeVisible()
    await expect(page.getByText('Price:')).toHaveText(`Price: ${ad.price}`)
    await expect(page.getByRole('img', { name: 'User Image' })).toHaveAttribute('src', ad.url)
  })

  test('user can update an Ad', async ({ page }) => {
    // Given
    const newAd = fakeAd()
    await loginNewUser(page, user)
    await page.goto('/')
    await page.getByText(ad.title).click()
    await page.getByRole('link', { name: /edit/i }).click()

    // When
    await page.getByTestId('textInput').fill(newAd.text)
    await page.locator('input[data-testid="priceInput"]').fill(newAd.price)
    await page.locator('input[data-testid="image-0"]').fill(newAd.url)
    await page.getByRole('button', { name: 'Update Ad' }).click()

    // Then
    await expect(page).toHaveURL(/\/ad\/\d+/)
    await expect(page.getByRole('heading', { name: ad.title })).toBeVisible()
    await expect(page.getByText(newAd.text)).toBeVisible()
    await expect(page.getByText('Price:')).toHaveText(`Price: ${newAd.price}`)
    await expect(page.getByRole('img', { name: 'User Image' })).toHaveAttribute('src', newAd.url)
  })

  test('user can delete an Ad', async ({ page }) => {
    // Given
    await loginNewUser(page, user)
    await page.goto('/')
    await page.getByText(ad.title).click()

    // When
    await page.getByRole('button', { name: /delete/i }).click()
    await page.getByRole('button', { name: /yes/i }).click()

    // Then
    await expect(page).toHaveURL('/')
    await expect(page.getByText(ad.title)).toBeHidden()
  })
})
