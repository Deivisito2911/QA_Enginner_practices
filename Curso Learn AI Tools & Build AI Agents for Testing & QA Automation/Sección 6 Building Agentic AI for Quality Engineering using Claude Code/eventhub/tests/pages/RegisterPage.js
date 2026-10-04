exports.RegisterPage = class RegisterPage {
  constructor(page) {
    this.page = page;
    // According to DOM:
    this.emailInput = page.locator('[data-testid="register-email"]');
    this.passwordInput = page.locator('[data-testid="register-password"]');
    this.confirmPasswordInput = page.getByPlaceholder('Repeat your password');
    this.registerButton = page.locator('[data-testid="register-btn"]');
    this.successMessage = page.locator('.success-message, [data-testid="success-msg"]');
    this.duplicateEmailMessage = page.locator('.error-message, [data-testid="error-msg"]');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(user) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }
}
