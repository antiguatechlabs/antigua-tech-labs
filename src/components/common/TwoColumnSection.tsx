'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import Section from './Section';

interface TwoColumnSectionProps {
  image: string;
  title: string | React.ReactNode;
  subtitle: string;
  description: string;
  textPosition?: 'left' | 'right';
  imageWidth?: number;
  imageHeight?: number;
  altText?: string;
}

const TwoColumnSection: React.FC<TwoColumnSectionProps> = ({
  image,
  title,
  subtitle,
  description,
  textPosition = 'left',
  imageWidth = 600,
  imageHeight = 400,
  altText,
}) => (
  <Section>
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: textPosition === 'left' ? 'row' : 'row-reverse' }}
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Box flex={1} sx={{ position: 'relative', width: '100%', height: 'auto' }}>
        {/* TODO: update the image with icons??? */}
        <Image
          src={image}
          alt={altText || subtitle || 'Service image'}
          width={imageWidth}
          height={imageHeight}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 8,
            objectFit: 'cover',
          }}
          priority={false}
        />
      </Box>

      <Box flex={1}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  </Section>
);

export default TwoColumnSection;
