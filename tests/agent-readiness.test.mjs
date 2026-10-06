import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { after, before, describe, test } from 'node:test';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');

let server;
let baseUrl;

async function getFreePort() {
  const probe = net.createServer();

  await new Promise((resolve, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolve);
  });

  const address = probe.address();
  const port = typeof address === 'object' && address ? address.port : null;

  await new Promise((resolve, reject) => {
    probe.close(error => (error ? reject(error) : resolve()));
  });

  assert.ok(port, 'Expected the operating system to provide a free port');
  return port;
}

async function request(
  requestPath,
  requestHeaders = {},
  { followRedirects = false, method = 'GET', body } = {},
) {
  const response = await fetch(`${baseUrl}${requestPath}`, {
    headers: requestHeaders,
    method,
    body,
    redirect: followRedirects ? 'follow' : 'manual',
  });

  return {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text(),
  };
}

function assertVaryAccept(response) {
  assert.match(response.headers.vary || '', /(?:^|,\s*)accept(?:,|$)/i);
}

function assertContentType(response, type) {
  assert.match(response.headers['content-type'] || '', new RegExp(`^${type}(?:;|$)`, 'i'));
}

function assertStructuredApiError(response, status, code) {
  assert.equal(response.status, status);
  assertContentType(response, 'application/json');
  const error = JSON.parse(response.body);
  assert.equal(error.success, false);
  assert.equal(error.code, code);
  assert.equal(error.error, error.message);
  assert.ok(error.hint);
  return error;
}

async function waitForServer() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      await request('/en');
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  throw new Error('Production server did not become ready within 10 seconds');
}

before(async () => {
  const port = await getFreePort();
  baseUrl = `http://127.0.0.1:${port}`;
  server = execFile(process.execPath, [nextBin, 'start', '-H', '127.0.0.1', '-p', String(port)], {
    cwd: root,
    stdio: 'ignore',
  });
  await waitForServer();
});

after(async () => {
  if (!server || server.exitCode !== null) return;
  server.kill('SIGTERM');
  await new Promise(resolve => server.once('exit', resolve));
});

