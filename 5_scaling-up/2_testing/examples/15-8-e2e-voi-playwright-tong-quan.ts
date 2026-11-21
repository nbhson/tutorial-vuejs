// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('đăng nhập thành công', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await page.getByLabel('Email').fill('son@example.com')
  await page.getByLabel('Mật khẩu').fill('secret123')
  await page.getByRole('button', { name: 'Đăng nhập' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Xin chào')).toBeVisible()
})
