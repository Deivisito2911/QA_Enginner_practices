import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly termsCheckbox: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.termsCheckbox = page.locator('#terms');
        this.signInButton = page.locator('#signInBtn');
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(user: string, pass: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.termsCheckbox.check();
        await this.signInButton.click();
    }
}
