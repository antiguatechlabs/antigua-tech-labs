'use client';
import CodeIcon from '@mui/icons-material/Code';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useState, useLayoutEffect } from 'react';

import { useLanguage } from '@/context/languageContext';
import { useSidebar } from '@/context/sidebarContext';
import { NavbarContent } from '@/lib/data';

import { MobileMenu } from './MobileMenu';

export function Navbar({ content }: { content: NavbarContent }) {
  const { handleSidebar, isSidebarOpen } = useSidebar();
  const params = useParams();
  // We'll use pathname in the future if needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pathname = usePathname();

  // Language context integration
  const { language, setLanguage } = useLanguage();

  // Get current language from URL
  const currentLang = params.lang as string || 'en';

  // State for sticky header and mobile menu
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll for sticky header
  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={isSticky ? 3 : 0}
      sx={{
        bgcolor: 'background.default',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        borderRadius: 0,
        boxShadow: isSticky ? '0px 10px 10px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 'auto', sm: 0 } }}>
            <MuiLink
              underline="none"
              href={`/${currentLang}`}
              component={Link}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(to right, #9c43f8, #26c5f3)',
                  mr: 1,
                }}
              >
                <CodeIcon sx={{ color: 'white', fontSize: '1.25rem' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  fontSize: '1.25rem',
                }}
              >
                {content.companyName}
              </Typography>
            </MuiLink>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 4,
              ml: 4,
            }}
          >
            {content.menuItems.map((item, i) => (
              <MuiLink
                key={`${item.name}-${i}`}
                href={`/${currentLang}${item.href}`}
                underline="none"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  '&:hover': { color: 'text.secondary' },
                  transition: 'color 0.2s',
                }}
              >
                {item.name}
              </MuiLink>
            ))}
          </Box>

          {/* Language Toggle */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            mr: { xs: 2, md: 3 },
            order: { xs: 1, md: 2 },
          }}>
            <IconButton
              onClick={() => {
                // Toggle language and update URL
                const newLang = language === 'en' ? 'es' : 'en';
                setLanguage(newLang);
              }}
              aria-label="Toggle language"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 0.5,
                minWidth: 40,
                height: 36,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'text.primary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(156, 67, 248, 0.1)',
                  borderColor: 'primary.main',
                },
              }}
            >
              {content.languageToggle[language]}
            </IconButton>
          </Box>

          {/* Mobile Menu Toggle - Only visible on mobile */}
          <IconButton
            aria-label="Open menu"
            onClick={handleSidebar}
            sx={{
              color: 'text.primary',
              ml: { xs: 0, sm: 2 },
              // TODO: fix the display issue on md sizes
              display: { xs: 'flex', md: 'none' },
              order: { xs: 2, md: 3 },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isSidebarOpen}
        onClose={handleSidebar}
      />
    </AppBar>
  );
}
