# Animation Plan for Antigua Digital Landing Page

This document outlines the animation strategy for the landing page using Framer Motion.

## Animation Principles

- **Subtle & Purposeful**: Animations should enhance the user experience, not distract from it
- **Performance First**: Optimize animations for performance, especially on mobile devices
- **Consistent**: Maintain consistent animation patterns throughout the site
- **Accessible**: Ensure animations respect user preferences (reduced motion)

## Animation Types

### 1. Entrance Animations

Sections and elements will animate in as they enter the viewport:

- **Fade In**: Elements fade in from transparent to opaque
- **Slide Up**: Elements slide up from below
- **Stagger**: Child elements animate in sequence for a cascading effect

### 2. Hover Animations

Interactive elements will have subtle hover animations:

- **Scale**: Slight enlargement on hover
- **Color Shift**: Smooth color transitions
- **Elevation**: Subtle shadow changes to indicate "lifting"

### 3. Micro-interactions

Small animations that provide feedback for user actions:

- **Button Clicks**: Visual feedback when buttons are clicked
- **Form Interactions**: Subtle animations for form field focus/validation
- **Loading States**: Animated indicators for loading states

## Implementation Plan

### 1. Setup Animation Utilities

Create reusable animation variants in a utilities file:

```typescript
// src/lib/animations.ts
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Add more animation variants as needed
```

### 2. Component-Specific Animations

#### Navbar
- Subtle fade-in on page load
- Smooth transitions for mobile menu open/close

#### Hero
- Staggered entrance for heading, subheading, and CTA button
- Subtle hover effect on CTA button

#### Features
- Cards animate in as they enter the viewport
- Staggered entrance for multiple cards
- Subtle hover effect on cards

#### Testimonials
- Fade and slide up as they enter the viewport
- Subtle hover effect on testimonial cards

#### Contact
- Form elements animate in sequence
- Micro-animations for form interactions (focus, validation)
- Submit button hover and click animations

#### Footer
- Subtle fade-in animation

### 3. Page Transitions

- Smooth transitions between pages using AnimatePresence (already set up in providers.tsx)
- Exit animations for elements leaving the viewport

### 4. Scroll-Based Animations

- Parallax effects for background elements
- Progress-based animations tied to scroll position

### 5. Accessibility Considerations

- Respect user preferences for reduced motion
- Ensure animations don't interfere with screen readers
- Provide sufficient contrast during animation states

## Implementation Steps

1. Create animation utility functions
2. Add motion components to each section
3. Implement scroll-triggered animations
4. Add hover and interaction animations
5. Test and optimize performance
6. Ensure accessibility compliance