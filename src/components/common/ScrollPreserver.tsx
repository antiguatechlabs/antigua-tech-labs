'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const scrollPositions = new Map<string, number>();

export function ScrollPreserver() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      if (prevPath.current) {
        scrollPositions.set(prevPath.current, window.scrollY);
      }

      const savedY = scrollPositions.get(pathname);
      if (savedY !== undefined) {
        window.scrollTo(0, savedY);
      } else {
        window.scrollTo(0, 0);
      }

      prevPath.current = pathname;
    };

    handleRouteChange();
  }, [pathname]);

  return null;
}
