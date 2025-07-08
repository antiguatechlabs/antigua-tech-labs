'use client';

export type Language = 'en' | 'es';

// Cookie configuration constants
export const LANGUAGE_COOKIE_NAME = 'aglanguage';
export const COOKIE_EXPIRATION_DAYS = 30;

/**
 * Set a cookie with the specified name, value, and expiration
 */
export function setCookie(
  name: string,
  value: string,
  days: number = COOKIE_EXPIRATION_DAYS,
): void {
  if (typeof document === 'undefined') return; // Server-side safety

  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null; // Server-side safety

  const nameEQ = name + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

/**
 * Set the language preference cookie
 */
export function setLanguageCookie(language: Language): void {
  setCookie(LANGUAGE_COOKIE_NAME, language, COOKIE_EXPIRATION_DAYS);
}

/**
 * Get the language preference from cookie
 */
export function getLanguageCookie(): Language | null {
  const cookieValue = getCookie(LANGUAGE_COOKIE_NAME);

  // Validate the cookie value
  if (cookieValue === 'en' || cookieValue === 'es') {
    return cookieValue;
  }

  return null;
}


/**
 * Remove the language cookie
 */
export function removeLanguageCookie(): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${LANGUAGE_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
