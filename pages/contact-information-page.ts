import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { PersonalInformationPage } from './personal-information-page';

const mockData = {
    firstName: 'Test',
    lastName: 'User',
    dateOfBirth: '01/01/1990',
    email: 'test.user@example.com',
    phoneCountry: { label: 'France +33' },
    phoneNumber: '0612345678',
};

export class ContactInformationPage extends BasePage {
    private readonly mrTitleRadio = this.page.locator('label[for="MR"]');
    private readonly firstNameInput = this.page.locator('input[id="fieldControl-input-firstName"]');
    private readonly lastNameInput = this.page.locator('input[id="fieldControl-input-lastName"]');
    private readonly dateOfBirthInput = this.page.locator('input[id="fieldControl-input-dateOfBirth"]');
    private readonly emailInput = this.page.locator('input[id="fieldControl-input-email"]');
    private readonly phoneCountrySelect = this.page.locator('select[id="countryCode"]');
    private readonly phoneNumberInput = this.page.locator('input[id="fieldControl-input-mobilePhoneNumber"]');
    private readonly saveAndContinueButton = this.page.locator('button[type="submit"].css-19hct2l');

    constructor(page: Page) {
        super(page);
    }

    async fillUserDetails(): Promise<void> {
        await this.handleCookieConsent('accept');
        await this.verifyPage();

        await this.mrTitleRadio.click();
        await this.firstNameInput.fill(mockData.firstName);
        await this.lastNameInput.fill(mockData.lastName);
        await this.dateOfBirthInput.fill(mockData.dateOfBirth);
        await this.emailInput.fill(mockData.email);
        await this.phoneCountrySelect.selectOption(mockData.phoneCountry);
        await this.phoneNumberInput.fill(mockData.phoneNumber);
    }

    async clickSaveAndContinue(): Promise<PersonalInformationPage> {
        await this.page.waitForTimeout(5000);
        await this.saveAndContinueButton.click();
        return new PersonalInformationPage(this.page);
    }

    async verifyPage(): Promise<void> {
        const url: string = this.page.url();
        expect(url).toContain('apply-GoldCardAmericanExpress');
    }
}