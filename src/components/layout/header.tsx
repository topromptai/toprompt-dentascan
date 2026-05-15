'use client';

import { useState } from 'react';
import { Bell, User, LogOut, Settings, ChevronDown,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PREVIEW_USER = {
  username: 'Alex Mercer',
  email: 'alex.mercer@dentascan.io',
};

export function Header() {
  const [open, setOpen] = useState(false);

  function handleLogout() {
    window.location.href = '/login';
  }

  const initials = (PREVIEW_USER.username || '')
    .split(' ')
    .map((w) => w?.[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

  return (
    <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 flex items-center justify-between relative z-10">
      {/* Left: breadcrumb / scan status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse-soft" />
          <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-widest">
            Forensic Mode Active
          </span>
        </div>
      </div>

      {/* Right: actions + avatar */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 transition-all duration-150"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[var(--color-border)]" />

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] transition-all duration-150',
              open
                ? 'border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5'
                : 'hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/5',
            )}
            aria-expanded={open}
            aria-haspopup="true"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-xs font-heading font-bold text-[var(--color-background)]">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-[var(--color-text)] leading-tight">
                {PREVIEW_USER.username}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] font-mono leading-tight">
                {PREVIEW_USER.email}
              </p>
            </div>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-[var(--color-text-secondary)] transition-transform duration-150',
                open && 'rotate-180',
              )}
            />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-52 bg-[var(--color-surface)] rounded-xl shadow-xl border border-[var(--color-border)] z-50 py-2 animate-fade-in"
            >
              <div className="px-3 py-2 border-b border-[var(--color-border)] mb-1">
                <p className="text-sm font-semibold text-[var(--color-text)] font-heading">
                  {PREVIEW_USER.username}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono truncate">
                  {PREVIEW_USER.email}
                </p>
              </div>

              <a
                href="/profile"
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)] transition-colors duration-150"
                onClick={() => setOpen(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </a>
              <a
                href="/settings"
                role="menuitem"
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)] transition-colors duration-150"
                onClick={() => setOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Settings
              </a>

              <div className="border-t border-[var(--color-border)] my-1" />

              <button
                role="menuitem"
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
