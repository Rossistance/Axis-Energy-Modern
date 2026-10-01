/**
 * Plain text from LinkedIn post commentary, which uses LinkedIn's "little" text format:
 * mentions as @[Name](urn:li:organization:123), hashtags as {hashtag|\#|solar}, and a
 * backslash before reserved characters.
 * https://learn.microsoft.com/linkedin/marketing/community-management/shares/little-text-format
 */
export function littleToPlain(text: string): string {
  return text
    .replace(/@\[((?:\\.|[^\]\\])*)\]\s*\(urn:li:[^)]+\)/g, (_, name: string) => name)
    .replace(/\{hashtag\|\\?[#＃]\|((?:\\.|[^}\\])*)\}/g, (_, tag: string) => `#${tag}`)
    .replace(/\\([|{}@[\]()<>#\\*_~])/g, '$1');
}

/** Hashtags that close a post ("… #solar #storage") add nothing to a summary. */
export function dropTrailingHashtags(text: string): string {
  return text.replace(/(?:\s*#[\p{L}\p{N}_]+)+\s*$/u, '').trim();
}

/** Shortens text to `max` characters at a word boundary, with an ellipsis. */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max + 1);
  const space = cut.lastIndexOf(' ');
  const end = space > max * 0.6 ? space : max;
  return `${cut.slice(0, end).replace(/[\s,.;:!?–—-]+$/, '')}…`;
}

/**
 * Splits a post's text into a short headline (its first sentence or line) and the rest,
 * both trimmed for a card.
 */
export function headlineAndSummary(text: string): { headline: string; summary: string } {
  const plain = dropTrailingHashtags(text);
  if (!plain) return { headline: '', summary: '' };
  const firstLine = plain.split(/\n+/)[0].trim();
  const sentence = /^.+?[.!?](?=\s|$)/u.exec(firstLine)?.[0] ?? firstLine;
  const rest = plain.slice(plain.indexOf(sentence) + sentence.length).trim();
  return { headline: truncate(sentence, 120), summary: truncate(rest, 180) };
}
