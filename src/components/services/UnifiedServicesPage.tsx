'use client';
import { Box } from '@mui/material';
import React from 'react';

import { UnifiedServicesPageContent } from '@/lib/data';

import { ServiceSection } from './ServiceSection';
import { ServiceTwoColumnSection } from './ServiceTwoColumnSection';

interface UnifiedServicesPageProps {
  content: UnifiedServicesPageContent;
}

export function UnifiedServicesPage({ content }: UnifiedServicesPageProps) {
  return (
    <Box>
      {/* Services Overview Hero */}
      <ServiceTwoColumnSection content={content.overview.hero} />

      {/* Services Navigation */}

      {/* Web Applications Service Section */}
      <ServiceSection
        id="web-applications"
        content={content.webApplications}
        index={0}
      />

      {/* Mobile Applications Service Section */}
      <ServiceSection
        id="mobile-applications"
        content={content.mobileApplications}
        index={1}
      />

      {/* API Development Service Section */}
      <ServiceSection
        id="api-development"
        content={content.apiDevelopment}
        index={2}
      />

      {/* Code Maintenance Service Section */}
      <ServiceSection
        id="code-maintenance"
        content={content.codeMaintenance}
        index={3}
      />

      {/* UX Design Service Section */}
      <ServiceSection
        id="ux-design"
        content={content.uxDesign}
        index={4}
      />

      {/* 3D Modeling Service Section */}
      <ServiceSection
        id="3d-modeling"
        content={content.modeling3d}
        index={5}
      />
    </Box>
  );
}
