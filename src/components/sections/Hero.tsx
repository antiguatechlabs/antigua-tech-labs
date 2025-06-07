'use client';
import MessageIcon from '@mui/icons-material/Message';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import HeroImage from '@/assets/hero/code.svg';
import { Section } from '@/components/common';
import { slideLeftVariant } from '@/lib/animationVariants';
import { HeroContent } from '@/lib/data';
import { MotionBox, MotionTypography, MotionButton } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

export function Hero({ content }: { content: HeroContent }) {

  return (
    <Section
      id="hero"
      sx={{
        paddingTop: { xs: 8, md: 10, lg: 12 },
        paddingBottom: { xs: 8, md: 10, lg: 12 },
        backgroundColor: colors.gradientBackground,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'stretch' }, // Center on mobile, stretch on desktop
          width: '100%',
          gap: { xs: 4, md: 6 }, // Add spacing between elements
        }}
      >
        {/* Text section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
              {textWithGradient(content.title)}
            </MotionTypography>

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
          </MotionBox>
        </Box>

        {/* Image section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
          }}
        >
          <MotionBox
          //   initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.5 }}
            // sx={{ maxWidth: '48rem', flex: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'end' },
              alignItems: 'center',
              mt: { xs: 4, md: 0 },
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Image
              src={HeroImage}
              alt="Developer illustration"
              width={600}
              height={600}
              style={{
                filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.1))',
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
              }}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority
            />
          </MotionBox>
        </Box>
      </Box>
    </Section>
  );
}
