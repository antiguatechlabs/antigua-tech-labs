# Content Management for Antigua Digital Landing Page

This directory contains JSON files that provide content for various components of the Antigua Digital landing page. These files allow for easy content updates without modifying the component code.

## Content Files

### hero.json
Contains content for the Hero section of the landing page, including:
- `title`: Main headline
- `subtitle`: Supporting text
- `cta`: Call-to-action button text

### whyChoose.json
Contains content for the WhyChoose component, including:
- `title`: Section heading
- `subtitle`: Section subheading
- `description`: Main descriptive text
- `buttonText`: Text for the action button
- `buttonLink`: URL for the action button
- `imageSrc`: Path to the section image
- `yearEstablished`: Year the company was established
- `tagline`: Short company tagline

### whyChooseTwo.json
Contains content for the WhyChooseTwo component (dark background section), including:
- `title`: Section heading
- `subtitle`: Section subheading
- `description`: Main descriptive text
- `buttonText`: Text for the action button
- `buttonLink`: URL for the action button
- `backgroundImage`: Path to the background image
- `phoneNumber`: Contact phone number
- `yearEstablished`: Year the company was established

### brand.json
Contains content for the Brand component (counter and brand slider section), including:
- `counterValue`: Numeric value for the counter
- `counterTitle`: Title text for the counter
- `brands`: Array of brand objects with `name` and `logo` properties

### brandSlider.json
Contains content for the standalone BrandSlider component, including:
- `title`: Section heading
- `brands`: Array of brand objects with `name` and `logo` properties

## Usage

These content files are loaded dynamically by their respective components. To update content, simply modify the JSON files - no code changes required.

Components use a fallback mechanism, so if a JSON file cannot be loaded, the component will display default content defined within the component itself.