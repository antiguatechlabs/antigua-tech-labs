import { CONTACT_API, DEVELOPER_RESOURCES } from './catalog';

const contactExample = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'I would like to discuss a custom web application.',
};

const errorResponseContent = {
  'application/json': {
    schema: { $ref: '#/components/schemas/ApiError' },
  },
};

export const openApiDocument = {
  openapi: '3.1.0',
  jsonSchemaDialect: 'https://json-schema.org/draft/2020-12/schema',
  info: {
    title: 'Antigua Tech Labs Public API',
    version: '1.0.0',
    description: 'Public endpoints for interacting with Antigua Tech Labs. The contact endpoint does not require authentication.',
    contact: {
      name: 'Antigua Tech Labs',
      email: 'info@antiguatechlabs.com',
      url: 'https://antiguatechlabs.com/en',
    },
  },
  externalDocs: {
    description: 'Developer portal',
    url: `https://antiguatechlabs.com${DEVELOPER_RESOURCES.portal}`,
  },
  servers: [
    {
      url: 'https://antiguatechlabs.com',
      description: 'Production',
    },
    {
      url: 'http://localhost:3000',
      description: 'Local development',
    },
  ],
  tags: [
    {
      name: 'Contact',
      description: 'Submit and validate project inquiries.',
    },
  ],
  paths: {
    [CONTACT_API.path]: {
      post: {
        operationId: 'submitContactInquiry',
        summary: 'Submit a contact inquiry',
        description: 'Validates a project inquiry and sends it to Antigua Tech Labs. Set dryRun=true to validate without sending email.',
        tags: ['Contact'],
        security: [],
        parameters: [
          {
            name: 'dryRun',
            in: 'query',
            required: false,
            description: 'Validate the request without sending email.',
            schema: {
              type: 'boolean',
              default: false,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContactRequest' },
              examples: {
                inquiry: {
                  summary: 'Project inquiry',
                  value: contactExample,
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'The inquiry was sent or successfully validated in sandbox mode.',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    { $ref: '#/components/schemas/ContactSuccess' },
                    { $ref: '#/components/schemas/ContactSandboxSuccess' },
                  ],
                },
              },
            },
          },
          '400': {
            description: 'The JSON body or one of its fields is invalid.',
            content: errorResponseContent,
          },
          '405': {
            description: 'The HTTP method is not supported.',
            content: errorResponseContent,
          },
          '415': {
            description: 'The request is not JSON.',
            content: errorResponseContent,
          },
          '500': {
            description: 'The email service is not configured or an internal error occurred.',
            content: errorResponseContent,
          },
          '502': {
            description: 'The email provider could not deliver the inquiry.',
            content: errorResponseContent,
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ContactRequest: {
        type: 'object',
        required: ['name', 'email', 'message'],
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            description: 'Name of the person submitting the inquiry.',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Reply address for the inquiry.',
          },
          message: {
            type: 'string',
            minLength: 1,
            description: 'Project or service inquiry.',
          },
        },
      },
      ContactSuccess: {
        type: 'object',
        additionalProperties: false,
        required: ['success', 'message'],
        properties: {
          success: { type: 'boolean', const: true },
          message: { type: 'string', examples: ['Email sent successfully'] },
        },
      },
      ContactSandboxSuccess: {
        type: 'object',
        additionalProperties: false,
        required: ['success', 'message', 'sandbox'],
        properties: {
          success: { type: 'boolean', const: true },
          message: { type: 'string', examples: ['Contact payload is valid. No email was sent.'] },
          sandbox: { type: 'boolean', const: true },
        },
      },
      ApiErrorDetail: {
        type: 'object',
        additionalProperties: false,
        required: ['field', 'issue', 'message'],
        properties: {
          field: { type: 'string' },
          issue: { type: 'string' },
          message: { type: 'string' },
          hint: { type: 'string' },
        },
      },
      ApiError: {
        type: 'object',
        additionalProperties: false,
        required: ['success', 'error', 'code', 'message', 'hint'],
        properties: {
          success: { type: 'boolean', const: false },
          error: { type: 'string', description: 'Backward-compatible error message.' },
          code: {
            type: 'string',
            enum: [
              'INVALID_JSON',
              'VALIDATION_ERROR',
              'UNSUPPORTED_MEDIA_TYPE',
              'METHOD_NOT_ALLOWED',
              'API_NOT_FOUND',
              'EMAIL_CONFIGURATION_ERROR',
              'EMAIL_DELIVERY_FAILED',
              'INTERNAL_ERROR',
            ],
          },
          message: { type: 'string' },
          hint: { type: 'string' },
          details: {
            type: 'array',
            items: { $ref: '#/components/schemas/ApiErrorDetail' },
          },
        },
      },
    },
  },
} as const;
