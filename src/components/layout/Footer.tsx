'use client';

import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import FooterShape from '@/assets/footer/footer-shape-1.webp';
import { LegalModal } from '@/components/ui';
import { fadeVariant, slideUpVariant, staggerContainerVariant } from '@/lib/animationVariants';
import { FooterContent, getPrivacyPolicyContent, getTermsOfServiceContent, LegalContent } from '@/lib/data';
import { MotionBox, MotionStack, MotionTypography } from '@/lib/motionComponents';
import { colors } from '@/theme';

export const Footer = ({ content }: { content: FooterContent }) => {
  const params = useParams();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<LegalContent | null>(null);
  const [modalTitle, setModalTitle] = useState('');

  // Get current language from URL
  const currentLang = params.lang as string || 'en';

  // Smooth scroll handler for service links
  const handleSmoothScroll = (serviceName: string) => {
    const serviceId = serviceName.toLowerCase().replace(/\s+/g, '-');
    const targetUrl = `/${currentLang}/services#${serviceId}`;
    router.push(targetUrl);
  };

  // Handle legal document modal opening
  const handleLegalClick = (type: 'terms' | 'privacy') => {
    if (type === 'terms') {
      const content = getTermsOfServiceContent(currentLang);
      setModalContent(content);
      setModalTitle(content.title);
    } else {
      const content = getPrivacyPolicyContent(currentLang);
      setModalContent(content);
      setModalTitle(content.title);
    }
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    setModalContent(null);
    setModalTitle('');
  };

  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'grey.900', color: 'white', position: 'relative', overflow: 'hidden' }}
    >
      {/* Floating shape */}
      {/* For mobile and small tablets - bottom right position */}
      <MotionBox
        sx={{
          position: 'absolute',
          bottom: { xs: '0', sm: '10px' },
          right: { xs: '0', sm: '10px' },
          zIndex: 1,
          display: { xs: 'block', md: 'none' }, // Only show on xs and sm screens
        }}
        animate={{
          y: [0, -10, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: '150px',
              sm: '200px',
            },
            height: {
              xs: '150px',
              sm: '200px',
            },
            position: 'relative',
          }}
        >
          <Image
            src={FooterShape}
            alt=""
            fill
            style={{
              objectFit: 'contain',
              opacity: '0.5',
            }}
            sizes="(max-width: 600px) 150px, 200px"
          />
        </Box>
      </MotionBox>

      {/* For medium and large screens - original top right position */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: { md: '40px', lg: '50px' },
          right: { md: '30px', lg: '50px' },
          zIndex: 1,
          display: { xs: 'none', md: 'block' }, // Only show on md and lg screens
        }}
        animate={{
          y: [0, -20, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
      >
        <Box
          sx={{
            width: {
              sm: '350px',
              lg: '400px',
            },
            height: {
              sm: '350px',
              lg: '400px',
            },
            position: 'relative',
          }}
        >
          <Image
            src={FooterShape}
            alt=""
            fill
            style={{
              objectFit: 'contain',
              opacity: '0.5',
            }}
            sizes="(min-width: 960px) 350px, 400px"
          />
        </Box>
      </MotionBox>

      {/* Main footer content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Top section */}
        <MotionBox
          sx={{ py: 8 }}
          {...staggerContainerVariant}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 4,
            }}
          >
            {/* Company info */}
            <MotionBox
              {...fadeVariant}
            >
              <MotionStack spacing={3} alignItems="flex-start">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease-in-out',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      lineHeight: 1.2,
                      color: 'white',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {content.companyName}
                  </Typography>
                </Box>
                <MotionTypography variant="body2" sx={{ color: 'grey.400' }}>
                  {content.companyDescription}
                </MotionTypography>
                <Stack spacing={2} width="100%">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon sx={{ color: 'primary.light' }} fontSize="small" />
                    <MuiLink
                      href={`mailto:${content.email}`}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: 'primary.light' },
                      }}
                    >
                      {content.email}
                    </MuiLink>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnIcon sx={{ color: 'primary.light' }} fontSize="small" />
                    <Typography variant="body2">{content.address}</Typography>
                  </Stack>
                  {/* <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon sx={{ color: 'primary.light' }} fontSize="small" />
                    <MuiLink
                      href={`tel:${content.phone}`}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: 'primary.light' },
                      }}
                    >
                      {content.phone}
                    </MuiLink>
                  </Stack> */}
                </Stack>
              </MotionStack>
            </MotionBox>

            {/* About Company links */}
            <MotionBox
              {...fadeVariant}
            >
              <Stack spacing={3} alignItems="flex-start">
                <MotionTypography
                  variant="h6"
                  sx={{ mb: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {content.sections.company.title}
                </MotionTypography>
                <MotionStack
                  spacing={1.5}
                  alignItems="flex-start"
                  {...staggerContainerVariant}
                >
                  {content.sections.company.links.map(
                    (item, index) => (
                      <MotionBox
                        key={index}
                        {...slideUpVariant}
                      >
                        <MuiLink
                          href={`/${currentLang}${item.href}`}
                          sx={{
                            color: 'white',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: colors.violet,
                            },
                          }}
                        >
                          {item.title}
                        </MuiLink>
                      </MotionBox>
                    ),
                  )}
                </MotionStack>
              </Stack>
            </MotionBox>

            {/* Services links */}
            <MotionBox
              {...fadeVariant}
            >
              <Stack spacing={3} alignItems="flex-start">
                <MotionTypography
                  variant="h6"
                  sx={{ mb: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {content.sections.product.title}
                </MotionTypography>
                <MotionStack
                  spacing={1.5}
                  alignItems="flex-start"
                  {...staggerContainerVariant}
                >
                  {content.sections.product.links.map((item, index) => (
                    <MotionBox
                      key={index}
                      {...slideUpVariant}
                    >
                      <MuiLink
                        component="button"
                        onClick={() => handleSmoothScroll(item)}
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 'inherit',
                          fontFamily: 'inherit',
                          textAlign: 'left',
                          padding: 0,
                          '&:hover': {
                            color: colors.violet,
                          },
                        }}
                      >
                        {item}
                      </MuiLink>
                    </MotionBox>
                  ))}
                </MotionStack>
              </Stack>
            </MotionBox>
          </Box>
        </MotionBox>

        {/* Bottom section */}
        <MotionBox
          sx={{ borderTop: '1px solid', borderColor: 'grey.800', py: 3, px: 6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'center', md: 'center' }}
            spacing={2}
          >
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {content.copyright.replace('{year}', new Date().getFullYear().toString())}
            </Typography>
            <Stack direction="row" spacing={3}>
              {content.sections.legal.links.map((item, index) => (
                <MuiLink
                  key={index}
                  component="button"
                  onClick={() => {
                    const type = item.toLowerCase().includes('privacy') ? 'privacy' : 'terms';
                    handleLegalClick(type);
                  }}
                  sx={{
                    fontSize: '0.875rem',
                    color: 'grey.500',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    padding: 0,
                    '&:hover': { color: 'primary.light' },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Stack>
          </Stack>
        </MotionBox>
      </Container>

      {/* Legal Modal */}
      {modalContent && (
        <LegalModal
          open={modalOpen}
          onClose={handleModalClose}
          title={modalTitle}
          content={modalContent}
        />
      )}
    </Box>
  );
};
