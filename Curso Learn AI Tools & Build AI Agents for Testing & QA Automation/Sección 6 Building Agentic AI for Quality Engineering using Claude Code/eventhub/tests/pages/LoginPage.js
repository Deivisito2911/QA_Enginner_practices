exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-btn');
    // We can also use getByTestId or role if available, but ID is stable here.
    // The spec mentions using data-testid, roles, labels as priority. Let's use labels/roles if possible, but ID is fine.
    this.errorMessage = page.locator('.error-message, [data-testid="error-msg"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
