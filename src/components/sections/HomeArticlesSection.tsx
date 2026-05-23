'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Section } from '@/components/common';
import { ArticleContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';

interface HomeArticlesSectionProps {
  articles: ArticleContent[];
  lang: string;
}

function ArticleCardImage({ src, alt }: { src?: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(src || '/images/why-choose.jpg');

  return (
    <Box sx={{ position: 'relative', height: 190 }}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 900px) 100vw, 33vw"
          onError={() => setImageSrc('/images/why-choose.jpg')}
        />
      ) : (
        <Box sx={{ height: '100%', background: 'linear-gradient(135deg, rgba(156,67,248,0.12), rgba(38,197,243,0.15))' }} />
      )}
    </Box>
  );
}

export function HomeArticlesSection({ articles, lang }: HomeArticlesSectionProps) {
  const topArticles = articles.slice(0, 3);

  if (topArticles.length === 0) {
    return null;
  }

  return (
    <Section id="articles" animation="fadeInUp" animationDelay={0.2} sx={{ bgcolor: 'grey.50' }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.3rem' }, mb: 1.5 }}>
          {textWithGradient(lang === 'es' ? 'Últimos Artículos' : 'Latest Articles')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mx: 'auto' }}>
          {lang === 'es'
            ? 'Contenido útil para empresas en Guatemala sobre software a medida, automatización y plataformas web modernas.'
            : 'Useful content for companies in Guatemala about custom software, automation, and modern web platforms.'}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {topArticles.map(article => (
          <Box
            key={article.slug}
            component={Link}
            href={`/${lang}/articles/${article.slug}`}
            sx={{
              textDecoration: 'none',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 18px rgba(0,0,0,0.08)',
              },
            }}
          >
            <ArticleCardImage src={article.heroImage} alt={article.heroImageAlt || article.title} />

            <Stack spacing={1.4} sx={{ p: 2.2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Chip size="small" label={article.category} variant="outlined" color="primary" />
                <Stack direction="row" alignItems="center" spacing={0.4}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">{article.readingTime}</Typography>
                </Stack>
              </Stack>

              <Typography variant="h3" sx={{ fontSize: '1.08rem', lineHeight: 1.35 }}>
                {article.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {article.excerpt}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button component={Link} href={`/${lang}/articles`} variant="contained">
          {lang === 'es' ? 'Ver Todos los Artículos' : 'View All Articles'}
        </Button>
      </Box>
    </Section>
  );
}
