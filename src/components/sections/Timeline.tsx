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

import { MotionBox } from '@/lib/motionComponents';

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

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  milestone: string;
  icon: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <Box sx={{ position: 'relative', pl: 4, '&::before': { content: '""', position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, bgcolor: 'divider' } }}>
      {items.map((item, i) => (
        <MotionBox
          key={i}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{ display: 'flex', alignItems: 'flex-start', mb: 8, gap: 3 }}
        >
          {/* Year Badge and Icon */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
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
              {getIconComponent(item.icon)}
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '0.75rem',
                letterSpacing: '0.5px',
              }}
            >
              {item.year}
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
              {item.description}
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                px: 2,
                py: 0.5,
                borderRadius: 2,
                bgcolor: 'rgba(156, 67, 248, 0.1)',
                border: '1px solid rgba(156, 67, 248, 0.2)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                {item.milestone}
              </Typography>
            </Box>
          </Box>
        </MotionBox>
      ))}
    </Box>
  );
}
