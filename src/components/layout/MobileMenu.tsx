'use client';

import { Box, ButtonBase, Grow, Link as MuiLink, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { ThemeToggle } from '@/components/ui';
import { useLanguage } from '@/context/languageContext';
import { NavbarContent } from '@/lib/data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  content: NavbarContent;
  activeHref?: string;
}

export const MobileMenu = ({ isOpen, onClose, content, activeHref }: MobileMenuProps) => {
  const { language, setLanguage } = useLanguage();
  const params = useParams();
  const currentLang = params.lang as string || 'en';
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Grow in={isOpen} timeout={prefersReducedMotion ? 0 : 240} style={{ transformOrigin: 'top center' }} unmountOnExit>
      <Box
        id="mobile-navigation"
        component="nav"
        aria-label={content.menuTitle}
        sx={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          right: 12,
          left: 12,
          display: { xs: 'block', md: 'none' },
          overflow: 'hidden',
          border: '1px solid',
          borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.4)',
          borderRadius: '1.125rem',
          bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(18, 23, 34, 0.72)' : 'rgba(241, 244, 255, 0.28)',
          backgroundImage: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, rgba(196, 146, 247, 0.12), rgba(18, 23, 34, 0.24))'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(183, 195, 255, 0.12))',
          boxShadow: theme => theme.palette.mode === 'dark'
            ? '0 14px 32px rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
            : '0 14px 32px rgba(43, 45, 66, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.42)',
          backdropFilter: 'blur(6px) saturate(155%) brightness(1.03)',
          WebkitBackdropFilter: 'blur(6px) saturate(155%) brightness(1.03)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            padding: '1px',
            background: theme => theme.palette.mode === 'dark'
              ? 'radial-gradient(240px 100px at 24% 0%, rgba(220, 207, 255, 0.62), transparent 80%), linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 45%, rgba(155, 175, 255, 0.22))'
              : 'radial-gradient(240px 100px at 24% 0%, rgba(255, 255, 255, 0.95), transparent 80%), linear-gradient(135deg, rgba(255, 255, 255, 0.55), transparent 45%, rgba(155, 175, 255, 0.32))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            background: theme => theme.palette.mode === 'dark'
              ? 'radial-gradient(320px 150px at 24% 0%, rgba(196, 146, 247, 0.14), transparent 75%), linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 42%, rgba(138, 150, 220, 0.06))'
              : 'radial-gradient(320px 150px at 24% 0%, rgba(255, 255, 255, 0.3), transparent 75%), linear-gradient(180deg, rgba(255, 255, 255, 0.16), transparent 42%, rgba(138, 150, 220, 0.08))',
          },
          '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
            bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(18, 23, 34, 0.97)' : 'rgba(245, 247, 255, 0.97)',
          },
        }}
      >
        <Box sx={{ p: 0.75, position: 'relative', zIndex: 1 }}>
          {content.menuItems.map(item => {
            const isActive = item.href === activeHref;

            return (
              <MuiLink
                key={item.href}
                component={Link}
                href={`/${currentLang}${item.href}`}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 46,
                  px: 1.5,
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(164, 171, 255, 0.42)' : 'transparent',
                  borderRadius: '0.75rem',
                  bgcolor: theme => isActive ? theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.1)' : 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  boxShadow: theme => isActive ? theme.palette.mode === 'dark' ? '0 5px 14px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)' : '0 5px 14px rgba(90, 48, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.32)' : 'none',
                  backdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
                  WebkitBackdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
                  color: isActive ? 'primary.main' : 'text.primary',
                  fontSize: '0.93rem',
                  fontWeight: isActive ? 650 : 550,
                  transition: 'color 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
                  '&:hover': { bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.12)' : 'rgba(255, 255, 255, 0.18)', color: 'primary.main' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                }}
              >
                {item.name}
              </MuiLink>
            );
          })}
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.25, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em' }}>
            LANGUAGE
          </Typography>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            '& .MuiIconButton-root': {
              width: 40, height: 40, borderRadius: '0.75rem',
              borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.4)',
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.14)',
              boxShadow: theme => theme.palette.mode === 'dark' ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
              WebkitBackdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
              '&:hover': {
                bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.12)' : 'rgba(255, 255, 255, 0.26)',
                borderColor: 'primary.main',
              },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            },
          }}>
            <ThemeToggle size="small" />
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                p: 0.5,
                borderRadius: '0.875rem',
                bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.14)',
                border: '1px solid',
                borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.32)',
                backdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
                WebkitBackdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
              }}
            >
              {(['en', 'es'] as const).map(itemLanguage => {
                const isActive = language === itemLanguage;

                return (
                  <ButtonBase
                    key={itemLanguage}
                    onClick={() => setLanguage(itemLanguage)}
                    aria-pressed={isActive}
                    sx={{
                      minWidth: 38,
                      minHeight: 30,
                      borderRadius: '0.5rem',
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
                      WebkitBackdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
                      ...(isActive && {
                        bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.1)' : 'rgba(255, 255, 255, 0.24)',
                        boxShadow: theme => theme.palette.mode === 'dark' ? '0 3px 9px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)' : '0 3px 9px rgba(90, 48, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.32)',
                      }),
                      '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                    }}
                  >
                    {content.languageToggle[itemLanguage]}
                  </ButtonBase>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};
