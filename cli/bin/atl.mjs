#!/usr/bin/env node

const DEFAULT_BASE_URL = 'https://antiguatechlabs.com';

const helpText = `Antigua Tech Labs CLI

Usage:
  atl help
  atl docs
  atl openapi [--base-url <url>]
  atl contact --name <name> --email <email> --message <message> [--dry-run] [--base-url <url>]

Commands:
  docs      Print the developer portal and OpenAPI URLs.
  openapi   Retrieve and print the public OpenAPI specification.
  contact   Submit a contact inquiry. Use --dry-run to validate without sending email.

Environment:
  ATL_API_BASE_URL   Override the default API base URL.
`;

function readOption(args, name) {
  const index = args.indexOf(`--${name}`);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`Missing value for --${name}.`);
  return value;
}

function resolveBaseUrl(args) {
  const value = readOption(args, 'base-url') || process.env.ATL_API_BASE_URL || DEFAULT_BASE_URL;
  const url = new URL(value);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('--base-url must use http or https.');
  }
  return url.toString().replace(/\/$/, '');
}

async function printResponse(response) {
  const body = await response.text();
  try {
    process.stdout.write(`${JSON.stringify(JSON.parse(body), null, 2)}\n`);
  } catch {
    process.stdout.write(`${body.trim()}\n`);
  }

  if (!response.ok) process.exitCode = 1;
}

async function runOpenApi(args) {
  const response = await fetch(`${resolveBaseUrl(args)}/openapi.json`, {
    headers: { Accept: 'application/json' },
  });
  await printResponse(response);
}

async function runContact(args) {
  const name = readOption(args, 'name');
  const email = readOption(args, 'email');
  const message = readOption(args, 'message');

  if (!name || !email || !message) {
    throw new Error('contact requires --name, --email, and --message.');
  }

  const dryRun = args.includes('--dry-run');
  const query = dryRun ? '?dryRun=true' : '';
  const response = await fetch(`${resolveBaseUrl(args)}/api/contact${query}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  });
  await printResponse(response);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  if (command === 'help' || command === '--help' || args.includes('--help')) {
    process.stdout.write(helpText);
    return;
  }

  if (command === 'docs') {
    process.stdout.write(`${DEFAULT_BASE_URL}/developers\n${DEFAULT_BASE_URL}/openapi.json\n`);
    return;
  }

  if (command === 'openapi') {
    await runOpenApi(args.slice(1));
    return;
  }

  if (command === 'contact') {
    await runContact(args.slice(1));
    return;
  }

  throw new Error(`Unknown command: ${command}. Run atl help for usage.`);
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unexpected CLI error.';
  process.stderr.write(`atl: ${message}\n`);
  process.exitCode = 1;
}
