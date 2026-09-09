'use client';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

import { GradientText } from '@/components/ui';
import { MotionBox, MotionTypography } from '@/lib/motionComponents';
import { colors } from '@/theme';

const content = {
  en: {
    title: '404',
    heading: 'Page Not Found',
    description:
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    buttonText: 'Go to Homepage',
    recoveryHeading: 'Where to look next',
    recoveryLinks: [
      { label: 'English homepage', href: '/en' },
      { label: 'Spanish homepage', href: '/es' },
      { label: 'About Antigua Tech Labs', href: '/en/about' },
      { label: 'Services', href: '/en/services' },
      { label: 'Portfolio', href: '/en/portfolio' },
      { label: 'Sitemap', href: '/sitemap.xml' },
      { label: 'Agent instructions', href: '/llms.txt' },
    ],
  },
  es: {
    title: '404',
    heading: 'Página No Encontrada',
    description:
      'La página que estás buscando puede haber sido eliminada, su nombre ha cambiado o no está disponible temporalmente.',
    buttonText: 'Ir a la Página Principal',
    recoveryHeading: 'Dónde buscar después',
    recoveryLinks: [
      { label: 'Página principal en inglés', href: '/en' },
      { label: 'Página principal en español', href: '/es' },
      { label: 'Sobre Antigua Tech Labs', href: '/es/about' },
      { label: 'Servicios', href: '/es/services' },
      { label: 'Portafolio', href: '/es/portfolio' },
      { label: 'Mapa del sitio', href: '/sitemap.xml' },
      { label: 'Instrucciones para agentes', href: '/llms.txt' },
    ],
  },
} as const;

export default function NotFound() {
  const pageContent = content['en'];

  return (
    <html lang={'en'}>
      <body style={{ margin: 0, fontFamily: 'Inter, sans-serif', backgroundColor: '#fff' }}>
        <Container>
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

            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                {pageContent.heading}
              </Typography>
            </MotionBox>

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

            <Box component="nav" aria-label={pageContent.recoveryHeading} sx={{ maxWidth: '600px', mb: 4 }}>
              <MotionTypography
                variant="body2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                sx={{ mb: 1, color: 'text.secondary' }}
              >
                {pageContent.recoveryHeading}
              </MotionTypography>
              <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, p: 0, m: 0, listStyle: 'none' }}>
                {pageContent.recoveryLinks.map(link => (
                  <Box component="li" key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </Box>
                ))}
              </Box>
            </Box>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                component={Link}
                href={'/'}
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
      </body>
    </html>
  );
}
