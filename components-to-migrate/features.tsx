'use client';
import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import LayoutIcon from '@mui/icons-material/Dashboard';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import SecurityIcon from '@mui/icons-material/Security';

// Create motion components
const MotionCard = motion(Card);

export function Features() {
  const features = [
    {
      icon: <LayoutIcon fontSize="large" />,
      title: 'Custom Web Applications',
      description:
        'Tailored web applications designed to solve your specific business challenges and streamline operations.',
    },
    {
      icon: <SmartphoneIcon fontSize="large" />,
      title: 'Mobile App Development',
      description:
        'Native and cross-platform mobile applications that provide seamless experiences across all devices.',
    },
    {
      icon: <ShoppingCartIcon fontSize="large" />,
      title: 'E-commerce Solutions',
      description:
        'Scalable online stores with secure payment processing, inventory management, and customer analytics.',
    },
    {
      icon: <BarChartIcon fontSize="large" />,
      title: 'Data Visualization',
      description:
        'Interactive dashboards and reports that transform complex data into actionable business insights.',
    },
    {
      icon: <RefreshIcon fontSize="large" />,
      title: 'API Integration',
      description:
        'Seamless connections between your systems and third-party services to automate workflows and enhance functionality.',
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: 'Security & Maintenance',
      description:
        'Ongoing support, security updates, and performance optimization to keep your applications running smoothly.',
    },
  ];

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
    <Box component="section" sx={{ py: 12, width: '100%' }} id="services">
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.875rem', md: '2.25rem' },
            }}
          >
            Comprehensive <span className="gradient-text">Digital Solutions</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            From concept to deployment, we build scalable applications that adapt to your evolving
            business needs.
          </Typography>
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
            {features.map((feature, index) => (
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
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
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
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
