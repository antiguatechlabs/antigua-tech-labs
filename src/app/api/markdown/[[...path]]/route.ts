import { renderAgentDocument, renderAgentNotFound } from '@/lib/agent-content';

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
