exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.locator('.error-message, [data-testid="error-msg"]');
  }

  async goto() {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
