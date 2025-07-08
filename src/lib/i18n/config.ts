export const supportedLanguages = ['en', 'es'] as const;
export const defaultLanguage = 'en';

// Cookie configuration
export const LANGUAGE_COOKIE_NAME = 'aglanguage';
export const COOKIE_EXPIRATION_DAYS = 30;

// Type definitions
export type Language = typeof supportedLanguages[number];
