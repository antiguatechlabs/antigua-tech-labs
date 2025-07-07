'use client';
import { Box } from '@mui/material';
import React from 'react';

import { AboutPageContent, ContactContent } from '@/lib/data';

import { AboutCTA } from './AboutCTA';
import { AboutHero } from './AboutHero';
import { OurApproach } from './OurApproach';
import { OurStory } from './OurStory';

interface UnifiedAboutPageProps {
  content: AboutPageContent;
  contactContent: ContactContent;
  language?: string;
}

export function UnifiedAboutPage({
  content,
  contactContent,
  language = 'en',
}: UnifiedAboutPageProps) {
  return (
    <Box>
      <AboutHero content={content.hero} lang={language} />
      <OurStory content={content.story} lang={language} />
      <OurApproach content={content.approach} lang={language} />
      <AboutCTA content={content.cta} contactContent={contactContent} lang={language} />
    </Box>
  );
}
