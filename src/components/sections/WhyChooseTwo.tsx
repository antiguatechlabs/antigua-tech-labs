'use client';

import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Container, Typography, Button, Stack, Link as MuiLink, Paper } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { fadeIn } from '@/lib/animations';
import { getWhyChooseTwoContent, WhyChooseTwoContent } from '@/lib/data';
import { MotionBox } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

export const WhyChooseTwo = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<WhyChooseTwoContent>(getWhyChooseTwoContent(language));

  // Update content when language changes
  useEffect(() => {
    setContent(getWhyChooseTwoContent(language));
  }, [language]);
  return (
    <Section
      sx={{
        position: 'relative',
        py: 10,
        overflow: 'hidden',
      }}
      animation="none" // We'll use custom animations inside
      withContainer={false} // We'll handle the container ourselves
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${content.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1,
          },
        }}
      >
        {/* Need Help Box */}
        <Paper
          elevation={4}
          sx={{
            position: 'absolute',
            top: { xs: '20px', md: '40px' },
            right: { xs: '20px', md: '40px' },
            bgcolor: 'primary.main',
            color: 'white',
            p: 2,
            borderRadius: 1,
            zIndex: 2,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                bgcolor: 'white',
                color: 'primary.dark',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneIcon fontSize="small" />
            </Box>
            <Stack spacing={0}>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Need help?
              </Typography>
              <MuiLink
                href={`tel:${content.phoneNumber}`}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { color: 'rgba(255, 255, 255, 0.8)' },
                }}
              >
                {content.phoneNumber}
              </MuiLink>
            </Stack>
          </Stack>
        </Paper>
      </Box>

      {/* Content */}
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: { xs: '100%', md: '50%' },
          }}
        >
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'primary.light',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                mb: 1.5,
              }}
            >
              {content.subtitle}
            </Typography>

            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 3,
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              {textWithGradient(content.title)}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                mb: 4,
                color: 'grey.300',
              }}
            >
              {content.description}
            </Typography>

            <Box sx={{ mb: 5 }}>
              <Button
                component={Link}
                href={content.buttonLink}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
              >
                {content.buttonText}
              </Button>
            </Box>

            {/* Since Year Text */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', md: '6rem' },
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 0.15)',
                lineHeight: 1,
                position: 'relative',
                zIndex: -1,
              }}
            >
              Since {content.yearEstablished}
            </Typography>
          </MotionBox>
        </Box>
      </Container>
    </Section>
  );
};

