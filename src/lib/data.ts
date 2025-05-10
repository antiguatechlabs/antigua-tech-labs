// Import JSON files directly
import enHero from '../translations/en/hero.json';
import esHero from '../translations/es/hero.json';
import enFeatures from '../translations/en/features.json';
import esFeatures from '../translations/es/features.json';
import enTestimonials from '../translations/en/testimonials.json';
import esTestimonials from '../translations/es/testimonials.json';
import enContact from '../translations/en/contact.json';
import esContact from '../translations/es/contact.json';
import enFooter from '../translations/en/footer.json';
import esFooter from '../translations/es/footer.json';
import enNavbar from '../translations/en/navbar.json';
import esNavbar from '../translations/es/navbar.json';

// Define content types
export interface HeroContent {
    title: string;
    subtitle: string;
    cta: string;
}

export interface FeatureItem {
    title: string;
    description: string;
    icon: string;
}

export interface FeaturesContent {
    title: string;
    items: FeatureItem[];
}

export interface TestimonialItem {
    quote: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
}

export interface TestimonialsContent {
    title: string;
    items: TestimonialItem[];
}

export interface ContactContent {
    title: string;
    subtitle: string;
    buttonText: string;
    formLabels: {
        name: string;
        email: string;
        message: string;
    };
    placeholders: {
        name: string;
        email: string;
        message: string;
    };
}

export interface FooterContent {
    companyName: string;
    companyDescription: string;
    sections: {
        product: {
            title: string;
            links: string[];
        };
        company: {
            title: string;
            links: string[];
        };
        legal: {
            title: string;
            links: string[];
        };
    };
    copyright: string;
}

export interface NavbarContent {
    companyName: string;
    menuTitle: string;
    navItems: {
        features: string;
        testimonials: string;
        pricing: string;
        contact: string;
    };
    languageToggle: {
        en: string;
        es: string;
    };
}

// Content mapping
const contentMap = {
    en: {
        hero: enHero as HeroContent,
        features: enFeatures as FeaturesContent,
        testimonials: enTestimonials as TestimonialsContent,
        contact: enContact as ContactContent,
        footer: enFooter as FooterContent,
        navbar: enNavbar as NavbarContent
    },
    es: {
        hero: esHero as HeroContent,
        features: esFeatures as FeaturesContent,
        testimonials: esTestimonials as TestimonialsContent,
        contact: esContact as ContactContent,
        footer: esFooter as FooterContent,
        navbar: esNavbar as NavbarContent
    }
};

// Function to get content based on language
export function getContent<T>(section: string, language: string = 'en'): T {
    try {
        return (contentMap[language as 'en' | 'es'][section as keyof typeof contentMap['en']] ||
            contentMap['en'][section as keyof typeof contentMap['en']]) as T;
    } catch {
        // Fallback to English if translation is not available
        console.warn(`Translation not found for ${section} in ${language}, falling back to English`);
        return contentMap['en'][section as keyof typeof contentMap['en']] as T;
    }
}

// Content loading functions
export function getHeroContent(language: string = 'en'): HeroContent {
    return getContent<HeroContent>('hero', language);
}

export function getFeaturesContent(language: string = 'en'): FeaturesContent {
    return getContent<FeaturesContent>('features', language);
}

export function getTestimonialsContent(language: string = 'en'): TestimonialsContent {
    return getContent<TestimonialsContent>('testimonials', language);
}

export function getContactContent(language: string = 'en'): ContactContent {
    return getContent<ContactContent>('contact', language);
}

export function getFooterContent(language: string = 'en'): FooterContent {
    return getContent<FooterContent>('footer', language);
}

export function getNavbarContent(language: string = 'en'): NavbarContent {
    return getContent<NavbarContent>('navbar', language);
}
