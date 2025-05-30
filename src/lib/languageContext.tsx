'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with browser language or default to English
  const [language, setLanguage] = useState<Language>('en');

  // Effect to initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    } else {
      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es') {
        setLanguage('es');
      }
    }
  }, []);

  // Effect to save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Also update the html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'es' : 'en'));
  };

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
