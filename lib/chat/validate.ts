export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const MAX_MESSAGES = 12;
export const MAX_MESSAGE_LENGTH = 800;

export type ParsedChat = { ok: true; messages: ChatMessage[] } | { ok: false; error: string };

/**
 * Validates the untrusted request body. Only `user` and `assistant` turns are
 * accepted (a visitor can never inject a `system` message), the history is
 * capped, and it must end with a user message.
 */
export function parseChatRequest(body: unknown): ParsedChat {
  if (typeof body !== 'object' || body === null || !('messages' in body)) {
    return { ok: false, error: 'Invalid request.' };
  }

  const raw = (body as { messages: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return { ok: false, error: 'Please write a message.' };
  }

  const messages: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (typeof item !== 'object' || item === null) {
      return { ok: false, error: 'Invalid request.' };
    }
    const { role, content } = item as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') {
      return { ok: false, error: 'Invalid request.' };
    }
    const trimmed = content.trim();
    if (!trimmed) continue;
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      return {
        ok: false,
        error: `Please keep each message under ${MAX_MESSAGE_LENGTH} characters.`,
      };
    }
    messages.push({ role, content: trimmed });
  }

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return { ok: false, error: 'Please write a message.' };
  }

  return { ok: true, messages };
}
