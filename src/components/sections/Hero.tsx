'use client';
import MessageIcon from '@mui/icons-material/Message';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

import { Section } from '@/components/common';
import { slideLeftVariant } from '@/lib/animationVariants';
import { HeroContent } from '@/lib/data';
import { MotionBox, MotionTypography, MotionButton } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

const CardSwapBox = dynamic(() => import('@/components/ui/CardSwapBox'), { ssr: false });

export function Hero({ content }: { content: HeroContent }) {

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navbarHeight = 64; // Approximate navbar height
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
      id="hero"
      animation='fadeIn'
      sx={{
        paddingTop: { xs: 8, md: 10, lg: 12 },
        paddingBottom: { xs: 8, md: 10, lg: 12 },
        paddingX: { xs: 2, md: 10, lg: 15 },
        backgroundColor: colors.gradientMain,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'stretch' }, // Center on mobile, stretch on desktop
          width: '100%',
          gap: { xs: 4, md: 2 }, // Add spacing between elements
        }}
      >
        {/* Text section */}
        <Box
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-evenly'}
            sx={{ maxWidth: '48rem', flex: 1 }}
          >
            <MotionTypography
              variant="h1"
              {...slideLeftVariant}
              sx={{
                fontSize: { xs: '2.25rem', md: '3rem', lg: '3.75rem' },
                fontWeight: 'bold',
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              {textWithGradient(content.title, true)}
            </MotionTypography>

            <Box>
              <MotionTypography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '42rem',
                }}
              >
                {content.subtitle}
              </MotionTypography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
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
                  {content.cta}
                </MotionButton>
                <MotionButton
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    fontWeight: 500,
                    borderWidth: 1,
                    py: 1.5,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                    See Our Process
                </MotionButton>
              </Stack>
            </Box>
          </MotionBox>
        </Box>

        {/* Cards */}
        <Box
          sx={{ flex: 1, display: { xs: 'none', lg: 'block' } }}
          width={'100%'}
        >
          <CardSwapBox/>
        </Box>
      </Box>
    </Section>
  );
}
