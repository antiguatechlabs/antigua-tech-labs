import { openApiDocument } from '@/lib/api/openapi';

export function GET() {
  return new Response(JSON.stringify(openApiDocument), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
