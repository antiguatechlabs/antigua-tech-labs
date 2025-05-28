// Import JSON files directly
import enHero from '../content/en/hero.json';
import esHero from '../content/es/hero.json';
import enFeatures from '../content/en/features.json';
import esFeatures from '../content/es/features.json';
import enTestimonials from '../content/en/testimonials.json';
import esTestimonials from '../content/es/testimonials.json';
import enContact from '../content/en/contact.json';
import esContact from '../content/es/contact.json';
import enFooter from '../content/en/footer.json';
import esFooter from '../content/es/footer.json';
import enNavbar from '../content/en/navbar.json';
import esNavbar from '../content/es/navbar.json';
import enWhyChoose from '../content/en/whyChoose.json';
import esWhyChoose from '../content/es/whyChoose.json';
import enWhyChooseTwo from '../content/en/whyChooseTwo.json';
import esWhyChooseTwo from '../content/es/whyChooseTwo.json';
import enBrand from '../content/en/brand.json';
import esBrand from '../content/es/brand.json';
import enBrandSlider from '../content/en/brandSlider.json';
import esBrandSlider from '../content/es/brandSlider.json';

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

// Define additional content types
export interface WhyChooseContent {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    yearEstablished: string;
    tagline: string;
}

export interface WhyChooseTwoContent {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
    phoneNumber: string;
    yearEstablished: string;
}

export interface BrandContent {
    counterValue: number;
    counterTitle: string;
    brands: { name: string; logo: string }[];
}

export interface BrandSliderContent {
    title: string;
    brands: { name: string; logo: string }[];
}

// Content mapping
const contentMap = {
    en: {
        hero: enHero as HeroContent,
        features: enFeatures as FeaturesContent,
        testimonials: enTestimonials as TestimonialsContent,
        contact: enContact as ContactContent,
        footer: enFooter as FooterContent,
        navbar: enNavbar as NavbarContent,
        whyChoose: enWhyChoose as WhyChooseContent,
        whyChooseTwo: enWhyChooseTwo as WhyChooseTwoContent,
        brand: enBrand as BrandContent,
        brandSlider: enBrandSlider as BrandSliderContent
    },
    es: {
        hero: esHero as HeroContent,
        features: esFeatures as FeaturesContent,
        testimonials: esTestimonials as TestimonialsContent,
        contact: esContact as ContactContent,
        footer: esFooter as FooterContent,
        navbar: esNavbar as NavbarContent,
        whyChoose: esWhyChoose as WhyChooseContent,
        whyChooseTwo: esWhyChooseTwo as WhyChooseTwoContent,
        brand: esBrand as BrandContent,
        brandSlider: esBrandSlider as BrandSliderContent
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

export function getWhyChooseContent(language: string = 'en'): WhyChooseContent {
    return getContent<WhyChooseContent>('whyChoose', language);
}

export function getWhyChooseTwoContent(language: string = 'en'): WhyChooseTwoContent {
    return getContent<WhyChooseTwoContent>('whyChooseTwo', language);
}

export function getBrandContent(language: string = 'en'): BrandContent {
    return getContent<BrandContent>('brand', language);
}

export function getBrandSliderContent(language: string = 'en'): BrandSliderContent {
    return getContent<BrandSliderContent>('brandSlider', language);
}
