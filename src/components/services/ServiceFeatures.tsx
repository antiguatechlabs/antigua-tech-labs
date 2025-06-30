'use client';
import CodeIcon from '@mui/icons-material/Code';
import DevicesIcon from '@mui/icons-material/Devices';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import StarIcon from '@mui/icons-material/Star';
import ScaleIcon from '@mui/icons-material/TrendingUp';
import { Box, Typography, CardContent } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { fadeVariant, staggerContainerVariant } from '@/lib';
import { ServiceFeaturesContent, ServiceFeatureItem } from '@/lib/data';
import { MotionCard, MotionDiv } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

interface ServiceFeaturesProps {
  content: ServiceFeaturesContent;
}

export function ServiceFeatures({ content }: ServiceFeaturesProps) {
  // Map icon names to actual icon components
  const iconMap: Record<string, React.ReactNode> = {
    code: <CodeIcon fontSize="large" />,
    responsive: <DevicesIcon fontSize="large" />,
    scale: <ScaleIcon fontSize="large" />,
    search: <SearchIcon fontSize="large" />,
    speed: <SpeedIcon fontSize="large" />,
    shield: <SecurityIcon fontSize="large" />,
    star: <StarIcon fontSize="large" />,
  };

  return (
    <Section
      id="service-features"
      animation="fadeInUp"
      animationDelay={0.2}
      sx={{
        paddingY: { xs: 6, md: 8, lg: 10 },
        backgroundColor: '#e6e6e6',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 8 }}>
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
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {content.items.map((feature: ServiceFeatureItem, index: number) => (
            <MotionDiv key={index} {...fadeVariant}>
              <MotionCard
                sx={{
                  height: '100%',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,245,0.4))',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    transform: 'translateY(-5px)',
                  },
                  minHeight: { xs: '280px', md: '320px' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 4,
                      background: 'linear-gradient(135deg, #9c43f8 0%, #26c5f3 100%)',
                      color: 'white',
                    }}
                  >
                    {iconMap[feature.icon] || <StarIcon fontSize="large" />}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {feature.description}
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
