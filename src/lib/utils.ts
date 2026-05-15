import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a number as USD currency */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format an ISO date string as a human-readable date */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Get initials from a name string (up to 2 characters) */
export function getInitials(name: string = ''): string {
  return (name || '')
    .split(' ')
    .map((w) => w?.[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Truncate a string to a given length */
export function truncate(str: string, length: number): string {
  if ((str || '').length <= length) return str || '';
  return (str || '').slice(0, length) + '...';
}
