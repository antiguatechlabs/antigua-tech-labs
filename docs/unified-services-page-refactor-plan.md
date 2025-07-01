# UnifiedServicesPage Refactor Plan

## Overview
This document outlines the plan to refactor the `UnifiedServicesPage.tsx` component to replace individual `ServiceHero` components with the new `TwoColumnSection` component, creating a more consistent and visually appealing layout.

## Current State Analysis

### Current Structure
- **UnifiedServicesPage**: Main container component
- **ServiceHero**: Individual hero sections for each service (currently used in both overview and individual service sections)
- **ServiceSection**: Contains ServiceHero + ServiceFeatures + ServiceProcess + ServiceTechnologies + ServiceCTA

### Current Issues
1. **Repetitive Hero Sections**: Each service has its own hero, creating visual monotony
2. **Limited Visual Appeal**: Text-heavy heroes without supporting imagery
3. **Inconsistent Layout**: Heroes don't leverage the available content structure effectively

## Proposed Solution

### Replace ServiceHero with TwoColumnSection
Use the newly created `TwoColumnSection` component to create more engaging, image-supported introductions for each service.

## Implementation Plan

### Phase 1: Content Structure Updates

#### 1.1 Update Service Content Files
Each service JSON file needs to include image paths for the TwoColumnSection:

**Required Changes for each service file:**
```json
{
  "hero": {
    "title": "Custom Web Solutions That Drive Business Growth",
    "subtitle": "Professional Web Development", // New field
    "description": "We build modern, scalable web applications...",
    "image": "/images/services/web-applications-hero.jpg", // Update path
    "textPosition": "left" // New field (optional, defaults to "left")
  }
}
```

**Files to Update:**
- `src/content/en/services/web-applications.json`
- `src/content/en/services/mobile-applications.json`
- `src/content/en/services/api-development.json`
- `src/content/en/services/code-maintenance.json`
- `src/content/en/services/ux-design.json`
- `src/content/en/services/3d-modeling.json`
- Corresponding Spanish files in `src/content/es/services/`

#### 1.2 Update Data Types
Update the TypeScript interfaces in `src/lib/data.ts`:

```typescript
export interface ServiceHeroContent {
  title: string;
  subtitle: string; // New field
  description: string;
  image: string;
  textPosition?: 'left' | 'right'; // New optional field
}
```

### Phase 2: Component Updates

#### 2.1 Create ServiceTwoColumnSection Component
Create a new component that wraps TwoColumnSection with service-specific functionality:

**File:** `src/components/services/ServiceTwoColumnSection.tsx`

```typescript
'use client';
import React from 'react';
import { TwoColumnSection } from '@/components/common';
import { ServiceHeroContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';

interface ServiceTwoColumnSectionProps {
  content: ServiceHeroContent;
}

export function ServiceTwoColumnSection({ content }: ServiceTwoColumnSectionProps) {
  return (
    <TwoColumnSection
      image={content.image}
      title={textWithGradient(content.title)}
      subtitle={content.subtitle}
      description={content.description}
      textPosition={content.textPosition || 'left'}
      imageWidth={800}
      imageHeight={600}
    />
  );
}
```

#### 2.2 Update ServiceSection Component
Replace ServiceHero with ServiceTwoColumnSection in `src/components/services/ServiceSection.tsx`:

```typescript
// Remove this import
// import { ServiceHero } from './';

// Add this import
import { ServiceTwoColumnSection } from './ServiceTwoColumnSection';

// Replace the ServiceHero usage
// <ServiceHero content={content.hero} />
<ServiceTwoColumnSection content={content.hero} />
```

#### 2.3 Update UnifiedServicesPage
The main overview hero can also be replaced or kept as is, depending on design preference.

**Option A: Keep Overview Hero (Recommended)**
- Keep the main overview ServiceHero for the services landing
- Only replace individual service heroes with TwoColumnSection

**Option B: Replace All Heroes**
- Replace both overview and individual service heroes
- Create a more consistent experience throughout

### Phase 3: Image Assets

#### 3.1 Required Images
Create or source high-quality images for each service:

**Image Specifications:**
- **Dimensions**: 800x600px minimum (4:3 aspect ratio)
- **Format**: WebP preferred, JPG fallback
- **Quality**: High resolution for retina displays
- **Style**: Professional, consistent with brand

