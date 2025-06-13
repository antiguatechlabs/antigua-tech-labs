'use client';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { Section } from '@/components/common';
import { slideLeftVariant, staggerContainerVariant, fadeVariant, buttonHoverVariant } from '@/lib/animationVariants';
import { ContactContent } from '@/lib/data';
import {
  MotionStack,
  MotionPaper,
  MotionButton,
  MotionDiv,
} from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

export function Contact({ content }: { content: ContactContent }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Section
      id="contact"
      ref={ref}
      sx={{
        py: { xs: 5, md: 8 },
        bgcolor: 'grey.50',
      }}
      animation="fadeInRight"
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

      <Box
        component="form"
        sx={{
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <MotionPaper
          sx={{
            borderRadius: 1,
            boxShadow: 1,
            bgcolor: 'background.paper',
          }}
          {...staggerContainerVariant}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          elevation={2}
          whileHover={{
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 },
          }}
        >
          <MotionStack spacing={{ xs: 2, sm: 3 }} padding={{ xs: 3, sm: 6 }}>
            <MotionDiv {...fadeVariant} style={{ width: '100%' }}>
              <FormControl fullWidth required>
                <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  {content.formLabels.name}
                </FormLabel>
                <TextField
                  placeholder={content.placeholders.name}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  sx={{
                    mt: 1,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.dark',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.dark',
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              </FormControl>
            </MotionDiv>

            <MotionDiv {...fadeVariant} style={{ width: '100%' }}>
              <FormControl fullWidth required>
                <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  {content.formLabels.email}
                </FormLabel>
                <TextField
                  type="email"
                  placeholder={content.placeholders.email}
                  variant="outlined"
                  fullWidth
                  size="medium"
                  sx={{
                    mt: 1,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.dark',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.dark',
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              </FormControl>
            </MotionDiv>

            <MotionDiv {...fadeVariant} style={{ width: '100%' }}>
              <FormControl fullWidth required>
                <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                  {content.formLabels.message}
                </FormLabel>
                <TextareaAutosize
                  minRows={4}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    borderColor: '#E2E8F0',
                    marginTop: '8px',
                    fontSize: '1rem',
                    minHeight: '6rem',
                    transition: 'border-color 0.2s ease-in-out',
                  }}
                />
              </FormControl>
            </MotionDiv>
            <Box display={'flex'} justifyContent="center">
              <MotionButton
                variant="contained"
                color="primary"
                size="large"
                // fullWidth
                sx={{ mt: { xs: 1, md: 2 }, width: '50%' }}
                {...buttonHoverVariant}
                whileHover="hover"
                whileTap="tap"
                initial="initial"
              >
                {content.buttonText}
              </MotionButton>
            </Box>
          </MotionStack>
        </MotionPaper>
      </Box>
    </Section>
  );
}
