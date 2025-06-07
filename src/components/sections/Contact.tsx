'use client';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { slideUp, buttonHover } from '@/lib/animations';
import { getContactContent, ContactContent } from '@/lib/data';
import {
  MotionStack,
  MotionPaper,
  MotionButton,
} from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

export function Contact() {
  const { language } = useLanguage();
  const [content, setContent] = useState<ContactContent>(getContactContent(language));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Update content when language changes
  useEffect(() => {
    setContent(getContactContent(language));
  }, [language]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Section
      id="contact"
      ref={ref}
      sx={{
        py: { xs: 5, md: 8 },
        bgcolor: 'grey.50',
      }}
      animation="slideRight"
      animationDelay={0.3}
    >
      <MotionStack spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 3, md: 4 } }}>
        <Box component={motion.div} variants={slideUp}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {textWithGradient(content.title)}
          </Typography>
        </Box>

        {content.subtitle && (
          <Box component={motion.div} variants={slideUp}>
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
          </Box>
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
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          elevation={2}
          whileHover={{
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 },
          }}
        >
          <MotionStack spacing={{ xs: 2, sm: 3 }} padding={{ xs: 3, sm: 6 }}>
            <Box component={motion.div} variants={itemVariants} sx={{ width: '100%' }}>
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
            </Box>

            <Box component={motion.div} variants={itemVariants} sx={{ width: '100%' }}>
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
            </Box>

            <Box component={motion.div} variants={itemVariants} sx={{ width: '100%' }}>
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
            </Box>
            <Box display={'flex'} justifyContent="center">
              <MotionButton
                variant="contained"
                color="primary"
                size="large"
                // fullWidth
                sx={{ mt: { xs: 1, md: 2 }, width: '50%' }}
                variants={buttonHover}
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
