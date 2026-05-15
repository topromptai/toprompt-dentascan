import { Sparkles } from 'lucide-react';
;

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: Sparkles;
  trend?: { value: string; positive: boolean };
  accent?: 'primary' | 'accent' | 'success' | 'warning' | 'error';
}

const accentMap: Record<string, string> = {
  primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  accent: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
  error: 'bg-[var(--color-error)]/10 text-[var(--color-error)]',
};

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = 'primary',
}: DashboardCardProps) {
  const iconClass = accentMap[accent] ?? accentMap.primary;

  return (
    <article
      className="bg-[var(--color-surface)] rounded-xl p-5 border border-[var(--color-border)] shadow-sm
                 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${iconClass} transition-transform group-hover:rotate-6`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend.positive
                ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                : 'bg-[var(--color-error)]/10 text-[var(--color-error)]'
            }`}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl font-heading font-bold text-[var(--color-text)] tabular-nums">
        {value}
      </p>
      <p className="text-sm font-body text-[var(--color-text-secondary)] mt-0.5">{title}</p>
      {subtitle && (
        <p className="text-xs text-[var(--color-text-secondary)]/70 mt-1">{subtitle}</p>
      )}
    </article>
  );
}
