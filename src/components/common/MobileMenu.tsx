'use client';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
  Stack,
  Collapse,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

import { useLanguage } from '@/context/languageContext';
import { slideInRight, staggerContainer } from '@/lib/animations';
import { getNavbarContent } from '@/lib/data';
import { MotionBox, MotionButton, MotionTypography } from '@/lib/motionComponents';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleSidebar: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const MobileMenu = ({ isOpen, onClose, handleSidebar }: MobileMenuProps) => {
  const { language, toggleLanguage } = useLanguage();
  const content = getNavbarContent(language);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Use menu items from content
  const menuItems: MenuItem[] = content.menuItems.map(item => ({
    label: item.name,
    href: item.href,
  }));

  // Add submenu for Services
  const servicesIndex = menuItems.findIndex(item => item.label === 'Services' || item.label === 'Servicios');
  if (servicesIndex !== -1) {
    menuItems[servicesIndex].children = [
      {
        label: 'Modern Web Applications',
        href: '/services/web-applications',
      },
      {
        label: 'API Development',
        href: '/services/api-development',
      },
      {
        label: 'Code Maintenance',
        href: '/services/code-maintenance',
      },
      {
        label: 'UX Design',
        href: '/services/ux-design',
      },
    ];
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 350 },
          boxSizing: 'border-box',
        },
      }}
    >
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={slideInRight}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{content.companyName}</Typography>
          <IconButton onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
          {/* Navigation Menu */}
          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <List disablePadding>
              {menuItems.map((item, index) => (
                <Box key={index}>
                  {item.children ? (
                    <>
                      <ListItem
                        onClick={() => toggleExpand(index)}
                        sx={{
                          py: 1.5,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          cursor: 'pointer',
                        }}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        {expandedItem === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      <Collapse in={expandedItem === index}>
                        <List disablePadding sx={{ pl: 2, bgcolor: 'action.hover', mb: 1 }}>
                          {item.children.map((child, childIndex) => (
                            <ListItem
                              key={childIndex}
                              component={Link}
                              href={child.href}
                              onClick={onClose}
                              sx={{
                                py: 1,
                                '&:hover': { color: 'primary.main' },
                              }}
                            >
                              <ListItemText primary={child.label} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <ListItem
                      component={Link}
                      href={item.href}
                      onClick={onClose}
                      sx={{
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { color: 'primary.main' },
                        cursor: 'pointer',
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  )}
                </Box>
              ))}
            </List>
          </MotionBox>

          {/* Language Toggle */}
          <Box sx={{ mt: 4, mb: 4 }}>
            <Divider />
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <MotionTypography
                fontWeight="bold"
                variant="h6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Language
              </MotionTypography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  onClick={() => {
                    toggleLanguage();
                  }}
                  variant={language === 'en' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  sx={{
                    minWidth: 40,
                    borderRadius: 1,
                    fontWeight: 600,
                  }}
                >
                  EN
                </Button>
                <Button
                  onClick={() => {
                    toggleLanguage();
                  }}
                  variant={language === 'es' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  sx={{
                    minWidth: 40,
                    borderRadius: 1,
                    fontWeight: 600,
                  }}
                >
                  ES
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
          </Box>

          {/* Contact Information */}
          <Box sx={{ mt: 0 }}>
            <MotionTypography
              fontWeight="bold"
              variant="h6"
              sx={{ mb: 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Contact Us
            </MotionTypography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                  <PhoneIcon />
                </IconButton>
                <MuiLink href="tel:+15025557890" sx={{ textDecoration: 'none' }}>
                  (502) 555-7890
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                  <EmailIcon />
                </IconButton>
                <MuiLink href="mailto:contact@antiguadigital.com" sx={{ textDecoration: 'none' }}>
                  contact@antiguadigital.com
                </MuiLink>
              </Box>
            </Stack>
          </Box>

          {/* Social Media Links */}
          <Box sx={{ mt: 4 }}>
            <MotionTypography
              fontWeight="bold"
              variant="h6"
              sx={{ mb: 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Follow Us
            </MotionTypography>
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                component={MuiLink}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="primary"
                component={MuiLink}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="primary"
                component={MuiLink}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="primary"
                component={MuiLink}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Sidebar Toggle Button */}
          <Box sx={{ mt: 5 }}>
            <MotionButton
              onClick={() => {
                onClose();
                handleSidebar();
              }}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Form
            </MotionButton>
          </Box>
        </Box>
      </MotionBox>
    </Drawer>
  );
};
