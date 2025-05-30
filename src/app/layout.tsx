// import "@/styles/globals.css";
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

// Initialize the Inter font with Latin subset
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'Landing page using Next.js 15, Chakra, MUI, Framer Motion',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ overflowX: 'hidden', width: '100%' }} className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
