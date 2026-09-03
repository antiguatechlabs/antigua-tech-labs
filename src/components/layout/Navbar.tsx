'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, ClickAwayListener, Container, IconButton, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AGLogo from '@/assets/aglogo.png';
import { useLanguage } from '@/context/languageContext';
import { NavbarContent } from '@/lib/data';

import { MobileMenu } from './MobileMenu';

const getLocalizedPath = (language: string, href: string) => {
  const [path] = href.split('#');
  return `/${language}${path}`.replace(/\/$/, '') || '/';
};

export function Navbar({ content }: { content: NavbarContent }) {
  const params = useParams();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const currentLang = params.lang as string || 'en';
  const normalizedPathname = pathname.replace(/\/$/, '') || '/';
  const isHomeRoute = normalizedPathname === `/${currentLang}`;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'contact'>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 24);

    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);

    if (!isHomeRoute) return;

    setActiveSection(window.location.hash === '#contact' ? 'contact' : 'hero');

    const sections = ['hero', 'contact']
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry?.target.id === 'hero' || visibleEntry?.target.id === 'contact') {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomeRoute, pathname]);

  const activeHref = isHomeRoute
    ? `/#${activeSection}`
    : content.menuItems.find(item => getLocalizedPath(currentLang, item.href) === normalizedPathname)?.href;

  const handleLanguageToggle = () => setLanguage(language === 'en' ? 'es' : 'en');
  const updateGlassHighlight = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty('--glass-highlight-x', `${Math.max(0, Math.min(100, x))}%`);
    event.currentTarget.style.setProperty('--glass-highlight-y', `${Math.max(0, Math.min(100, y))}%`);
  };

  const resetGlassHighlight = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--glass-highlight-x', '24%');
    event.currentTarget.style.setProperty('--glass-highlight-y', '0%');
  };

  return (
    <ClickAwayListener onClickAway={() => setIsMobileMenuOpen(false)}>
      <Box
        onPointerMove={updateGlassHighlight}
        onPointerLeave={resetGlassHighlight}
        sx={{
          position: 'fixed',
          top: { xs: 18, md: 28 },
          right: 0,
          left: 0,
          zIndex: theme => theme.zIndex.appBar,
          '--glass-highlight-x': '24%',
          '--glass-highlight-y': '0%',
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            position: 'relative',
            mx: { xs: 1.5, md: 3 },
            width: { xs: 'calc(100% - 24px)', md: 'calc(100% - 48px)' },
            overflow: 'hidden',
            bgcolor: isScrolled ? 'rgba(241, 244, 255, 0.3)' : 'rgba(241, 244, 255, 0.18)',
            backgroundImage: isScrolled
              ? 'radial-gradient(120% 170% at var(--glass-highlight-x) var(--glass-highlight-y), rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.13) 30%, transparent 60%), linear-gradient(130deg, rgba(255, 255, 255, 0.18), rgba(219, 225, 255, 0.08) 55%, rgba(176, 187, 255, 0.16))'
              : 'radial-gradient(120% 170% at var(--glass-highlight-x) var(--glass-highlight-y), rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.1) 30%, transparent 60%), linear-gradient(130deg, rgba(255, 255, 255, 0.14), rgba(219, 225, 255, 0.05) 55%, rgba(176, 187, 255, 0.11))',
            border: '1px solid rgba(255, 255, 255, 0.44)',
            borderRadius: { xs: '1.125rem', md: '1.5rem' },
            boxShadow: isScrolled
              ? '0 14px 34px rgba(43, 45, 66, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(61, 64, 105, 0.1)'
              : '0 8px 24px rgba(43, 45, 66, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.42), inset 0 -1px 0 rgba(61, 64, 105, 0.08)',
            backdropFilter: isScrolled ? 'blur(7px) saturate(165%) brightness(1.04)' : 'blur(5px) saturate(150%) brightness(1.03)',
            WebkitBackdropFilter: isScrolled ? 'blur(7px) saturate(165%) brightness(1.04)' : 'blur(5px) saturate(150%) brightness(1.03)',
            transition: 'background-color 220ms ease, box-shadow 220ms ease, backdrop-filter 220ms ease',
            '&::before': {
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              content: '""',
              pointerEvents: 'none',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.04) 38%, transparent 62%)',
            },
            '&::after': {
              position: 'absolute',
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 0,
              height: '38%',
              content: '""',
              pointerEvents: 'none',
              background: 'linear-gradient(180deg, transparent, rgba(138, 150, 220, 0.1))',
            },
            '@supports not (backdrop-filter: blur(1px))': { bgcolor: 'rgba(245, 247, 255, 0.94)' },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        >
          <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 1.5, md: 3 } }}>
            <Toolbar disableGutters sx={{ minHeight: { xs: '56px', md: '68px' }, display: 'flex', justifyContent: 'space-between' }}>
              <MuiLink component={Link} href={`/${currentLang}`} underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 0.5, md: 1 } }}>
                  <Image src={AGLogo} alt={content.companyName} width={51} height={36} priority />
                </Box>
                <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', md: '1.15rem' }, fontWeight: 700, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>
                  {content.companyName}
                </Typography>
              </MuiLink>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 0.5, lg: 1 } }}>
                {content.menuItems.map(item => {
                  const isActive = item.href === activeHref;

                  return (
                    <MuiLink
                      key={item.href}
                      component={Link}
                      href={`/${currentLang}${item.href}`}
                      aria-current={isActive ? 'page' : undefined}
                      underline="none"
                      sx={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 40, px: { md: 1.25, lg: 1.5 }, border: '1px solid transparent', borderRadius: '0.75rem', color: isActive ? 'primary.main' : 'text.primary', fontSize: { md: '0.84rem', lg: '0.92rem' }, fontWeight: isActive ? 600 : 500, letterSpacing: '-0.02em', transition: 'color 200ms ease, background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
                        ...(isActive && { bgcolor: 'rgba(255, 255, 255, 0.22)', borderColor: 'rgba(164, 171, 255, 0.46)', boxShadow: '0 7px 16px rgba(90, 48, 255, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.34)' }),
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.18)', borderColor: 'rgba(164, 171, 255, 0.3)', color: 'primary.main', transform: 'translateY(-1px)' },
                        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3 },
                        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
                      }}
                    >
                      {item.name}
                    </MuiLink>
                  );
                })}
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                <IconButton
                  onClick={handleLanguageToggle}
                  aria-label="Toggle language"
                  sx={{
                    width: 42, height: 42, border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '0.75rem', bgcolor: 'rgba(255, 255, 255, 0.14)', boxShadow: '0 5px 12px rgba(43, 45, 66, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)', color: 'text.primary', fontSize: '0.85rem', fontWeight: 700, transition: 'transform 200ms ease, background-color 200ms ease, box-shadow 200ms ease',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)', boxShadow: '0 10px 20px rgba(90, 48, 255, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.4)', transform: 'translateY(-1px)' },
                    '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3 },
                    '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
                  }}
                >
                  {content.languageToggle[language]}
                </IconButton>
              </Box>

              <IconButton
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-controls="mobile-navigation"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(isOpen => !isOpen)}
                sx={{ display: { xs: 'inline-flex', md: 'none' }, width: 40, height: 40, border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '0.75rem', bgcolor: 'rgba(255, 255, 255, 0.14)', boxShadow: '0 4px 12px rgba(43, 45, 66, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)', color: 'text.primary' }}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>

        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} content={content} activeHref={activeHref} />
      </Box>
    </ClickAwayListener>
  );
}
