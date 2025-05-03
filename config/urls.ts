export type Country = 'fr' | 'en';

export interface URLConfig {
    baseUrl: string;
    allCardsUrl: string;
}

const urls: Record<Country, URLConfig> = {
    fr: {
        baseUrl: 'https://www.americanexpress.com/fr-fr/?inav=NavLogo',
        allCardsUrl: 'https://www.americanexpress.com/fr/carte-de-paiement/types-cartes/cartes-proprietaires/?intlink=fr-fr-hp-product1-all-pry_cartes-01032021',
    },
    en: {
        baseUrl: 'https://www.americanexpress.com/en-gb/?inav=NavLogo',
        allCardsUrl: '',
    }
};

export class URLManager {
    private static currentCountry: Country = 'fr';

    static setCountry(country: Country): void {
        if (!(country in urls)) {
            throw new Error(`Unsupported country: ${country}`);
        }
        this.currentCountry = country;
    }

    static getCurrentCountry(): Country {
        return this.currentCountry;
    }

    static getUrls(): URLConfig {
        return urls[this.currentCountry];
    }

    static getBaseUrl(): string {
        return this.getUrls().baseUrl;
    }

    static getAllCardsUrl(): string {
        return this.getUrls().allCardsUrl;
    }
}