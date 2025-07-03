'use client';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Link as MuiLink,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { useParams } from 'next/navigation';
import React, { useState, useLayoutEffect } from 'react';

import { useLanguage } from '@/context/languageContext';
import { useSidebar } from '@/context/sidebarContext';
import { NavbarContent } from '@/lib/data';

import { MobileMenu } from './MobileMenu';

const navLinkSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'text.primary',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': {
    color: 'text.secondary',
  },
};

export function Navbar({ content }: { content: NavbarContent }) {
  const { handleSidebar, isSidebarOpen } = useSidebar();
  const params = useParams();

  // Language context integration
  const { language, setLanguage } = useLanguage();

  // Get current language from URL
  const currentLang = params.lang as string || 'en';

  // State for sticky header and dropdown menu
  const [isSticky, setIsSticky] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>, itemName: string) => {
    setAnchorEl(event.currentTarget);
    setOpenDropdown(itemName);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
    setOpenDropdown(null);
  };

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

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (href: string) => {
    redirect(href, RedirectType.push);
  };

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
              <Box key={`${item.name}-${i}`} sx={{ position: 'relative' }}>
                {item.submenu ? (
                  <>
                    <Box
                      component="button"
                      onClick={e => handleDropdownOpen(e, item.name)}
                      sx={navLinkSx}
                    >
                      <Typography component="span">{item.name}</Typography>
                      <ExpandMoreIcon sx={{ fontSize: '1rem' }} />
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      open={openDropdown === item.name}
                      onClose={handleDropdownClose}
                      sx={{
                        '& .MuiPaper-root': {
                          mt: 1,
                          minWidth: 200,
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <MenuItem
                          key={subIndex}
                          component={Link}
                          href={`/${currentLang}${subItem.href}`}
                          onClick={handleDropdownClose}
                          sx={{
                            fontSize: '0.875rem',
                            py: 1.5,
                            '&:hover': { bgcolor: 'rgba(156, 67, 248, 0.1)' },
                          }}
                        >
                          {subItem.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Box
                    component="button"
                    // if not on /[lang] add link instead
                    onClick={() => handleSmoothScroll(item.href)}
                    sx={navLinkSx}
                  >
                    <Typography component="span">{item.name}</Typography>
                  </Box>
                )}
              </Box>
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
        content={content}
      />
    </AppBar>
  );
}
