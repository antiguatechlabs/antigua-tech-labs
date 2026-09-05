'use client';
import MessageIcon from '@mui/icons-material/Message';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { DecorativePattern } from '@/components/common/DecorativePattern';
import Section from '@/components/common/Section';
import { ServiceHeroContent } from '@/lib/data';
import { MotionButton } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

interface ServiceOverviewHeroProps {
  content: Omit<ServiceHeroContent, 'image' | 'textPosition'>;
}

export function ServiceOverviewHero({ content }: ServiceOverviewHeroProps) {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navbarHeight = window.innerWidth >= 900 ? 144 : 88;
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Section
      noAnimation
      id="services-overview-hero"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        paddingTop: { xs: 'calc(70px + 2rem)', md: 'calc(116px + 3.5rem)' },
      }}
    >
      <DecorativePattern color="rgba(38, 197, 243, 0.14)" variant="contours" />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={8}
        position="relative"
        zIndex={1}
      >
        <Typography variant="h2" fontWeight={700} gutterBottom>
          {textWithGradient(content.title)}
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
          {content.subtitle}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '800px', fontSize: '1.1rem', lineHeight: 1.6, mb: 4 }}
        >
          {content.description}
        </Typography>

        {content.ctaText && (
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<MessageIcon />}
            sx={{
              fontWeight: 500,
              px: 4,
              py: 1.5,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScrollToContact}
          >
            {content.ctaText}
          </MotionButton>
        )}
      </Box>
    </Section>
  );
}
