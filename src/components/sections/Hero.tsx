'use client';
import MessageIcon from '@mui/icons-material/Message';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';



import HeroImage from '@/assets/hero/dev.svg';
import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { getHeroContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';



// Create motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export function Hero() {
  const { language } = useLanguage();
  const params = useParams();

  // Get language from URL parameter or fall back to language context
  const urlLang = params.lang as string;
  const currentLang = urlLang || language;

  const [content, setContent] = useState(getHeroContent(currentLang));

  useEffect(() => {
    // Update content when either URL language or context language changes
    setContent(getHeroContent(urlLang || language));
  }, [language, urlLang]);
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
          alignItems: 'stretch', // Ensures children stretch equally
          width: '100%',
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
        <Box
          sx={{
            flex: 1,
            // border: '1px solid red',
            display: 'flex',
            // display: { xs: 'none', md: 'flex' },
          }}
        >
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'center', sm: 'end' }, alignItems: 'center' }}
          >
            <Image
              src={HeroImage}
              alt="Developer illustration"
              width={600}
              height={600}
              style={{
                filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.1))',
              }}
            />
          </MotionBox>
        </Box>
      </Box>
    </Section>
  );
}
