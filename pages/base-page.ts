import { Page } from '@playwright/test';
import { CookieHandler } from '../utils/cookie-handler';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async handleCookieConsent(action: 'accept' | 'reject'): Promise<void> {
        const cookieHandler = new CookieHandler(this.page);
        await cookieHandler.handleCookieConsent(action);
    }
} 