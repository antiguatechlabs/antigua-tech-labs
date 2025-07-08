'use client';

import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
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
} from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useLanguage } from '@/context/languageContext';
import { useSidebar } from '@/context/sidebarContext';
import { NavbarContent } from '@/lib/data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  content: NavbarContent;
}

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const MobileMenu = ({ isOpen, onClose, content }: MobileMenuProps) => {
  const { handleSidebar } = useSidebar();
  const { language, setLanguage } = useLanguage();
  const params = useParams();
  const currentLang = params.lang as string || 'en';

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 64; // Approximate navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        onClose();

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  // Use menu items from content with language prefix
  const menuItems: MenuItem[] = content.menuItems.map(item => ({
    label: item.name,
    href: `/${currentLang}${item.href}`,
    children: item.mobileSubmenu?.map(subItem => ({
      label: subItem.name,
      href: `/${currentLang}${subItem.href}`,
    })),
  }));

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
            p: 1,
            minWidth: 60,
            height: 40,
            fontSize: '0.875rem',
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
                    component={Link}
                    href={item.href}
                    onClick={onClose}
                    sx={{
                      py: 1.5,
                      borderBottom: '1px solid rgba(242, 242, 242)',
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                      cursor: 'pointer',
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </>
              ) : (
                <ListItem
                  onClick={() => {
                    if (item.href.startsWith('#')) {
                      handleSmoothScroll(item.href);
                    } else {
                      // For non-anchor links, use regular navigation
                      window.location.href = item.href;
                      onClose();
                    }
                  }}
                  sx={{
                    py: 1.5,
                    borderBottom: '1px solid rgba(242, 242, 242)',
                    color: 'text.secondary',
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

        {/* Social Media Links */}
        <Box sx={{ my: 4 }}>
          <Typography fontWeight="bold" variant="h6" sx={{ mb: 2 }}>
            {content.mobileMenu.followTitle}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              color="primary"
              component={MuiLink}
              href={content.contactInfo.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={MuiLink}
              href={content.contactInfo.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              color="primary"
              component={MuiLink}
              href={content.contactInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </IconButton>

          </Stack>
        </Box>
        <Divider/>
        <Box sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                <EmailIcon />
              </IconButton>
              <MuiLink href={`mailto:${content.contactInfo.email}`} sx={{ textDecoration: 'none', color: 'text.primary' }}>
                {content.contactInfo.email}
              </MuiLink>
            </Box>
          </Stack>
        </Box>

        {/* Contact Form Button */}
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
            {content.mobileMenu.contactFormButton}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
