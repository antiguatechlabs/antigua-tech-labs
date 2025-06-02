'use client';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/context/languageContext';
import { getHeroContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';



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
    <Box
      component="section"
      sx={{
        width: '100%',
        py: { xs: 12, md: 16 },
        background:
          'linear-gradient(180deg, rgba(90, 48, 255, 0.03) 0%, rgba(90, 48, 255, 0.01) 100%)',
      }}
      id="hero"
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 6,
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

          <Box sx={{ flex: 1 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{ position: 'relative' }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                  component="img"
                  src="https://img.heroui.chat/image/dashboard?w=1200&h=800&u=1"
                  alt="Web application dashboard"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -24,
                    left: -24,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'success.100',
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUpIcon sx={{ color: 'success.600' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Monthly Traffic
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      +27.4% Growth
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    top: -24,
                    right: -24,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'primary.100',
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PeopleIcon sx={{ color: 'primary.600' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      User Engagement
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      +143% Increase
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background:
                    'radial-gradient(circle, rgba(90, 48, 255, 0.2) 0%, rgba(72, 38, 204, 0.1) 70%)',
                  borderRadius: '50%',
                  filter: 'blur(60px)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: -1,
                }}
              />
            </MotionBox>
          </Box>
        </Box>

        {/*  */}
        {/* <Box
          sx={{
            mt: 12,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 4, md: 6 },
          }}
        >
          {['Google', 'Microsoft', 'Slack', 'Spotify', 'Airbnb'].map((company, index) => (
            <Box
              key={index}
              sx={{
                opacity: 0.6,
                transition: 'opacity 0.3s',
                '&:hover': { opacity: 1 },
                height: 32,
                width: 'auto',
              }}
            >
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {company}
              </Typography>
            </Box>
          ))}
        </Box> */}
      </Container>
    </Box>
  );
}
