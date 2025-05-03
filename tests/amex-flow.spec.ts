import test from '@playwright/test';
import { AllCardsPage } from '../pages/all-cards-page';
import { CardPage } from '../pages/card-page';
import { ContactInformationPage } from '../pages/contact-information-page';
import { PersonalInformationPage } from '../pages/personal-information-page';
import { FinancialInformationPage } from '../pages/financial-information-page';
import { SecurityInformationPage } from '../pages/security-information-page';
import { FormCompletionPage } from '../pages/form-completion-page';

test.describe('American Express Credit Card Application Flow', () => {
    test('Complete Gold Card application flow', async ({ page }) => {
        const allCardsPage = new AllCardsPage(page);
        await allCardsPage.navigateToAllCardsPage();
        const cardPage: CardPage = await allCardsPage.clickGoldCardLearnMore();

        const contactInformationPage: ContactInformationPage = await cardPage.clickApplyForYourCard();

        await contactInformationPage.fillUserDetails();
        const personalInformationPage: PersonalInformationPage = await contactInformationPage.clickSaveAndContinue();

        await personalInformationPage.fillAdditionalDetails();
        const financialInformationPage: FinancialInformationPage = await personalInformationPage.clickSaveAndContinue();

        await financialInformationPage.fillFinancialDetails();
        const SecurityInformationPage: SecurityInformationPage = await financialInformationPage.clickSaveAndContinue();

        await SecurityInformationPage.completeSecurityInformation();
        const formCompletionPage: FormCompletionPage = await SecurityInformationPage.clickSaveAndContinue();

        await formCompletionPage.verifyFormCompletion();
    });
}); 