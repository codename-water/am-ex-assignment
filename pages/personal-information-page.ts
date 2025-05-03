import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { FinancialInformationPage } from './financial-information-page';

const mockData = {
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
    private readonly birthNameCheckbox = this.page.locator('label[for="fieldControl-input-birthNameCheck"]').nth(1);
    private readonly placeOfBirthInput = this.page.locator('input[id="fieldControl-input-placeOfBirth"]');
    private readonly departmentOfBirthSelect = this.page.locator('select[id="fieldControl-input-departmentOfBirth"]');
    private readonly countryOfBirthSelect = this.page.locator('select[id="fieldControl-input-countryOfBirth"]');
    private readonly nationalitySelect = this.page.locator('select[id="fieldControl-input-nationality"]');
    private readonly countrySelect = this.page.locator('select[id="fieldControl-input-country"]');
    private readonly residentialAddressInput = this.page.locator('input[id="fieldControl-input-residentialAddressLine2"]');
    private readonly postcodeInput = this.page.locator('input[id="fieldControl-input-postcode"]');
    private readonly cityInput = this.page.locator('input[id="fieldControl-input-cityTown"]');
    private readonly residentialStatusSelect = this.page.locator('select[id="fieldControl-input-personalResidentialStatus"]');
    private readonly saveAndContinueButton = this.page.locator('button[type="submit"].css-19hct2l');

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