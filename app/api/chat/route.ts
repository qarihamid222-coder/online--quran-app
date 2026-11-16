import { buildSystemPrompt } from '@/lib/chat/knowledge';
import { isRateLimited } from '@/lib/chat/rateLimit';
import { parseChatRequest } from '@/lib/chat/validate';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-4o-mini';
const REQUEST_TIMEOUT_MS = 20_000;

function json(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

/**
 * POST /api/chat — answers a student/parent question with OpenAI.
 *
 * The API key lives only in the server environment (`OPENAI_API_KEY`); it is
 * never sent to the browser. Conversations are not stored or logged here.
 * Without a key the route answers 503 and the chat widget falls back to
 * WhatsApp, so the site works exactly as before.
 */
export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json({ error: 'unavailable' }, 503);
  }

  if (isRateLimited(clientKey(request))) {
    return json({ error: 'rate_limited' }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const parsed = parseChatRequest(body);
  if (!parsed.ok) {
    return json({ error: parsed.error }, 400);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        temperature: 0.3,
        max_tokens: 400,
        messages: [{ role: 'system', content: buildSystemPrompt() }, ...parsed.messages],
      }),
    });

    if (!response.ok) {
      return json({ error: 'unavailable' }, 502);
    }

    const data: unknown = await response.json();
    const reply = (data as { choices?: { message?: { content?: unknown } }[] })?.choices?.[0]
      ?.message?.content;

    if (typeof reply !== 'string' || !reply.trim()) {
      return json({ error: 'unavailable' }, 502);
    }

    return json({ reply: reply.trim() }, 200);
  } catch {
    return json({ error: 'unavailable' }, 502);
  } finally {
    clearTimeout(timeout);
  }
}
