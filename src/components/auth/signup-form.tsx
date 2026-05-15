'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Sparkles } from 'lucide-react';

export function SignupForm() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength =
    password.length === 0
      ? 0
      : password.length < 6
      ? 1
      : password.length < 10
      ? 2
      : 3;

  const strengthLabel = ['', 'Weak', 'Moderate', 'Strong'];
  const strengthColor = [
    '',
    'bg-[var(--color-error)]',
    'bg-[var(--color-warning)]',
    'bg-[var(--color-success)]',
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!(name ?? '').trim()) {
      setError('Full name is required.');
      return;
    }
    if (!(email ?? '').trim()) {
      setError('Email address is required.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      window.location.href = searchParams.get('redirect') || '/dashboard';
    }, 800);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-[var(--color-text)] tracking-wide">
          Initialize Profile
        </h1>
        <p className="mt-1 text-sm font-body text-[var(--color-text-secondary)] tracking-wide">
          Register your forensic analyst account
        </p>
      </div>

      {/* Divider accent */}
      <div className="h-px bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-transparent mb-6" />

      {/* Error alert */}
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-center gap-2 rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 px-4 py-3 text-sm text-[var(--color-error)] font-body"
        >
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name field */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-name"
            className="block text-xs font-body font-medium tracking-widest uppercase text-[var(--color-text-secondary)]"
          >
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]"
              aria-hidden="true"
            />
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              aria-required="true"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Agent Full Name"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] pl-10 pr-4 py-2.5 text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all duration-150"
            />
          </div>
        </div>

        {/* Email field */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
            className="block text-xs font-body font-medium tracking-widest uppercase text-[var(--color-text-secondary)]"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]"
              aria-hidden="true"
            />
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@dentascan.io"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] pl-10 pr-4 py-2.5 text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all duration-150"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="space-y-1.5">
          <label
            htmlFor="signup-password"
            className="block text-xs font-body font-medium tracking-widest uppercase text-[var(--color-text-secondary)]"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]"
              aria-hidden="true"
            />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              aria-required="true"
              aria-describedby="password-strength"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] pl-10 pr-11 py-2.5 text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-all duration-150"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Strength meter */}
          {password.length > 0 && (
            <div id="password-strength" className="space-y-1.5" aria-live="polite">
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={[
                      'h-1 flex-1 rounded-full transition-all duration-300',
                      passwordStrength >= level
                        ? strengthColor[passwordStrength]
                        : 'bg-[var(--color-border)]',
                    ].join(' ')}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                {passwordStrength === 3 ? (
                  <Sparkles className="h-3 w-3 text-[var(--color-success)]" aria-hidden="true" />
                ) : null}
                <span className="text-xs font-body text-[var(--color-text-secondary)]">
                  Strength: {strengthLabel[passwordStrength]}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-body font-semibold tracking-wide text-[var(--color-background)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
          style={{ boxShadow: isLoading ? 'none' : '0 0 16px rgba(232,160,32,0.35)' }}
        >
          {isLoading ? (
            <>
              <span
                className="h-4 w-4 rounded-full border-2 border-[var(--color-background)] border-t-transparent animate-spin"
                role="status"
                aria-label="Creating account"
              />
              Initializing...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Create Account
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-xs font-body text-[var(--color-text-secondary)] tracking-widest uppercase">
          Have access?
        </span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* Sign in link */}
      <p className="text-center text-sm font-body text-[var(--color-text-secondary)]">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors duration-150 underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
