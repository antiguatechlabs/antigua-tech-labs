'use client';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { cardHoverVariant, fadeVariant, slideLeftVariant, staggerContainerVariant } from '@/lib/animationVariants';
import { getTestimonialsContent, TestimonialsContent, TestimonialItem } from '@/lib/data';
import {
  MotionTypography,
  MotionPaper,
  MotionStack,
  MotionDiv,
} from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

export default function Testimonials() {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState<TestimonialsContent>(
    getTestimonialsContent(language),
  );
  const ref = useRef(null);
  useInView(ref, { once: true, amount: 0.2 });

  // Update content when language changes
  useEffect(() => {
    setTestimonials(getTestimonialsContent(language));
  }, [language]);

  // Generate avatar URLs using UI Avatars service
  const getAvatarUrl = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

  return (
    <Section
      id="testimonials"
      ref={ref}
      sx={{
        py: { xs: 5, md: 8 },
        maxWidth: 'xl',
      }}
      animation="slideUp"
      animationDelay={0.2}
    >
      <MotionTypography
        variant="h2"
        sx={{
          textAlign: 'center',
          mb: { xs: 4, md: 6 },
          fontSize: { xs: '1.75rem', md: '2.25rem' },
        }}
        {...slideLeftVariant}
      >
        {textWithGradient(testimonials.title)}
      </MotionTypography>

      <MotionDiv
        style={{ display: 'flex', flexWrap: 'wrap', marginLeft: -8, marginRight: -8 }}
        {...staggerContainerVariant}
        initial="hidden"
        animate="visible"
      >
        {testimonials.items.map((testimonial: TestimonialItem, index: number) => (
          <Box
            key={index}
            sx={{
              width: { xs: '100%', md: '50%' },
              px: 2,
              mb: 4,
            }}
          >
            <MotionPaper
              sx={{
                p: { xs: 2.5, md: 3 },
                bgcolor: 'grey.50',
                borderRadius: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              {...cardHoverVariant}
              whileHover="hover"
              custom={index}
            >
              <MotionDiv
                style={{ marginBottom: 16 }}
                {...fadeVariant}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </Typography>
              </MotionDiv>

              <MotionStack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                <Avatar
                  alt={testimonial.name}
                  src={testimonial.avatar || getAvatarUrl(testimonial.name)}
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                  }}
                />
                <Stack spacing={0}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      color: 'text.secondary',
                    }}
                  >
                    {testimonial.title}, {testimonial.company}
                  </Typography>
                </Stack>
              </MotionStack>
            </MotionPaper>
          </Box>
        ))}
      </MotionDiv>
    </Section>
  );
}
