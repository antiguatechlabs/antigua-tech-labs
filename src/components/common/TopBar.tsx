'use client';
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import CodeIcon from '@mui/icons-material/Code';
import Link from 'next/link';
import { useLanguage } from '@/context/languageContext';
import { getNavbarContent } from '@/lib/data';

// Import MobileMenu component
import MobileMenu from './MobileMenu';

interface TopBarProps {
    handleSidebar?: () => void;
}

export function TopBar({ handleSidebar = () => { } }: TopBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Language context integration
  const { language } = useLanguage();
  const [content, setContent] = useState(getNavbarContent(language));

  // Update content when language changes
  useEffect(() => {
    setContent(getNavbarContent(language));
  }, [language]);

  // State for sticky header and mobile menu
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Toggle body class for preventing scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Menu items from the common Header, but using content from language context
  const menuItems = [
    { name: 'Home', href: '#' },
    { name: content.navItems.features, href: '#features' },
    { name: content.navItems.testimonials, href: '#testimonials' },
    { name: content.navItems.pricing, href: '#pricing' },
    { name: 'Services', href: '#services' },
    { name: content.navItems.contact, href: '#contact' },
  ];

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={isSticky ? 3 : 0}
      sx={{
        bgcolor: isSticky ? 'background.default' : 'secondary.main',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: isSticky ? 'rgba(255, 255, 255, 0.7)' : 'secondary.main',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Mobile menu button */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleMobileMenu}
              color="inherit"
              sx={{ color: isSticky ? 'inherit' : 'white' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 'auto', sm: 0 } }}>
            <Link href="/" passHref>
              <MuiLink
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: isSticky ? 'text.primary' : 'white',
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    display: 'flex',
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
                    color: isSticky ? 'text.primary' : 'white',
                    fontSize: '1.25rem',
                  }}
                >
                  {content.companyName}
                </Typography>
              </MuiLink>
            </Link>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
              gap: 4,
              ml: 4,
            }}
          >
            {menuItems.map(item => (
              <MuiLink
                key={item.name}
                href={item.href}
                underline="none"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isSticky ? 'text.primary' : 'white',
                  '&:hover': isSticky
                    ? { color: 'primary.main' }
                    : { color: 'rgba(255, 255, 255, 0.8)' },
                  transition: 'color 0.2s',
                }}
              >
                {item.name}
              </MuiLink>
            ))}
          </Box>

          {/* Contact Info - Hidden on mobile */}
          {!isMedium && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
              <Avatar
                sx={{
                  bgcolor: isSticky ? 'secondary.main' : 'secondary.light',
                  width: isSticky ? 28 : 32,
                  height: isSticky ? 28 : 32,
                }}
              >
                <PhoneIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: isSticky ? 'text.primary' : 'white',
                    fontWeight: 500,
                  }}
                >
                                    Need help?
                </Typography>
                <MuiLink
                  href="tel:+15025557890"
                  sx={{
                    fontSize: isSticky ? '0.75rem' : '0.875rem',
                    fontWeight: 700,
                    color: isSticky ? 'text.primary' : 'white',
                    textDecoration: 'none',
                    display: 'block',
                    '&:hover': {
                      color: isSticky ? 'primary.main' : 'secondary.light',
                    },
                  }}
                >
                                    (502) 555-7890
                </MuiLink>
              </Box>
            </Box>
          )}

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="text"
              color="inherit"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isSticky ? 'inherit' : 'white',
              }}
            >
                            Log In
            </Button>
            {!isSmall && (
              <Button
                variant="contained"
                color="primary"
                href="#contact"
                size={isSticky ? 'small' : 'medium'}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: isSticky ? 'none' : 'uppercase',
                  letterSpacing: isSticky ? 0 : 1,
                }}
              >
                                Get Started
              </Button>
            )}
          </Box>

          {/* Mobile Menu Toggle - Only visible on mobile */}
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              color="inherit"
              onClick={toggleMobileMenu}
              sx={{
                ml: { xs: 0, sm: 2 },
                display: { xs: 'none', sm: 'flex', lg: 'none' },
                color: isSticky ? 'inherit' : 'white',
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        handleSidebar={handleSidebar}
      />
    </AppBar>
  );
}

export default TopBar;
