'use client';

import { Box, Drawer, Stack, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '@/context/languageContext';
import { getContactContent, getNavbarContent } from '@/lib/data';
import { useState, useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { language, toggleLanguage } = useLanguage();
  const content = getContactContent(language);
  const navContent = getNavbarContent(language);

  // Update content when language changes
  useEffect(() => {
    // Re-fetch content when language changes
  }, [language]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });

    // Close sidebar
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          boxSizing: 'border-box',
          p: 3,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">{content.title}</Typography>
        <IconButton onClick={onClose} aria-label="Close sidebar">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Language Toggle */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={toggleLanguage}
          sx={{
            borderRadius: 2,
            px: 2,
            textTransform: 'none',
          }}
        >
          {language === 'en' ? (
            <span>
              {navContent.languageToggle.en} |{' '}
              <span style={{ opacity: 0.5 }}>{navContent.languageToggle.es}</span>
            </span>
          ) : (
            <span>
              <span style={{ opacity: 0.5 }}>{navContent.languageToggle.en}</span> |{' '}
              {navContent.languageToggle.es}
            </span>
          )}
        </Button>
      </Box>

      {/* About Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          About Us
        </Typography>
        <Typography variant="body2">
          Antigua Digital is a software company specializing in the development and maintenance of
          modern web applications. We leverage the latest technologies and follow industry best
          practices to deliver clean, sustainable code and high-quality digital solutions.
        </Typography>
      </Box>

      {/* Contact Form */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              {content.formLabels.name}
            </Typography>
            <TextField
              name="name"
              placeholder={content.placeholders.name}
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              {content.formLabels.email}
            </Typography>
            <TextField
              name="email"
              type="email"
              placeholder={content.placeholders.email}
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              {content.formLabels.message}
            </Typography>
            <TextField
              name="message"
              placeholder={content.placeholders.message}
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={6}
              variant="outlined"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            {content.buttonText}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
