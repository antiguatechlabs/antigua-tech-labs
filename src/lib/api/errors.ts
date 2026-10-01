export type ApiErrorCode =
  | 'INVALID_JSON'
  | 'VALIDATION_ERROR'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'METHOD_NOT_ALLOWED'
  | 'API_NOT_FOUND'
  | 'EMAIL_CONFIGURATION_ERROR'
  | 'EMAIL_DELIVERY_FAILED'
  | 'INTERNAL_ERROR';

export interface ApiErrorDetail {
  field: string;
  issue: string;
  message: string;
  hint?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  code: ApiErrorCode;
  message: string;
  hint: string;
  details?: ApiErrorDetail[];
}

interface JsonErrorOptions {
  status: number;
  code: ApiErrorCode;
  message: string;
  hint: string;
  details?: ApiErrorDetail[];
  headers?: HeadersInit;
}

export function jsonError({
  status,
  code,
  message,
  hint,
  details,
  headers,
}: JsonErrorOptions): Response {
  const body: ApiErrorResponse = {
    success: false,
    error: message,
    code,
    message,
    hint,
    ...(details?.length ? { details } : {}),
  };

  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

export function methodNotAllowed(allowedMethods: string[]): Response {
  const allow = [...allowedMethods, 'OPTIONS'].join(', ');

  return jsonError({
    status: 405,
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method not allowed',
    hint: `Use one of the supported methods: ${allow}.`,
    headers: { Allow: allow },
  });
}

export function optionsResponse(allowedMethods: string[]): Response {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: [...allowedMethods, 'OPTIONS'].join(', '),
    },
  });
}

export function apiNotFound(request: Request): Response {
  const pathname = new URL(request.url).pathname;

  return jsonError({
    status: 404,
    code: 'API_NOT_FOUND',
    message: 'API endpoint not found',
    hint: 'Review the published OpenAPI specification at /openapi.json.',
    details: [
      {
        field: 'path',
        issue: 'not_found',
        message: `No API endpoint is registered at ${pathname}.`,
      },
    ],
  });
}
