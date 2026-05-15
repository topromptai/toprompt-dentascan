import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | DentaScan',
  description: 'Sign in or create your DentaScan account to access AI-powered car damage detection.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(232,160,32,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(232,160,32,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-2 animate-fade-in-down">
        <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-lg">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            aria-label="DentaScan logo"
            role="img"
          >
            <path
              d="M3 13 Q6 6 13 5 Q20 4 23 13 Q20 22 13 21 Q6 22 3 13Z"
              stroke="#0B1220"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="13" cy="13" r="3" fill="#0B1220" />
            <path d="M13 5V2M13 24V21M3 13H0M26 13H23" stroke="#0B1220" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-heading text-xl font-bold tracking-widest text-[var(--color-primary)] uppercase">
          DentaScan
        </span>
        <p className="text-xs text-[var(--color-text-secondary)] tracking-wider font-body uppercase">
          Forensic Vehicle Intelligence
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md animate-fade-in-up">
        <div
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.07), 0 0 0 1px rgba(232,160,32,0.08)' }}
        >
          {children}
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-[var(--color-text-secondary)] font-body tracking-wide animate-fade-in">
        &copy; 2026 DentaScan. All rights reserved.
      </p>
    </div>
  );
}
