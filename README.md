# Antigua Digital Landing Page

A modern, mobile-first landing page for Antigua Digital built with Next.js, Chakra UI, Material UI, and Framer Motion.

## Project Overview

This landing page showcases Antigua Digital's AI-powered sales agent solution with a clean, professional design. The page is fully responsive and optimized for all device sizes, from mobile phones to desktop computers.

## Features

- **Mobile-First Design**: Optimized for all screen sizes with responsive layouts
- **Modern UI Components**: Built with Chakra UI and Material UI
- **Smooth Animations**: Enhanced with Framer Motion animations
- **Content Management**: JSON-based content for easy updates
- **Server Components**: Leveraging Next.js App Router and React Server Components
- **TypeScript**: Type-safe code throughout the project

## Project Structure

```
/src
  /app             # Next.js App Router pages and layout
    /components    # Page section components
    /data          # JSON content files
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

## Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **Chakra UI 3**: Component library for primary UI elements
- **Material UI 7**: Used for icons and specific components
- **Framer Motion**: Animation library
- **TypeScript**: Type-safe JavaScript

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

Content for the landing page is stored in JSON files in the `/src/app/data` directory. To update content:

1. Edit the corresponding JSON file (e.g., `hero.json`, `features.json`)
2. The changes will be reflected automatically

## Customization

### Styling

- Chakra UI's prop-based styling is used for component-specific styling
- Global CSS variables for theme properties in `src/theme.ts`
- Support for both light and dark modes

### Adding New Sections

1. Create a new component in `/src/app/components`
2. Add corresponding data in `/src/app/data` if needed
3. Import and add the component to `src/app/page.tsx`

## Deployment

The project is configured for easy deployment on Vercel:

```bash
npm run build
```

Changes to the main branch automatically deploy via GitHub Actions.
