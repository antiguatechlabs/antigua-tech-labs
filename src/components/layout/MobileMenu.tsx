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
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { useLanguage } from '@/context/languageContext';
import { useSidebar } from '@/context/sidebarContext';
import { getNavbarContent } from '@/lib/data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { handleSidebar } = useSidebar();
  const { language } = useLanguage();
  const params = useParams();
  const currentLang = params.lang as string || 'en';
  const content = getNavbarContent(language);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Use menu items from content with language prefix
  const menuItems: MenuItem[] = content.menuItems.map(item => ({
    label: item.name,
    href: `/${currentLang}${item.href}`,
  }));

  // Add submenu for Services
  const servicesIndex = menuItems.findIndex(item => item.label === 'Services' || item.label === 'Servicios');
  if (servicesIndex !== -1) {
    menuItems[servicesIndex].children = [
      {
        label: 'Modern Web Applications',
        href: `/${currentLang}/services/web-applications`,
      },
      {
        label: 'API Development',
        href: `/${currentLang}/services/api-development`,
      },
      {
        label: 'Code Maintenance',
        href: `/${currentLang}/services/code-maintenance`,
      },
      {
        label: 'UX Design',
        href: `/${currentLang}/services/ux-design`,
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
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{content.companyName}</Typography>
        <IconButton onClick={onClose} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
        {/* Navigation Menu */}
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
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItem>
              )}
            </Box>
          ))}
        </List>

        {/* Add a divider to replace the removed theme toggle section */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Divider />
        </Box>

        {/* Contact Information */}
        <Box sx={{ mt: 0 }}>
          <Typography fontWeight="bold" variant="h6" sx={{ mb: 2 }}>
            Contact Us
          </Typography>
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
          <Typography fontWeight="bold" variant="h6" sx={{ mb: 2 }}>
            Follow Us
          </Typography>
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
          <Button
            onClick={() => {
              onClose();
              handleSidebar();
            }}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Contact Form
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
