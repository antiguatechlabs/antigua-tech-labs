'use client';
import {
  Typography,
} from '@mui/material';
import { useRef } from 'react';

import { Section } from '@/components/common';
import { slideLeftVariant } from '@/lib/animationVariants';
import { ContactContent } from '@/lib/data';
import {
  MotionStack,
  MotionDiv,
} from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

import { ContactForm } from './ContactForm';

export function Contact({ content }: { content: ContactContent }) {
  const ref = useRef(null);

  return (
    <Section
      id="contact"
      ref={ref}
      sx={{
        py: { xs: 5, md: 8 },
        bgcolor: 'grey.50',
      }}
      animation="fadeIn"
      animationDelay={0.3}
    >
      <MotionStack spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 3, md: 4 } }}>
        <MotionDiv {...slideLeftVariant}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {textWithGradient(content.title)}
          </Typography>
        </MotionDiv>

        {content.subtitle && (
          <MotionDiv {...slideLeftVariant}>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {content.subtitle}
            </Typography>
          </MotionDiv>
        )}
      </MotionStack>

      <ContactForm content={content} />
    </Section>
  );
}
