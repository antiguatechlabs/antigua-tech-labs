export type ResponseRepresentation = 'text/html' | 'text/markdown';

interface AcceptEntry {
  type: string;
  q: number;
  specificity: number;
}

const REPRESENTATIONS: ResponseRepresentation[] = ['text/html', 'text/markdown'];

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map(raw => {
      const parts = raw.trim().split(';').map(part => part.trim());
      const type = parts[0].toLowerCase();
      let q = 1;

      for (const parameter of parts.slice(1)) {
        const [name, value] = parameter.split('=').map(part => part.trim());
        if (name === 'q') {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }

      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
      return { type, q, specificity };
    })
    .filter(entry => entry.type.length > 0);
}

function matches(entry: AcceptEntry, representation: string): boolean {
  if (entry.type === '*/*') return true;
  if (entry.type.endsWith('/*')) return representation.startsWith(entry.type.slice(0, -1));
  return entry.type === representation;
}

export function preferredRepresentation(header: string | null): ResponseRepresentation | null {
  if (!header?.trim()) return 'text/html';

  const entries = parseAccept(header);
  if (entries.length === 0) return 'text/html';

  let bestRepresentation: ResponseRepresentation | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const representation of REPRESENTATIONS) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;

    for (let index = 0; index < entries.length; index += 1) {
      const entry = entries[index];
      if (!matches(entry, representation)) continue;

      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && index < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = index;
      }
    }

    if (matched === null || matched.q <= 0) continue;

    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestRepresentation = representation;
      bestQ = matched.q;
      bestPosition = matchedPosition;
    }
  }

  return bestRepresentation;
}

export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get('Vary');
  if (!existing) {
    headers.set('Vary', 'Accept');
    return;
  }

  const tokens = existing.split(',').map(token => token.trim().toLowerCase());
  if (!tokens.includes('accept') && !tokens.includes('*')) {
    headers.set('Vary', `${existing}, Accept`);
  }
}
