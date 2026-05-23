# SEO Content Production Workflow (Antigua Tech Labs)

This workflow is for publishing bilingual, local-SEO articles for:
- Antigua Guatemala
- Sacatepequez
- Guatemala City

## Goals
- Increase organic visibility for service-intent keywords.
- Build topical authority around software development, automation, and web platforms.
- Convert traffic into qualified consultations.

## 1) Topic Selection Rules
Pick topics that are:
1. Close to services (`/services`) and buying intent.
2. Localized for Guatemala search behavior.
3. Suitable for long-form depth (target 2000-3000 words per language).

Topic cluster examples:
- Custom software decisions
- Automation implementation
- Modern business website strategy
- CRM and business systems
- API integration and data operations

## 2) Keyword Mapping Rules
For each article, define:
- 1 primary keyword
- 3-5 secondary keywords
- 3 local-intent variants (Antigua Guatemala / Sacatepequez / Guatemala City)
- 3 bilingual semantic variants (EN + ES)

Use the template at:
- `src/content/seo/keyword-mapping-template.csv`

## 3) Content Brief Rules
Use:
- `docs/SEO_ARTICLE_BRIEF_TEMPLATE.md`

Minimum brief requirements:
- Search intent (informational vs commercial)
- Target audience and stage
- Internal links to include (`/services`, `/about`, `/#contact`)
- CTA objective and form of conversion
- Section-level outline with H2/H3 hierarchy

## 4) Writing Rules
- Length: 2000-3000 words per language.
- Readability: short paragraphs, clear structure, practical examples.
- Avoid filler text.
- Keep EN/ES parity in message and depth.
- Add local relevance naturally (not keyword stuffing).

## 5) JSON Implementation Rules
Use the exact schema from:
- `src/content/templates/articles.entry.template.json`

Then add entries in both:
- `src/content/en/articles.json`
- `src/content/es/articles.json`

## 6) On-Page SEO Checklist
Before publish:
- `seo.title` contains primary keyword + local intent.
- `seo.description` includes value proposition + location relevance.
- `seo.keywords` contains primary, secondary, and local variants.
- `toc` aligns with section headings.
- `heroImage` path is valid in `public/images/articles/<slug>/hero.webp`.
- `heroImageAlt` describes content clearly for accessibility.

## 7) Structured Data Checklist
- `BlogPosting` schema is automatic on article detail pages.
- Add `faq[]` in article JSON when applicable to enable `FAQPage` schema.
- FAQ items should reflect real buyer questions.

## 8) Internal Linking Checklist
Each article should include:
- At least 2 internal links in relevant sections.
- A final CTA linking to `/#contact`.
- Contextual links to related articles when available.

## 9) Image Standards
- One high-quality master image per article.
- Route format:
  - `public/images/articles/<slug>/hero.webp`
- Recommended image size: 1600-2000px wide, 16:9.
- Keep naming lowercase to avoid case-sensitivity issues.

## 10) QA Before Publish
1. Confirm both EN and ES articles exist.
2. Confirm slug is identical in EN and ES.
3. Confirm image path works in both homepage card and detail page.
4. Confirm lint/build pass.
5. Confirm sitemap includes article routes.

## 11) Monthly Optimization Loop
- Review Search Console queries and CTR.
- Refresh underperforming intros and H2 titles.
- Expand FAQ blocks for rich-result potential.
- Improve internal linking to high-converting pages.
