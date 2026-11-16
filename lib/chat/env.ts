/**
 * The OpenAI key from the server environment, cleaned up. Values pasted into a
 * dashboard often carry a trailing newline/space or wrapping quotes, which
 * OpenAI rejects; both are removed here. Returns '' when there is no usable key.
 */
export function readApiKey(raw: string | undefined = process.env.OPENAI_API_KEY): string {
  if (!raw) return '';
  return raw
    .trim()
    .replace(/^(['"])(.*)\1$/, '$2')
    .trim();
}

/** Names (never values) of environment variables that look OpenAI-related, to spot typos. */
export function openAiVariableNames(): string[] {
  return Object.keys(process.env)
    .filter((name) => /openai/i.test(name))
    .sort();
}
