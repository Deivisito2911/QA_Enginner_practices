import { Page, Locator } from '@playwright/test';

export class ShopPage {
    readonly page: Page;
    readonly iphoneTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        // Looking for the exact text 'iphone X' as requested
        this.iphoneTitle = page.locator('text=iphone X');
    }

    async waitForPageLoad() {
        await this.page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
    }

    async isIphoneXPresent(): Promise<boolean> {
        return await this.iphoneTitle.isVisible();
    }
}
