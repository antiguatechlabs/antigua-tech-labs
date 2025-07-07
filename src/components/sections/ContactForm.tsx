'use client';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { staggerContainerVariant, fadeVariant, buttonHoverVariant } from '@/lib/animationVariants';
import { ContactContent } from '@/lib/data';
import {
  MotionStack,
  MotionPaper,
  MotionButton,
  MotionDiv,
} from '@/lib/motionComponents';

export function ContactForm({ content }: { content: ContactContent }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Box
      ref={ref}
      component="form"
      sx={{
        border: 'none',
        boxShadow: 'none',
        overflow: 'hidden',
        maxWidth: { xs: '100%', sm: '600px', md: '800px' },
        mx: 'auto',
      }}
    >
      <MotionPaper
        sx={{
          borderRadius: 1,
          border: 'none',
          boxShadow: 'none',
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
                minRows={1}
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
  );
}

ContactForm.displayName = 'ContactForm';
