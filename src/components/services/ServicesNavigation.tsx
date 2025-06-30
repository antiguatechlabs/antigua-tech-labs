'use client';
import ApiIcon from '@mui/icons-material/Api';
import BuildIcon from '@mui/icons-material/Build';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import WebIcon from '@mui/icons-material/Web';
import { Box, Typography, CardContent } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { fadeVariant, staggerContainerVariant } from '@/lib';
import { ServicesNavigationContent, ServicesNavigationItem } from '@/lib/data';
import { MotionDiv, MotionCard } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

interface ServicesNavigationProps {
  content: ServicesNavigationContent;
}

export function ServicesNavigation({ content }: ServicesNavigationProps) {
  // Map icon names to actual icon components
  const iconMap: Record<string, React.ReactNode> = {
    web: <WebIcon fontSize="large" />,
    mobile: <PhoneAndroidIcon fontSize="large" />,
    api: <ApiIcon fontSize="large" />,
    maintenance: <BuildIcon fontSize="large" />,
    design: <DesignServicesIcon fontSize="large" />,
    '3d': <ThreeDRotationIcon fontSize="large" />,
  };

  const handleScrollToService = (serviceId: string) => {
    const serviceSection = document.getElementById(serviceId);
    if (serviceSection) {
      const navbarHeight = 64;
      const elementPosition = serviceSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Section
      id="services-navigation"
      animation="fadeInUp"
      animationDelay={0.2}
      sx={{
        paddingY: { xs: 6, md: 8, lg: 10 },
        backgroundColor: 'rgba(248, 250, 252, 0.5)',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.875rem', md: '2.25rem' },
          }}
        >
          {textWithGradient(content.title)}
        </Typography>
      </Box>

      <MotionDiv
        {...staggerContainerVariant}
        style={{ width: '100%' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {content.items.map((item: ServicesNavigationItem, index: number) => (
            <MotionDiv key={index} {...fadeVariant}>
              <MotionCard
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    borderColor: 'primary.main',
                  },
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScrollToService(item.id)}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      mx: 'auto',
                      background: 'linear-gradient(135deg, #9c43f8 0%, #26c5f3 100%)',
                      color: 'white',
                    }}
                  >
                    {iconMap[item.icon] || <WebIcon fontSize="large" />}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </MotionDiv>
          ))}
        </Box>
      </MotionDiv>
    </Section>
  );
}
