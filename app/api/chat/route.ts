import { openAiVariableNames, readApiKey } from '@/lib/chat/env';
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
 * GET /api/chat — a health check for whoever runs the site. It reports whether
 * THIS deployment can see a usable key, which Vercel environment it is running
 * in and which commit, but never the key or any part of it.
 */
export async function GET(): Promise<Response> {
  const configured = readApiKey() !== '';
  return json(
    {
      status: configured ? 'ready' : 'missing_api_key',
      configured,
      vercelEnvironment: process.env.VERCEL_ENV ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      openAiVariableNamesSeen: openAiVariableNames(),
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
    },
    configured ? 200 : 503,
  );
}

/** The error type/code OpenAI reports (e.g. "invalid_api_key"), without its message text. */
async function describeOpenAiError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: { type?: unknown; code?: unknown } };
    const parts = [data.error?.type, data.error?.code].filter((p) => typeof p === 'string');
    return parts.length ? parts.join('/') : 'no error code';
  } catch {
    return 'unreadable body';
  }
}

/**
 * POST /api/chat — answers a student/parent question with OpenAI.
 *
 * The API key lives only in the server environment (`OPENAI_API_KEY`); it is
 * never sent to the browser or written to the logs. Conversations are not
 * stored or logged here. Without a key the route answers 503 and the chat
 * widget falls back to WhatsApp, so the site works exactly as before.
 */
export async function POST(request: Request): Promise<Response> {
  const apiKey = readApiKey();
  if (!apiKey) {
    console.error(
      `[chat] OPENAI_API_KEY is missing or empty in this deployment (VERCEL_ENV=${
        process.env.VERCEL_ENV ?? 'unset'
      }, OpenAI-related variables seen: ${openAiVariableNames().join(', ') || 'none'}). ` +
        'Add it for this environment in Vercel and redeploy.',
    );
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
        max_tokens: 700,
        messages: [{ role: 'system', content: buildSystemPrompt() }, ...parsed.messages],
      }),
    });

    if (!response.ok) {
      console.error(
        `[chat] OpenAI answered HTTP ${response.status}: ${await describeOpenAiError(response)}`,
      );
      return json({ error: 'unavailable' }, 502);
    }

    const data: unknown = await response.json();
    const reply = (data as { choices?: { message?: { content?: unknown } }[] })?.choices?.[0]
      ?.message?.content;

    if (typeof reply !== 'string' || !reply.trim()) {
      console.error('[chat] OpenAI answered 200 but with no reply text.');
      return json({ error: 'unavailable' }, 502);
    }

    return json({ reply: reply.trim() }, 200);
  } catch (error) {
    console.error(`[chat] Could not reach OpenAI: ${(error as Error).name}`);
    return json({ error: 'unavailable' }, 502);
  } finally {
    clearTimeout(timeout);
  }
}
