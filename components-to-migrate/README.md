# Migrated Components

This directory contains components that have been migrated from a HeroUI/Tailwind stack to Material UI. The components maintain the same functionality and appearance but use Material UI components and styling.

## Components

### 1. FAQ Component (`faq.tsx`)

- Accordion component for frequently asked questions
- Uses Material UI's Accordion, AccordionSummary, and AccordionDetails
- Includes animation with framer-motion

### 2. Features Component (`features.tsx`)

- Grid layout of feature cards
- Uses Material UI's Card and CardContent
- Includes staggered animation with framer-motion

### 3. Hero Component (`hero.tsx`)

- Main landing section with call-to-action buttons
- Uses Material UI's Box, Typography, and Button components
- Includes animation with framer-motion

### 4. Navbar Component (`navbar.tsx`)

- Responsive navigation bar with mobile menu
- Uses Material UI's AppBar, Toolbar, and Drawer
- Includes mobile menu functionality

## Theme

The `theme.ts` file contains a Material UI theme that matches the colors and styling from the original Tailwind configuration. It includes:

- Primary and secondary color palettes
- Typography settings
- Component style overrides

### How to Use the Theme

To use this theme in your project:

1. Import the theme into your ThemeProvider:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import theme from './components-to-migrate/theme';

function App() {
  return <ThemeProvider theme={theme}>{/* Your app content */}</ThemeProvider>;
}
```

2. Or merge it with your existing theme:

```tsx
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { createAppTheme } from './components-to-migrate/theme';
import yourExistingTheme from './your-theme';

const mergedTheme = createTheme(deepmerge(yourExistingTheme, createAppTheme('light')));
```

## CSS Styles

The `styles.css` file contains additional CSS classes that are used by the components, such as gradient text effects. To use these styles:

1. Import the CSS file in your main layout or page:

```tsx
import './components-to-migrate/styles.css';
```

## Integration

To integrate these components into your project:

1. Move the components to your desired location in the project structure
2. Update any imports to match your project's structure
3. Use the components in your pages or layouts:

```tsx
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Faq } from '@/components/Faq';
import { NavbarComponent } from '@/components/Navbar';

export default function HomePage() {
  return (
    <>
      <NavbarComponent />
      <Hero />
      <Features />
      <Faq />
    </>
  );
}
```
