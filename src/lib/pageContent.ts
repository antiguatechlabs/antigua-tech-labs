import {
  getNavbarContent,
  getHeroContent,
  getWhyChooseTwoContent,
  getSliderContent,
  getFeaturesContent,
  getWhyChooseContent,
  getContactContent,
  getFAQContent,
  getFooterContent,
  NavbarContent,
  HeroContent,
  WhyChooseTwoContent,
  SliderContent,
  FeaturesContent,
  WhyChooseContent,
  ContactContent,
  FAQContent,
  FooterContent,
} from './data';

export interface HomePageContent {
    navbar: NavbarContent;
    hero: HeroContent;
    whyChooseTwo: WhyChooseTwoContent;
    slider: SliderContent;
    features: FeaturesContent;
    whyChoose: WhyChooseContent;
    contact: ContactContent;
    faq: FAQContent;
    footer: FooterContent;
}

export function getHomePageContent(lang: string): HomePageContent {
  return {
    navbar: getNavbarContent(lang),
    hero: getHeroContent(lang),
    whyChooseTwo: getWhyChooseTwoContent(lang),
    slider: getSliderContent(lang),
    features: getFeaturesContent(lang),
    whyChoose: getWhyChooseContent(lang),
    contact: getContactContent(lang),
    faq: getFAQContent(lang),
    footer: getFooterContent(lang),
  };
}
