exports.RegisterPage = class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i }).first();
    this.confirmPasswordInput = page.getByRole('textbox', { name: /confirm password/i });
    this.registerButton = page.getByRole('button', { name: /register/i });
    this.successMessage = page.locator('.success-message, [data-testid="success-msg"]');
    this.duplicateEmailMessage = page.locator('.error-message, [data-testid="error-msg"]');
  }

  async goto() {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/register');
  }

  async register(user) {
    if(this.firstNameInput) await this.firstNameInput.fill(user.firstName);
    if(this.lastNameInput) await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    if(this.confirmPasswordInput) await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }
}