**Required Images:**
- `public/images/services/web-applications-hero.jpg`
- `public/images/services/mobile-applications-hero.jpg`
- `public/images/services/api-development-hero.jpg`
- `public/images/services/code-maintenance-hero.jpg`
- `public/images/services/ux-design-hero.jpg`
- `public/images/services/3d-modeling-hero.jpg`

#### 3.2 Image Content Suggestions
- **Web Applications**: Modern laptop/desktop showing a web application
- **Mobile Applications**: Smartphone with app interface
- **API Development**: Network/connection visualization or code editor
- **Code Maintenance**: Code refactoring or debugging visualization
- **UX Design**: Design tools, wireframes, or user interface mockups
- **3D Modeling**: 3D rendered objects or modeling software interface

### Phase 4: Styling and Layout

#### 4.1 Section Backgrounds
Add alternating background colors to create visual separation:

```typescript
// In ServiceSection.tsx
<Section
  sx={{
    backgroundColor: index % 2 === 0 ? 'background.default' : 'background.paper'
  }}
>
```

#### 4.2 Text Position Alternation
Alternate text position for visual variety:

```json
// Example pattern
{
  "webApplications": { "textPosition": "left" },
  "mobileApplications": { "textPosition": "right" },
  "apiDevelopment": { "textPosition": "left" },
  "codeMaintenance": { "textPosition": "right" },
  "uxDesign": { "textPosition": "left" },
  "modeling3d": { "textPosition": "right" }
}
```

### Phase 5: Testing and Optimization

#### 5.1 Responsive Testing
- Test on mobile, tablet, and desktop viewports
- Ensure images load properly and maintain aspect ratios
- Verify text readability on all devices

#### 5.2 Performance Testing
- Optimize image loading with Next.js Image component
- Test page load times
- Implement lazy loading for below-the-fold images

#### 5.3 Accessibility Testing
- Ensure proper alt text for all images
- Test keyboard navigation
- Verify color contrast ratios

## Migration Steps

### Step 1: Prepare Content
1. Update all service JSON files with new fields
2. Add placeholder images or source final images
3. Update TypeScript interfaces

### Step 2: Create Components
1. Create `ServiceTwoColumnSection` component
2. Update exports in `src/components/services/index.ts`
3. Test component in isolation

### Step 3: Update ServiceSection
1. Replace ServiceHero import and usage
2. Test individual service sections
3. Verify all content displays correctly

### Step 4: Update UnifiedServicesPage
1. Decide on overview hero approach (keep or replace)
2. Test full page layout
3. Adjust spacing and styling as needed

### Step 5: Final Polish
1. Add final images
2. Fine-tune responsive behavior
3. Optimize performance
4. Conduct thorough testing

## Benefits of This Refactor

### Visual Improvements
- **More Engaging**: Images make each service more visually appealing
- **Better Hierarchy**: Clear separation between services
- **Professional Look**: Consistent, modern layout throughout

### User Experience
- **Easier Scanning**: Visual cues help users quickly identify services
- **Better Engagement**: Images increase time spent on page
- **Improved Navigation**: Clear service boundaries

### Technical Benefits
- **Reusable Components**: TwoColumnSection can be used elsewhere
- **Better Performance**: Optimized images with Next.js Image component
- **Maintainable Code**: Cleaner, more modular structure

## Potential Challenges

### Image Sourcing
- **Challenge**: Finding high-quality, relevant images for each service
- **Solution**: Use stock photos, create custom graphics, or commission photography

### Content Adaptation
- **Challenge**: Existing hero content may need adjustment for two-column layout
- **Solution**: Review and optimize text length and hierarchy

### Performance Impact
- **Challenge**: Additional images may impact page load time
- **Solution**: Implement proper image optimization and lazy loading

## Success Metrics

### User Engagement
- Increased time on page
- Lower bounce rate
- Higher scroll depth

### Performance
- Maintain or improve Core Web Vitals scores
- Fast image loading times
- Smooth responsive behavior

### Conversion
- Increased contact form submissions
- Higher service page engagement
- Better user feedback scores

## Timeline Estimate

- **Phase 1 (Content)**: 1-2 days
- **Phase 2 (Components)**: 2-3 days
- **Phase 3 (Images)**: 2-4 days (depending on sourcing)
- **Phase 4 (Styling)**: 1-2 days
- **Phase 5 (Testing)**: 1-2 days

**Total Estimated Time**: 7-13 days

## Conclusion

This refactor will significantly improve the visual appeal and user experience of the services page while maintaining the existing functionality. The modular approach ensures that the changes are maintainable and the new components can be reused throughout the application.