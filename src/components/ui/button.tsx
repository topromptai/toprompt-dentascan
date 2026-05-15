import { Sparkles } from 'lucide-react';
import { forwardRef } from 'react';
;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, children, className = '', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variants: Record<string, string> = {
      primary: 'bg-[var(--color-primary)] text-white hover:opacity-90 focus:ring-[var(--color-primary)]/40',
      secondary: 'bg-[var(--color-secondary)] text-white hover:opacity-90 focus:ring-[var(--color-secondary)]/40',
      outline: 'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-background)] focus:ring-[var(--color-primary)]/40',
      ghost: 'text-[var(--color-text)] hover:bg-[var(--color-background)] focus:ring-[var(--color-primary)]/40',
      danger: 'bg-[var(--color-error)] text-white hover:opacity-90 focus:ring-[var(--color-error)]/40',
    };
    const sizes: Record<string, string> = {
      sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
      md: 'text-sm px-4 py-2 rounded-lg gap-2',
      lg: 'text-base px-6 py-2.5 rounded-lg gap-2',
    };
    return (
      <button ref={ref} disabled={disabled || loading} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {loading && <Sparkles className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export { Button };
export type { ButtonProps };