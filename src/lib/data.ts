
import { readFileSync } from 'fs';
import path from 'path';

// Helper function to read JSON files
function readJsonFile(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath);
    const jsonData = readFileSync(fullPath, 'utf-8');
    return JSON.parse(jsonData);
}

// Content loading functions
export function getHeroContent() {
    return readJsonFile('src/app/data/hero.json');
}

export function getFeaturesContent() {
    return readJsonFile('src/app/data/features.json');
}

export function getTestimonialsContent() {
    return readJsonFile('src/app/data/testimonials.json');
}

export function getContactContent() {
    return readJsonFile('src/app/data/contact.json');
}
