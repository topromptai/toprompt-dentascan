'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, LogIn, Sparkles } from 'lucide-react';

export function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!(email || '').trim()) {
      setError('Email address is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      window.location.href = searchParams.get('redirect') || '/dashboard';
    }, 700);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-[var(--color-text)] tracking-wide">
          Secure Access
        </h1>
        <p className="mt-1 text-sm font-body text-[var(--color-text-secondary)] tracking-wide">
          Sign in to your forensic dashboard
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
        {/* Email field */}
        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
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
              id="login-email"
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
            htmlFor="login-password"
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
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
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
                aria-label="Signing in"
              />
              Authenticating...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <span className="text-xs font-body text-[var(--color-text-secondary)] tracking-widest uppercase">
          New here?
        </span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>

      {/* Sign up link */}
      <p className="text-center text-sm font-body text-[var(--color-text-secondary)]">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors duration-150 underline underline-offset-2"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
