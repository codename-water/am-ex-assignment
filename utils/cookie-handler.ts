import { expect, Locator, Page } from '@playwright/test';

export type CookieAction = 'accept' | 'reject';

export class CookieHandler {
    private readonly page: Page;
    private readonly cookieBannerSelector: Locator;
    private readonly acceptAllButton: Locator;
    private readonly rejectAllButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookieBannerSelector = this.page.locator('#user-consent-management-granular-banner-overlay');
        this.acceptAllButton = this.page.locator('[data-testid="granular-banner-button-accept-all"]');
        this.rejectAllButton = this.page.locator('[data-testid="granular-banner-button-decline-all"]');
    }

    async handleCookieConsent(action: CookieAction): Promise<void> {
        await this.page.waitForLoadState();
        await this.cookieBannerSelector.waitFor({ state: 'attached', timeout: 5000 })
            .then(() => {
                console.log('Cookie banner is attached to the DOM');
            })
            .catch(() => {
            console.warn('Cookie banner not found, skipping consent handling');
            return;
        }
        );
        
        const isVisible: boolean = await this.cookieBannerSelector.isVisible();
        if (isVisible) {
            console.log(`Handling cookie consent with action: ${action}`);
            switch (action) {
                case 'accept':
                    await expect(this.acceptAllButton).toBeVisible();
                    await this.acceptAllButton.click();
                    break;
                case 'reject':
                    await expect(this.rejectAllButton).toBeVisible();
                    await this.rejectAllButton.click();
                    break;
            }

            await this.cookieBannerSelector.waitFor({ state: 'hidden', timeout: 5000 })
                .catch(error => {
                    console.warn('Cookie banner did not disappear within timeout:', error);
                });

            const stillVisible = await this.cookieBannerSelector.isVisible();
            if (stillVisible) {
                console.warn('Cookie banner is still visible after handling');
            }
        }
    }
} 