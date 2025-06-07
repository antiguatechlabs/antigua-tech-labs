'use client';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { fadeVariant } from '@/lib/animationVariants';
import { WhyChooseTwoContent } from '@/lib/data';
import { MotionBox } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

export const WhyChooseTwo = ({ content }: { content: WhyChooseTwoContent }) => (
  <Section
    sx={{
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'text.primary',
    }}
  >
    {/* Content */}
    <Container
      sx={{
        position: 'relative',
        zIndex: 1,
        p: 0,
      }}
    >
      <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" sx={{ py: 8, gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <MotionBox
            {...fadeVariant}
          >
            <Typography
              display={{ xs: 'block' }}
              variant="subtitle1"
              sx={{
                color: 'primary.main',
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
              textAlign={{ xs: 'left' }}
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 3,
                color: 'primary.contrastText',
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
                color: 'primary.contrastText',
              }}
            >
              {content.description}
            </Typography>

            {/* <Box sx={{ mb: 5 }}>
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
              </Box> */}

            {/* Since Year Text */}
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'end', height: '100px', width: '100%' }}>

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
            </Box>
          </MotionBox>
        </Box>

      </Box>

    </Container>
  </Section>
);

