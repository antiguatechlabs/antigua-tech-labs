'use client';
import { Box } from '@mui/material';
import React from 'react';

import modeling3dHero from '@/assets/services/3d-modeling-hero.svg';
import apiDevelopmentHero from '@/assets/services/api-development-hero.svg';
import codeMaintenanceHero from '@/assets/services/code-maintenance-hero.svg';
import mobileApplicationsHero from '@/assets/services/mobile-applications-hero.svg';
import uxDesignHero from '@/assets/services/ux-design-hero.svg';
import webApplicationsHero from '@/assets/services/web-applications-hero.svg';
import { Contact } from '@/components/sections/Contact';
import { Slider } from '@/components/sections/Slider';
import { UnifiedServicesPageContent, getSliderContent, getContactContent } from '@/lib/data';

// Import service images

import { ServiceOverviewHero } from './ServiceOverviewHero';
import { ServiceSection } from './ServiceSection';

// Define gradient colors matching the SVG images
const serviceGradients = {
  webApplications: { start: '#667eea', end: '#764ba2' },
  mobileApplications: { start: '#f093fb', end: '#f5576c' },
  apiDevelopment: { start: '#4facfe', end: '#00f2fe' },
  codeMaintenance: { start: '#43e97b', end: '#38f9d7' },
  uxDesign: { start: '#fa709a', end: '#fee140' },
  modeling3d: { start: '#8000ffcb', end: '#e100ffdc' },
};

interface UnifiedServicesPageProps {
  content: UnifiedServicesPageContent;
  language?: string;
}

export function UnifiedServicesPage({ content, language = 'en' }: UnifiedServicesPageProps) {
  const sliderContent = getSliderContent(language);
  const contactContent = getContactContent(language);
  return (
    <Box>
      {/* Services Overview Hero */}
      <ServiceOverviewHero content={content.overview.hero} />

      {/* Web Applications Service Section */}
      <ServiceSection
        id="web-applications"
        content={content.webApplications}
        index={0}
        heroImage={webApplicationsHero}
        gradientColors={serviceGradients.webApplications}
        backgroundColor={'#e9ecef'}
        waves
      />

      {/* Mobile Applications Service Section */}
      <ServiceSection
        id="mobile-applications"
        content={content.mobileApplications}
        index={1}
        heroImage={mobileApplicationsHero}
        gradientColors={serviceGradients.mobileApplications}
      />

      {/* API Development Service Section */}
      <ServiceSection
        id="api-development"
        content={content.apiDevelopment}
        index={2}
        heroImage={apiDevelopmentHero}
        gradientColors={serviceGradients.apiDevelopment}
        waves
        backgroundColor={'#e9ecef'}
      />

      {/* Code Maintenance Service Section */}
      <ServiceSection
        id="code-maintenance"
        content={content.codeMaintenance}
        index={3}
        heroImage={codeMaintenanceHero}
        gradientColors={serviceGradients.codeMaintenance}
      />

      {/* UX Design Service Section */}
      <ServiceSection
        id="ux-design"
        content={content.uxDesign}
        index={4}
        heroImage={uxDesignHero}
        gradientColors={serviceGradients.uxDesign}
        waves
        backgroundColor={'#e9ecef'}
      />

      {/* 3D Modeling Service Section */}
      <ServiceSection
        id="3d-modeling"
        content={content.modeling3d}
        index={5}
        heroImage={modeling3dHero}
        gradientColors={serviceGradients.modeling3d}
      />

      {/* Slider Section */}
      <Slider content={sliderContent} />

      {/* Contact Section */}
      <Contact content={contactContent} />

    </Box>
  );
}
