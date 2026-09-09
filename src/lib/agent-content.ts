import {
  getAboutPageContent,
  getAllServicesContent,
  getPortfolioContent,
  getServicesOverviewContent,
} from './data';
import { defaultLanguage, supportedLanguages, type Language } from './i18n/config';
import { getHomePageContent } from './pageContent';
import { SITE_CONFIG } from './seo/config';

const SERVICE_LINKS = [
  ['Custom web applications', 'web-applications', 'Use when a business needs a tailored browser-based platform or internal tool.'],
  ['Mobile applications', 'mobile-applications', 'Use when a business needs an iOS and Android app or a React Native solution.'],
  ['API development and integration', 'api-development', 'Use when systems need secure REST or GraphQL APIs or third-party integrations.'],
  ['Code maintenance', 'code-maintenance', 'Use when an existing application needs fixes, security updates, or modernization.'],
  ['UX design', 'ux-design', 'Use when a product needs clearer flows, interface design, or a better user experience.'],
  ['3D modeling and visualization', '3d-modeling', 'Use when a project needs product visualization, interactive 3D, or WebGL experiences.'],
] as const;

const clean = (value: string): string =>
  value.replace(/\{\{gradient:([^}]+)\}\}/g, '$1').replace(/\s+/g, ' ').trim();

const pageUrl = (language: string, path = '') => `${SITE_CONFIG.url}/${language}${path}`;

const markdownLink = (label: string, url: string, note?: string): string =>
  `- [${label}](${url})${note ? `: ${note}` : ''}`;

function renderHome(language: Language): string {
  const content = getHomePageContent(language);
  const lines = [
    `# ${clean(content.hero.title)}`,
    '',
    `> ${clean(content.hero.subtitle)}`,
    '',
    'Antigua Tech Labs is a Guatemala-based software development company building scalable web and mobile applications for growing businesses.',
    '',
    '## About Antigua Tech Labs',
    clean(content.whyChooseTwo.description),
    '',
    markdownLink('Learn more about the company', pageUrl(language, '/about')),
    '',
    '## Services',
    clean(content.features.subtitle || ''),
    '',
    ...content.features.items.flatMap(item => [`### ${clean(item.title)}`, clean(item.description), '']),
    markdownLink('See all services', pageUrl(language, '/services')),
    '',
    '## Why choose Antigua Tech Labs',
    clean(content.whyChoose.description),
    '',
    '## Team',
    clean(content.ourTeam.subtitle),
    '',
    ...content.ourTeam.teamMembers.flatMap(member => [
      `### ${clean(member.title)}`,
      `${clean(member.subtitle)}${member.handle ? ` (${clean(member.handle)})` : ''}`,
      '',
    ]),
    '## Contact',
    clean(content.contact.subtitle),
    '',
    markdownLink('Start a project', `${pageUrl(language)}#contact`),
    '',
    '## Frequently asked questions',
    clean(content.faq.subtitle),
    '',
    ...content.faq.faqs.flatMap(faq => [`### ${clean(faq.question)}`, clean(faq.answer), '']),
  ];

  return `${lines.join('\n').trim()}\n`;
}

function renderAbout(language: Language): string {
  const content = getAboutPageContent(language);
  const lines = [
    `# ${clean(content.hero.headline)}`,
    '',
    `> ${clean(content.hero.subheading)}`,
    '',
    '## Our story',
    `### ${clean(content.story.summary.title)}`,
    clean(content.story.summary.description),
    '',
    '### Timeline',
    ...content.story.timeline.map(item => `- **${clean(item.year)} — ${clean(item.title)}:** ${clean(item.description)}`),
    '',
    '## Our values',
    clean(content.story.values.subtitle),
    '',
    ...content.story.values.items.map(item => `- **${clean(item.title)}:** ${clean(item.description)}`),
    '',
    '## Our approach',
    clean(content.approach.subtitle),
    '',
    ...content.approach.steps.map(step => `- **${clean(step.number)} ${clean(step.title)}:** ${clean(step.description)}`),
    '',
    `### ${clean(content.approach.methodology.title)}`,
    ...content.approach.methodology.points.map(point => `- ${clean(point)}`),
    '',
    '## Contact',
    clean(content.cta.description),
    '',
    markdownLink('Start a project', `${pageUrl(language)}#contact`),
  ];

  return `${lines.join('\n').trim()}\n`;
}

