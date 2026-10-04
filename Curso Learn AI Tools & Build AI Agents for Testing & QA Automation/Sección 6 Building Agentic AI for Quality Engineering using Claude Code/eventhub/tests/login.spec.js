const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

test.describe('Login Tests (TC-002 / TC-301)', () => {
  test('TC-002: Login exitoso con credenciales validas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Credenciales autorizadas del curso
    await loginPage.login('testqa_claude_2026@example.com', 'TestPassword123!');
    
    // Assertion robusto: después de login exitoso redirige a la raíz
    await expect(page).toHaveURL(/.*\/$/);
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  test('TC-301: Login fallido con credenciales invalidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.login('invalid_user@example.com', 'WrongPass!');
    
    // Assertion visual, locator semantico
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });
});
