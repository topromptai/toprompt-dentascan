import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1.5">
        {label && <label htmlFor={selectId} className="block text-sm font-medium text-[var(--color-text)]">{label}</label>}
        <select
          ref={ref} id={selectId}
          className={`w-full px-3 py-2 rounded-lg border ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'} bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 disabled:opacity-50 transition-colors ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {(Array.isArray(options) ? options : []).map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
export type { SelectProps };