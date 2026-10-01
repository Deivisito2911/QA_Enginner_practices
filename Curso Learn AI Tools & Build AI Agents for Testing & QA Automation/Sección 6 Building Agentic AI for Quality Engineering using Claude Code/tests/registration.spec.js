const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('./pages/RegisterPage');

test.describe('Registration Tests (TC-001)', () => {
  test('TC-001a: Registro exitoso con datos unicos', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    
    // Dato unico por ejecucion
    const uniqueEmail = "testuser_${Date.now()}@example.com";
    
    await registerPage.register({
      firstName: 'QA',
      lastName: 'Auto',
      email: uniqueEmail,
      password: 'TestPassword123!'
    });
    
    await expect(registerPage.successMessage).toBeVisible();
  });

  test('TC-001b: Falla de registro con correo duplicado', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    
    await registerPage.register({
      firstName: 'QA',
      lastName: 'Auto',
      email: 'testqa_claude_2026@example.com',
      password: 'TestPassword123!'
    });
    
    await expect(registerPage.duplicateEmailMessage).toBeVisible();
  });
});
