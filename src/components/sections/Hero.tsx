'use client';
import MessageIcon from '@mui/icons-material/Message';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';


import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { getHeroContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

import { CodeWindow } from '../layout';


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
          // justifyContent: 'center',
          flexDirection: { xs: 'column', lg: 'row' },
          // gap: 6,
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ maxWidth: '48rem' }}
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

        <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', border: '1px solid red' }}>
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center',
                width: '100%',
                overflow: 'visible',
                // Create a glow effect behind the code window
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '60%',
                  height: '60%',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  top: '50%',
                  left: { xs: '50%', md: '30%' },
                  transform: 'translate(-50%, -50%)',
                  zIndex: -1,
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '50%', sm: '90%', md: '150%' },
                  transform: {
                    xs: 'translateX(0)',
                    md: 'translateX(25%)',
                    lg: 'translateX(30%)',
                  },
                  // boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  borderRadius: '8px',
                  overflow: { xs: 'auto', md: 'hidden' },
                }}
              >
                <CodeWindow
                  code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello World</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}
                />
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </Section>
  );
}
