export const CONTACT_API = {
  method: 'POST',
  path: '/api/contact',
  sandboxQuery: 'dryRun=true',
  contentType: 'application/json',
  authentication: 'None',
} as const;

export const DEVELOPER_RESOURCES = {
  portal: '/developers',
  openApi: '/openapi.json',
  agentInstructions: '/llms.txt',
  cliSource: 'https://github.com/antiguatechlabs/antigua-tech-labs/tree/main/cli',
} as const;
