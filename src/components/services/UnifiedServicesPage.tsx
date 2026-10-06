'use client';

import { alpha, Box, darken, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import modeling3dHero from '@/assets/services/3d-modeling-hero.svg';
import aiAutomationHero from '@/assets/services/ai-automation-hero.svg';
import apiDevelopmentHero from '@/assets/services/api-development-hero.svg';
import codeMaintenanceHero from '@/assets/services/code-maintenance-hero.svg';
import iotSolutionsHero from '@/assets/services/iot-solutions-hero.svg';
import mobileApplicationsHero from '@/assets/services/mobile-applications-hero.svg';
import uxDesignHero from '@/assets/services/ux-design-hero.svg';
import webApplicationsHero from '@/assets/services/web-applications-hero.svg';
import { DecorativePattern } from '@/components/common/DecorativePattern';
import { LiquidGlassCard } from '@/components/common/LiquidGlassSurface';
import { Contact } from '@/components/sections/Contact';
import { Slider } from '@/components/sections/Slider';
import { UnifiedServicesPageContent, getSliderContent, getContactContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';
import { colors } from '@/theme';

const serviceAssets = {
  'web-applications': { key: 'webApplications', image: webApplicationsHero },
  'mobile-applications': { key: 'mobileApplications', image: mobileApplicationsHero },
  'api-development': { key: 'apiDevelopment', image: apiDevelopmentHero },
  'code-maintenance': { key: 'codeMaintenance', image: codeMaintenanceHero },
  'ux-design': { key: 'uxDesign', image: uxDesignHero },
  '3d-modeling': { key: 'modeling3d', image: modeling3dHero },
  'ai-automation': { key: 'aiAutomation', image: aiAutomationHero },
  'iot-solutions': { key: 'iotSolutions', image: iotSolutionsHero },
} as const;

interface UnifiedServicesPageProps {
  content: UnifiedServicesPageContent;
  language?: string;
}

export function UnifiedServicesPage({ content, language = 'en' }: UnifiedServicesPageProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const reducedMotion = useReducedMotion();
  const items = content.overview.navigation.items;
  const [selectedId, setSelectedId] = useState(items[0].id);
  const overview = content.overview.hero;
  const titleGradient = theme.palette.mode === 'dark'
    ? colors.gradientMain
    : `linear-gradient(to right, ${theme.palette.primary.main}, ${darken(theme.palette.info.main, 0.3)})`;

  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (items.some(item => item.id === id)) setSelectedId(id);
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [items]);

  const handleSelection = (_event: React.SyntheticEvent, id: string) => {
    setSelectedId(id);
    window.history.replaceState(window.history.state, '', `#${id}`);
  };

  return (
    <Box>
      <Box
        component="section"
        id="services-overview-hero"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
          pt: { xs: 'calc(70px + 3rem)', md: 'calc(116px + 4rem)' },
          pb: { xs: 7, md: 10 },
          px: { xs: 2, sm: 4, lg: 6 },
          '& ::selection': { bgcolor: alpha(theme.palette.primary.main, 0.25) },
          '@media (prefers-reduced-motion: reduce)': {
            '& *': { scrollBehavior: 'auto' },
          },
        }}
      >
        <DecorativePattern color="rgba(38, 197, 243, 0.09)" variant="contours" motion="contour-drift" />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '1440px', mx: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '1.2fr 1fr' },
              gap: { xs: 3, md: 8 },
              alignItems: 'end',
              mb: { xs: 5, md: 8 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: 'clamp(2.75rem, 6vw, 6rem)',
                fontWeight: 600,
                lineHeight: 1.04,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                '& > span': {
                  display: 'block',
                  ml: { xs: 3, md: 6 },
                  backgroundImage: titleGradient,
                },
              }}
            >
              {textWithGradient(overview.title)}
            </Typography>
            <Box sx={{ maxWidth: '40rem', pb: { md: 0.5 } }}>
              <Typography component="p" sx={{ fontSize: { xs: '1.125rem', md: '1.375rem' }, mb: 2 }}>
                {overview.subtitle}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {overview.description}
              </Typography>
            </Box>
          </Box>

          <LiquidGlassCard
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(15rem, 0.9fr) minmax(0, 2fr)' },
              alignItems: 'start',
            }}
          >
            <Tabs
              aria-label={content.overview.navigation.title}
              value={selectedId}
              onChange={handleSelection}
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              variant="scrollable"
              selectionFollowsFocus
              scrollButtons="auto"
              allowScrollButtonsMobile
              slotProps={{ indicator: { sx: { display: 'none' } } }}
              sx={{
                minWidth: 0,
                bgcolor: 'transparent',
                p: 1,
                '& .MuiTab-root': {
                  alignItems: 'flex-start',
                  minHeight: { xs: 64, md: 76 },
                  maxWidth: 'none',
                  px: { xs: 2.5, md: 3 },
                  py: 2,
                  fontSize: { xs: '1rem', md: '1.125rem', lg: '1.375rem' },
                  fontWeight: 400,
                  lineHeight: 1.35,
                  textAlign: 'left',
                  color: 'text.secondary',
                  whiteSpace: { xs: 'nowrap', md: 'normal' },
                  borderRadius: '0.75rem',
                  transition: reducedMotion ? 'none' : 'background-color 350ms ease, color 350ms ease',
                  scrollMarginTop: '160px',
                  '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.12),
                    color: 'text.primary',
                    fontWeight: 600,
                  },
                  '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -3 },
                },
              }}
            >
              {items.map(item => (
                <Tab
                  key={item.id}
                  id={item.id}
                  value={item.id}
                  label={item.title}
                  aria-controls={`${item.id}-panel`}
                  disableRipple
                />
              ))}
            </Tabs>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                p: { xs: 3, sm: 4, lg: 5 },
                bgcolor: 'transparent',
                minWidth: 0,
              }}
            >
              <Box sx={{ display: 'grid', minWidth: 0 }}>
                {items.map((item, index) => {
                  const asset = serviceAssets[item.id as keyof typeof serviceAssets];
                  const hero = content[asset.key].hero;
                  const active = selectedId === item.id;

                  return (
                    <Box
                      key={item.id}
                      component={motion.section}
                      role="tabpanel"
                      id={`${item.id}-panel`}
                      aria-labelledby={item.id}
                      aria-hidden={!active}
                      inert={!active}
                      tabIndex={active ? 0 : -1}
                      initial={false}
                      animate={{ opacity: active ? 1 : 0, y: active || reducedMotion ? 0 : 12 }}
                      transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      sx={{
                        gridArea: '1 / 1',
                        display: 'grid',
                        gridTemplateRows: '1fr auto',
                        gap: 4,
                        minWidth: 0,
                        visibility: active ? 'visible' : 'hidden',
                        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 6 },
                      }}
                    >
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                          <Typography
                            component="h2"
                            sx={{
                              fontSize: { xs: '1.5rem', lg: '1.875rem' },
                              lineHeight: 1.2,
                              fontWeight: 600,
                              textWrap: 'balance',
                              '& > span': { backgroundImage: titleGradient },
                            }}
                          >
                            {textWithGradient(hero.title)}
                          </Typography>
                          <Typography component="span" aria-hidden sx={{ color: 'text.secondary', fontVariantNumeric: 'tabular-nums', pt: 0.5 }}>
                            {String(index + 1).padStart(2, '0')}
                          </Typography>
                        </Box>
                        <Typography component="p" sx={{ fontSize: '1rem', fontWeight: 500, mb: 2 }}>
                          {hero.subtitle}
                        </Typography>
                        <Typography color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: '65ch' }}>
                          {hero.description}
                        </Typography>
                      </Box>
                      <Image
                        src={asset.image}
                        alt={hero.subtitle}
                        width={800}
                        height={600}
                        sizes="(min-width: 900px) 45vw, 100vw"
                        loading={active ? 'eager' : 'lazy'}
                        style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'contain', borderRadius: 16 }}
                      />
                    </Box>
                  );
                })}
              </Box>

            </Box>
          </LiquidGlassCard>
        </Box>
      </Box>
      <Slider content={getSliderContent(language)} />
      <Contact content={getContactContent(language)} />
    </Box>
  );
}
