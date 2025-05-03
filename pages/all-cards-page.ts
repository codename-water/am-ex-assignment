import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { URLManager } from '../config/urls';
import { CardPage } from './card-page';

export class AllCardsPage extends BasePage {
    private readonly cardContainers: Locator = this.page.locator('.col-md-4.col-md-offset-0.margin-0-tb');
    private readonly heading: string = 'h2.heading-2';
    private readonly learnMoreButton: string = 'a.btn.btncomp.links-item[href*="gold-card-americanexpress"]';

    constructor(page: Page) {
        super(page);
    }
    
    async navigateToAllCardsPage(): Promise<void> {
        await this.page.goto(URLManager.getAllCardsUrl());
    }

    async clickGoldCardLearnMore(): Promise<CardPage> {
        await this.handleCookieConsent('accept');
        await expect(this.cardContainers.first()).toBeVisible({ timeout: 10000 });

        const goldCardContainer = this.cardContainers.filter({
            has: this.page.locator(this.heading, { hasText: 'Carte Gold American Express' })
        });

        await goldCardContainer.locator(this.learnMoreButton).click();

        return new CardPage(this.page);
    }
}