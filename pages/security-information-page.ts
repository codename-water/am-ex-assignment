import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { FormCompletionPage } from './form-completion-page';

const mockData = {
    mothersMaidenName: 'Smith',
    pin: '1234',
    confirmPin: '1234',
    hasOtherCard: false,
    emailPreference: true,
    phonePreference: false
};

export class SecurityInformationPage extends BasePage {
    private readonly mothersMaidenNameInput = this.page.locator('input[id="fieldControl-input-mothersMaidenName"]');
    private readonly pinInput = this.page.locator('input[id="fieldControl-input-pin"]');
    private readonly confirmPinInput = this.page.locator('input[id="fieldControl-input-confirmPin"]');
    private readonly otherAmexCardCheckbox = this.page.locator('label[for="fieldControl-input-otherAmexCard"]');
    private readonly marketingEmailPreferenceCheckbox = this.page.locator(`label[for="marketingEmailPreferences-${mockData.emailPreference ? 'true' : 'false'}"]`);
    private readonly marketingSMSPhonePostalRadio = this.page.locator(`label[for="marketingSMSPhonePostalPreferences-${mockData.phonePreference ? 'OPT_IN' : 'OPT_OUT'}"]`);
    private readonly submitButton = this.page.locator('button[type="submit"]');

    constructor(page: Page) {
        super(page);
    }

    async completeSecurityInformation(): Promise<void> {
        await this.mothersMaidenNameInput.fill(mockData.mothersMaidenName);
        await this.pinInput.fill(mockData.pin);
        await this.confirmPinInput.fill(mockData.confirmPin);

        if (mockData.hasOtherCard) {
            await this.otherAmexCardCheckbox.click();
        }

        await this.marketingEmailPreferenceCheckbox.click();
        // This is a workaround for the checkbox not being checked on the first click
        let isChecked = await this.marketingEmailPreferenceCheckbox.isChecked();
        if (!isChecked) {
            await this.marketingEmailPreferenceCheckbox.click();
            isChecked = await this.marketingEmailPreferenceCheckbox.isChecked();
            if (!isChecked) {
                throw new Error('Failed to click and check the marketing email preference checkbox.');
            }
        }

        await this.marketingSMSPhonePostalRadio.click();
    }

    async clickSaveAndContinue(): Promise<FormCompletionPage> {
        await this.page.waitForTimeout(2000);
        await this.submitButton.click();
        return new FormCompletionPage(this.page);
    }
}
