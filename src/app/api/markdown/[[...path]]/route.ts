import { renderAgentDocument, renderAgentNotFound } from '@/lib/agent-content';
import { methodNotAllowed, optionsResponse } from '@/lib/api/errors';

interface MarkdownRouteContext {
  params: Promise<{ path?: string[] }>;
}

export async function GET(_request: Request, { params }: MarkdownRouteContext) {
  const { path = [] } = await params;
  const document = renderAgentDocument(path);

  return new Response(document || renderAgentNotFound(), {
    status: document ? 200 : 404,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
    },
  });
}

const allowedMethods = ['GET'];

export function POST() {
  return methodNotAllowed(allowedMethods);
}

export function PUT() {
  return methodNotAllowed(allowedMethods);
}

export function PATCH() {
  return methodNotAllowed(allowedMethods);
}

export function DELETE() {
  return methodNotAllowed(allowedMethods);
}

export function OPTIONS() {
  return optionsResponse(allowedMethods);
}
