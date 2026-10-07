'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, darken, Typography, useTheme } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';

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
  const reducedMotion = useReducedMotion();
  const items = content.overview.navigation.items;
  const overview = content.overview.hero;
  const titleGradient = theme.palette.mode === 'dark'
    ? colors.gradientMain
    : `linear-gradient(to right, ${theme.palette.primary.main}, ${darken(theme.palette.info.main, 0.3)})`;

  return (
    <Box>
      <Box
        component="section"
        id="services-overview-hero"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
          backgroundImage: `radial-gradient(ellipse at 12% 15%, ${alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1)}, transparent 55%), radial-gradient(ellipse at 90% 65%, ${alpha(theme.palette.info.main, theme.palette.mode === 'dark' ? 0.14 : 0.08)}, transparent 55%)`,
          pt: { xs: 'calc(70px + 3rem)', md: 'calc(116px + 4rem)' },
          pb: { xs: 7, md: 10 },
          px: { xs: 2, sm: 4, lg: 6 },
          '& ::selection': { bgcolor: alpha(theme.palette.primary.main, 0.25) },
          '@media (prefers-reduced-motion: reduce)': {
            '& *': { scrollBehavior: 'auto' },
          },
        }}
      >
        <DecorativePattern
          color={alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.16 : 0.1)}
          variant="dots"
        />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '1440px', mx: 'auto' }}>
          <Box sx={{ maxWidth: '52rem', mx: 'auto', textAlign: 'center', mb: { xs: 5, md: 8 } }}>
            <Typography
              component="h1"
              sx={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                textWrap: 'balance',
                mb: 3,
                '& > span': { backgroundImage: titleGradient },
              }}
            >
              {textWithGradient(overview.title)}
            </Typography>
            <Typography component="p" sx={{ fontSize: { xs: '1.125rem', md: '1.375rem' }, mb: 2 }}>
              {overview.subtitle}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: '65ch', mx: 'auto' }}>
              {overview.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
              gap: 3,
            }}
          >
            {items.map(item => {
              const asset = serviceAssets[item.id as keyof typeof serviceAssets];
              const hero = content[asset.key].hero;

              return (
                <Box
                  key={item.id}
                  component="section"
                  id={item.id}
                  aria-labelledby={`${item.id}-title`}
                  sx={{ minWidth: 0, scrollMarginTop: { xs: '104px', md: '160px' } }}
                >
                  <LiquidGlassCard
                    whileHover={reducedMotion ? undefined : { y: -4 }}
                    transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
                    sx={{ height: '100%', minHeight: '22rem', p: 3, display: 'flex', flexDirection: 'column' }}
                  >
                    <Image
                      src={asset.image}
                      alt=""
                      width={80}
                      height={60}
                      style={{ display: 'block', width: 80, height: 60, objectFit: 'contain', borderRadius: 12, marginBottom: 24 }}
                    />
                    <Typography
                      component="h2"
                      id={`${item.id}-title`}
                      sx={{
                        fontSize: '1.375rem',
                        lineHeight: 1.2,
                        fontWeight: 600,
                        textWrap: 'balance',
                        mb: 2,
                        '& > span': { backgroundImage: titleGradient },
                      }}
                    >
                      {textWithGradient(hero.title)}
                    </Typography>
                    <Typography component="p" sx={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, mb: 2 }}>
                      {hero.subtitle}
                    </Typography>
                    <Accordion
                      defaultExpanded={false}
                      disableGutters
                      elevation={0}
                      slots={{ heading: 'div' }}
                      slotProps={{ transition: { timeout: reducedMotion ? 0 : { enter: 280, exit: 200 }, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' } }}
                      sx={{
                        mt: 1,
                        bgcolor: 'transparent',
                        backgroundImage: 'none',
                        '&.MuiAccordion-root': { position: 'static' },
                        '&::before': { display: 'none' },
                      }}
                    >
                      <AccordionSummary
                        id={`${item.id}-toggle`}
                        aria-controls={`${item.id}-description`}
                        aria-label={`${language === 'es' ? 'Detalles de' : 'Details for'} ${item.title}`}
                        expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.mode === 'dark' ? 'common.white' : 'common.black' }} />}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 2,
                          px: 0,
                          borderRadius: '1.25rem',
                          '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: -3 },
                          '& .MuiAccordionSummary-content': { display: 'none' },
                          '& .MuiAccordionSummary-expandIconWrapper': {
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            width: 44,
                            height: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none',
                            transition: reducedMotion ? 'none' : 'transform 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                          },
                        }}
                      />
                      <AccordionDetails sx={{ px: 0, pt: 1, pb: 0 }}>
                        <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {hero.description}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </LiquidGlassCard>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Slider content={getSliderContent(language)} />
      <Contact content={getContactContent(language)} />
    </Box>
  );
}
