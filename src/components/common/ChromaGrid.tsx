// app/components/ChromaGrid.tsx

'use client';

import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import React, { useRef, useEffect } from 'react';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items = [],
  radius = 300,
  columns = 3,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <Box
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, minmax(280px, 320px))',
          sm: 'repeat(2, minmax(280px, 320px))',
          md: `repeat(${Math.min(columns, 3)}, minmax(280px, 320px))`,
          lg: `repeat(${columns}, 320px)`,
        },
        justifyContent: 'center',
        gap: { xs: 1.5, sm: 2, md: 2.5 },
        mx: 'auto',
        p: { xs: 1, sm: 2 },
        '--x': '50%',
        '--y': '50%',
        '--r': `${radius}px`,
      }}
    >
      {items.map((c, i) => (
        <Box
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '100%', md: '100%', lg: 320 },
            minWidth: { xs: 280, sm: 280, md: 280, lg: 320 },
            maxWidth: { xs: 320, sm: 320, md: 320, lg: 320 },
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid #333',
            background: c.gradient,
            cursor: c.url ? 'pointer' : 'default',
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: c.borderColor,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.3), transparent 70%)',
              pointerEvents: 'none',
              opacity: 0,
              transition: 'opacity 0.5s ease',
              zIndex: 2,
            },
            '&:hover::before': {
              opacity: 1,
            },
          }}
        >
          <Box sx={{ p: 1 }}>
            <Box
              component="img"
              src={c.image}
              alt={c.title}
              loading="lazy"
              sx={{
                width: '100%',
                borderRadius: 1,
                display: 'block',
              }}
            />
          </Box>
          <Box sx={{ p: 2, color: '#fff' }}>
            <Typography variant="h6">{c.title}</Typography>
            {c.handle && (
              <Typography variant="body2" color="#aaa">
                {c.handle}
              </Typography>
            )}
            <Typography variant="body2">{c.subtitle}</Typography>
            {c.location && (
              <Typography variant="body2" color="#aaa">
                {c.location}
              </Typography>
            )}
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 3,
          backdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.10) 30%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.50) 75%, rgba(0,0,0,0.68) 88%, white 100%)',
        }}
      />

      <Box
        ref={fadeRef}
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
          backdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 15%, rgba(255,255,255,0.90) 30%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0.50) 75%, rgba(255,255,255,0.32) 88%, transparent 100%)',
          opacity: 1,
          transition: 'opacity 0.25s ease',
        }}
      />
    </Box>
  );
};

export default ChromaGrid;


