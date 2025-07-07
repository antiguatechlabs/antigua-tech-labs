'use client';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { setLanguageCookie, getLanguageCookie } from '@/lib/cookies';
import type { Language } from '@/lib/i18n/config';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage = 'en',
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const router = useRouter();
  const pathname = usePathname();

  // Function to set language and update URL
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);

    // Set language preference in cookie
    setLanguageCookie(newLanguage);

    // Update URL to reflect language change
    if (pathname) {
      const segments = pathname.split('/');
      segments[1] = newLanguage; // Replace language segment
      router.replace(segments.join('/'));
    }
  };

  // Function to toggle between languages
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  // Effect to initialize language from cookie and set document language
  useEffect(() => {
    // Set document language attribute
    document.documentElement.lang = language;

    // Initialize language from cookie if not already set
    if (!getLanguageCookie()) {
      setLanguageCookie(language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

