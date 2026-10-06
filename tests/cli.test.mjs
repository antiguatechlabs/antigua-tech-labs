import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { test } from 'node:test';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const cliPath = path.join(root, 'cli', 'bin', 'atl.mjs');

test('CLI package exposes the atl binary and public package metadata', async () => {
  const packageJson = JSON.parse(await readFile(path.join(root, 'cli', 'package.json'), 'utf8'));

  assert.equal(packageJson.name, '@antiguatechlabs/cli');
  assert.equal(packageJson.bin.atl, 'bin/atl.mjs');
  assert.equal(packageJson.publishConfig.access, 'public');
  assert.match(packageJson.engines.node, />=18\.17/);
});

test('CLI help and docs are available without network access', async () => {
  const help = await execFileAsync(process.execPath, [cliPath, 'help'], { cwd: root });
  assert.match(help.stdout, /atl contact/);
  assert.match(help.stdout, /--dry-run/);

  const docs = await execFileAsync(process.execPath, [cliPath, 'docs'], { cwd: root });
  assert.match(docs.stdout, /https:\/\/antiguatechlabs\.com\/developers/);
  assert.match(docs.stdout, /https:\/\/antiguatechlabs\.com\/openapi\.json/);
});

test('CLI contact dry-run sends the documented JSON request', async () => {
  let capturedRequest;
  const server = http.createServer((request, response) => {
    const chunks = [];
    request.on('data', chunk => chunks.push(chunk));
    request.on('end', () => {
      capturedRequest = {
        method: request.method,
        url: request.url,
        contentType: request.headers['content-type'],
        body: JSON.parse(Buffer.concat(chunks).toString('utf8')),
      };
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({
        success: true,
        message: 'Contact payload is valid. No email was sent.',
        sandbox: true,
      }));
    });
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  try {
    const address = server.address();
    assert.ok(address && typeof address === 'object');
    const result = await execFileAsync(process.execPath, [
      cliPath,
      'contact',
      '--name',
      'Ada Lovelace',
      '--email',
      'ada@example.com',
      '--message',
      'Project inquiry',
      '--dry-run',
      '--base-url',
      `http://127.0.0.1:${address.port}`,
    ], { cwd: root });

    assert.deepEqual(JSON.parse(result.stdout), {
      success: true,
      message: 'Contact payload is valid. No email was sent.',
      sandbox: true,
    });
    assert.deepEqual(capturedRequest, {
      method: 'POST',
      url: '/api/contact?dryRun=true',
      contentType: 'application/json',
      body: {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        message: 'Project inquiry',
      },
    });
  } finally {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
