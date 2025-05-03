import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { PersonalInformationPage } from './personal-information-page';
import { faker } from '@faker-js/faker';

const mockData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneCountry: { label: string };
    phoneNumber: string;
} = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toLocaleDateString('en-GB'),
    email: faker.internet.email(),
    phoneCountry: { label: 'France +33' },
    phoneNumber: '0612345678',
};

export class ContactInformationPage extends BasePage {
    private readonly mrTitleRadio: Locator = this.page.locator('label[for="MR"]');
    private readonly firstNameInput: Locator = this.page.locator('input[id="fieldControl-input-firstName"]');
    private readonly lastNameInput: Locator = this.page.locator('input[id="fieldControl-input-lastName"]');
    private readonly dateOfBirthInput: Locator = this.page.locator('input[id="fieldControl-input-dateOfBirth"]');
    private readonly emailInput: Locator = this.page.locator('input[id="fieldControl-input-email"]');
    private readonly phoneCountrySelect: Locator = this.page.locator('select[id="countryCode"]');
    private readonly phoneNumberInput: Locator = this.page.locator('input[id="fieldControl-input-mobilePhoneNumber"]');
    private readonly saveAndContinueButton: Locator = this.page.locator('button[type="submit"].css-19hct2l');

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