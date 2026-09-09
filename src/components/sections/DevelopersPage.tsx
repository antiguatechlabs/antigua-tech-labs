'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import KeyOffRoundedIcon from '@mui/icons-material/KeyOffRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import {
  Box,
  Button,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { LiquidGlassCard } from '@/components/common/LiquidGlassSurface';
import { Section } from '@/components/common/Section';
import CodeWindow from '@/components/layout/CodeWindow';
import type { DeveloperPortalContent } from '@/lib/data';
import { CONTACT_API, DEVELOPER_RESOURCES } from '@/lib/api/catalog';

const curlExample = `curl -X POST "https://antiguatechlabs.com${CONTACT_API.path}?${CONTACT_API.sandboxQuery}" \\
  -H "Content-Type: ${CONTACT_API.contentType}" \\
  -d '{
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "message": "I would like to discuss a custom web application."
  }'`;

const errorExample = `{
  "success": false,
  "error": "Contact payload validation failed",
  "code": "VALIDATION_ERROR",
  "message": "Contact payload validation failed",
  "hint": "Correct the fields listed in details and retry the request.",
  "details": [
    {
      "field": "email",
      "issue": "format",
      "message": "email must be a valid email address."
    }
  ]
}`;

interface DevelopersPageProps {
  content: DeveloperPortalContent;
}

const glassCardSx = {
  height: '100%',
};

export function DevelopersPage({ content }: DevelopersPageProps) {
  return (
    <Box component="main" sx={{ overflow: 'hidden' }}>
      <Section
        noAnimation
        sx={{
          position: 'relative',
          minHeight: { xs: '34rem', md: '39rem' },
          display: 'grid',
          placeItems: 'center',
          background: theme => theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 15% 15%, rgba(156, 67, 248, 0.2), transparent 36%), radial-gradient(circle at 85% 30%, rgba(38, 197, 243, 0.14), transparent 34%)'
            : 'radial-gradient(circle at 15% 15%, rgba(156, 67, 248, 0.16), transparent 36%), radial-gradient(circle at 85% 30%, rgba(38, 197, 243, 0.14), transparent 34%)',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems="flex-start" sx={{ maxWidth: '52rem' }}>
            <Chip
              icon={<CodeRoundedIcon />}
              label={content.hero.eyebrow}
              color="primary"
              variant="outlined"
              sx={{ backdropFilter: 'blur(8px)' }}
            />
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '5.4rem' },
                lineHeight: 0.98,
                letterSpacing: '-0.055em',
                maxWidth: '12ch',
              }}
            >
              {content.hero.title}
            </Typography>
            <Typography variant="h5" component="p" color="text.secondary" sx={{ maxWidth: '43rem', lineHeight: 1.55 }}>
              {content.hero.description}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={Link}
                href={DEVELOPER_RESOURCES.openApi}
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                size="large"
              >
                {content.hero.openApiLabel}
              </Button>
              <Button component="a" href="#quickstart" variant="outlined" size="large">
                {content.hero.quickstartLabel}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section animation="fadeInUp" sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Box sx={{ maxWidth: '46rem' }}>
              <Typography component="h2" variant="h2" sx={{ mb: 2, fontSize: { xs: '2.2rem', md: '3.4rem' } }}>
                {content.overview.title}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.75 }}>
                {content.overview.description}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' }, gap: 3 }}>
              <LiquidGlassCard sx={glassCardSx}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack spacing={2.5}>
                    <KeyOffRoundedIcon color="primary" fontSize="large" />
                    <Typography component="h3" variant="h4">{content.authentication.title}</Typography>
                    <Chip label={content.authentication.status} color="success" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {content.authentication.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </LiquidGlassCard>

              <LiquidGlassCard sx={glassCardSx}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack spacing={2.5}>
                    <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                      <Chip label={CONTACT_API.method} color="primary" />
                      <Typography component="code" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {CONTACT_API.path}
                      </Typography>
                    </Stack>
                    <Typography component="h3" variant="h4">{content.endpoint.title}</Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {content.endpoint.description}
                    </Typography>
                    <Typography component="h4" variant="h6">{content.endpoint.fieldsTitle}</Typography>
                    <Stack spacing={1.5}>
                      {content.endpoint.fields.map(field => (
                        <Box key={field.name} sx={{ display: 'grid', gridTemplateColumns: 'minmax(5rem, auto) 1fr', gap: 2 }}>
                          <Typography component="code" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.light' }}>
                            {field.name}
                          </Typography>
                          <Typography color="text.secondary">
                            <Box component="span" sx={{ color: 'text.primary' }}>{field.type}</Box> — {field.description}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Stack>
                </CardContent>
              </LiquidGlassCard>
            </Box>
          </Stack>
        </Container>
      </Section>

      <Section id="quickstart" animation="fadeInUp" sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '0.8fr 1.2fr' }, gap: { xs: 4, lg: 6 }, alignItems: 'start' }}>
            <Stack spacing={3}>
              <TerminalRoundedIcon color="primary" sx={{ fontSize: '2.75rem' }} />
              <Typography component="h2" variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.4rem' } }}>
                {content.quickstart.title}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.75 }}>
                {content.quickstart.description}
              </Typography>
              <Button component={Link} href={DEVELOPER_RESOURCES.openApi} variant="text" sx={{ alignSelf: 'flex-start' }}>
                {content.hero.openApiLabel}
              </Button>
            </Stack>
            <LiquidGlassCard>
              <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                <CodeWindow code={curlExample} language="bash" />
              </CardContent>
            </LiquidGlassCard>
          </Box>
        </Container>
      </Section>

      <Section animation="fadeInUp" sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <LiquidGlassCard sx={glassCardSx}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={2.5}>
                  <ScienceRoundedIcon color="secondary" fontSize="large" />
                  <Typography component="h2" variant="h3">{content.sandbox.title}</Typography>
                  <Chip label={content.sandbox.status} color="secondary" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{content.sandbox.description}</Typography>
                  <Typography sx={{ fontWeight: 700 }}>{content.sandbox.warning}</Typography>
                  <Typography component="code" sx={{ fontFamily: 'monospace', color: 'primary.light', overflowWrap: 'anywhere' }}>
                    {CONTACT_API.path}?{CONTACT_API.sandboxQuery}
                  </Typography>
                </Stack>
              </CardContent>
            </LiquidGlassCard>

            <LiquidGlassCard sx={glassCardSx}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={2.5}>
                  <CodeRoundedIcon color="primary" fontSize="large" />
                  <Typography component="h2" variant="h3">{content.errors.title}</Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{content.errors.description}</Typography>
                  <CodeWindow code={errorExample} language="json" />
                </Stack>
              </CardContent>
            </LiquidGlassCard>
          </Box>
        </Container>
      </Section>

      <Section animation="fadeInUp" sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <LiquidGlassCard>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'auto 1fr auto' }, gap: 3, alignItems: 'center' }}>
                <TerminalRoundedIcon color="primary" sx={{ fontSize: '3rem' }} />
                <Stack spacing={1.5}>
                  <Typography component="h2" variant="h3">{content.cli.title}</Typography>
                  <Chip label={content.cli.status} color="primary" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
                  <Typography component="code" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.light' }}>
                    @antiguatechlabs/cli
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{content.cli.description}</Typography>
                </Stack>
                <Button component={Link} href={DEVELOPER_RESOURCES.cliSource} variant="outlined" endIcon={<ArrowForwardRoundedIcon />}>
                  {content.cli.sourceLabel}
                </Button>
              </Box>
            </CardContent>
          </LiquidGlassCard>
        </Container>
      </Section>
    </Box>
  );
}
