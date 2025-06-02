'use client';

import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/context/languageContext';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';
import { FooterContent, getFooterContent } from '@/lib/data';
import { MotionBox, MotionStack, MotionTypography } from '@/lib/motionComponents';
import { colors } from '@/theme';

interface FooterProps {
  email?: string;
  address?: string;
  phone?: string;
  logo?: string;
}

export const Footer = ({
  email = 'info@antiguadigital.com',
  address = '3891 Ranchview Dr. Richardson',
  phone = '+1 (234) 567-8901',
  logo = '/logo.png',
}: FooterProps) => {
  const { language } = useLanguage();
  const [content, setContent] = useState<FooterContent>(getFooterContent(language));

  // Update content when language changes
  useEffect(() => {
    setContent(getFooterContent(language));
  }, [language]);

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
            src="/components/footer-shape-1.png"
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
            src="/components/footer-shape-1.png"
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
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
              variants={fadeIn}
            >
              <MotionStack spacing={3} alignItems="flex-start">
                <Link href="/" passHref>
                  <Box sx={{ height: '60px', position: 'relative', width: '150px' }}>
                    <Image src={logo} alt={content.companyName} fill style={{ objectFit: 'contain' }} />
                  </Box>
                </Link>
                <MotionTypography variant="body2" sx={{ color: 'grey.400' }}>
                  {content.companyDescription}
                </MotionTypography>
                <Stack spacing={2} width="100%">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon sx={{ color: 'primary.light' }} fontSize="small" />
                    <MuiLink
                      href={`mailto:${email}`}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: 'primary.light' },
                      }}
                    >
                      {email}
                    </MuiLink>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnIcon sx={{ color: 'primary.light' }} fontSize="small" />
                    <Typography variant="body2">{address}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIcon sx={{ color: 'primary.light' }} fontSize="small" />
                    <MuiLink
                      href={`tel:${phone}`}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        '&:hover': { color: 'primary.light' },
                      }}
                    >
                      {phone}
                    </MuiLink>
                  </Stack>
                </Stack>
              </MotionStack>
            </MotionBox>

            {/* About Company links */}
            <MotionBox
              variants={fadeIn}
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
                  variants={staggerContainer}
                >
                  {content.sections.company.links.map(
                    (item, index) => (
                      <MotionBox
                        key={index}
                        variants={slideUp}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <MuiLink
                          href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                          sx={{
                            color: 'white',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: colors.violet,
                            },
                          }}
                        >
                          {item}
                        </MuiLink>
                      </MotionBox>
                    ),
                  )}
                </MotionStack>
              </Stack>
            </MotionBox>

            {/* Services links */}
            <MotionBox
              variants={fadeIn}
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
                  variants={staggerContainer}
                >
                  {content.sections.product.links.map((item, index) => (
                    <MotionBox
                      key={index}
                      variants={slideUp}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <MuiLink
                        href={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
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
          sx={{ borderTop: '1px solid', borderColor: 'grey.800', py: 3 }}
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
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  sx={{
                    fontSize: '0.875rem',
                    color: 'grey.500',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
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
    </Box>
  );
};
