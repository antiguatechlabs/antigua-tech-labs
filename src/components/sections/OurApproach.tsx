'use client';

import ArchitectureIcon from '@mui/icons-material/Architecture';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SearchIcon from '@mui/icons-material/Search';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { AboutApproachContent } from '@/lib/data';
import { MotionBox } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

const iconMap = {
  SearchIcon: SearchIcon,
  ArchitectureIcon: ArchitectureIcon,
  CodeIcon: CodeIcon,
  BugReportIcon: BugReportIcon,
  RocketLaunchIcon: RocketLaunchIcon,
  SupportAgentIcon: SupportAgentIcon,
} as const;

const getIconComponent = (iconName: string) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || SearchIcon;
  return <IconComponent fontSize="small" sx={{ color: 'white' }} />;
};

interface OurApproachProps {
  content: AboutApproachContent;
  lang: string;
}

export function OurApproach({ content, lang: _lang }: OurApproachProps) {
  return (
    <Section id="our-approach">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8, px: 2, pt: 6, pb: 4 }}>

        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}
          >
            {textWithGradient(content.title)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            {content.subtitle}
          </Typography>
        </MotionBox>

        {/* Process Steps: Vertical Timeline */}
        <Box sx={{ position: 'relative', pl: 4, '&::before': { content: '""', position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, bgcolor: 'divider' } }}>
          {content.steps.map((step, i) => (
            <MotionBox
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{ display: 'flex', alignItems: 'flex-start', mb: 6, gap: 2 }}
            >
              {/* Dot with icon */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {getIconComponent(step.icon)}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {step.description}
                </Typography>
              </Box>
            </MotionBox>
          ))}
        </Box>

        {/* Methodology: Glassmorphism Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 4,
            py: 6,
          }}
        >
          {content.methodology.points.map((point, i) => (
            <MotionBox
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                backdropFilter: 'blur(12px)',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 3,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  mb: 2,
                  background: 'linear-gradient(135deg, #9c43f8, #26c5f3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.125rem',
                }}
              >
                <CheckIcon fontSize="small" sx={{ color: 'white' }} />
              </Box>
              <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                {point}
              </Typography>
            </MotionBox>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
