// import "@/styles/globals.css";
import { Providers } from "./providers";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Landing page using Next.js 15, Chakra, MUI, Framer Motion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
