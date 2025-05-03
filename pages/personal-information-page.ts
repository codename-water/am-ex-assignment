import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { FinancialInformationPage } from './financial-information-page';

const mockData: {
    placeOfBirth: string;
    departmentOfBirth: string;
    countryOfBirth: string;
    nationality: string;
    country: string;
    residentialAddress: string;
    postcode: string;
    city: string;
    residentialStatus: string;
} = {
    placeOfBirth: 'Paris',
    departmentOfBirth: '001',
    countryOfBirth: '250',
    nationality: '250',
    country: '250',
    residentialAddress: '123 Test Street',
    postcode: '75001',
    city: 'Paris',
    residentialStatus: 'RENT',
};

export class PersonalInformationPage extends BasePage {
    private readonly birthNameCheckbox: Locator = this.page.locator('label[for="fieldControl-input-birthNameCheck"]').nth(1);
    private readonly placeOfBirthInput: Locator = this.page.locator('input[id="fieldControl-input-placeOfBirth"]');
    private readonly departmentOfBirthSelect: Locator = this.page.locator('select[id="fieldControl-input-departmentOfBirth"]');
    private readonly countryOfBirthSelect: Locator = this.page.locator('select[id="fieldControl-input-countryOfBirth"]');
    private readonly nationalitySelect: Locator = this.page.locator('select[id="fieldControl-input-nationality"]');
    private readonly countrySelect: Locator = this.page.locator('select[id="fieldControl-input-country"]');
    private readonly residentialAddressInput: Locator = this.page.locator('input[id="fieldControl-input-residentialAddressLine2"]');
    private readonly postcodeInput: Locator = this.page.locator('input[id="fieldControl-input-postcode"]');
    private readonly cityInput: Locator = this.page.locator('input[id="fieldControl-input-cityTown"]');
    private readonly residentialStatusSelect: Locator = this.page.locator('select[id="fieldControl-input-personalResidentialStatus"]');
    private readonly saveAndContinueButton: Locator = this.page.locator('button[type="submit"].css-19hct2l');

    constructor(page: Page) {
        super(page);
    }

    async fillAdditionalDetails(): Promise<void> {
        await this.birthNameCheckbox.check();
        await this.placeOfBirthInput.fill(mockData.placeOfBirth);
        await this.departmentOfBirthSelect.selectOption({ value: mockData.departmentOfBirth });
        await this.countryOfBirthSelect.selectOption({ value: mockData.countryOfBirth });
        await this.nationalitySelect.selectOption({ value: mockData.nationality });
        await this.countrySelect.selectOption({ value: mockData.country });
        await this.residentialAddressInput.fill(mockData.residentialAddress);
        await this.postcodeInput.fill(mockData.postcode);
        await this.cityInput.fill(mockData.city);
        await this.residentialStatusSelect.selectOption({ value: mockData.residentialStatus });
    }

    async clickSaveAndContinue(): Promise<FinancialInformationPage> {
        await this.page.waitForTimeout(2000);
        await this.saveAndContinueButton.click();
        return new FinancialInformationPage(this.page);
    }
}