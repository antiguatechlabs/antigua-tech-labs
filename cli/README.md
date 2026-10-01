# Antigua Tech Labs CLI

Official dependency-free CLI for the Antigua Tech Labs public API.

> Publication status: the package is prepared for npm but is not published yet. Do not use an npm install command until the package appears under the official `@antiguatechlabs` scope.

## Local usage

From the repository root:

```bash
node cli/bin/atl.mjs help
node cli/bin/atl.mjs docs
node cli/bin/atl.mjs openapi
node cli/bin/atl.mjs contact \
  --name "Ada Lovelace" \
  --email "ada@example.com" \
  --message "Project inquiry" \
  --dry-run
```

`--dry-run` validates the contact payload without sending email. Omit it only when you intend to deliver a real inquiry.

Use `--base-url http://localhost:3000` or set `ATL_API_BASE_URL` when testing a local deployment.

## Commands

- `atl docs`: prints the developer portal and OpenAPI URLs.
- `atl openapi`: retrieves the current `/openapi.json` document.
- `atl contact`: submits a contact request to `/api/contact`.

The public contact API does not require an API key. See [the developer portal](https://antiguatechlabs.com/developers) for the current contract.
