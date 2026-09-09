'use client';

import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';
import type { ComponentProps, PointerEventHandler, RefObject } from 'react';
import { useRef } from 'react';

import { MotionCard } from '@/lib/motionComponents';

const defaultHighlight = { x: 24, y: 0 };

export const liquidGlassSx: SystemStyleObject<Theme> = {
  '--glass-highlight-x': `${defaultHighlight.x}%`,
  '--glass-highlight-y': `${defaultHighlight.y}%`,
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(18, 23, 34, 0.72)' : 'rgba(241, 244, 255, 0.28)',
  backgroundImage: theme => theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(196, 146, 247, 0.12), rgba(18, 23, 34, 0.24))'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(183, 195, 255, 0.12))',
  border: '1px solid',
  borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.44)',
  borderRadius: '1.25rem',
  boxShadow: theme => theme.palette.mode === 'dark'
    ? '0 14px 34px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -1px 0 rgba(116, 135, 196, 0.14)'
    : '0 14px 34px rgba(43, 45, 66, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.46), inset 0 -1px 0 rgba(61, 64, 105, 0.08)',
  backdropFilter: 'blur(7px) saturate(160%) brightness(1.03)',
  WebkitBackdropFilter: 'blur(7px) saturate(160%) brightness(1.03)',
  transition: 'background-color 220ms ease, box-shadow 220ms ease, border-color 220ms ease, transform 240ms cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(220, 207, 255, 0.34)' : 'rgba(164, 171, 255, 0.54)',
    boxShadow: theme => theme.palette.mode === 'dark'
      ? '0 20px 46px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(116, 135, 196, 0.18)'
      : '0 20px 46px rgba(43, 45, 66, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.54), inset 0 -1px 0 rgba(61, 64, 105, 0.1)',
  },
  '&::before': {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    content: '""',
    pointerEvents: 'none',
    borderRadius: 'inherit',
    padding: '1px',
    background: theme => theme.palette.mode === 'dark'
      ? 'radial-gradient(240px 120px at var(--glass-highlight-x) var(--glass-highlight-y), rgba(220, 207, 255, 0.58), transparent 80%), linear-gradient(135deg, rgba(255, 255, 255, 0.17), transparent 45%, rgba(155, 175, 255, 0.2))'
      : 'radial-gradient(240px 120px at var(--glass-highlight-x) var(--glass-highlight-y), rgba(255, 255, 255, 0.88), transparent 80%), linear-gradient(135deg, rgba(255, 255, 255, 0.52), transparent 45%, rgba(155, 175, 255, 0.28))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
  '&::after': {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    content: '""',
    pointerEvents: 'none',
    borderRadius: 'inherit',
    background: theme => theme.palette.mode === 'dark'
      ? 'radial-gradient(320px 150px at var(--glass-highlight-x) var(--glass-highlight-y), rgba(196, 146, 247, 0.14), transparent 75%), linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 42%, rgba(138, 150, 220, 0.06))'
      : 'radial-gradient(320px 150px at var(--glass-highlight-x) var(--glass-highlight-y), rgba(255, 255, 255, 0.3), transparent 75%), linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent 42%, rgba(138, 150, 220, 0.08))',
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
  '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
    bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(18, 23, 34, 0.96)' : 'rgba(245, 247, 255, 0.96)',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
};

interface LiquidGlassHandlers<T extends HTMLElement> {
  onPointerMove: PointerEventHandler<T>;
  onPointerLeave: PointerEventHandler<T>;
}

function useLiquidGlass<T extends HTMLElement>(ref: RefObject<T | null>): LiquidGlassHandlers<T> {
  const highlight = useRef({ ...defaultHighlight });
  const target = useRef({ ...defaultHighlight });
  const frameId = useRef<number | null>(null);
  const previousTime = useRef(0);
  const motionQuery = useRef<MediaQueryList | null>(null);

  const writeHighlight = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty('--glass-highlight-x', `${highlight.current.x}%`);
    element.style.setProperty('--glass-highlight-y', `${highlight.current.y}%`);
  };

  const animate = (time: number) => {
    frameId.current = null;
    const amount = 1 - Math.exp(-(time - previousTime.current) / 85);
    previousTime.current = time;
    highlight.current.x += (target.current.x - highlight.current.x) * amount;
    highlight.current.y += (target.current.y - highlight.current.y) * amount;
    const settled = Math.abs(target.current.x - highlight.current.x) < 0.02
      && Math.abs(target.current.y - highlight.current.y) < 0.02;

    if (settled) highlight.current = { ...target.current };
    writeHighlight();
    if (!settled) frameId.current = requestAnimationFrame(animate);
  };

  const scheduleAnimation = () => {
    if (frameId.current !== null) return;
    previousTime.current = performance.now();
    frameId.current = requestAnimationFrame(animate);
  };

  const resetHighlight = () => {
    if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    frameId.current = null;
    highlight.current = { ...defaultHighlight };
    target.current = { ...defaultHighlight };
    writeHighlight();
  };

  const onPointerMove: PointerEventHandler<T> = event => {
    motionQuery.current ??= window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!motionQuery.current?.matches || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) return;

    target.current = {
      x: Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100)),
    };
    scheduleAnimation();
  };

  const onPointerLeave: PointerEventHandler<T> = () => {
    target.current = { ...defaultHighlight };
    if (motionQuery.current?.matches) scheduleAnimation();
    else resetHighlight();
  };

  return { onPointerMove, onPointerLeave };
}

export type LiquidGlassCardProps = Omit<ComponentProps<typeof MotionCard>, 'sx'> & {
  sx?: SystemStyleObject<Theme>;
};

export function LiquidGlassCard({ sx, onPointerMove, onPointerLeave, ...props }: LiquidGlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glass = useLiquidGlass(ref);

  return (
    <MotionCard
      {...props}
      data-liquid-glass="true"
      ref={ref}
      onPointerMove={event => {
        glass.onPointerMove(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={event => {
        glass.onPointerLeave(event);
        onPointerLeave?.(event);
      }}
      sx={{ ...liquidGlassSx, ...(sx ?? {}) }}
    />
  );
}
