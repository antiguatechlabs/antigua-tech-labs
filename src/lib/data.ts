// Import JSON files directly
import heroData from '../app/data/hero.json';
import featuresData from '../app/data/features.json';
import testimonialsData from '../app/data/testimonials.json';
import contactData from '../app/data/contact.json';

// Content loading functions
export function getHeroContent() {
    return heroData;
}

export function getFeaturesContent() {
    return featuresData;
}

export function getTestimonialsContent() {
    return testimonialsData;
}

export function getContactContent() {
    return contactData;
}
