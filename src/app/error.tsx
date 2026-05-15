'use client';

import { useEffect } from 'react';

/**
 * Next.js App Router error boundary. CRITICAL: this is the FIRST boundary
 * in the tree — it catches errors before they can bubble to layout.tsx.
 *
 * To make toPrompt's "Debug with AI" overlay work, we forward every caught
 * error to the parent window via the same `__TOPROMPT_ERROR__` postMessage
 * shape the @toprompt/next-error-bridge ErrorBoundary uses. Without this
 * forwarding, runtime errors get swallowed here and the user has no way
 * to trigger the AI fix flow.
 *
 * DO NOT remove the postMessage block — it's the bridge's only signal for
 * errors caught at this layer.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    // Forward to toPrompt parent for Debug-with-AI surfacing. Message shape
    // matches @toprompt/next-error-bridge's post() helper exactly so the
    // PreviewPanel handler picks it up the same way it picks up errors
    // from the bridge's ErrorBoundary. Critical: 'error' (not 'payload')
    // is the field name PreviewPanel reads.
    try {
      if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: '__TOPROMPT_ERROR__',
            error: {
              message: error.message || 'Render error',
              stack: error.stack,
              errorName: error.name,
              source: 'next-error-page',
              pathname: typeof window.location !== 'undefined' ? window.location.pathname : undefined,
            },
            timestamp: Date.now(),
          },
          '*',
        );
      }
    } catch {
      /* parent might be cross-origin / unavailable — best-effort only */
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 dark:bg-gray-900">
      <div className="text-center space-y-4 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h2>
        <p className="text-gray-600 dark:text-muted-foreground max-w-md">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
