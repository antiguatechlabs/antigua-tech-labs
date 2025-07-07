'use client';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PublicIcon from '@mui/icons-material/Public';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
import { Box, Typography } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { AboutStoryContent } from '@/lib/data';
import { MotionBox } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

const iconMap = {
  RocketLaunchIcon: RocketLaunchIcon,
  BusinessCenterIcon: BusinessCenterIcon,
  PublicIcon: PublicIcon,
  AutoAwesomeIcon: AutoAwesomeIcon,
  EmojiEventsIcon: EmojiEventsIcon,
  LightbulbIcon: LightbulbIcon,
  StarIcon: StarIcon,
  HandshakeIcon: HandshakeIcon,
  FavoriteIcon: FavoriteIcon,
} as const;

const getIconComponent = (iconName: string) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || RocketLaunchIcon;
  return <IconComponent fontSize="small" sx={{ color: 'white' }} />;
};


interface OurStoryProps {
  content: AboutStoryContent;
  lang: string;
}

export function OurStory({ content, lang: _lang }: OurStoryProps) {
  return (
    <Section id="our-story">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Header */}
        <Box>
          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}
          >
            {textWithGradient(content.title)}
          </Typography>
          {/* <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 700, mx: 'auto' }}
          >
            {content.subtitle}
          </Typography> */}
        </Box>

        {/* Timeline */}
        {/* <Timeline items={content.timeline} /> */}

        {/* Journey Summary */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          sx={{
            p: 6,
            borderRadius: 4,
            // eslint-disable-next-line max-len
            // background: 'linear-gradient(135deg, rgba(156, 67, 248, 0.05), rgba(38, 197, 243, 0.05))',
            // border: '1px solid rgba(156, 67, 248, 0.1)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(156, 67, 248, 0.3), transparent)',
            },
          }}
        >
          {/* <Typography
            variant="h4"
            component="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(135deg, #9c43f8, #26c5f3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {content.summary.title}
          </Typography> */}
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: '1.1rem',
              maxWidth: 900,
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            {content.summary.description}
          </Typography>
        </MotionBox>

        {/* Values Grid */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}
          >
            {textWithGradient(content.values.title)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 6 }}
          >
            {content.values.subtitle}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' },
              gap: 4,
            }}
          >
            {content.values.items.map((value, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
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
                  transition: 'transform 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    mb: 3,
                    background: 'linear-gradient(135deg, #9c43f8, #26c5f3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getIconComponent(value.icon)}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {value.description}
                </Typography>
              </MotionBox>
            ))}
          </Box>
        </MotionBox>

        {/* Mission & Vision */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
            gap: 6,
            mt: 4,
          }}
        >
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            sx={{
              p: 6,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(156, 67, 248, 0.1), rgba(38, 197, 243, 0.1))',
              border: '1px solid rgba(156, 67, 248, 0.2)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.secondary' }}>
              {content.mission.title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              {content.mission.description}
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            sx={{
              p: 6,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(38, 197, 243, 0.1), rgba(156, 67, 248, 0.1))',
              border: '1px solid rgba(38, 197, 243, 0.2)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'text.secondary' }}>
              {content.mission.vision.title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              {content.mission.vision.description}
            </Typography>
          </MotionBox>
        </Box>
      </Box>
    </Section>
  );
}
