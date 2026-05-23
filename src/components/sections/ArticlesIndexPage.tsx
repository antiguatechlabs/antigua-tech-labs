'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { Section } from '@/components/common';
import { ArticleContent, ArticlesListingContent } from '@/lib/data';
import { MotionDiv } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

interface ArticlesIndexPageProps {
  articles: ArticleContent[];
  listingContent: ArticlesListingContent;
  lang: string;
}

export function ArticlesIndexPage({ articles, listingContent, lang }: ArticlesIndexPageProps) {
  return (
    <>
      <Section id="articles" animation="fadeInUp" animationDelay={0.2}>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 700, mb: 2 }}>
            {textWithGradient(listingContent.title)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 900, mx: 'auto', color: 'text.secondary', fontSize: { xs: '1rem', md: '1.125rem' } }}
          >
            {listingContent.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr)' },
            gap: 4,
          }}
        >
          {articles.map(article => (
            <MotionDiv key={article.slug}>
              <Box
                component={Link}
                href={`/${lang}/articles/${article.slug}`}
                sx={{
                  textDecoration: 'none',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <Box sx={{ position: 'relative', minHeight: { xs: 220, md: '100%' } }}>
                  {article.heroImage ? (
                    <Image
                      src={article.heroImage}
                      alt={article.heroImageAlt || article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 900px) 100vw, 320px"
                    />
                  ) : (
                    <Box
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(156,67,248,0.12), rgba(38,197,243,0.15))',
                      }}
                    />
                  )}
                </Box>

                <Stack spacing={2} sx={{ p: { xs: 2.5, md: 3.5 } }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                    <Chip size="small" label={article.category} color="primary" variant="outlined" />
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <CalendarTodayIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(article.publishedAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AccessTimeIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {article.readingTime}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '1.6rem' }, lineHeight: 1.25 }}>
                    {article.title}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {article.excerpt}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    {lang === 'es' ? 'Leer artículo' : 'Read article'}
                  </Typography>
                </Stack>
              </Box>
            </MotionDiv>
          ))}
        </Box>
      </Section>

      <Section sx={{ bgcolor: 'grey.50' }} animation="fadeIn">
        <Box sx={{ maxWidth: 860, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1.5 }}>
            {listingContent.cta.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            {listingContent.cta.description}
          </Typography>
          <Button variant="contained" size="large" component={Link} href={`/${lang}${listingContent.cta.buttonHref}`}>
            {listingContent.cta.buttonText}
          </Button>
        </Box>
      </Section>
    </>
  );
}
