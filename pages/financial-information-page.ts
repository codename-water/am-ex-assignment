import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { SecurityInformationPage } from './security-information-page';

const mockData: {
    iban: string;
    bic: string;
    bankingSeniority: string;
    annualIncome: string;
    additionalIncome: string;
    totalAssets: string;
    occupation: string;
    occupationType: string;
} = {
    iban: 'FR7630006000011234567890189',
    bic: 'BNPAFRPP',
    bankingSeniority: '0500',
    annualIncome: '50000',
    additionalIncome: 'NO',
    totalAssets: '100',
    occupation: 'UNEMPLOYED',
    occupationType: 'JOB_SEARCH',
};

export class FinancialInformationPage extends BasePage {
    private readonly ibanInput: Locator = this.page.locator('input[id="fieldControl-input-bankAccountNumber"]');
    private readonly bicInput: Locator = this.page.locator('input[id="fieldControl-input-bankIdentifierCode"]');
    private readonly bankingSenioritySelect: Locator = this.page.locator('select[id="fieldControl-input-tenureOfAccount"]');
    private readonly annualIncomeInput: Locator = this.page.locator('input[id="fieldControl-input-annualPersonalIncome"]');
    private readonly additionalIncomeYesRadio: Locator = this.page.locator('label[for="hasAdditionalIncome1-YES"]');
    private readonly additionalIncomeNoRadio: Locator = this.page.locator('label[for="hasAdditionalIncome1-NO"]');
    private readonly totalAssetsSelect: Locator = this.page.locator('select[id="fieldControl-input-totalAssets"]');
    private readonly occupationSelect: Locator = this.page.locator('select[id="fieldControl-input-occupation"]');
    private readonly occupationTypeSelect: Locator = this.page.locator('select[id="fieldControl-input-occupationDescription"]');
    private readonly saveAndContinueButton: Locator = this.page.locator('button[type="submit"]');

    constructor(page: Page) {
        super(page);
    }

    async fillFinancialDetails(): Promise<void> {
        await this.ibanInput.fill(mockData.iban);
        await this.bicInput.fill(mockData.bic);
        await this.bankingSenioritySelect.selectOption({ value: mockData.bankingSeniority });
        await this.annualIncomeInput.fill(mockData.annualIncome);
        if (mockData.additionalIncome === 'YES') {
            await this.additionalIncomeYesRadio.check();
        } else {
            await this.additionalIncomeNoRadio.check();
        }
        await this.totalAssetsSelect.selectOption({ value: mockData.totalAssets });
        await this.occupationSelect.selectOption({ value: mockData.occupation });
        await this.occupationTypeSelect.selectOption({ value: mockData.occupationType });
    }

    async clickSaveAndContinue(): Promise<SecurityInformationPage> {
        await this.page.waitForTimeout(2000);
        await this.saveAndContinueButton.click();
        return new SecurityInformationPage(this.page);
    }
}
