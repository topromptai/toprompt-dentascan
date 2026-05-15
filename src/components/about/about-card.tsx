import type { LucideIcon } from 'lucide-react';

interface AboutCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function AboutCard({ icon: Icon, title, description }: AboutCardProps) {
  return (
    <article className="group bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] p-6 flex gap-5 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[var(--color-primary)]/40">
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center transition-colors duration-200 group-hover:bg-[var(--color-primary)]/20">
        <Icon
          className="w-6 h-6 text-[var(--color-primary)] transition-transform group-hover:rotate-6"
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h3 className="font-heading font-semibold text-[var(--color-text)] mb-2 leading-tight">
          {title}
        </h3>
        <p className="font-body text-sm text-[var(--color-text)] opacity-70 leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
}
