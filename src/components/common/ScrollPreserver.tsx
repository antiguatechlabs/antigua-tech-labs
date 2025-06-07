'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function ScrollPreserver() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current && prevPath.current.split('/')[1] !== pathname.split('/')[1]) {
      window.scrollTo({ top: window.scrollY });
    }
    console.log(`Navigated to: ${pathname}`);
    console.log(`Previous path: ${prevPath.current}`);
    console.log(`Current scroll position: ${window.scrollY}`);
    prevPath.current = pathname;
  }, [pathname]);

  return null;
}
