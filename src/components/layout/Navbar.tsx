'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, ClickAwayListener, Container, IconButton, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import AGLogo from '@/assets/aglogo.png';
import AGLogoDark from '@/assets/aglogo-dark.png';
import { ThemeToggle } from '@/components/ui';
import { useTheme } from '@/context';
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
  const { themeMode } = useTheme();
  const currentLang = params.lang as string || 'en';
  const normalizedPathname = pathname.replace(/\/$/, '') || '/';
  const isHomeRoute = normalizedPathname === `/${currentLang}`;
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'contact'>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const glassRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef({ x: 24, y: 0 });
  const highlightTargetRef = useRef({ x: 24, y: 0 });

  useEffect(() => {
    const surface = glassRef.current;
    if (!surface) return;

    const motionQuery = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frameId: number | null = null;
    let previousTime = 0;
    let pendingPointer: { x: number; y: number } | null = null;

    const writeHighlight = () => {
      surface.style.setProperty('--glass-highlight-x', `${highlightRef.current.x}%`);
      surface.style.setProperty('--glass-highlight-y', `${highlightRef.current.y}%`);
    };

    const resetHighlight = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      pendingPointer = null;
      highlightRef.current = { x: 24, y: 0 };
      highlightTargetRef.current = { x: 24, y: 0 };
      writeHighlight();
    };

    const animate = (time: number) => {
      frameId = null;
      if (pendingPointer) {
        const bounds = surface.getBoundingClientRect();
        if (bounds.width > 0 && bounds.height > 0) {
          highlightTargetRef.current = {
            x: Math.max(0, Math.min(100, ((pendingPointer.x - bounds.left) / bounds.width) * 100)),
            y: Math.max(0, Math.min(100, ((pendingPointer.y - bounds.top) / bounds.height) * 100)),
          };
        }
        pendingPointer = null;
      }

      const amount = 1 - Math.exp(-(time - previousTime) / 85);
      previousTime = time;
      const current = highlightRef.current;
      const target = highlightTargetRef.current;
      current.x += (target.x - current.x) * amount;
      current.y += (target.y - current.y) * amount;
      const settled = Math.abs(target.x - current.x) < 0.02 && Math.abs(target.y - current.y) < 0.02;
      if (settled) highlightRef.current = { ...target };
      writeHighlight();
      if (!settled) frameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (frameId !== null) return;
      previousTime = performance.now();
      frameId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!motionQuery.matches || document.hidden || event.pointerType === 'touch') return;
      pendingPointer = { x: event.clientX, y: event.clientY };
      startAnimation();
    };

    const handlePointerLeave = () => {
      pendingPointer = null;
      highlightTargetRef.current = { x: 24, y: 0 };
      if (motionQuery.matches && !document.hidden) startAnimation();
      else resetHighlight();
    };

    surface.addEventListener('pointermove', handlePointerMove, { passive: true });
    surface.addEventListener('pointerleave', handlePointerLeave);
    surface.addEventListener('pointercancel', handlePointerLeave);
    motionQuery.addEventListener('change', resetHighlight);
    document.addEventListener('visibilitychange', resetHighlight);

    return () => {
      resetHighlight();
      surface.removeEventListener('pointermove', handlePointerMove);
      surface.removeEventListener('pointerleave', handlePointerLeave);
      surface.removeEventListener('pointercancel', handlePointerLeave);
      motionQuery.removeEventListener('change', resetHighlight);
      document.removeEventListener('visibilitychange', resetHighlight);
    };
  }, []);

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

  return (
    <ClickAwayListener onClickAway={() => setIsMobileMenuOpen(false)}>
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 18, md: 28 },
          right: 0,
          left: 0,
          zIndex: theme => theme.zIndex.appBar,
        }}
      >
        <AppBar
          ref={glassRef}
          position="static"
          elevation={0}
          sx={{
            '--glass-highlight-x': '24%',
            '--glass-highlight-y': '0%',
            position: 'relative',
            mx: { xs: 1.5, md: 3 },
            width: { xs: 'calc(100% - 24px)', md: 'calc(100% - 48px)' },
            overflow: 'hidden',
            bgcolor: theme => theme.palette.mode === 'dark'
              ? isScrolled ? 'rgba(18, 23, 34, 0.78)' : 'rgba(18, 23, 34, 0.62)'
              : isScrolled ? 'rgba(241, 244, 255, 0.3)' : 'rgba(241, 244, 255, 0.18)',
            backgroundImage: theme => theme.palette.mode === 'dark'
              ? 'linear-gradient(130deg, rgba(36, 19, 102, 0.32), rgba(18, 23, 34, 0.18) 55%, rgba(85, 145, 245, 0.12))'
              : isScrolled
                ? 'linear-gradient(130deg, rgba(255, 255, 255, 0.18), rgba(219, 225, 255, 0.08) 55%, rgba(176, 187, 255, 0.16))'
                : 'linear-gradient(130deg, rgba(255, 255, 255, 0.14), rgba(219, 225, 255, 0.05) 55%, rgba(176, 187, 255, 0.11))',
            border: '1px solid',
            borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.44)',
            borderRadius: { xs: '1.125rem', md: '1.5rem' },
            boxShadow: theme => theme.palette.mode === 'dark'
              ? isScrolled ? '0 14px 34px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 rgba(116, 135, 196, 0.16)' : '0 8px 24px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 rgba(116, 135, 196, 0.12)'
              : isScrolled
                ? '0 14px 34px rgba(43, 45, 66, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(61, 64, 105, 0.1)'
                : '0 8px 24px rgba(43, 45, 66, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.42), inset 0 -1px 0 rgba(61, 64, 105, 0.08)',
            backdropFilter: isScrolled ? 'blur(7px) saturate(165%) brightness(1.04)' : 'blur(5px) saturate(150%) brightness(1.03)',
            WebkitBackdropFilter: isScrolled ? 'blur(7px) saturate(165%) brightness(1.04)' : 'blur(5px) saturate(150%) brightness(1.03)',
            transition: 'background-color 220ms ease, box-shadow 220ms ease, backdrop-filter 220ms ease, -webkit-backdrop-filter 220ms ease',
            '&::before': {
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              content: '""',
              pointerEvents: 'none',
              borderRadius: 'inherit',
              padding: '1px',
              background: theme => theme.palette.mode === 'dark'
                ? 'radial-gradient(240px 100px at var(--glass-highlight-x) var(--glass-highlight-y), rgba(220, 207, 255, 0.62), transparent 80%), linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 45%, rgba(155, 175, 255, 0.22))'
                : 'radial-gradient(240px 100px at var(--glass-highlight-x) var(--glass-highlight-y), rgba(255, 255, 255, 0.95), transparent 80%), linear-gradient(135deg, rgba(255, 255, 255, 0.55), transparent 45%, rgba(155, 175, 255, 0.32))',
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
            '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))': {
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(18, 23, 34, 0.97)' : 'rgba(245, 247, 255, 0.97)',
            },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        >
          <Container maxWidth={false} sx={{
            position: 'relative', zIndex: 1, px: { xs: 1.5, md: 3 },
            '& .MuiIconButton-root': {
              width: { xs: 40, md: 42 },
              height: { xs: 40, md: 42 },
              borderRadius: '0.75rem',
              border: '1px solid',
              borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.4)',
              bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.14)',
              boxShadow: theme => theme.palette.mode === 'dark'
                ? 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.16)'
                : 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(43, 45, 66, 0.08)',
              transition: 'background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
              '&:hover': {
                bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.12)' : 'rgba(255, 255, 255, 0.26)',
                borderColor: 'primary.main',
                transform: 'none',
                boxShadow: theme => theme.palette.mode === 'dark' ? 'inset 0 1px 0 rgba(255, 255, 255, 0.18)' : 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              },
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3 },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            },
          }}>
            <Toolbar disableGutters sx={{ minHeight: { xs: '56px', md: '68px' }, display: 'flex', justifyContent: 'space-between' }}>
              <MuiLink component={Link} href={`/${currentLang}`} underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'text.primary', minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 0.5, md: 1 } }}>
                  <Image src={themeMode === 'dark' ? AGLogoDark : AGLogo} alt={content.companyName} width={51} height={36} priority />
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
                        ...(isActive && {
                          bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.1)' : 'rgba(255, 255, 255, 0.22)',
                          borderColor: 'rgba(164, 171, 255, 0.46)',
                          boxShadow: theme => theme.palette.mode === 'dark' ? '0 7px 16px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.14)' : '0 7px 16px rgba(90, 48, 255, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.34)',
                        }),
                        '&:hover': { bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.12)' : 'rgba(255, 255, 255, 0.18)', borderColor: 'rgba(164, 171, 255, 0.3)', color: 'primary.main', transform: 'translateY(-1px)' },
                        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3 },
                        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
                      }}
                    >
                      {item.name}
                    </MuiLink>
                  );
                })}
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                <ThemeToggle size="small" />
                <IconButton
                  onClick={handleLanguageToggle}
                  aria-label="Toggle language"
                  sx={{
                    color: 'text.primary', fontSize: '0.85rem', fontWeight: 700,
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
                sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
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
