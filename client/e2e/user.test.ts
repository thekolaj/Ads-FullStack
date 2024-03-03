import { test, expect } from '@playwright/test'
import { loginNewUser } from 'utils/api'
import { fakeUser } from 'utils/fakeData'

const { email, password, name } = fakeUser()

test.describe.serial('signup and login sequence', () => {
  test('visitor can signup', async ({ page }) => {
    // Given (ARRANGE)
    await page.goto('/signup')
    const successMessage = page.getByTestId('successMessage')
    await expect(successMessage).toBeHidden()

    // When (ACT)
    const form = page.getByRole('form', { name: 'Signup' })
    await form.locator('input[type="email"]').fill(email)
    await form.locator('input[type="password"]').fill(password)
    await form.locator('input[type="text"]').fill(name)
    await form.locator('button[type="submit"]').click()

    // Then (ASSERT)
    await expect(successMessage).toBeVisible()
  })

  test('visitor can not access Create Ad before login', async ({ page }) => {
    await page.goto('/create')

    // user is redirected to login page
    await page.waitForURL('/login')
  })

  test('visitor can login', async ({ page }) => {
    // Given (ARRANGE)
    await page.goto('/login')
    const userAdsLink = page.getByRole('link', { name: 'My Ads' })
    await expect(userAdsLink).toBeHidden()

    // When (ACT)
    const form = page.getByRole('form', { name: 'Login' })
    await form.locator('input[type="email"]').fill(email)
    await form.locator('input[type="password"]').fill(password)
    await form.locator('button[type="submit"]').click()

    // Then (ASSERT)
    await expect(userAdsLink).toBeVisible()

    // Refresh the page to make sure that the user is still logged in.
    await page.reload()
    await expect(userAdsLink).toBeVisible()
  })
})

test('visitor can logout', async ({ page }) => {
  // Given (ARRANGE)
  await loginNewUser(page)

  await page.goto('/profile')
  const logoutLink = page.getByRole('link', { name: 'Logout' })

  // When (ACT)
  await logoutLink.click()

  // Then (ASSERT)
  await expect(logoutLink).toBeHidden()

  await expect(page).toHaveURL('/')

  // Refresh the page to make sure that the user is still logged out.
  await page.goto('/profile')
  await expect(logoutLink).toBeHidden()
  await expect(page).toHaveURL('/login')
})

test('User can edit profile', async ({ page }) => {
  // Given (ARRANGE)
  const user = fakeUser()
  await loginNewUser(page, user)
  await page.goto('/')
  const userAdsLink = page.getByRole('link', { name: 'My Ads' })
  await userAdsLink.click()

  const userName = page.getByText('Name: ')
  await expect(userName).toHaveText(`Name: ${user.name}`)
  const userEmail = page.getByText('Email: ')
  await expect(userEmail).toHaveText(`Email: ${user.email}`)
  const userPhone = page.getByText('Phone: ')
  await expect(userPhone).toHaveText(`Phone: `)

  await page.goto('/profile')
  const successMessage = page.getByTestId('successMessage')
  await expect(successMessage).toBeHidden()

  // When (ACT)
  const newUserData = fakeUser()
  const form = page.getByRole('form', { name: 'Account Update' })
  await form.locator('input[data-testid="emailInput"]').fill(newUserData.email)
  await form.locator('input[data-testid="nameInput"]').fill(newUserData.name)
  await form.locator('input[data-testid="phoneInput"]').fill(newUserData.phone)
  await form.locator('button[type="submit"]').click()

  // Then (ASSERT)
  await expect(successMessage).toBeVisible()
  await userAdsLink.click()

  await expect(userName).toHaveText(`Name: ${newUserData.name}`)
  await expect(userEmail).toHaveText(`Email: ${newUserData.email}`)
  await expect(userPhone).toHaveText(`Phone: ${newUserData.phone}`)
})
