import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Localization } from '../utils/localization';

export class FormCompletionPage extends BasePage {
    private readonly formCompletionMessage: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.formCompletionMessage = this.page.locator('heading-4');
        this.continueButton = this.page.locator(`button:has-text("${Localization.getString('continue')}")`);
    }

    async verifyFormCompletion(): Promise<void> {
        await expect(this.formCompletionMessage).toHaveText(Localization.getString('formCompletionTitle'));
        await expect(this.continueButton).toBeVisible();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}
