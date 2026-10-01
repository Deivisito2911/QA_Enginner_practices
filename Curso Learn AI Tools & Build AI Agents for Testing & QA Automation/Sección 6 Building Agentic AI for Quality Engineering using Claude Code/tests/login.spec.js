const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

test.describe('Login Tests (TC-002 / TC-301)', () => {
  test('TC-002: Login exitoso con credenciales validas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Credenciales autorizadas del curso
    await loginPage.login('testqa_claude_2026@example.com', 'TestPassword123!');
    
    // Assertion robusto basado en navegacion/estado sin esperas fijas
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('TC-301: Login fallido con credenciales invalidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    await loginPage.login('invalid_user@example.com', 'WrongPass!');
    
    // Assertion visual, locator semantico
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
