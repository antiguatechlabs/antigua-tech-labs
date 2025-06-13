'use client';

import { AnimatePresence } from 'framer-motion';

export function FramerWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait" initial={false}>{children}</AnimatePresence>;
}
