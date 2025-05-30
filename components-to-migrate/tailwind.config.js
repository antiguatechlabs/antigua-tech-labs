import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#2b2d42',
          800: '#4e2c70',
          700: '#702b9e',
          600: '#b429f9',
          500: '#9c43f8',
          400: '#855df7',
          300: '#6d77f6',
          200: '#5591f5',
          100: '#3eabf4',
          50: '#26c5f3',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        dividerWeight: '1px',
        disabledOpacity: 0.45,
        fontSize: {
          tiny: '0.75rem',
          small: '0.875rem',
          medium: '0.9375rem',
          large: '1.125rem',
        },
        lineHeight: {
          tiny: '1rem',
          small: '1.25rem',
          medium: '1.5rem',
          large: '1.75rem',
        },
        radius: {
          small: '6px',
          medium: '8px',
          large: '12px',
        },
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '2px',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: '#f3eaff',
              100: '#e4d5ff',
              200: '#c9abff',
              300: '#b429f9',
              400: '#9c43f8',
              500: '#855df7',
              600: '#6d77f6',
              700: '#5591f5',
              800: '#3eabf4',
              900: '#26c5f3',
              DEFAULT: '#9c43f8',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#eaeaff',
              100: '#d5d5ff',
              200: '#ababff',
              300: '#8282ff',
              400: '#5858ff',
              500: '#4e2c70',
              600: '#702b9e',
              700: '#2b2d42',
              800: '#1e1e2f',
              900: '#0f0f17',
              DEFAULT: '#4e2c70',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
};
