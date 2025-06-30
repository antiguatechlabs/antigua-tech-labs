'use client';
import { Box } from '@mui/material';
import React from 'react';

import { UnifiedServicesPageContent } from '@/lib/data';

import { ServiceHero } from './ServiceHero';
import { ServiceSection } from './ServiceSection';
import { ServicesNavigation } from './ServicesNavigation';

interface UnifiedServicesPageProps {
  content: UnifiedServicesPageContent;
}

export function UnifiedServicesPage({ content }: UnifiedServicesPageProps) {
  return (
    <Box>
      {/* Services Overview Hero */}
      <ServiceHero content={content.overview.hero} />

      {/* Services Navigation */}
      <ServicesNavigation content={content.overview.navigation} />

      {/* Web Applications Service Section */}
      <ServiceSection
        id="web-applications"
        content={content.webApplications}
        showDivider={true}
      />

      {/* Mobile Applications Service Section */}
      <ServiceSection
        id="mobile-applications"
        content={content.mobileApplications}
        showDivider={true}
      />

      {/* API Development Service Section */}
      <ServiceSection
        id="api-development"
        content={content.apiDevelopment}
        showDivider={true}
      />

      {/* Code Maintenance Service Section */}
      <ServiceSection
        id="code-maintenance"
        content={content.codeMaintenance}
        showDivider={true}
      />

      {/* UX Design Service Section */}
      <ServiceSection
        id="ux-design"
        content={content.uxDesign}
        showDivider={true}
      />

      {/* 3D Modeling Service Section */}
      <ServiceSection
        id="3d-modeling"
        content={content.modeling3d}
        showDivider={false}
      />
    </Box>
  );
}
