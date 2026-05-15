'use client';

/**
 * Design-preview fetch shim — auto-injected by toPrompt for Phase 1
 * (design preview) only. Removed when "Make it Real" runs Phase 2.
 *
 * Why: Phase 1 generated UI is supposed to use in-memory mock data,
 * but the LLM occasionally emits `fetch('/api/...')` calls anyway.
 * Those hit the Next.js 404 page (HTML), and `response.json()`
 * throws `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`.
 *
 * The shim intercepts every \`/api/*\` request at the window.fetch
 * level and returns a synthetic empty-success JSON response. The
 * page can call .json() safely; nothing is persisted.
 *
 * Module-level execution guarded by typeof window check + idempotent
 * install flag, so SSR is a no-op and double-installs are prevented.
 */
declare global {
  interface Window {
    __topromptDesignFetchShimInstalled?: boolean;
  }
}

if (typeof window !== 'undefined' && !window.__topromptDesignFetchShimInstalled) {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let url = '';
    try {
      url = typeof input === 'string'
        ? input
        : input instanceof URL
        ? input.toString()
        : input instanceof Request
        ? input.url
        : String(input);
    } catch { /* ignore */ }

    // Only intercept /api/* paths (relative or same-origin). Leave external
    // fetches (e.g. images, third-party APIs the user actually pasted in)
    // untouched. We match the path portion so absolute and relative work.
    const path = (url || '').startsWith('/')
      ? url
      : (() => {
          try {
            return new URL(url).pathname;
          } catch {
            return url;
          }
        })();

    if ((path || '').startsWith('/api/')) {
      const method = (init?.method || 'GET').toUpperCase();
      // eslint-disable-next-line no-console
      console.warn(
        `[design-preview] Intercepted ${method} ${path} — Phase 1 has no API routes. Returning empty mock JSON. Use in-memory mock data instead of fetch.`
      );
      return new Response(
        JSON.stringify({
          success: true,
          data: [],
          message: 'Design-preview shim: /api routes are not available in Phase 1. Use mock data.',
        }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return originalFetch(input as any, init);
  }) as typeof window.fetch;
  window.__topromptDesignFetchShimInstalled = true;
}

/**
 * Empty marker component — referenced from src/app/layout.tsx so the
 * bundler doesn't tree-shake this file. The shim runs at module load
 * because of the top-level if-block above; this component renders null.
 */
export function DesignPreviewFetchShim(): null {
  return null;
}
