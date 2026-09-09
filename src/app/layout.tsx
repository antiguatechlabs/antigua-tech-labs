import type { Metadata } from 'next';

import atlIcon from '@/assets/atl-ico-dark.png';

export const metadata: Metadata = {
  icons: {
    icon: [{ url: atlIcon.src, type: 'image/png', sizes: '1254x1254' }],
    apple: [{ url: atlIcon.src, type: 'image/png', sizes: '1254x1254' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>
    {/* react-scan script */}
    {/* <Script
      src="//unpkg.com/react-scan/dist/auto.global.js"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    /> */}
    {children}
  </>;
}
