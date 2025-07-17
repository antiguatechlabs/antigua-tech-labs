'use client';

import { Box, Typography, Button, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AntiguaVolcanoesCold from '@/assets/components/antigua-volcanoes-cold.png';
import { Section } from '@/components/common';
import { slideLeftVariant, slideRightVariant } from '@/lib/animationVariants';
import { WhyChooseContent } from '@/lib/data';
import { MotionBox, MotionPaper } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

const imageMap = {
  cold: AntiguaVolcanoesCold,
};


type ImageSrcType = keyof typeof imageMap;

interface WhyChooseContentWithImageSrc extends Omit<WhyChooseContent, 'imageSrc'> {
  imageSrc: ImageSrcType;
}

export const WhyChoose = ({ content }: { content: WhyChooseContentWithImageSrc }) => (
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
          {...slideLeftVariant}
        >
          <Typography
            color="primary.main"
            fontWeight="bold"
            variant="subtitle1"
            sx={{
              mb: 1.5,
            }}
          >
            {textWithGradient(content.subtitle)}
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
            {textWithGradient(content.title)}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'text.secondary',
              fontSize: '1.125rem',
            }}
          >
            {content.description}
          </Typography>

          <Box>
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
        </MotionBox>
      </Box>

      {/* Right Image */}
      <Box sx={{ flex: 1, position: 'relative', width: '100%' }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          {...slideRightVariant}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Paper
            elevation={4}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              width: '100%',
              height: { xs: '300px', md: '400px' },
              position: 'relative',
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
                src={imageMap[content.imageSrc]}
                alt="Why Choose Us"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* Floating Element */}
            <MotionPaper
              elevation={4}
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                transform: 'translate(50%, 50%)',
                width: 180,
                bgcolor: colors.blueGray,
                color: 'white',
                borderRadius: 2,
                zIndex: 2,
                px: 2,
                py: 1.5,
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
              <Typography variant="h6" component="h4" sx={{ mb: 0.5 }}>
                {content.yearEstablished}
              </Typography>
              <Typography variant="body2">{content.tagline}</Typography>
            </MotionPaper>
          </Paper>
        </MotionBox>
      </Box>

    </Box>
  </Section>
);
