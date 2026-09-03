'use client';
import MessageIcon from '@mui/icons-material/Message';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Section } from '@/components/common';
import { slideLeftVariant } from '@/lib/animationVariants';
import { HeroContent } from '@/lib/data';
import { MotionBox, MotionTypography, MotionButton } from '@/lib/motionComponents';

const CardSwapBox = dynamic(() => import('@/components/ui/CardSwapBox'), { ssr: false });
const HeroShaderGradient = dynamic(() => import('./HeroShaderGradient'), { ssr: false });

export function Hero({ content }: { content: HeroContent }) {

  const router = useRouter();

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
      id="hero"
      animation='fadeIn'
      sx={{
        paddingBottom: { xs: 8, md: 10, lg: 12 },
        paddingX: { xs: 2, md: 10, lg: 15 },
        backgroundColor: '#16072b',
        overflow: 'hidden',
        position: 'relative',
        minHeight: '100dvh',
        paddingTop: { xs: 'calc(70px + 2rem)', md: 'calc(116px + 3.5rem)' },
      }}
    >
      <Box
        aria-hidden
        sx={{
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          position: 'absolute',
          zIndex: 0,
        }}
      >
        <HeroShaderGradient />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'stretch' }, // Center on mobile, stretch on desktop
          width: '100%',
          gap: { xs: 4, md: 2 }, // Add spacing between elements
          position: 'relative',
          zIndex: 1,
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
            sx={{ color: '#fff', maxWidth: '48rem', flex: 1 }}
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
              {content.title}
            </MotionTypography>

            <Box>
              <MotionTypography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
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
                  onClick={() => router.push('/services')}
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    fontWeight: 500,
                    borderWidth: 1,
                    py: 1.5,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {content.secondaryCta}
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
