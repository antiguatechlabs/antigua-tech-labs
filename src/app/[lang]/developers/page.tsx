import type { Metadata } from 'next';

import { DevelopersPage } from '@/components/sections/DevelopersPage';
import { getDeveloperPortalContent } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/seo/config';

interface DeveloperPageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: DeveloperPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isSpanish = lang === 'es';
  const title = isSpanish
    ? 'Portal para desarrolladores | Antigua Tech Labs'
    : 'Developer portal | Antigua Tech Labs';
  const description = isSpanish
    ? 'Documentación de la API pública, OpenAPI, errores JSON, sandbox y CLI de Antigua Tech Labs.'
    : 'Antigua Tech Labs public API documentation, OpenAPI contract, JSON errors, sandbox, and CLI.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/developers`,
      languages: {
        en: `${SITE_CONFIG.url}/en/developers`,
        es: `${SITE_CONFIG.url}/es/developers`,
        'x-default': `${SITE_CONFIG.url}/en/developers`,
      },
    },
  };
}

export default async function DeveloperPortal({ params }: DeveloperPageProps) {
  const { lang } = await params;
  return <DevelopersPage content={getDeveloperPortalContent(lang)} />;
}
