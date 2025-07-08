// Import JSON files directly
import enAboutApproach from '../content/en/about-approach.json';
import enAboutCta from '../content/en/about-cta.json';
import enAboutHero from '../content/en/about-hero.json';
import enAboutStory from '../content/en/about-story.json';
import enContact from '../content/en/contact.json';
import enFaq from '../content/en/faq.json';
import enFeatures from '../content/en/features.json';
import enFooter from '../content/en/footer.json';
import enHero from '../content/en/hero.json';
import enNavbar from '../content/en/navbar.json';
import enOurTeam from '../content/en/ourTeam.json';
import enPrivacyPolicy from '../content/en/privacy-policy.json';
import enModeling3d from '../content/en/services/3d-modeling.json';
import enApiDevelopment from '../content/en/services/api-development.json';
import enCodeMaintenance from '../content/en/services/code-maintenance.json';
import enMobileApplications from '../content/en/services/mobile-applications.json';
import enUxDesign from '../content/en/services/ux-design.json';
import enWebApplications from '../content/en/services/web-applications.json';
import enServicesOverview from '../content/en/services-overview.json';
import enSlider from '../content/en/slider.json';
import enTermsOfService from '../content/en/terms-of-service.json';
import enTestimonials from '../content/en/testimonials.json';
import enWhyChoose from '../content/en/whyChoose.json';
import enWhyChooseTwo from '../content/en/whyChooseTwo.json';
import esAboutApproach from '../content/es/about-approach.json';
import esAboutCta from '../content/es/about-cta.json';
import esAboutHero from '../content/es/about-hero.json';
import esAboutStory from '../content/es/about-story.json';
import esContact from '../content/es/contact.json';
import esFaq from '../content/es/faq.json';
import esFeatures from '../content/es/features.json';
import esFooter from '../content/es/footer.json';
import esHero from '../content/es/hero.json';
import esNavbar from '../content/es/navbar.json';
import esOurTeam from '../content/es/ourTeam.json';
import esPrivacyPolicy from '../content/es/privacy-policy.json';
import esModeling3d from '../content/es/services/3d-modeling.json';
import esApiDevelopment from '../content/es/services/api-development.json';
import esCodeMaintenance from '../content/es/services/code-maintenance.json';
import esMobileApplications from '../content/es/services/mobile-applications.json';
import esUxDesign from '../content/es/services/ux-design.json';
import esWebApplications from '../content/es/services/web-applications.json';
import esServicesOverview from '../content/es/services-overview.json';
import esSlider from '../content/es/slider.json';
import esTermsOfService from '../content/es/terms-of-service.json';
import esTestimonials from '../content/es/testimonials.json';
import esWhyChoose from '../content/es/whyChoose.json';
import esWhyChooseTwo from '../content/es/whyChooseTwo.json';

