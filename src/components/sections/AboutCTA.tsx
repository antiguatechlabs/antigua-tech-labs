'use client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { Section } from '@/components/common';
import { slideLeftVariant, cardHoverVariant } from '@/lib/animationVariants';
import { AboutCTAContent, ContactContent } from '@/lib/data';
import { MotionPaper, MotionDiv } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

import { ContactForm } from './ContactForm';

interface AboutCTAProps {
  content: AboutCTAContent;
  contactContent: ContactContent;
  lang: string;
}

interface CTAButton {
  text: string;
  link: string;
  variant: string;
}

// Reusable components
const DecorativeCircle = () => (
  <Box
    sx={{
      position: 'absolute',
      width: 250,
      height: 250,
      borderRadius: '50%',
      bgcolor: 'primary.light',
      top: -125,
      right: -125,
      opacity: 0.15,
    }}
  />
);

const CTAButtons = ({
  primaryCta,
}: {
  primaryCta: CTAButton;
  secondaryCta: CTAButton;
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
      justifyContent: { xs: 'center', md: 'flex-start' },
      mb: 5,
    }}
  >
    <Button
      component={Link}
      href={primaryCta.link}
      variant="contained"
      size="medium"
      sx={{
        borderRadius: 2,
        textTransform: 'uppercase',
        px: 4,
        py: 1.5,
        letterSpacing: 1,
        '&:hover': {
          transform: 'scale(1.05)',
        },
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      {primaryCta.text}
    </Button>
  </Box>
);

const ContactCard = ({
  contactContent,
}: {
  contactContent: ContactContent;
}) => (
  <MotionPaper
    elevation={3}
    sx={{
      position: 'relative',
      p: { xs: 2, md: 3 },
      borderRadius: 3,
      bgcolor: 'background.paper',
      mx: 'auto',
      maxWidth: 500,
      transform: { xs: 'rotate(0deg)', md: 'rotate(-2deg)' },
      transition: 'transform 0.3s',
      '&:hover': { transform: 'rotate(0deg)' },
    }}
    {...cardHoverVariant}
    initial="initial"
    whileInView="hover"
    viewport={{ once: true }}
  >
    <ContactForm content={contactContent} />
  </MotionPaper>
);

export function AboutCTA({ content, contactContent, lang: _lang }: AboutCTAProps) {
  return (
    <Section
      id="about-cta"
      sx={{
        bgcolor: 'grey.50',
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 6 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DecorativeCircle />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 6,
        }}
      >
        {/* Text & Actions */}
        <Box sx={{ flex: 1, width: '100%' }}>
          <MotionDiv {...slideLeftVariant}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                textAlign: { xs: 'center', md: 'left' },
                mb: 2,
              }}
            >
              {textWithGradient(content.title)}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'left' },
                mb: 4,
              }}
            >
              {content.subtitle}
            </Typography>

            <CTAButtons primaryCta={content.primaryCta} secondaryCta={content.secondaryCta} />
          </MotionDiv>
        </Box>

        {/* Contact Card */}
        <Box sx={{ flex: 1, width: '100%' }}>
          <ContactCard contactContent={contactContent} />
        </Box>
      </Box>
    </Section>
  );
}
