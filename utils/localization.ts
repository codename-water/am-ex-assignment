export type Language = 'fr' | 'en';

export interface LocalizedStrings {
    homePageTitle: string;
    learnMore: string;
    applyForYourCard: string;
    saveAndContinue: string;
    continue: string;
    formCompletionTitle: string;
}

const localizedStrings: Record<Language, LocalizedStrings> = {
    fr: {
        homePageTitle: 'American Express FR : Cartes de Paiement & Services Privilégiés',
        learnMore: 'En savoir plus',
        applyForYourCard: 'Demandez votre Carte',
        saveAndContinue: 'Sauvegarder et Continuer',
        continue: 'Continuer',
        formCompletionTitle: `Merci d'avoir complété le formulaire.`,
    },
    en: {
        homePageTitle: 'American Express EN : Payment Cards & Privileged Services',
        learnMore: 'Learn More',
        applyForYourCard: 'Apply for Your Card',
        saveAndContinue: 'Save and Continue',
        continue: 'Continue',
        formCompletionTitle: `Thank you for completing the form.`,
    }
};

export class Localization {
    private static currentLanguage: Language = 'fr';

    static setLanguage(language: Language): void {
        this.currentLanguage = language;
    }

    static getString(key: keyof LocalizedStrings): string {
        return localizedStrings[this.currentLanguage][key];
    }

    static getCurrentLanguage(): Language {
        return this.currentLanguage;
    }
}