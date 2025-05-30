'use client';

import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { MotionBox } from '@/lib/motionComponents';

interface FooterProps {
  companyName?: string;
  companyDescription?: string;
  email?: string;
  address?: string;
  phone?: string;
  logo?: string;
}

const Footer = ({
  companyName = 'Antigua Digital',
  companyDescription = 'Empowering businesses with innovative digital solutions for growth and success.',
  email = 'info@antiguadigital.com',
  address = '3891 Ranchview Dr. Richardson',
  phone = '+1 (234) 567-8901',
  logo = '/logo.png',
}: FooterProps) => (
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
      <Box sx={{ py: 8 }}>
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
          <Box>
            <Stack spacing={3} alignItems="flex-start">
              <Link href="/" passHref>
                <Box sx={{ height: '60px', position: 'relative', width: '150px' }}>
                  <Image src={logo} alt={companyName} fill style={{ objectFit: 'contain' }} />
                </Box>
              </Link>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                {companyDescription}
              </Typography>
              <Stack spacing={2} width="100%">
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon sx={{ color: 'secondary.light' }} fontSize="small" />
                  <MuiLink
                    href={`mailto:${email}`}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      '&:hover': { color: 'secondary.light' },
                    }}
                  >
                    {email}
                  </MuiLink>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon sx={{ color: 'secondary.light' }} fontSize="small" />
                  <Typography variant="body2">{address}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon sx={{ color: 'secondary.light' }} fontSize="small" />
                  <MuiLink
                    href={`tel:${phone}`}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      '&:hover': { color: 'secondary.light' },
                    }}
                  >
                    {phone}
                  </MuiLink>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          {/* About Company links */}
          <Box>
            <Stack spacing={3} alignItems="flex-start">
              <Typography variant="h6" sx={{ mb: 1 }}>
                About Company
              </Typography>
              <Stack spacing={1.5} alignItems="flex-start">
                {['About Us', 'FAQ', 'Testimonials', 'Services', 'Blog & News'].map(
                  (item, index) => (
                    <MuiLink
                      key={index}
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      sx={{
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'secondary.light',
                          transform: 'translateX(5px)',
                          display: 'inline-block',
                        },
                      }}
                    >
                      {item}
                    </MuiLink>
                  ),
                )}
              </Stack>
            </Stack>
          </Box>

          {/* Services links */}
          <Box>
            <Stack spacing={3} alignItems="flex-start">
              <Typography variant="h6" sx={{ mb: 1 }}>
                Services
              </Typography>
              <Stack spacing={1.5} alignItems="flex-start">
                {[
                  { name: 'Web Development', path: '/services/web-development' },
                  { name: 'Mobile Applications', path: '/services/mobile-apps' },
                  { name: 'UI/UX Design', path: '/services/ui-ux-design' },
                  { name: 'Digital Marketing', path: '/services/digital-marketing' },
                  { name: 'IT Consulting', path: '/services/consulting' },
                ].map((item, index) => (
                  <MuiLink
                    key={index}
                    href={item.path}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'secondary.light',
                        transform: 'translateX(5px)',
                        display: 'inline-block',
                      },
                    }}
                  >
                    {item.name}
                  </MuiLink>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Bottom section */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'grey.800', py: 3 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'center' }}
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © {new Date().getFullYear()} {companyName} | All Rights Reserved
          </Typography>
          <Stack direction="row" spacing={3}>
            {['Terms & Conditions', 'Privacy Policy', 'Contact Us'].map((item, index) => (
              <MuiLink
                key={index}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{
                  fontSize: '0.875rem',
                  color: 'grey.500',
                  textDecoration: 'none',
                  '&:hover': { color: 'secondary.light' },
                }}
              >
                {item}
              </MuiLink>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Container>
  </Box>
);

export default Footer;
