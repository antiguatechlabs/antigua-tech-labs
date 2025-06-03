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

- Chakra UI's prop-based styling is used for component-specific styling
- Global CSS variables for theme properties in `src/theme.ts`
- Support for both light and dark modes

### Adding New Sections

1. Create a new component in `/src/components/sections`
2. Add corresponding data in `/src/content/en` and `/src/content/es` if needed
3. Import and add the component to `src/app/[lang]/page.tsx`

### Language Support

The landing page supports multiple languages through URL-based routing:

- English: `/en/`
- Spanish: `/es/`

The language context automatically detects the language from the URL and loads the appropriate content. Users can toggle between languages using the language switcher in the navigation.

## Deployment

The project is configured for easy deployment on Vercel:

```bash
npm run build
```

Changes to the main branch automatically deploy via GitHub Actions.
