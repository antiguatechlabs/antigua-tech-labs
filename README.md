# Antigua Tech Solutions Landing Page

A modern, mobile-first landing page for Antigua Tech Solutions built with Next.js, Material UI, and Framer Motion. Features multilingual support with English and Spanish versions, comprehensive component library, and advanced animation system.

## Project Overview

This landing page showcases Antigua Tech Solutions's AI-powered sales agent solution with a clean, professional design. The page is fully responsive and optimized for all device sizes, from mobile phones to desktop computers.

## Documentation

- **[Component Documentation](docs/COMPONENTS.md)**: Comprehensive guide to all components
- **[Development Guide](docs/DEVELOPMENT.md)**: Detailed development workflow and standards
- **[API Documentation](#api-documentation)**: Contact form API reference
- **[Troubleshooting](#troubleshooting)**: Common issues and solutions

## Features

- **Mobile-First Design**: Optimized for all screen sizes with responsive layouts
- **Modern UI Components**: Built with Chakra UI and Material UI
- **Smooth Animations**: Enhanced with Framer Motion animations
- **Multilingual Support**: Language-based routing with English and Spanish content
- **Content Management**: JSON-based content for easy updates
- **Server Components**: Leveraging Next.js App Router and React Server Components
- **TypeScript**: Type-safe code throughout the project
- **Email Integration**: Contact form with Nodemailer email sending

## Project Structure

```
/src
  /app                    # Next.js App Router pages and layout
    /[lang]              # Dynamic segment for language-based routing
      /layout.tsx        # Language-specific layout
      /page.tsx          # Main page component
      /about/            # About page
      /services/         # Services page
    /api/                # API routes
      /contact/          # Contact form API endpoint
  /assets                # Static assets and images
    /footer/             # Footer-specific assets
    /hero/               # Hero section assets
    /services/           # Service icons and images
    /slider/             # Technology logos for slider
  /components            # Reusable UI components
    /common/             # Shared utility components
    /layout/             # Layout-specific components (Navbar, Footer)
    /sections/           # Page section components (Hero, Features, etc.)
    /services/           # Service-specific components
    /ui/                 # UI utility components (animations, modals)
    /utility/            # Helper components
  /content               # Language-specific JSON content files
    /en/                 # English content
      /services/         # Service-specific content
    /es/                 # Spanish content
      /services/         # Service-specific content
  /context               # React context providers
  /lib                   # Utility functions and data loading
  /styles                # Global styles and theme configuration
  /theme                 # Theme configuration files
/public                  # Public static assets
  /images/               # Public images
/memory-bank             # Project documentation and context
/docs                    # Additional documentation
```

## Components

The landing page is organized into comprehensive sections with reusable components:

### Page Sections
- **Hero**: Main headline with animated text and call-to-action
- **Features**: Grid of product features with icons and animations
- **WhyChoose**: Value proposition with benefits grid
- **WhyChooseTwo**: Additional benefits with background imagery
- **Slider/StackSlider**: Technology showcase with animated logos
- **Testimonials**: Customer testimonials with avatars and ratings
- **FAQ**: Expandable frequently asked questions
- **Contact**: Contact form with validation and email sending
- **OurTeam**: Team member profiles and information
- **OurStory**: Company story and mission
- **OurApproach**: Development methodology and process
- **Timeline**: Company milestones and achievements

### Layout Components
- **Navbar**: Responsive navigation with mobile drawer menu
- **Footer**: Site footer with links, contact info, and legal pages
- **Menu**: Desktop navigation menu
- **MobileMenu**: Mobile-optimized navigation drawer
- **Sidebar**: Contextual sidebar for additional navigation

### UI Components
- **Section**: Fundamental building block with consistent styling and animations
- **TwoColumnSection**: Responsive two-column layout component
- **FramerWrapper**: Animation wrapper for smooth transitions
- **ChromaGrid**: Animated background grid effect
- **ScrollPreserver**: Maintains scroll position during navigation
- **ThemeToggle**: Light/dark mode switcher
- **CounterUp**: Animated number counters
- **SpotlightCard**: Interactive card with spotlight effect
- **CardSwap**: Animated card transitions
- **LegalModal**: Modal for terms of service and privacy policy

### Text Components
- **BlurText**: Text with blur animation effects
- **GradientText**: Text with gradient color effects
- **RotatingText**: Rotating text animations
- **SplitText**: Character-by-character text animations

### Service Components
- **ServiceOverviewHero**: Hero section for services page
- **ServiceSection**: Individual service detail sections
- **ServiceTwoColumnSection**: Two-column service layouts
- **UnifiedServicesPage**: Complete services page component

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

- **Next.js 15**: React framework with App Router and Turbopack
- **React 19**: UI library with latest features
- **Material UI 7**: Primary component library with comprehensive theming
- **Framer Motion 12**: Advanced animation library with page transitions
- **TypeScript 5**: Type-safe JavaScript with strict configuration
- **GSAP**: High-performance animations for complex interactions
- **Swiper**: Touch-enabled slider components
- **React Hook Form**: Form validation and handling
- **Nodemailer**: Email sending functionality
- **ESLint & Prettier**: Code quality and formatting tools
- **Husky**: Git hooks for code quality enforcement

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

The project uses a comprehensive styling approach:

- **Material UI**: Primary component library with prop-based styling through the `sx` prop
- **Global CSS Variables**: Theme properties and fundamental styling in `src/styles/globals.css`
- **Theme Configuration**: Centralized theme management in `src/theme/` directory
- **Responsive Design**: Mobile-first approach with breakpoint-based styling
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Animation Styling**: Framer Motion variants and props for smooth transitions
- **Component Theming**: Consistent styling patterns across all components

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

## Email Configuration

The contact form uses Nodemailer to send emails. To set up email functionality:

### 1. Environment Variables

Copy the example environment file and configure your SMTP settings:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your email provider settings:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TO_EMAIL=contact@your-domain.com
```

### 2. Email Provider Setup

#### Gmail Setup
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `SMTP_PASS`

#### Other Providers
The system supports any SMTP provider. Common configurations:

- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **SendGrid**: `smtp.sendgrid.net:587`
- **Mailtrap** (testing): `smtp.mailtrap.io:2525`

### 3. Contact Form Features

The contact form includes:
- **Form validation**: Required fields and email format validation
- **Loading states**: Visual feedback during submission
- **Success/error messages**: User-friendly status updates
- **Responsive design**: Works on all device sizes
- **Spam protection**: Server-side validation and rate limiting ready

### 4. API Endpoint

The contact form submits to `/api/contact` which:
- Validates form data
- Sends formatted emails with HTML templates
- Returns appropriate success/error responses
- Includes proper error handling and logging

### 5. Testing

For development testing, consider using:
- **Mailtrap**: Captures emails without sending them
- **Gmail**: Use a dedicated test account
- **Local SMTP**: Tools like MailHog for local development

The email template includes:
- Professional HTML formatting
- Sender information and reply-to headers
- Responsive email design
- Company branding

## API Documentation

### Contact Form API

The contact form API endpoint provides secure email sending functionality with comprehensive validation and error handling.

#### Endpoint
```
POST /api/contact
```

#### Request Body
```typescript
interface ContactPayload {
  name: string;      // Required: Contact person's name
  email: string;     // Required: Valid email address
  message: string;   // Required: Message content
}
```

#### Example Request
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, I would like to learn more about your services.'
  })
});

const result = await response.json();
```

#### Response Format

**Success Response (200)**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Validation Error (400)**
```json
{
  "success": false,
  "error": "All fields are required"
}
```

```json
{
  "success": false,
  "error": "Invalid email format"
}
```

**Server Error (500)**
```json
{
  "success": false,
  "error": "Email configuration error"
}
```

```json
{
  "success": false,
  "error": "Network error, please try again"
}
```

```json
{
  "success": false,
  "error": "Failed to send email. Please try again later."
}
```

#### Features
- **Input Validation**: Validates required fields and email format
- **SMTP Configuration**: Supports any SMTP provider with authentication
- **Error Handling**: Comprehensive error handling with specific error messages
- **Security**: Uses environment variables for sensitive configuration
- **HTML Templates**: Professional email formatting with responsive design
- **Reply-To Headers**: Proper email headers for easy response handling

#### Environment Variables Required
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TO_EMAIL=contact@your-domain.com
```

## Deployment

The project is configured for easy deployment on Vercel:

```bash
npm run build
```

Changes to the main branch automatically deploy via GitHub Actions.

### Environment Variables for Production

Ensure these environment variables are set in your deployment platform:

```env
# Required for contact form functionality
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
TO_EMAIL=contact@your-domain.com

# Optional: Analytics and tracking
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Build Optimization

The project includes several optimizations for production:

- **Turbopack**: Faster development builds with `--turbopack` flag
- **Code Splitting**: Automatic code splitting with Next.js App Router
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Use `npm run build` to analyze bundle size
- **Static Generation**: Server components for optimal performance

## Developer Contribution Guidelines

### Getting Started for Contributors

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/antigua-digital-landing-page.git
   cd antigua-digital-landing-page
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

### Code Standards

- **TypeScript**: All new code must be written in TypeScript with proper typing
- **ESLint**: Code must pass ESLint checks (`npm run lint`)
- **Prettier**: Code must be formatted with Prettier (`npm run format`)
- **Husky**: Pre-commit hooks will automatically run linting and formatting

### Component Development Guidelines

1. **Component Structure**
   ```typescript
   // Use this template for new components
   'use client'; // Only if client-side features are needed
   
   import { Box, Typography } from '@mui/material';
   import { motion } from 'framer-motion';
   
   interface ComponentProps {
     // Define props with TypeScript
   }
   
   export default function Component({ ...props }: ComponentProps) {
     return (
       <Box component={motion.div} sx={{ /* styling */ }}>
         {/* Component content */}
       </Box>
     );
   }
   ```

2. **Styling Guidelines**
   - Use Material UI's `sx` prop for component styling
   - Follow the existing color scheme and spacing patterns
   - Ensure responsive design for all viewport sizes
   - Use CSS variables for theme-related properties

3. **Animation Guidelines**
   - Use Framer Motion for animations
   - Keep animations subtle and purposeful
   - Ensure animations don't interfere with accessibility
   - Use existing animation variants when possible

### Content Management

1. **Adding New Content**
   - Add content to both `/src/content/en/` and `/src/content/es/`
   - Use consistent JSON structure across languages
   - Follow existing naming conventions for content files

2. **Content Structure**
   ```json
   {
     "title": "Section Title",
     "subtitle": "Section Subtitle",
     "items": [
       {
         "title": "Item Title",
         "description": "Item Description"
       }
     ]
   }
   ```

### Testing Guidelines

- Test components in both light and dark modes
- Verify responsive design on multiple screen sizes
- Test language switching functionality
- Ensure contact form works with your SMTP configuration
- Test animations and transitions

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow code standards and guidelines
   - Add appropriate documentation
   - Test thoroughly

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **PR Requirements**
   - Clear description of changes
   - Screenshots for UI changes
   - Confirmation that tests pass
   - Updated documentation if needed

## Troubleshooting

### Common Issues

#### Development Server Issues

**Issue**: `npm run dev` fails to start
```bash
# Solution: Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue**: Port 3000 already in use
```bash
# Solution: Use a different port
npm run dev -- -p 3001
```

#### Build Issues

**Issue**: TypeScript compilation errors
```bash
# Solution: Check for type errors
npx tsc --noEmit
# Fix type errors and rebuild
npm run build
```

**Issue**: ESLint errors during build
```bash
# Solution: Fix linting issues
npm run lint:fix
npm run build
```

#### Email Configuration Issues

**Issue**: Contact form not sending emails
1. Check environment variables are set correctly
2. Verify SMTP credentials with your email provider
3. Check server logs for specific error messages
4. Test with a simple SMTP testing tool

**Issue**: Gmail authentication errors
1. Enable 2-factor authentication
2. Generate an App Password (not your regular password)
3. Use the App Password in `SMTP_PASS`

#### Styling Issues

**Issue**: Components not displaying correctly
1. Check Material UI theme configuration
2. Verify CSS variables are properly defined
3. Check for conflicting styles
4. Test in different browsers

**Issue**: Responsive design problems
1. Test with browser developer tools
2. Check Material UI breakpoint usage
3. Verify `sx` prop responsive syntax

#### Language/Content Issues

**Issue**: Content not loading for specific language
1. Check JSON file structure in `/src/content/[lang]/`
2. Verify data loading utilities in `/src/lib/data.ts`
3. Check language routing in middleware

**Issue**: Missing translations
1. Compare content files between languages
2. Add missing keys to appropriate language files
3. Restart development server

### Performance Issues

**Issue**: Slow page loading
1. Check bundle size with `npm run build`
2. Optimize images and assets
3. Review component imports for unnecessary dependencies
4. Consider code splitting for large components

**Issue**: Animation performance
1. Use `transform` and `opacity` for animations
2. Avoid animating layout properties
3. Use `will-change` CSS property sparingly
4. Test on lower-end devices

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create a GitHub issue with detailed description
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Request review from maintainers

### Debugging Tips

1. **Use Browser DevTools**
   - Check console for errors
   - Use Network tab for API issues
   - Use Elements tab for styling issues

2. **Enable Verbose Logging**
   ```typescript
   // Add to components for debugging
   console.log('Component props:', props);
   console.log('Component state:', state);
   ```

3. **Test API Endpoints**
   ```bash
   # Test contact form API
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```
