import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Localization } from '../utils/localization';
import { ContactInformationPage } from './contact-information-page';

export class CardPage extends BasePage {
    private readonly applyForYourCard = this.page.getByRole('link', { name: Localization.getString('applyForYourCard') }).first();

    constructor(page: Page) {
        super(page);
    }

    async clickApplyForYourCard(): Promise<ContactInformationPage> {
        await this.handleCookieConsent('accept');
        await expect(this.applyForYourCard).toBeVisible();
        await this.applyForYourCard.click();
        return new ContactInformationPage(this.page)
    }
} 