# Technical Context: Aguat Solutions Landing Page

## Technology Stack

### Core Framework

- **Next.js 15**: The latest version of Next.js, providing server components, improved routing with the App Router, and optimized rendering strategies.
- **React 19**: The latest version of React, offering improved performance, better error handling, and enhanced developer experience.
- **TypeScript**: Used throughout the project for type safety and improved developer experience.
- **Next.js Middleware**: Used for language detection, validation, and redirection.

### UI Libraries

- **Material UI 7.1.0**: A comprehensive component library with a rich set of components, icons, and theming capabilities. Used as the primary UI framework.
- **Framer Motion 12.10.4**: Powers animations and transitions throughout the site.

### Form Handling

- **React Hook Form 7.56.3**: Manages form state, validation, and submission with minimal re-renders.

### Styling

- **Emotion**: Powers the styling system for Material UI components.
- **CSS Variables**: Used for theme switching and global styling properties.
- **Global CSS**: Provides baseline styling and custom properties.
- **Material UI sx prop**: Used for component-specific styling.

### Development Tools

- **ESLint 9**: Ensures code quality and consistency.
- **TypeScript 5**: Provides static type checking.
- **pnpm**: Package manager used for dependency management.

### Deployment

- **GitHub Actions**: Handles CI/CD pipeline.
- **Vercel**: Hosts the application with edge network distribution.

## Development Environment

### Local Setup

- Node.js environment
- pnpm for package management
- Next.js development server
- TypeScript for type checking
- ESLint for code quality

### Development Commands

- `pnpm dev`: Starts the development server
- `pnpm build`: Creates a production build
- `pnpm start`: Runs the production build locally
- `pnpm lint`: Runs ESLint to check code quality

## Project Structure

```
antigua-digital-landing-page/
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD configuration
├── memory-bank/            # Project documentation
├── public/                 # Static assets
│   ├── components/         # Component-specific assets
│   └── images/             # General images
├── src/
│   ├── app/                # Next.js App Router structure
│   │   ├── favicon.ico
│   │   ├── globals.css     # Global styles
│   │   ├── not-found.tsx   # 404 page
│   │   ├── page.module.css # Page-specific styles
│   │   ├── page.tsx        # Root redirect page
│   │   └── [lang]/         # Language-specific routes
│   │       ├── layout.tsx  # Language-specific layout
│   │       └── page.tsx    # Main page component
│   ├── assets/             # SVG and other assets
│   │   ├── hero/           # Hero section assets
│   │   └── slider/         # Slider section assets
│   ├── components/         # Reusable components
│   │   ├── common/         # Common UI components
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Page section components
│   │   └── ui/             # UI utility components
│   ├── content/            # Content files by language
│   │   ├── en/             # English content
│   │   └── es/             # Spanish content
│   ├── context/            # React context providers
│   │   ├── languageContext.tsx  # Language state management
│   │   ├── sidebarContext.tsx   # Sidebar state management
│   │   └── themeContext.tsx     # Theme state management
│   ├── lib/                # Utility functions
│   │   ├── animations.ts   # Animation utilities
│   │   ├── data.ts         # Data loading utilities
│   │   ├── motionComponents.ts  # Framer Motion components
│   │   ├── pageContent.ts  # Page content aggregation
│   │   └── textFormatters.tsx # Text formatting utilities
│   ├── middleware.ts       # Next.js middleware for language routing
│   ├── styles/             # Additional styles
│   │   └── custom-highlight.css  # Syntax highlighting styles
│   └── theme.ts            # Theme configuration
├── .gitignore
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── package-lock.json
├── README.md
└── tsconfig.json           # TypeScript configuration
```

## Technical Constraints

### Browser Compatibility

- The application targets modern browsers with good CSS Variable support.
- Responsive design ensures compatibility with various device sizes.
- Progressive enhancement ensures basic functionality on older browsers.

### Performance Considerations

- Server components are used for content-heavy sections to reduce client-side JavaScript.
- Static rendering is employed where possible for improved performance.
- Images and assets are optimized for fast loading.
- Language-specific routes are pre-rendered for faster initial loading.
- Code splitting reduces initial bundle size.

### Accessibility Requirements

- Material UI provides accessible components by default.
- Proper semantic HTML is used throughout the application.
- Color contrast meets WCAG guidelines.
- Keyboard navigation is supported for all interactive elements.
- ARIA attributes are used where appropriate.

## Dependencies and Integrations

### Key Dependencies

- **@emotion/react** and **@emotion/styled**: Styling solution
- **@mui/icons-material** and **@mui/material**: UI components and icons
- **framer-motion**: Animation library
- **next**: Core framework
- **react** and **react-dom**: UI library
- **react-hook-form**: Form management

### External Integrations

- Currently, no external API integrations are implemented.
- The application is designed to be easily extendable for future integrations.
- Language-based routing allows for potential integration with translation services.
- Form submission will eventually connect to a backend API.

## Build and Deployment Process

### Build Process

1. Code is pushed to the main branch
2. GitHub Actions workflow is triggered
3. Dependencies are installed using pnpm
4. Application is built using Next.js build process
5. Built application is deployed to Vercel

### Deployment Environments

- **Production**: Deployed from the main branch
- **Development**: Local development environment
- **Preview**: Vercel preview deployments for pull requests

### Monitoring and Analytics

- No specific monitoring or analytics tools are currently implemented.
- Future implementation could include tools like Google Analytics or Vercel Analytics.
- Language-specific analytics tracking will be implemented to measure performance by language.
- Error tracking will be added for production monitoring.

### Internationalization

- The application supports English and Spanish through language-based routing.
- URL patterns like `/en/` and `/es/` determine which language content to display.
- Middleware handles language detection and redirection.
- SEO is optimized with proper hreflang tags for language variants.
- Content is organized in language-specific directories for easy management.

## Security Considerations

- No sensitive data is currently stored or processed on the client.
- Form submissions will implement CSRF protection when connected to a backend.
- Content Security Policy will be implemented for production.
- Regular dependency updates to address security vulnerabilities.

## Future Technical Considerations

- Potential migration to a headless CMS for content management
- Implementation of server-side form validation and processing
- Addition of user authentication for personalized experiences
- Integration with analytics and tracking tools
- Implementation of A/B testing capabilities
- Expansion to additional languages and regions
