/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, Button, Container } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { GradientText } from '@/components/ui';
import { defaultLanguage, supportedLanguages } from '@/lib/i18n/config';
import { MotionBox, MotionTypography } from '@/lib/motionComponents';
import { colors } from '@/theme';

const content = {
  en: {
    title: '404',
    heading: 'Page Not Found',
    description:
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    buttonText: 'Go to Homepage',
  },
  es: {
    title: '404',
    heading: 'Página No Encontrada',
    description:
      'La página que estás buscando puede haber sido eliminada, su nombre ha cambiado o no está disponible temporalmente.',
    buttonText: 'Ir a la Página Principal',
  },
} as const;

export default function NotFound() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<'en' | 'es'>(defaultLanguage);

  useEffect(() => {
    console.error('404 page accessed');

    const detectLanguage = () => {
      // 1. Check from URL
      const segments = pathname?.split('/');
      if (segments?.length > 1 && supportedLanguages.includes(segments[1] as any)) {
        return segments[1] as 'en' | 'es';
      }

      // 2. Check browser language
      const browserLang = navigator.language.slice(0, 2);
      if (supportedLanguages.includes(browserLang as any)) {
        return browserLang as 'en' | 'es';
      }

      // 3. Fallback
      return defaultLanguage;
    };

    setLanguage(detectLanguage());
  }, [pathname]);

  const pageContent = content[language];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 8,
          px: { xs: 2, md: 4 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GradientText
            component="h1"
            startColor={colors.violet}
            endColor={colors.aqua}
            sx={{
              fontSize: { xs: '8rem', md: '12rem' },
              fontWeight: 800,
              lineHeight: 1,
              mb: 2,
              letterSpacing: '-0.05em',
            }}
          >
            {pageContent.title}
          </GradientText>
        </MotionBox>

        <MotionTypography
          variant="h3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          {pageContent.heading}
        </MotionTypography>

        <MotionTypography
          variant="body1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          sx={{
            mb: 6,
            maxWidth: '600px',
            fontSize: { xs: '1rem', md: '1.125rem' },
            color: 'text.secondary',
          }}
        >
          {pageContent.description}
        </MotionTypography>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            component={Link}
            href={`/${language}`}
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '8px',
              background: colors.gradientMain,
              '&:hover': {
                background: colors.gradientSecondary,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(90, 48, 255, 0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {pageContent.buttonText}
          </Button>
        </MotionBox>
      </Box>
    </Container>
  );
}
