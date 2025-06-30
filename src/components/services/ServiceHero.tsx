'use client';
import MessageIcon from '@mui/icons-material/Message';
import { Box, Stack } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { slideLeftVariant } from '@/lib/animationVariants';
import { ServiceHeroContent } from '@/lib/data';
import { MotionBox, MotionTypography, MotionButton } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

interface ServiceHeroProps {
  content: ServiceHeroContent;
}

export function ServiceHero({ content }: ServiceHeroProps) {
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
      id="service-hero"
      animation="fadeIn"
      sx={{
        paddingTop: { xs: 8, md: 10, lg: 12 },
        paddingBottom: { xs: 6, md: 8, lg: 10 },
        paddingX: { xs: 2, md: 10, lg: 15 },
        backgroundColor: colors.gradientMain,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ maxWidth: '800px' }}
        >
          <MotionTypography
            variant="h1"
            {...slideLeftVariant}
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 'bold',
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            {textWithGradient(content.title)}
          </MotionTypography>

          <MotionTypography
            variant="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.75rem' },
              fontWeight: 500,
              color: 'text.primary',
              mb: 3,
              opacity: 0.9,
            }}
          >
            {content.subtitle}
          </MotionTypography>

          <MotionTypography
            variant="body1"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: 'text.secondary',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            {content.description}
          </MotionTypography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
              Get Started
            </MotionButton>
          </Stack>
        </MotionBox>
      </Box>
    </Section>
  );
}