// Define content types
export interface HeroContent {
  title: string;
  subtitle: string;
  cta: string;
  secondaryCta: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesContent {
  title: string;
  subtitle?: string;
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
  email: string;
  address: string;
  phone: string;
  logo: string;
  sections: {
    product: {
      title: string;
      links: string[];
    };
    company: {
      title: string;
      links: Array<{
        title: string;
        href: string;
      }>;
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
  languageToggle: {
    en: string;
    es: string;
  };
  menuItems: Array<{
    name: string;
    href: string;
    submenu?: Array<{
      name: string;
      href: string;
    }>;
    mobileSubmenu?: Array<{
      name: string;
      href: string;
    }>;
  }>;
  contactInfo: {
    email: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      linkedin: string;
    };
  };
  mobileMenu: {
    contactTitle: string;
    followTitle: string;
    contactFormButton: string;
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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  subtitle: string;
  contactText: string;
  contactLink: string;
  contactSuffix: string;
  faqs: FAQItem[];
}

export interface SliderContent {
  title: string;
  subtitle: string;
}

export interface TeamMember {
  image: string;
  title: string;
  subtitle: string;
  handle: string;
  borderColor: string;
  gradient: string;
  url: string;
}

export interface OurTeamContent {
  title: string;
  subtitle: string;
  teamMembers: TeamMember[];
}

// About page content types
export interface AboutHeroContent {
  headline: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface AboutApproachStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutApproachContent {
  title: string;
  subtitle: string;
  steps: AboutApproachStep[];
  methodology: {
    title: string;
    points: string[];
  };
}

export interface AboutCTAContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    text: string;
    link: string;
    variant: string;
  };
  secondaryCta: {
    text: string;
    link: string;
    variant: string;
  };
  contactPreview: {
    heading: string;
    email: string;
    phone: string;
    location: string;
  };
}

export interface AboutStoryTimelineItem {
  year: string;
  title: string;
  description: string;
  milestone: string;
  icon: string;
}

export interface AboutStoryValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutStoryContent {
  title: string;
  subtitle: string;
  summary: {
    title: string;
    description: string;
  };
  timeline: AboutStoryTimelineItem[];
  values: {
    title: string;
    subtitle: string;
    items: AboutStoryValue[];
  };
  mission: {
    title: string;
    description: string;
    vision: {
      title: string;
      description: string;
    };
  };
}

// Legal content types
export interface LegalSection {
  title: string;
  content: string[];
}

export interface LegalContent {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  story: AboutStoryContent;
  approach: AboutApproachContent;
  cta: AboutCTAContent;
}

// Service content types
export interface ServiceHeroContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  textPosition?: 'left' | 'right';
  ctaText?: string;
}

export interface ServiceFeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceFeaturesContent {
  title: string;
  items: ServiceFeatureItem[];
}

export interface ServiceProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface ServiceProcessContent {
  title: string;
  steps: ServiceProcessStep[];
}

export interface ServiceTechnologiesContent {
  title: string;
  items: string[];
}

export interface ServicePortfolioProject {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

export interface ServicePortfolioContent {
  title: string;
  projects: ServicePortfolioProject[];
}

export interface ServiceCTAContent {
  title: string;
  description: string;
  buttonText: string;
}

export interface ServicePageContent {
  hero: ServiceHeroContent;
  features: ServiceFeaturesContent;
  process: ServiceProcessContent;
  technologies: ServiceTechnologiesContent;
  portfolio: ServicePortfolioContent;
  cta: ServiceCTAContent;
}

// Services overview content types
export interface ServicesNavigationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServicesNavigationContent {
  title: string;
  items: ServicesNavigationItem[];
}

export interface ServicesOverviewContent {
  hero: ServiceHeroContent;
  navigation: ServicesNavigationContent;
}

// Unified services page content
export interface UnifiedServicesPageContent {
  overview: ServicesOverviewContent;
  webApplications: ServicePageContent;
  mobileApplications: ServicePageContent;
  apiDevelopment: ServicePageContent;
  codeMaintenance: ServicePageContent;
  uxDesign: ServicePageContent;
  modeling3d: ServicePageContent;
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
    faq: enFaq as FAQContent,
    slider: enSlider as SliderContent,
    ourTeam: enOurTeam as OurTeamContent,
    aboutHero: enAboutHero as AboutHeroContent,
    aboutStory: enAboutStory as AboutStoryContent,
    aboutApproach: enAboutApproach as AboutApproachContent,
    aboutCta: enAboutCta as AboutCTAContent,
    apiDevelopment: enApiDevelopment as ServicePageContent,
    codeMaintenance: enCodeMaintenance as ServicePageContent,
    mobileApplications: enMobileApplications as ServicePageContent,
    modeling3d: enModeling3d as ServicePageContent,
    uxDesign: enUxDesign as ServicePageContent,
    webApplications: enWebApplications as ServicePageContent,
    servicesOverview: enServicesOverview as ServicesOverviewContent,
    termsOfService: enTermsOfService as LegalContent,
    privacyPolicy: enPrivacyPolicy as LegalContent,
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
    faq: esFaq as FAQContent,
    slider: esSlider as SliderContent,
    ourTeam: esOurTeam as OurTeamContent,
    aboutHero: esAboutHero as AboutHeroContent,
    aboutStory: esAboutStory as AboutStoryContent,
    aboutApproach: esAboutApproach as AboutApproachContent,
    aboutCta: esAboutCta as AboutCTAContent,
    apiDevelopment: esApiDevelopment as ServicePageContent,
    codeMaintenance: esCodeMaintenance as ServicePageContent,
    mobileApplications: esMobileApplications as ServicePageContent,
    modeling3d: esModeling3d as ServicePageContent,
    uxDesign: esUxDesign as ServicePageContent,
    webApplications: esWebApplications as ServicePageContent,
    servicesOverview: esServicesOverview as ServicesOverviewContent,
    termsOfService: esTermsOfService as LegalContent,
    privacyPolicy: esPrivacyPolicy as LegalContent,
  },
};

// Function to get content based on language
export function getContent<T>(section: string, language: string = 'en'): T {
  try {
    return (contentMap[language as 'en' | 'es'][section as keyof (typeof contentMap)['en']] ||
      contentMap['en'][section as keyof (typeof contentMap)['en']]) as T;
  } catch {
    // Fallback to English if translation is not available
    console.warn(`Translation not found for ${section} in ${language}, falling back to English`);
    return contentMap['en'][section as keyof (typeof contentMap)['en']] as T;
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

export function getFAQContent(language: string = 'en'): FAQContent {
  return getContent<FAQContent>('faq', language);
}

export function getSliderContent(language: string = 'en'): SliderContent {
  return getContent<SliderContent>('slider', language);
}

export function getOurTeamContent(language: string = 'en'): OurTeamContent {
  return getContent<OurTeamContent>('ourTeam', language);
}

// Service content loading functions
export function getWebApplicationsContent(language: string = 'en'): ServicePageContent {
  return getContent<ServicePageContent>('webApplications', language);
}

// Generic service content loader
export function getServiceContent(serviceName: string, language: string = 'en'): ServicePageContent {
  // Convert kebab-case to camelCase for content map lookup
  const camelCaseKey = serviceName.split('-').reduce((acc, word, index) => {
    if (index === 0) return word;
    return acc + word.charAt(0).toUpperCase() + word.slice(1);
  }, '');

  return getContent<ServicePageContent>(camelCaseKey, language);
}

// Services overview content loading
export function getServicesOverviewContent(language: string = 'en'): ServicesOverviewContent {
  return getContent<ServicesOverviewContent>('servicesOverview', language);
}

// Load all services content for unified page
export function getAllServicesContent(language: string = 'en'): {
  webApplications: ServicePageContent;
  mobileApplications: ServicePageContent;
  apiDevelopment: ServicePageContent;
  codeMaintenance: ServicePageContent;
  uxDesign: ServicePageContent;
  modeling3d: ServicePageContent;
} {
  return {
    webApplications: getWebApplicationsContent(language),
    mobileApplications: getContent<ServicePageContent>('mobileApplications', language),
    apiDevelopment: getContent<ServicePageContent>('apiDevelopment', language),
    codeMaintenance: getContent<ServicePageContent>('codeMaintenance', language),
    uxDesign: getContent<ServicePageContent>('uxDesign', language),
    modeling3d: getContent<ServicePageContent>('modeling3d', language),
  };
}

// Combined page content for unified services page
export function getUnifiedServicesPageContent(language: string = 'en'): UnifiedServicesPageContent {
  return {
    overview: getServicesOverviewContent(language),
    ...getAllServicesContent(language),
  };
}

// About page content loading function
export function getAboutPageContent(language: string = 'en'): AboutPageContent {
  return {
    hero: getContent<AboutHeroContent>('aboutHero', language),
    story: getContent<AboutStoryContent>('aboutStory', language),
    approach: getContent<AboutApproachContent>('aboutApproach', language),
    cta: getContent<AboutCTAContent>('aboutCta', language),
  };
}

// Legal content loading functions
export function getTermsOfServiceContent(language: string = 'en'): LegalContent {
  return getContent<LegalContent>('termsOfService', language);
}

export function getPrivacyPolicyContent(language: string = 'en'): LegalContent {
  return getContent<LegalContent>('privacyPolicy', language);
}
