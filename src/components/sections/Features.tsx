'use client';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayoutIcon from '@mui/icons-material/Dashboard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography, CardContent } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { fadeVariant, staggerContainerVariant } from '@/lib';
import { FeaturesContent, FeatureItem } from '@/lib/data';
import { MotionCard, MotionDiv } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

import SpotlightCard from '../ui/SpotlightCard';

export function Features({ content }: { content: FeaturesContent }) {

  // Map icon names to actual icon components
  const iconMap: Record<string, React.ReactNode> = {
    LayoutIcon: <LayoutIcon fontSize="large" />,
    SmartphoneIcon: <SmartphoneIcon fontSize="large" />,
    ShoppingCartIcon: <ShoppingCartIcon fontSize="large" />,
    BarChartIcon: <BarChartIcon fontSize="large" />,
    RefreshIcon: <RefreshIcon fontSize="large" />,
    SecurityIcon: <SecurityIcon fontSize="large" />,
    StarIcon: <StarIcon fontSize="large" />,
  };

  return (
    <Section
      id="services"
      animation="slideUp"
      animationDelay={0.2}
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
        {content.subtitle && (
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            {content.subtitle}
          </Typography>
        )}
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
          {content.items.map((feature: FeatureItem, index: number) => (
            <Box key={index}>
              <MotionDiv {...fadeVariant}>
                <MotionCard
                  sx={{
                    height: '100%',
                    border: '1px solid',
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
                  <SpotlightCard spotlightColor="rgba(100, 81, 112, 0.2)">
                    <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
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
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          flex: 1,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </SpotlightCard>
                </MotionCard>
              </MotionDiv>
            </Box>
          ))}
        </Box>
      </MotionDiv>
    </Section>
  );
}
