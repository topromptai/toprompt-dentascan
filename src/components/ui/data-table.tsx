'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column { key: string; label: string; sortable?: boolean; }

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable({ columns, data, onSort, emptyMessage = 'No data', className = '' }: DataTableProps) {
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    const dir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSortKey(key); setSortDir(dir);
    onSort?.(key, dir);
  };

  return (
    <div className={`overflow-x-auto rounded-lg border border-[var(--color-border)] ${className}`}>
      <table className="w-full text-sm">
        <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
          <tr>
            {(Array.isArray(columns) ? columns : []).map(col => (
              <th key={col.key} className="px-4 py-3 text-left font-medium text-[var(--color-text-secondary)]">
                {col.sortable ? (
                  <button onClick={() => handleSort(col.key)} className="flex items-center gap-1 hover:text-[var(--color-text)]">
                    {col.label}
                    {sortKey === col.key && (sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </button>
                ) : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--color-text-secondary)]">{emptyMessage}</td></tr>
          ) : (Array.isArray(data) ? data : []).map((row, i) => (
            <tr key={i} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)] transition-colors">
              {(Array.isArray(columns) ? columns : []).map(col => (
                <td key={col.key} className="px-4 py-3 text-[var(--color-text)]">{row[col.key]?.toString() || ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}