import { expect, test } from '@playwright/test'

test.describe('guest auth pages', () => {
  test('signin renders a network banner when auth bootstrap cannot reach the API', async ({
    page,
  }) => {
    await page.goto('/signin')

    await expect(
      page.getByRole('heading', { name: 'Welcome back!' }),
    ).toBeVisible()
    await expect(page.getByText('Network issue detected')).toBeVisible()
    await expect(
      page.getByText(
        /Unable to reach the authentication server\.|An unknown error occurred\./,
      ),
    ).toBeVisible()
  })

  test('reset-password still renders even when the auth API is unavailable', async ({
    page,
  }) => {
    await page.goto('/reset-password')

    await expect(
      page.getByRole('heading', { name: 'Reset your Password' }),
    ).toBeVisible()
    await expect(page.getByLabel('Email Address *')).toBeVisible()
  })
})