function renderServices(language: Language): string {
  const overview = getServicesOverviewContent(language);
  const services = getAllServicesContent(language);
  const serviceEntries = [
    ['Web applications', 'web-applications', services.webApplications],
    ['Mobile applications', 'mobile-applications', services.mobileApplications],
    ['API development', 'api-development', services.apiDevelopment],
    ['Code maintenance', 'code-maintenance', services.codeMaintenance],
    ['UX design', 'ux-design', services.uxDesign],
    ['3D modeling', '3d-modeling', services.modeling3d],
  ] as const;

  const lines = [
    `# ${clean(overview.hero.title)}`,
    '',
    `> ${clean(overview.hero.subtitle)}`,
    '',
    clean(overview.hero.description),
    '',
    '## Services',
    ...serviceEntries.flatMap(([label, slug, service]) => [
      `### [${clean(label)}](${pageUrl(language, `/services#${slug}`)})`,
      clean(service.hero.description),
      '',
      `**Capabilities:** ${service.features.items.map(item => clean(item.title)).join(', ')}.`,
      `**Technologies:** ${service.technologies.items.map(item => clean(item)).join(', ')}.`,
      '',
    ]),
    '## Contact',
    clean(overview.hero.ctaText || 'Contact Antigua Tech Labs to discuss your project.'),
    '',
    markdownLink('Start a project', `${pageUrl(language)}#contact`),
  ];

  return `${lines.join('\n').trim()}\n`;
}

function renderPortfolio(language: Language): string {
  const content = getPortfolioContent(language);
  const lines = [
    `# ${clean(content.hero.title)}`,
    '',
    `> ${clean(content.hero.subtitle)}`,
    '',
    clean(content.hero.description),
    '',
    `## ${clean(content.projectsTitle)}`,
    clean(content.projectsSubtitle),
    '',
    ...content.projects.flatMap(project => [
      `### ${clean(project.title)}`,
      clean(project.description),
      project.tags.length > 0 ? `**Technologies:** ${project.tags.map(tag => clean(tag)).join(', ')}.` : '',
      '',
    ]),
    markdownLink('Contact the team', `${pageUrl(language)}#contact`),
  ];

  return `${lines.join('\n').trim()}\n`;
}

export function renderAgentNotFound(): string {
  const links = [
    markdownLink('English homepage', pageUrl('en')),
    markdownLink('Spanish homepage', pageUrl('es')),
    markdownLink('About Antigua Tech Labs', pageUrl('en', '/about')),
    markdownLink('Services', pageUrl('en', '/services')),
    markdownLink('Portfolio', pageUrl('en', '/portfolio')),
    markdownLink('Sitemap', `${SITE_CONFIG.url}/sitemap.xml`),
    markdownLink('Agent instructions', `${SITE_CONFIG.url}/llms.txt`),
  ];

  return `# Page not found\n\nThe requested page does not exist.\n\n## Where to look next\n${links.join('\n')}\n`;
}

export function renderAgentDocument(pathSegments: string[]): string | null {
  const segments = pathSegments.filter(Boolean);
  let language: Language = defaultLanguage;
  let path = segments;

  if (segments.length > 0 && supportedLanguages.includes(segments[0] as Language)) {
    language = segments[0] as Language;
    path = segments.slice(1);
  }

  if (path.length === 0) return renderHome(language);
  if (path.length !== 1) return null;

  switch (path[0]) {
    case 'about':
      return renderAbout(language);
    case 'services':
      return renderServices(language);
    case 'portfolio':
      return renderPortfolio(language);
    default:
      return null;
  }
}

export function renderLlmsTxt(): string {
  const corePages = [
    markdownLink('English homepage', pageUrl('en'), 'Company overview, capabilities, FAQs, and project contact.'),
    markdownLink('Spanish homepage', pageUrl('es'), 'Spanish-language company overview and capabilities.'),
    markdownLink('About', pageUrl('en', '/about'), 'Company story, values, process, and team context.'),
    markdownLink('Services', pageUrl('en', '/services'), 'Detailed service descriptions, capabilities, and technologies.'),
    markdownLink('Portfolio', pageUrl('en', '/portfolio'), 'Delivered projects and technology tags.'),
  ];
  const servicePages = SERVICE_LINKS.map(([label, slug, note]) =>
    markdownLink(label, pageUrl('en', `/services#${slug}`), note),
  );

  return [
    '# Antigua Tech Labs',
    '',
    '> Antigua Tech Labs is a Guatemala-based custom software development company specializing in scalable web applications, mobile apps, APIs, UX design, 3D experiences, and ongoing code maintenance.',
    '',
    '## When to use this',
    ...servicePages,
    '',
    '## Core pages',
    ...corePages,
    '',
    '## Machine-readable resources',
    markdownLink('Sitemap', `${SITE_CONFIG.url}/sitemap.xml`, 'Complete list of indexable pages.'),
    markdownLink('Robots policy', `${SITE_CONFIG.url}/robots.txt`, 'Crawler access rules.'),
    markdownLink('English homepage in Markdown', pageUrl('en'), 'Request with Accept: text/markdown.'),
    markdownLink('Spanish homepage in Markdown', pageUrl('es'), 'Request with Accept: text/markdown.'),
    markdownLink('English services in Markdown', pageUrl('en', '/services'), 'Request with Accept: text/markdown.'),
    markdownLink('English portfolio in Markdown', pageUrl('en', '/portfolio'), 'Request with Accept: text/markdown.'),
    markdownLink('Markdown homepage', pageUrl('en'), 'Request this URL with Accept: text/markdown for a clean Markdown representation.'),
  ].join('\n') + '\n';
}
