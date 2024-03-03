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
    const adTitle = page.getByRole('heading', { name: ad.title })
    await expect(adTitle).toBeVisible()
    const adText = page.getByText(ad.text)
    await expect(adText).toBeVisible()
    const adPrice = page.getByText('Price:')
    await expect(adPrice).toHaveText(`Price: ${ad.price}`)
    const adImg = page.getByRole('img', { name: 'User Image' })
    await expect(adImg).toHaveAttribute('src', ad.url)
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
    const adTitle = page.getByRole('heading', { name: ad.title })
    await expect(adTitle).toBeVisible()
    const adText = page.getByText(newAd.text)
    await expect(adText).toBeVisible()
    const adPrice = page.getByText('Price:')
    await expect(adPrice).toHaveText(`Price: ${newAd.price}`)
    const adImg = page.getByRole('img', { name: 'User Image' })
    await expect(adImg).toHaveAttribute('src', newAd.url)
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
    const deletedAd = page.getByText(ad.title)
    await expect(deletedAd).toBeHidden()
  })
})
