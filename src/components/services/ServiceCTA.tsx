'use client';
import MessageIcon from '@mui/icons-material/Message';
import { Typography } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { ServiceCTAContent } from '@/lib/data';
import { MotionBox, MotionButton } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

interface ServiceCTAProps {
  content: ServiceCTAContent;
}

export function ServiceCTA({ content }: ServiceCTAProps) {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navbarHeight = 64;
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
      id="service-cta"
      animation="fadeInUp"
      animationDelay={0.4}
      sx={{
        paddingY: { xs: 8, md: 10, lg: 12 },
        backgroundColor: colors.gradientMain,
      }}
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
          }}
        >
          {textWithGradient(content.title, true)}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            color: 'text.secondary',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          {content.description}
        </Typography>

        <MotionButton
          variant="contained"
          color="primary"
          size="large"
          startIcon={<MessageIcon />}
          sx={{
            fontWeight: 500,
            px: 6,
            py: 2,
            fontSize: '1.125rem',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleScrollToContact}
        >
          {content.buttonText}
        </MotionButton>
      </MotionBox>
    </Section>
  );
}