describe('agent-readable HTTP responses', () => {
  test('localized HTML pages remain available', async () => {
    for (const page of ['/en', '/es', '/en/about', '/es/about', '/en/services', '/es/services', '/en/portfolio', '/es/portfolio', '/en/developers', '/es/developers']) {
      const response = await request(page, { Accept: 'text/html' });
      assert.equal(response.status, 200, page);
      assertContentType(response, 'text/html');
    }
  });

  test('AI automation and IoT services stay bilingual across site and agent content', async () => {
    const existingIds = [
      'web-applications',
      'mobile-applications',
      'api-development',
      'code-maintenance',
      'ux-design',
      '3d-modeling',
    ];
    const offerIds = ['ai-automation', 'iot-solutions'];
    const expectedIds = [...existingIds, ...offerIds];
    const loadJson = (language, ...segments) =>
      JSON.parse(readFileSync(path.join(root, 'src', 'content', language, ...segments), 'utf8'));
    const shape = value => Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === 'object'
        ? Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shape(child)]))
        : typeof value;
    const visibleText = markup => markup
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
    const cleanTitle = title => title.replace(/\{\{gradient:([^}]+)\}\}/g, '$1');
    const localizedServices = Object.fromEntries(['en', 'es'].map(language => [
      language,
      Object.fromEntries(offerIds.map(id => [id, loadJson(language, 'services', `${id}.json`)])),
    ]));

    for (const id of offerIds) {
      assert.deepEqual(shape(localizedServices.en[id]), shape(localizedServices.es[id]), `${id} content shape`);
    }

    for (const language of ['en', 'es']) {
      const overview = loadJson(language, 'services-overview.json');
      const footer = loadJson(language, 'footer.json');
      assert.deepEqual(overview.navigation.items.map(item => item.id), expectedIds, `${language} service IDs`);
      assert.deepEqual(footer.sections.product.links, overview.navigation.items.map(item => item.title));

      const home = await request(`/${language}`, { Accept: 'text/html' });
      const homeText = visibleText(home.body);
      const homepageFeatures = loadJson(language, 'features.json').items;
      for (const id of offerIds) {
        const service = localizedServices[language][id];
        const title = cleanTitle(service.hero.title);
        const feature = homepageFeatures.find(item => item.title === title);
        assert.ok(feature, `${language} homepage feature for ${id}`);
        assert.ok(homeText.includes(feature.title), `${language} homepage title for ${id}`);
        assert.ok(homeText.includes(feature.description), `${language} homepage description for ${id}`);
      }

      const page = await request(`/${language}/services`, { Accept: 'text/html' });
      const pageMarkup = page.body
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ');
      const pageText = visibleText(pageMarkup);
      assert.ok(pageText.includes(overview.hero.description), `${language} services overview`);

      for (const { id } of overview.navigation.items) {
        assert.ok(pageMarkup.includes(`id="${id}"`), `${language} rendered section ${id}`);
      }
      const tabs = [...pageMarkup.matchAll(/<button\b[^>]*role="tab"[^>]*>/g)].map(([tag]) => tag);
      const panels = [...pageMarkup.matchAll(/<section\b[^>]*role="tabpanel"[^>]*>/g)].map(([tag]) => tag);
      assert.equal(tabs.length, expectedIds.length, `${language} service tabs`);
      assert.equal(panels.length, expectedIds.length, `${language} service panels`);
      for (const [index, id] of expectedIds.entries()) {
        assert.ok(tabs[index].includes(`id="${id}"`), `${language} tab order for ${id}`);
        assert.ok(tabs[index].includes(`aria-controls="${id}-panel"`), `${language} tab control for ${id}`);
        assert.ok(tabs[index].includes(`aria-selected="${index === 0}"`), `${language} selected tab for ${id}`);
        assert.ok(panels[index].includes(`id="${id}-panel"`), `${language} panel for ${id}`);
        assert.ok(panels[index].includes(`aria-labelledby="${id}"`), `${language} panel label for ${id}`);
        assert.ok(panels[index].includes(`aria-hidden="${index !== 0}"`), `${language} hidden panel for ${id}`);
        if (index !== 0) assert.match(panels[index], /\binert=""/, `${language} inactive panel for ${id}`);
        const service = loadJson(language, 'services', `${id}.json`);
        assert.ok(pageText.includes(service.hero.description), `${language} rendered description for ${id}`);
      }
      for (const id of offerIds) {
        const service = localizedServices[language][id];
        const title = cleanTitle(service.hero.title);
        const anchorIndex = pageMarkup.indexOf(`id="${id}-panel"`);
        const sectionStart = pageMarkup.lastIndexOf('<section', anchorIndex);
        const sectionEnd = pageMarkup.indexOf('</section>', anchorIndex);
        assert.ok(sectionStart >= 0 && sectionEnd > anchorIndex, `${language} section markup for ${id}`);
        const sectionText = visibleText(pageMarkup.slice(sectionStart, sectionEnd));
        assert.ok(sectionText.includes(title), `${language} service title for ${id}`);
        assert.ok(sectionText.includes(service.hero.description), `${language} service description for ${id}`);

        const footerLink = [...pageMarkup.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
          .find(([, href]) => href === `/${language}/services#${id}`);
        assert.ok(footerLink, `${language} footer href for ${id}`);
        assert.ok(visibleText(footerLink[2]).includes(title), `${language} footer title for ${id}`);
      }

      const markdown = await request(`/${language}/services`, { Accept: 'text/markdown' });
      assert.equal(markdown.status, 200);
      for (const id of offerIds) {
        const service = localizedServices[language][id];
        const title = cleanTitle(service.hero.title);
        assert.ok(markdown.body.includes(`### [${title}](https://antiguatechlabs.com/${language}/services#${id})`));
        assert.ok(markdown.body.includes(service.hero.description));
      }
      assert.ok(markdown.body.includes(language === 'es' ? '**Capacidades:**' : '**Capabilities:**'));
      assert.ok(markdown.body.includes(language === 'es' ? '**Tecnologías:**' : '**Technologies:**'));
    }

    const llms = await request('/llms.txt');
    for (const id of offerIds) {
      const title = cleanTitle(localizedServices.en[id].hero.title);
      assert.ok(llms.body.includes(`[${title}](https://antiguatechlabs.com/en/services#${id})`));
    }
  });

  test('homepage HTML has meaningful content, sequential headings, and JSON-LD identity data', async () => {
    const response = await request('/en', { Accept: 'text/html' });
    assert.equal(response.status, 200);

    const contentWithoutNonContentMarkup = response.body
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    assert.ok(contentWithoutNonContentMarkup.length >= 500);

    const headingSource = response.body
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ');
    const headingLevels = [...headingSource.matchAll(/<h([1-6])\b/gi)].map(match => Number(match[1]));
    assert.equal(headingLevels[0], 1, 'The first homepage heading must be h1');
    for (let index = 1; index < headingLevels.length; index += 1) {
      assert.ok(
        headingLevels[index] <= headingLevels[index - 1] + 1,
        `Heading hierarchy skips from h${headingLevels[index - 1]} to h${headingLevels[index]} (${headingLevels.join(', ')})`,
      );
    }

    const jsonLd = [...response.body.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
      .map(match => JSON.parse(match[1]));
    assert.ok(jsonLd.length >= 2, 'Homepage should expose Organization and WebSite JSON-LD');

    for (const type of ['Organization', 'WebSite']) {
      const schema = jsonLd.find(item => item['@type'] === type);
      assert.ok(schema, `Missing ${type} JSON-LD`);
      assert.equal(schema.name, 'Antigua Tech Labs');
      assert.ok(schema.description);
      assert.ok(schema.url);
      if (type === 'Organization') assert.match(schema.logo, /\.png$/i);
    }

    const iconLink = [...response.body.matchAll(/<link\b[^>]*>/gi)]
      .map(match => match[0])
      .find(tag => /\brel=["']icon["']/i.test(tag) && /\.png(?:[?"'])/i.test(tag));
    assert.ok(iconLink, 'Homepage should use the PNG site icon');
  });

  test('Markdown negotiation supports every localized sitemap page', async () => {
    const root = await request('/', { Accept: 'text/markdown' });
    assert.equal(root.status, 200);
    assertContentType(root, 'text/markdown');
    assertVaryAccept(root);

    for (const page of ['/en', '/es', '/en/about', '/es/about', '/en/services', '/es/services', '/en/portfolio', '/es/portfolio', '/en/developers', '/es/developers']) {
      const response = await request(page, { Accept: 'text/markdown' });
      assert.equal(response.status, 200, page);
      assertContentType(response, 'text/markdown');
      assertVaryAccept(response);
      assert.match(response.body, /^# /);
      assert.doesNotMatch(response.body, /<html[\s>]/i);
    }
  });

  test('OpenAPI publishes the implemented public API contract', async () => {
    const response = await request('/openapi.json', { Accept: 'text/markdown' });
    assert.equal(response.status, 200);
    assertContentType(response, 'application/json');

    const document = JSON.parse(response.body);
    assert.equal(document.openapi, '3.1.0');
    assert.ok(document.servers.some(serverEntry => serverEntry.url === 'https://antiguatechlabs.com'));

    const operation = document.paths['/api/contact'].post;
    assert.equal(operation.operationId, 'submitContactInquiry');
    assert.deepEqual(operation.security, []);
    assert.ok(operation.parameters.some(parameter => parameter.name === 'dryRun' && parameter.schema.type === 'boolean'));
    assert.deepEqual(
      document.components.schemas.ContactRequest.required,
      ['name', 'email', 'message'],
    );
    assert.ok(document.components.schemas.ApiError.required.includes('hint'));
    assert.doesNotMatch(response.body, /bearer|api[_ -]?key/i);
  });

  test('contact API returns structured errors and supports a safe dry-run sandbox', async () => {
    const unsupported = await request(
      '/api/contact',
      { 'Content-Type': 'text/plain' },
      { method: 'POST', body: '{}' },
    );
    assertStructuredApiError(unsupported, 415, 'UNSUPPORTED_MEDIA_TYPE');

    const malformed = await request(
      '/api/contact',
      { 'Content-Type': 'application/json' },
      { method: 'POST', body: '{' },
    );
    assertStructuredApiError(malformed, 400, 'INVALID_JSON');

    for (const payload of [null, [], { name: 42, email: 'invalid', message: '' }]) {
      const invalid = await request(
        '/api/contact?dryRun=true',
        { 'Content-Type': 'application/json' },
        { method: 'POST', body: JSON.stringify(payload) },
      );
      const error = assertStructuredApiError(invalid, 400, 'VALIDATION_ERROR');
      assert.ok(error.details?.length);
    }

    const invalidQuery = await request(
      '/api/contact?dryRun=yes',
      { 'Content-Type': 'application/json' },
      {
        method: 'POST',
        body: JSON.stringify({ name: 'Ada', email: 'ada@example.com', message: 'Hello' }),
      },
    );
    assertStructuredApiError(invalidQuery, 400, 'VALIDATION_ERROR');

    const dryRun = await request(
      '/api/contact?dryRun=true',
      { 'Content-Type': 'application/json' },
      {
        method: 'POST',
        body: JSON.stringify({ name: ' Ada ', email: 'ada@example.com', message: ' Project inquiry ' }),
      },
    );
    assert.equal(dryRun.status, 200);
    assertContentType(dryRun, 'application/json');
    assert.deepEqual(JSON.parse(dryRun.body), {
      success: true,
      message: 'Contact payload is valid. No email was sent.',
      sandbox: true,
    });

    const methodError = await request('/api/contact');
    assertStructuredApiError(methodError, 405, 'METHOD_NOT_ALLOWED');
    assert.match(methodError.headers.allow || '', /POST/);

    const options = await request('/api/contact', {}, { method: 'OPTIONS' });
    assert.equal(options.status, 204);
    assert.match(options.headers.allow || '', /POST/);
  });

  test('API root, unknown routes, and unsupported known methods return JSON', async () => {
    for (const page of ['/api', '/api/path-that-does-not-exist']) {
      const response = await request(page);
      assertStructuredApiError(response, 404, 'API_NOT_FOUND');
      assert.match(response.body, /\/openapi\.json/);
    }

    const sitemapMethod = await request('/api/sitemap', { 'Content-Type': 'application/json' }, { method: 'POST', body: '{}' });
    assertStructuredApiError(sitemapMethod, 405, 'METHOD_NOT_ALLOWED');

    const markdownMethod = await request('/api/markdown/en', { 'Content-Type': 'application/json' }, { method: 'POST', body: '{}' });
    assertStructuredApiError(markdownMethod, 405, 'METHOD_NOT_ALLOWED');
  });

  test('developer portal is localized, discoverable, and available as Markdown', async () => {
    const root = await request('/developers');
    assert.ok([307, 308].includes(root.status));
    assert.match(root.headers.location || '', /\/en\/developers$/);

    for (const language of ['en', 'es']) {
      const response = await request(`/${language}/developers`);
      assert.equal(response.status, 200);
      assert.match(response.body, /\/openapi\.json/);
      assert.match(response.body, /\/api\/contact\?dryRun=true/);
      assert.match(response.body, /@antiguatechlabs\/cli/);

      const markdown = await request(`/${language}/developers`, { Accept: 'text/markdown' });
      assert.equal(markdown.status, 200);
      assertContentType(markdown, 'text/markdown');
      assertVaryAccept(markdown);
      assert.match(markdown.body, /^# /);
      assert.match(markdown.body, /POST \/api\/contact/);
    }

    for (const language of ['en', 'es']) {
      const homepage = await request(`/${language}`);
      assert.match(homepage.body, /href=["']\/developers["']/);
      assert.match(homepage.body, /href=["']\/openapi\.json["']/);
      assert.match(homepage.body, /href=["']\/llms\.txt["']/);
    }
  });

  test('Accept quality values, wildcards, and unsupported types select the expected response', async () => {
    const markdownPreferred = await request('/en', { Accept: 'text/html;q=0.4, text/markdown;q=0.9' });
    assert.equal(markdownPreferred.status, 200);
    assertContentType(markdownPreferred, 'text/markdown');

    const htmlPreferred = await request('/en', { Accept: 'text/markdown;q=0.4, text/html;q=0.9' });
    assert.equal(htmlPreferred.status, 200);
    assertContentType(htmlPreferred, 'text/html');

    const wildcard = await request('/en', { Accept: '*/*' });
    assert.equal(wildcard.status, 200);
    assertContentType(wildcard, 'text/html');

    const clientOrderMarkdown = await request('/en', { Accept: 'text/markdown, text/html' });
    assert.equal(clientOrderMarkdown.status, 200);
    assertContentType(clientOrderMarkdown, 'text/markdown');

    const clientOrderHtml = await request('/en', { Accept: 'text/html, text/markdown' });
    assert.equal(clientOrderHtml.status, 200);
    assertContentType(clientOrderHtml, 'text/html');

    const specificRangeWins = await request('/en', { Accept: 'text/*;q=0.8, text/markdown;q=0.7' });
    assert.equal(specificRangeWins.status, 200);
    assertContentType(specificRangeWins, 'text/html');

    const wildcardFallback = await request('/en', { Accept: 'text/html;q=0, */*;q=0.9' });
    assert.equal(wildcardFallback.status, 200);
    assertContentType(wildcardFallback, 'text/markdown');

    const unsupported = await request('/en', { Accept: 'application/pdf' });
    assert.equal(unsupported.status, 406);
    assertContentType(unsupported, 'text/plain');
    assertVaryAccept(unsupported);

    const rsc = await request('/en', { Accept: 'text/markdown', RSC: '1', 'Next-Router-Prefetch': '1' });
    assert.doesNotMatch(rsc.headers['content-type'] || '', /^text\/markdown/i);
  });

  test('unknown paths return recovery-oriented 404 responses', async () => {
    const localized = await request('/es/path-that-does-not-exist', { Accept: 'text/html' });
    assert.equal(localized.status, 404);
    assertContentType(localized, 'text/html');
    assert.match(localized.body, /\/sitemap\.xml/);
    assert.match(localized.body, /\/llms\.txt/);

    const root = await request('/path-that-does-not-exist', { Accept: 'text/html' }, { followRedirects: true });
    assert.equal(root.status, 404);
    assert.match(root.body, /\/sitemap\.xml/);
    assert.match(root.body, /\/llms\.txt/);

    const markdown = await request('/es/path-that-does-not-exist', { Accept: 'text/markdown' });
    assert.equal(markdown.status, 404);
    assertContentType(markdown, 'text/markdown');
    assertVaryAccept(markdown);
    assert.match(markdown.body, /^# Page not found/m);
    assert.match(markdown.body, /\/sitemap\.xml/);
    assert.match(markdown.body, /\/llms\.txt/);
  });

  test('portfolio WIP links are hidden while direct routes remain available', async () => {
    for (const language of ['en', 'es']) {
      for (const page of ['', '/about', '/services']) {
        const response = await request(`/${language}${page}`);
        assert.equal(response.status, 200, `/${language}${page}`);
        assert.doesNotMatch(response.body, new RegExp(`href=["']\/${language}\/portfolio["']`));
      }

      const portfolio = await request(`/${language}/portfolio`);
      assert.equal(portfolio.status, 200, `/${language}/portfolio`);
    }
  });

  test('selected cards use liquid glass and hero patterns expose reduced-motion-safe CSS animation', async () => {
    const home = await request('/en');
    const homeGlassCards = home.body.match(/data-liquid-glass="true"/g) || [];
    assert.ok(homeGlassCards.length >= 7, 'Homepage should expose six feature cards and one contact card');
    assert.match(home.body, /backdrop-filter:blur\(7px\)/i);
    assert.match(home.body, /prefers-reduced-motion/i);

    const about = await request('/en/about');
    const aboutGlassCards = about.body.match(/data-liquid-glass="true"/g) || [];
    assert.ok(aboutGlassCards.length >= 5, 'About page should expose four value cards and one contact card');
    assert.match(about.body, /data-pattern-motion="grid-drift"/);
    assert.match(about.body, /decorativeGridDrift/);

    const services = await request('/en/services');
    assert.match(services.body, /data-pattern-motion="contour-drift"/);
    assert.match(services.body, /decorativeContourDrift/);

    const portfolio = await request('/en/portfolio');
    assert.match(portfolio.body, /data-pattern-motion="horizontal-slide"/);
    assert.match(portfolio.body, /decorativeHorizontalSlide/);
  });

  test('llms.txt follows the required heading, summary, and linked-section structure', async () => {
    const response = await request('/llms.txt');
    assert.equal(response.status, 200);
    assertContentType(response, 'text/plain');

    const nonEmptyLines = response.body.split('\n').filter(line => line.trim());
    assert.equal(nonEmptyLines[0], '# Antigua Tech Labs');
    assert.match(nonEmptyLines[1], /^> /);
    assert.match(response.body, /^## When to use this$/m);
    assert.match(response.body, /^## Core pages$/m);
    assert.match(response.body, /^## Machine-readable resources$/m);
    assert.match(response.body, /Accept: text\/markdown/);
    assert.match(response.body, /https:\/\/antiguatechlabs\.com\/sitemap\.xml/);
    assert.match(response.body, /https:\/\/antiguatechlabs\.com\/openapi\.json/);
    assert.match(response.body, /https:\/\/antiguatechlabs\.com\/developers/);
    assert.match(response.body, /CLI source/);

    const negotiated = await request('/llms.txt', { Accept: 'text/markdown' });
    assert.equal(negotiated.status, 200);
    assertContentType(negotiated, 'text/plain');
    assert.match(negotiated.body, /^## When to use this$/m);
  });

  test('sitemap and robots endpoints expose their expected machine-readable content', async () => {
    const sitemap = await request('/sitemap.xml');
    assert.equal(sitemap.status, 200);
    assertContentType(sitemap, 'application/xml');
    for (const page of ['/en', '/es', '/en/about', '/es/about', '/en/services', '/es/services', '/en/portfolio', '/es/portfolio', '/en/developers', '/es/developers']) {
      assert.match(sitemap.body, new RegExp(`https://antiguatechlabs\\.com${page.replaceAll('/', '\\/')}`));
    }

    const apiSitemap = await request('/api/sitemap');
    assert.equal(apiSitemap.status, 200);
    assertContentType(apiSitemap, 'application/xml');

    const robots = await request('/robots.txt');
    assert.equal(robots.status, 200);
    assertContentType(robots, 'text/plain');
    assert.match(robots.body, /Sitemap:\s+https:\/\/antiguatechlabs\.com\/sitemap\.xml/);

    const openGraphImage = await request('/og?title=Agent%20Readiness');
    assert.equal(openGraphImage.status, 200);
    assertContentType(openGraphImage, 'image/png');
  });
});
