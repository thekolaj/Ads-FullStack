import { test, expect } from '@playwright/test'
import { loginNewUser, saveFakeAd } from 'utils/api'
import { fakeUser } from 'utils/fakeData'

test.describe.serial('Views using AdList', async () => {
  const ads: Awaited<ReturnType<typeof saveFakeAd>>[] = []
  const user1 = fakeUser()
  const user2 = fakeUser()

  test('Home view displays all ads', async ({ page }) => {
    // Given
    await loginNewUser(page, user1)
    ads.push(await saveFakeAd(page))
    ads.push(await saveFakeAd(page))
    await loginNewUser(page, user2)
    ads.push(await saveFakeAd(page))

    // When
    await page.goto('/')

    // Then
    await expect(page.getByText(ads[0].title)).toBeVisible()
    await expect(page.getByText(ads[1].title)).toBeVisible()
    await expect(page.getByText(ads[2].title)).toBeVisible()
  })

  test('User view displays only ads by user', async ({ page }) => {
    await loginNewUser(page, user1)
    await page.goto('/')
    const userAdsLink = page.getByRole('link', { name: 'My Ads' })
    await userAdsLink.click()

    await expect(page.getByText(ads[0].title)).toBeVisible()
    await expect(page.getByText(ads[1].title)).toBeVisible()
    await expect(page.getByText(ads[2].title)).toBeHidden()

    await loginNewUser(page, user2)
    await page.goto('/')
    await userAdsLink.click()

    await expect(page.getByText(ads[0].title)).toBeHidden()
    await expect(page.getByText(ads[1].title)).toBeHidden()
    await expect(page.getByText(ads[2].title)).toBeVisible()
  })
})
