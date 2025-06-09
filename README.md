# Antigua Digital Landing Page

A modern, mobile-first landing page for Antigua Digital built with Next.js, Chakra UI, Material UI, and Framer Motion. Features multilingual support with English and Spanish versions.

## Project Overview

This landing page showcases Antigua Digital's AI-powered sales agent solution with a clean, professional design. The page is fully responsive and optimized for all device sizes, from mobile phones to desktop computers.

## Features

- **Mobile-First Design**: Optimized for all screen sizes with responsive layouts
- **Modern UI Components**: Built with Chakra UI and Material UI
- **Smooth Animations**: Enhanced with Framer Motion animations
- **Multilingual Support**: Language-based routing with English and Spanish content
- **Content Management**: JSON-based content for easy updates
- **Server Components**: Leveraging Next.js App Router and React Server Components
- **TypeScript**: Type-safe code throughout the project

## Project Structure

```
/src
  /app             # Next.js App Router pages and layout
    /[lang]        # Dynamic segment for language-based routing
      /layout.tsx  # Language-specific layout
      /page.tsx    # Main page component
  /components      # Reusable UI components
  /content         # Language-specific JSON content files
    /en            # English content
    /es            # Spanish content
  /context         # React context providers
  /lib             # Utility functions
  /theme           # Theme configuration
/public            # Static assets
```

## Components

The landing page is organized into these major sections:

- **Navbar**: Responsive navigation with mobile drawer menu
- **Hero**: Main headline and call-to-action
- **Features**: Grid of product features with icons
- **Testimonials**: Customer testimonials with avatars
- **Contact**: Contact form with validation
- **Footer**: Site footer with links and information

### Reusable Components

The project includes several reusable components that ensure consistency:

#### Section Component

The `Section` component is a fundamental building block that provides consistent styling and animations:

```tsx
<Section
  id="features"
  animation="fadeInUp"
  animationDelay={0.3}
  sx={{ backgroundColor: 'background.paper' }}
>
  {/* Section content */}
</Section>
```

This component handles:
- Consistent spacing and padding across viewport sizes
- Built-in animations with configurable types and delays
- Viewport-based animation triggering
- Responsive layout adjustments

#### Motion Components

Material UI components wrapped with Framer Motion for seamless animations:

```tsx
<MotionTypography
  variant="h1"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated Heading
</MotionTypography>
```

Available motion components include:
- `MotionBox`, `MotionContainer`, `MotionStack`
- `MotionPaper`, `MotionButton`, `MotionTypography`
- `MotionCard`, `MotionDiv`, `MotionSection`, `MotionSpan`

## Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **Chakra UI 3**: Component library for primary UI elements
- **Material UI 7**: Used for icons and specific components
- **Framer Motion**: Animation library
- **TypeScript**: Type-safe JavaScript

## Getting Started

### Quick Setup

The easiest way to set up the project is to use the initialization script:

```bash
# Make the script executable if needed
chmod +x init.sh

# Run the initialization script
./init.sh
```

This script will:
1. Install all dependencies
2. Set up Git hooks with Husky
3. Run initial code formatting and linting
4. Start the development server

### Manual Setup

If you prefer to set up manually:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Workflow

### Code Quality Tools

This project uses several tools to maintain code quality:

- **ESLint**: Lints and formats JavaScript and TypeScript files
- **Husky**: Runs linting and formatting before commits

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Check for linting issues
- `npm run lint:fix`: Fix linting issues and format code automatically
- `npm run format`: Alias for lint:fix

## Content Management

Content for the landing page is stored in JSON files in the `/src/content` directory, organized by language. To update content:

1. Navigate to the appropriate language directory (`/src/content/en` or `/src/content/es`)
2. Edit the corresponding JSON file (e.g., `hero.json`, `features.json`)
3. The changes will be reflected automatically based on the selected language

## Customization

### Styling

- Material UI's prop-based styling is used for component-specific styling through the `sx` prop
- Global CSS variables for theme properties in `src/theme.ts`
- Support for both light and dark modes
- Animation styling through Framer Motion variants and props

#### Animation System

The project uses a comprehensive animation system:

1. **Animation Variants**: Predefined animation patterns
   ```typescript
   export const slideUpVariant: Variants = {
     initial: { opacity: 0, y: 50 },
     animate: {
       opacity: 1,
       y: 0,
       transition: { duration: 0.5, ease: 'easeOut' },
     },
   };
   ```

2. **Animation Props**: Ready-to-use animation configurations
   ```typescript
   export const fadeInUpProps = {
     initial: { opacity: 0, y: 20 },
     animate: { opacity: 1, y: 0 },
     transition: { duration: 0.5 },
   };
   ```

3. **Page Transitions**: Smooth transitions between pages and language changes
   ```tsx
   <AnimatePresence mode="wait" initial={false}>
     <MotionBox
       key={lang}
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       transition={{ duration: 0.25 }}
     >
       {children}
     </MotionBox>
   </AnimatePresence>
   ```

### Adding New Sections

1. Create a new component in `/src/components/sections`
2. Add corresponding data in `/src/content/en` and `/src/content/es` if needed
3. Import and add the component to `src/app/[lang]/page.tsx`

### Language Support

The landing page supports multiple languages through URL-based routing:

- English: `/en/`
- Spanish: `/es/`

#### Language Implementation

The multilingual system works through several integrated components:

1. **URL-based routing**: Language is determined from the URL path segment (`/en/`, `/es/`)
2. **Middleware**: Automatically redirects users from the root URL to their preferred language
   ```typescript
   // Redirects / to /en/ or /es/ based on browser preferences
   export function middleware(request: NextRequest) {
     const { pathname } = request.nextUrl;
     // Check if URL already has language code
     if (!pathnameHasLanguage) {
       return NextResponse.redirect(
         new URL(`/${defaultLanguage}${pathname === '/' ? '' : pathname}`, request.url),
       );
     }
     return NextResponse.next();
   }
   ```

3. **Language Context**: Provides language state and toggle functionality throughout the app
   ```tsx
   const { language, toggleLanguage } = useLanguage();
   ```

4. **Content Loading**: JSON files are organized by language and loaded dynamically
   ```tsx
   // Server component loading content based on URL parameter
   const { lang } = await params;
   const content = getHomePageContent(lang);
   
   // Component receiving language-specific content
   <Hero content={content.hero} />
   ```

5. **SEO Optimization**: Proper hreflang tags are included for search engines
   ```html
   <link rel="alternate" hrefLang="en" href="https://example.com/en" />
   <link rel="alternate" hrefLang="es" href="https://example.com/es" />
   ```

Users can toggle between languages using the language switcher in the navigation, which updates the URL and triggers a page transition animation.

## Deployment

The project is configured for easy deployment on Vercel:

```bash
npm run build
```

Changes to the main branch automatically deploy via GitHub Actions.
