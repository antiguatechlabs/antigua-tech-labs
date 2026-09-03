'use client';

import { Box, ButtonBase, Grow, Link as MuiLink, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

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
          right: 0,
          left: 0,
          display: { xs: 'block', md: 'none' },
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '1.125rem',
          bgcolor: 'rgba(241, 244, 255, 0.28)',
          backgroundImage: 'linear-gradient(145deg, rgba(255, 255, 255, 0.34), rgba(183, 195, 255, 0.12))',
          boxShadow: '0 14px 32px rgba(43, 45, 66, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.42)',
          backdropFilter: 'blur(6px) saturate(155%) brightness(1.03)',
          WebkitBackdropFilter: 'blur(6px) saturate(155%) brightness(1.03)',
          '@supports not (backdrop-filter: blur(1px))': { bgcolor: 'rgba(245, 247, 255, 0.94)' },
        }}
      >
        <Box sx={{ p: 0.75 }}>
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
                  bgcolor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  boxShadow: isActive ? '0 5px 14px rgba(90, 48, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.32)' : 'none',
                  backdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
                  WebkitBackdropFilter: 'blur(6px) saturate(150%) brightness(1.03)',
                  color: isActive ? 'primary.main' : 'text.primary',
                  fontSize: '0.93rem',
                  fontWeight: isActive ? 650 : 550,
                  transition: 'color 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.18)', color: 'primary.main' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                }}
              >
                {item.name}
              </MuiLink>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.25, py: 1.5, borderTop: '1px solid rgba(113, 110, 160, 0.12)' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em' }}>
            LANGUAGE
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              p: 0.5,
              borderRadius: '0.875rem',
              bgcolor: 'rgba(255, 255, 255, 0.14)',
              border: '1px solid rgba(255, 255, 255, 0.32)',
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
                    ...(isActive && { bgcolor: 'rgba(255, 255, 255, 0.24)', boxShadow: '0 3px 9px rgba(90, 48, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.32)' }),
                  }}
                >
                  {content.languageToggle[itemLanguage]}
                </ButtonBase>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};
