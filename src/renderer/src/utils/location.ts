import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

/**
 * Gets a country's short alias by their ISO 3166-1 code.
 * @param code The country code
 * @returns The country alias
 */
export const getCountryAlias = (code: string | undefined) => {
	const defaultAlias = 'Unknown';
	if (!code) {
		return defaultAlias;
	}

	return countries.getName(code, 'en', { select: 'official' }) ?? defaultAlias;
};

/**
 * Gets a country's ISO 3166-1 Alpha-2 code by their name.
 * @param country The country name
 * @returns The country code
 */
export const getCountryCode = (country: string | undefined): string => {
	const defaultCode = '??';
	if (!country) {
		return defaultCode;
	}
	return countries.getAlpha2Code(country, 'en') ?? defaultCode;
};

/**
 * Gets all countries.
 * @returns An object container all countries.
 */
export const getAllCountries = () => {
	return countries.getAlpha2Codes();
};
