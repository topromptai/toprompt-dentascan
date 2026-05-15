'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) pages.push(i);
    else if (pages[pages.length - 1] !== '...') pages.push('...');
  }

  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} className="p-2 rounded-lg hover:bg-[var(--color-background)] disabled:opacity-30 text-[var(--color-text-secondary)] transition-colors">
        <ChevronLeft className="h-4 w-4" />
      </button>
      {(Array.isArray(pages) ? pages : []).map((p, i) =>
        p === '...' ? <span key={i} className="px-2 text-[var(--color-text-secondary)]">...</span> : (
          <button key={i} onClick={() => onPageChange(p)} className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors ${p === currentPage ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-[var(--color-background)] text-[var(--color-text-secondary)]'}`}>
            {p}
          </button>
        )
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="p-2 rounded-lg hover:bg-[var(--color-background)] disabled:opacity-30 text-[var(--color-text-secondary)] transition-colors">
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}