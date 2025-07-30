
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
