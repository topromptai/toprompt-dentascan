'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Scan,
  Activity,
  User,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/projects',  label: 'Projects',     icon: FolderOpen },
  { href: '/profile',   label: 'User Profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen border-r border-[var(--color-border)] bg-[var(--color-surface)]',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center gap-3 h-16 border-b border-[var(--color-border)] px-4',
          collapsed && 'justify-center px-0',
        )}
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 flex-shrink-0">
          <Scan className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        {!collapsed && (
          <span className="font-heading font-bold text-base text-[var(--color-primary)] tracking-widest uppercase">
            DentaScan
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav aria-label="Main navigation" className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {(Array.isArray(navLinks) ? navLinks : []).map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== '/dashboard' && (pathname || '').startsWith(link.href));
            return (
              <li key={`${link.href}-nav`}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                    'border-l-2',
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-text)]',
                    collapsed && 'justify-center px-0 border-l-0',
                  )}
                  title={collapsed ? link.label : undefined}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 flex-shrink-0',
                      isActive
                        ? 'text-[var(--color-primary)]'
                        : 'text-[var(--color-text-secondary)]',
                    )}
                  />
                  {!collapsed && (
                    <span className="font-body tracking-wide">{link.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* System status indicator */}
        {!collapsed && (
          <div className="mt-6 mx-2 px-3 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3.5 h-3.5 text-[var(--color-success)]" />
              <span className="text-xs font-mono text-[var(--color-success)] uppercase tracking-widest">
                System Online
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] font-mono">
              AI Engine v2.4.1
            </p>
          </div>
        )}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'absolute -right-3 top-20 z-10',
          'w-6 h-6 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]',
          'flex items-center justify-center',
          'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]',
          'hover:border-[var(--color-primary)]/40 transition-all duration-150',
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Footer */}
      <div
        className={cn(
          'border-t border-[var(--color-border)] py-3 px-4',
          collapsed && 'px-2',
        )}
      >
        {!collapsed ? (
          <p className="text-xs text-[var(--color-text-secondary)] font-mono">
            &copy; 2026 DentaScan
          </p>
        ) : (
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] mx-auto animate-pulse-soft" />
        )}
      </div>
    </aside>
  );
}
