'use client';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayoutIcon from '@mui/icons-material/Dashboard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { getFeaturesContent, FeaturesContent, FeatureItem } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';

import SpotlightCard from '../ui/SpotlightCard';

// Create motion components
const MotionCard = motion(Card);

export function Features() {
  const { language } = useLanguage();
  const [features, setFeatures] = useState<FeaturesContent>(getFeaturesContent(language));

  // Update content when language changes
  useEffect(() => {
    setFeatures(getFeaturesContent(language));
  }, [language]);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          {textWithGradient(features.title)}
        </Typography>
        {features.subtitle && (
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            {features.subtitle}
          </Typography>
        )}
      </Box>

      <Box
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
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
          {features.items.map((feature: FeatureItem, index: number) => (
            <Box key={index}>
              <Box component={motion.div} variants={item}>
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
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
