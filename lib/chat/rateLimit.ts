/**
 * Best-effort, in-memory rate limit per client. On serverless hosting each
 * instance keeps its own counters, so this slows abuse and accidental loops
 * but is not a hard global limit; set a spend limit on the OpenAI account too.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

export function resetRateLimitForTests(): void {
  hits.clear();
}
