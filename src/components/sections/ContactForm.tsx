'use client';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  TextareaAutosize,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(content.feedback.error.network);
      console.error('Contact form error:', error);
    }
  };

  return (
    <Box
      ref={ref}
      component="form"
      onSubmit={handleSubmit}
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
          {status === 'success' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {content.feedback.success}
            </Alert>
          )}

          {status === 'error' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage || content.feedback.error.general}
            </Alert>
          )}
          <MotionDiv {...fadeVariant} style={{ width: '100%' }}>
            <FormControl fullWidth required>
              <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                {content.formLabels.name}
              </FormLabel>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={content.placeholders.name}
                variant="outlined"
                fullWidth
                size="medium"
                required
                disabled={status === 'sending'}
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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={content.placeholders.email}
                variant="outlined"
                fullWidth
                size="medium"
                required
                disabled={status === 'sending'}
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
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={content.placeholders.message}
                minRows={4}
                required
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  borderColor: status === 'sending' ? '#ccc' : '#E2E8F0',
                  marginTop: '8px',
                  fontSize: '1rem',
                  minHeight: '6rem',
                  transition: 'border-color 0.2s ease-in-out',
                  backgroundColor: status === 'sending' ? '#f5f5f5' : 'transparent',
                }}
              />
            </FormControl>
          </MotionDiv>
          <Box display={'flex'} justifyContent="center">
            <MotionButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={status === 'sending'}
              sx={{
                mt: { xs: 1, md: 2 },
                width: '50%',
                position: 'relative',
              }}
              {...buttonHoverVariant}
              whileHover={status === 'sending' ? {} : 'hover'}
              whileTap={status === 'sending' ? {} : 'tap'}
              initial="initial"
            >
              {status === 'sending' ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  {content.feedback.sending}
                </>
              ) : (
                content.buttonText
              )}
            </MotionButton>
          </Box>
        </MotionStack>
      </MotionPaper>
    </Box>
  );
}

ContactForm.displayName = 'ContactForm';
