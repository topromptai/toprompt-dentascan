'use client';

import type { LucideIcon } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  icon: LucideIcon | React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ icon: IconOrNode, title, description, actionLabel, onAction, className = '' }: EmptyStateProps) {
  // Handle LucideIcon (function), forwardRef components (object with $$typeof), and React nodes
  const isComponent = typeof IconOrNode === 'function' || (typeof IconOrNode === 'object' && IconOrNode !== null && '$$typeof' in IconOrNode);
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      {isComponent ? <IconOrNode className="h-12 w-12 text-[var(--color-text-secondary)]/40 mb-4" /> : (typeof IconOrNode === 'string' ? <span className="text-4xl mb-4">{IconOrNode}</span> : <div className="mb-4">{IconOrNode as any}</div>)}
      <h3 className="text-lg font-medium text-[var(--color-text)]">{title}</h3>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)] max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="mt-4">{actionLabel}</Button>
      )}
    </div>
  );
}