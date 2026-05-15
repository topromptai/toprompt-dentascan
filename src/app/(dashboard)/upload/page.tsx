'use client';

/**
 * AUTHENTICATED UPLOAD PAGE
 * Flow: User must be logged in to access this page.
 * - On mount, checks for a valid session via /api/auth/me
 * - If not authenticated, redirects to /login
 * - If authenticated, renders the ImageUploader component
 * - On analysis complete, redirects to /results?analysisId=...
 *
 * Public (unauthenticated) upload lives at /analyze (src/app/(public)/analyze/page.tsx)
 */

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImageUploader } from '@/components/upload/image-uploader';
import { ScanLine } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check authentication status before rendering the upload form.
    // If the user is not authenticated, redirect them to /login.
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          router.replace('/login');
        } else {
          setAuthChecked(true);
        }
      })
      .catch(() => {
        router.replace('/login');
      });
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin"
            style={{ borderColor: '#E8A020', borderTopColor: 'transparent' }}
          />
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: '#E8A020', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] p-6">
      {/* Blueprint grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.07,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center">
              <ScanLine className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-[var(--color-text)] tracking-wider uppercase">
              Vehicle Scan
            </h1>
          </div>
          <p className="text-sm font-body text-[var(--color-text-secondary)] mt-1 ml-13">
            Upload a photo of your damaged vehicle for forensic AI analysis.
          </p>
          <div className="mt-3 h-px bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-transparent" />
        </header>

        {/* Uploader */}
        <ImageUploader onAnalysisComplete={(id) => router.push(`/results?analysisId=${id}`)} />

        {/* Instructions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { num: '01', title: 'Clear Photo', desc: 'Ensure the damaged area is well-lit and in focus.' },
            { num: '02', title: 'Upload & Scan', desc: 'Our GPT-4o Vision model analyzes every pixel.' },
            { num: '03', title: 'Get Report', desc: 'Receive a full damage breakdown in seconds.' },
          ].map((step) => (
            <div
              key={step.num}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex gap-3"
            >
              <span className="font-heading text-xs font-bold text-[var(--color-primary)] opacity-60 mt-0.5 shrink-0">
                {step.num}
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-[var(--color-text)]">{step.title}</p>
                <p className="font-body text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
