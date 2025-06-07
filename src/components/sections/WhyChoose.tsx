'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { getWhyChooseContent, WhyChooseContent } from '@/lib/data';
import { MotionBox, MotionPaper } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

export const WhyChoose = () => {
  const { language } = useLanguage();
  const [whyChooseContent, setWhyChooseContent] = useState<WhyChooseContent>(
    getWhyChooseContent(language),
  );

  // Update content when language changes
  useEffect(() => {
    setWhyChooseContent(getWhyChooseContent(language));
  }, [language]);
  return (
    <Section id='why-choose'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 5,
          alignItems: 'center',
        }}
      >
        {/* Left Content */}
        <Box sx={{ flex: 1 }}>
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInLeft}
          >
            <Typography
              color="primary.main"
              fontWeight="bold"
              variant="subtitle1"
              sx={{
                mb: 1.5,
              }}
            >
              {textWithGradient(whyChooseContent.subtitle)}
            </Typography>

            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: 'text.primary',
              }}
            >
              {textWithGradient(whyChooseContent.title)}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'text.secondary',
                fontSize: '1.125rem',
              }}
            >
              {whyChooseContent.description}
            </Typography>

            <Box>
              <Button
                component={Link}
                href={whyChooseContent.buttonLink}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
              >
                {whyChooseContent.buttonText}
              </Button>
            </Box>
          </MotionBox>
        </Box>

        {/* Right Image */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInRight}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Paper
              elevation={4}
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                width: '100%',
                height: { xs: '300px', md: '400px' },
              }}
            >
              <Box
                component="div"
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Image
                  src={whyChooseContent.imageSrc}
                  alt="Why Choose Us"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Paper>

            {/* Floating Element */}
            <MotionPaper
              elevation={4}
              sx={{
                position: 'absolute',
                // Responsive bottom positioning
                bottom: {
                  // xs: '-15px', // Closer to image on mobile
                  sm: '-18px',
                  md: '-20px',
                  lg: '-25px',
                },
                // Responsive right positioning
                right: {
                  // xs: '50%', // Center on mobile
                  sm: '30%',
                  md: '15%',
                  lg: '10%',
                  xl: '5%',
                },
                // Transform to adjust horizontal centering on mobile
                transform: {
                  // xs: 'translateX(50%)', // Center on mobile
                  sm: 'translateX(0)', // No transform on larger screens
                },
                // Responsive width
                width: {
                  sm: 'auto',
                },
                maxWidth: {
                  xs: '180px',
                  sm: '190px',
                  md: '200px',
                  lg: '220px',
                },
                // Responsive padding
                p: {
                  xs: 2,
                  sm: 2.25,
                  md: 2.5,
                  lg: 3,
                },
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 2,
                // Add z-index to ensure it appears above other elements
                zIndex: 1,
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: [0, -10, 0],
                opacity: 1,
                transition: {
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'loop',
                  },
                  opacity: {
                    duration: 0.5,
                    delay: 0.5,
                  },
                },
              }}
            >
              <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                  Since {whyChooseContent.yearEstablished}
              </Typography>
              <Typography variant="body2">{whyChooseContent.tagline}</Typography>
            </MotionPaper>
          </MotionBox>
        </Box>
      </Box>
    </Section>
  );
};
