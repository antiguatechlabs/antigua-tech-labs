'use client';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Typography, Button } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { AboutHeroContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

interface AboutHeroProps {
  content: AboutHeroContent;
  lang: string;
}

export function AboutHero({ content, lang: _lang }: AboutHeroProps) {
  const handleScrollToNext = () => {
    const nextSection = document.getElementById(content.ctaLink.replace('#', ''));
    if (nextSection) {
      const navbarHeight = 64;
      const elementPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Section
      id="about-hero"
      noAnimation={true}
      sx={{
        paddingTop: { xs: 8, md: 10, lg: 12 },
        paddingBottom: { xs: 8, md: 10, lg: 12 },
        paddingX: { xs: 2, md: 10, lg: 15 },
        backgroundColor: colors.gradientMain,
        minHeight: { xs: '60vh', md: '70vh' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '56rem',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 'bold',
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            {textWithGradient(content.headline, true)}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: 'text.secondary',
              mb: 6,
              maxWidth: '48rem',
              lineHeight: 1.6,
            }}
          >
            {content.subheading}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowDownwardIcon />}
            sx={{
              fontWeight: 500,
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
            onClick={handleScrollToNext}
          >
            {content.ctaText}
          </Button>
        </Box>
      </Box>
    </Section>
  );
}
