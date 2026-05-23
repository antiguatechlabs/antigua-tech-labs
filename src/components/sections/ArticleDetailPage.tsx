'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Section } from '@/components/common';
import { ArticleContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';

interface ArticleDetailPageProps {
  article: ArticleContent;
  lang: string;
}

export function ArticleDetailPage({ article, lang }: ArticleDetailPageProps) {
  const [heroSrc, setHeroSrc] = useState(article.heroImage || '/images/why-choose.jpg');

  return (
    <>
      <Section noAnimation>
        <Box component="article" sx={{ maxWidth: 960, mx: 'auto' }}>
          <header>
            <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2, lineHeight: 1.2 }}>
              {textWithGradient(article.title)}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
              {article.excerpt}
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{article.author}</Typography>
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
                <Typography variant="caption" color="text.secondary">{article.readingTime}</Typography>
              </Stack>
            </Stack>

            {heroSrc ? (
              <Box component="figure" sx={{ m: 0, mb: 4 }}>
                <Box sx={{ position: 'relative', height: { xs: 250, md: 440 }, borderRadius: 3, overflow: 'hidden' }}>
                  <Image
                    src={heroSrc}
                    alt={article.heroImageAlt || article.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 900px) 100vw, 960px"
                    priority
                    onError={() => setHeroSrc('/images/why-choose.jpg')}
                  />
                </Box>
              </Box>
            ) : null}
          </header>

          <Box component="nav" aria-label={lang === 'es' ? 'Tabla de contenido' : 'Table of contents'} sx={{ mb: 5 }}>
            <Typography variant="h2" sx={{ fontSize: '1.2rem', mb: 1.5 }}>
              {lang === 'es' ? 'En este artículo' : 'In this article'}
            </Typography>
            <Stack component="ol" sx={{ pl: 2.5, m: 0, gap: 0.75 }}>
              {article.toc.map(item => (
                <Typography component="li" key={item} variant="body2" color="text.secondary">
                  {item}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Stack spacing={4.5}>
            {article.sections.map(section => (
              <Box component="section" key={section.heading}>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, mb: 1.5 }}>
                  {section.heading}
                </Typography>

                <Stack spacing={2}>
                  {section.paragraphs.map(paragraph => (
                    <Typography key={paragraph} component="p" variant="body1" sx={{ lineHeight: 1.9, color: 'text.primary' }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Stack>

                {section.bullets && section.bullets.length > 0 ? (
                  <Stack component="ul" sx={{ mt: 2.5, pl: 2.5, gap: 1.1 }}>
                    {section.bullets.map(item => (
                      <Typography component="li" key={item} variant="body1" sx={{ lineHeight: 1.7, color: 'text.primary' }}>
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                ) : null}

                {section.internalLinks && section.internalLinks.length > 0 ? (
                  <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1.5} sx={{ mt: 2.5 }}>
                    {section.internalLinks.map(linkItem => (
                      <Button
                        key={`${linkItem.href}-${linkItem.label}`}
                        component={Link}
                        href={`/${lang}${linkItem.href}`}
                        variant="outlined"
                        size="small"
                      >
                        {linkItem.label}
                      </Button>
                    ))}
                  </Stack>
                ) : null}
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 5 }} />

          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: { xs: 2.5, md: 3.5 } }}>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.35rem', md: '1.75rem' }, mb: 1.2 }}>
              {article.cta.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.8 }}>
              {article.cta.description}
            </Typography>
            <Button variant="contained" component={Link} href={`/${lang}${article.cta.buttonHref}`}>
              {article.cta.buttonText}
            </Button>
          </Box>
        </Box>
      </Section>
    </>
  );
}
