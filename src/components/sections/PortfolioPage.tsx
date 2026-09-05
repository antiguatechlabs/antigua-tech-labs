'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { PortfolioContent, PortfolioProject } from '@/lib/data';
import { colors } from '@/theme';

import { DecorativePattern } from '../common/DecorativePattern';

interface PortfolioPageProps {
  content: PortfolioContent;
}

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
  ctaLabel: string;
  comingSoonLabel: string;
}

function PortfolioCard({ project, index, ctaLabel, comingSoonLabel }: PortfolioCardProps) {
  const hasImage = Boolean(project.image);
  const hasLink = Boolean(project.href);
  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <Card
      style={{ animationDelay: `${index * 80}ms` }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: theme => theme.palette.mode === 'dark'
          ? '0 18px 44px rgba(0, 0, 0, 0.34)'
          : '0 18px 44px rgba(43, 45, 66, 0.07)',
        animation: 'portfolioCardIn 420ms cubic-bezier(0.16, 1, 0.3, 1) both',
        transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease, border-color 240ms ease',
        '@keyframes portfolioCardIn': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          transition: 'none',
        },
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: theme => theme.palette.mode === 'dark'
            ? '0 24px 56px rgba(0, 0, 0, 0.46)'
            : '0 24px 56px rgba(43, 45, 66, 0.11)',
          borderColor: 'rgba(156, 67, 248, 0.28)',
        },
        '&:active': {
          transform: 'scale(0.99)',
        },
        '&:focus-within': {
          borderColor: 'primary.main',
          boxShadow: '0 0 0 3px rgba(156, 67, 248, 0.18)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16 / 10',
          minHeight: 190,
          overflow: 'hidden',
          bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(196, 146, 247, 0.08)' : '#f7f4fb',
        }}
      >
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.imageAlt || project.title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <Box
            aria-label={`${project.title} image placeholder`}
            role="img"
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: theme => theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(36, 19, 102, 0.66) 0%, rgba(18, 23, 34, 0.96) 100%)'
                : 'linear-gradient(135deg, rgba(240, 231, 255, 0.96) 0%, rgba(255, 255, 255, 0.94) 100%)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 16,
                border: '1px solid rgba(156, 67, 248, 0.18)',
                borderRadius: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 4,
                background: colors.gradientMain,
                opacity: 0.8,
              },
            }}
          >
            <Stack spacing={1} alignItems="center">
              <ImageOutlinedIcon sx={{ color: 'primary.dark', fontSize: 40 }} />
              <Typography
                component="span"
                sx={{
                  color: 'text.primary',
                  display: 'block',
                  fontWeight: 800,
                  lineHeight: 1,
                  fontSize: { xs: '2.25rem', md: '2.75rem' },
                }}
              >
                {projectNumber}
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          p: { xs: 3, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: 2,
        }}
      >
        <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              fontSize: { xs: '1.18rem', md: '1.3rem' },
              lineHeight: 1.25,
            }}
          >
            {project.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.65,
              fontSize: '0.96rem',
            }}
          >
            {project.description}
          </Typography>
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {project.tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                color: theme => theme.palette.mode === 'dark' ? 'primary.light' : colors.purple2,
                bgcolor: 'action.hover',
                border: '1px solid rgba(156, 67, 248, 0.16)',
                fontWeight: 600,
              }}
            />
          ))}
        </Stack>

        {hasLink ? (
          <Button
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            endIcon={<OpenInNewIcon />}
            sx={{
              mt: 1,
              alignSelf: 'flex-start',
              minHeight: 44,
              px: 2.25,
              borderRadius: 1,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            {ctaLabel}
          </Button>
        ) : (
          <Button
            disabled
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 1,
              alignSelf: 'flex-start',
              minHeight: 44,
              px: 2.25,
              borderRadius: 1,
              '&.Mui-disabled': {
                color: 'text.secondary',
                borderColor: 'divider',
                bgcolor: 'action.hover',
              },
            }}
          >
            {comingSoonLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function PortfolioPage({ content }: PortfolioPageProps) {
  return (
    <Box component="main" sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          pt: { xs: 'calc(70px + 3.5rem)', md: 'calc(116px + 5.5rem)' },
          pb: { xs: 7, md: 11 },
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(11, 13, 20, 0.98) 0%, rgba(18, 23, 34, 0.96) 100%)'
            : 'linear-gradient(180deg, rgba(248, 247, 251, 0.96) 0%, rgba(255, 255, 255, 0.98) 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <DecorativePattern color="rgba(112, 43, 158, 0.12)" variant="horizontal-lines" />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)' },
              gap: { xs: 5, md: 8 },
              alignItems: 'center',
            }}
          >
            <Stack spacing={2.5} alignItems="flex-start" textAlign="left">
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.dark',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  letterSpacing: 0,
                }}
              >
                {content.hero.eyebrow}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  maxWidth: 780,
                  color: 'text.primary',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  fontSize: { xs: '2.35rem', sm: '3rem', md: '4.05rem' },
                }}
              >
                {content.hero.title}
              </Typography>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  maxWidth: 650,
                  color: 'text.secondary',
                  fontWeight: 500,
                  lineHeight: 1.55,
                  fontSize: { xs: '1.08rem', md: '1.25rem' },
                }}
              >
                {content.hero.subtitle}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: 590,
                  color: 'text.secondary',
                  lineHeight: 1.75,
                  fontSize: '1rem',
                }}
              >
                {content.hero.description}
              </Typography>
            </Stack>

            <Box
              sx={{
                border: '1px solid',
                borderColor: 'rgba(156, 67, 248, 0.16)',
                bgcolor: theme => theme.palette.mode === 'dark'
                  ? 'rgba(18, 23, 34, 0.78)'
                  : 'rgba(255, 255, 255, 0.78)',
                backdropFilter: 'blur(10px)',
                boxShadow: theme => theme.palette.mode === 'dark'
                  ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 60px rgba(0, 0, 0, 0.28)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.75), 0 24px 60px rgba(43, 45, 66, 0.08)',
                borderRadius: 1,
                p: { xs: 2.5, md: 3 },
              }}
            >
              <Stack spacing={2}>
                {content.projects.map((project, index) => (
                  <Box
                    key={`${project.title}-preview`}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '44px minmax(0, 1fr)',
                      gap: 1.5,
                      alignItems: 'center',
                      py: 1.25,
                      borderBottom: index === content.projects.length - 1 ? 'none' : '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.dark',
                        fontWeight: 800,
                        bgcolor: 'rgba(156, 67, 248, 0.08)',
                        border: '1px solid rgba(156, 67, 248, 0.16)',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ color: 'text.primary', fontWeight: 700, lineHeight: 1.3 }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                        {content.statusLabel}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{ bgcolor: 'background.paper', overflow: 'hidden', position: 'relative', py: { xs: 7, md: 11 } }}
      >
        <Container maxWidth="xl">
          <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 680 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                fontSize: { xs: '1.9rem', md: '2.65rem' },
                lineHeight: 1.15,
              }}
            >
              {content.projectsTitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '1.05rem' }}
            >
              {content.projectsSubtitle}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(12, minmax(0, 1fr))',
              },
              gap: { xs: 3, md: 4 },
              alignItems: 'stretch',
            }}
          >
            {content.projects.map((project, index) => (
              <Box
                key={`${project.title}-${index}`}
                sx={{
                  gridColumn: {
                    xs: 'auto',
                    md: 'auto',
                    lg: index === 0 || index === 3 ? 'span 7' : 'span 5',
                  },
                }}
              >
                <PortfolioCard
                  project={project}
                  index={index}
                  ctaLabel={content.ctaLabel}
                  comingSoonLabel={content.comingSoonLabel}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
