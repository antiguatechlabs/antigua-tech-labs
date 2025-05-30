'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: 'rgba(255, 255, 255, 0.7)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Mobile menu button */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }}>
            <IconButton size="large" aria-label="menu" onClick={handleMenuToggle} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 'auto', sm: 0 } }}>
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
                color: 'text.primary',
                fontSize: '1.25rem',
              }}
            >
              WebCraft2
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
              gap: 4,
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
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                  transition: 'color 0.2s',
                }}
              >
                {item.name}
              </MuiLink>
            ))}
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="text"
              color="inherit"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="#contact"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Get Startedd
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile menu drawer */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '75%',
            maxWidth: 300,
            boxSizing: 'border-box',
            pt: 2,
          },
        }}
      >
        <List sx={{ pt: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem key={`${item.name}-${index}`} disablePadding>
              <ListItemButton component="a" href={item.href} onClick={handleMenuToggle}>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="#"
              onClick={handleMenuToggle}
              sx={{ color: 'primary.main' }}
            >
              <ListItemText
                primary="Log In"
                primaryTypographyProps={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
