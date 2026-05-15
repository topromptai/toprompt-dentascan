'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ScanSearch, Clock, TrendingUp, FolderOpen, ChevronRight, Activity, Upload, Car, Zap, Sparkles } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { getAllProjects } from '@/lib/data/projects';
import { useToast } from '@/components/ui/toast';
// ── Auto-generated stubs for unresolved imports (🧹 export-existence sweep) ──
const getRecentProjects: any = async (..._args: any[]) => [] as any[]; // auto-stub: 'getRecentProjects' not exported by '@/lib/data/projects'

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  completed: {
    label: 'Completed',
    bg: 'bg-[var(--color-success)]/10',
    text: 'text-[var(--color-success)]',
    dot: 'bg-[var(--color-success)]',
  },
  analyzing: {
    label: 'Analyzing',
    bg: 'bg-[var(--color-primary)]/10',
    text: 'text-[var(--color-primary)]',
    dot: 'bg-[var(--color-primary)]',
  },
  pending: {
    label: 'Pending',
    bg: 'bg-[var(--color-warning)]/10',
    text: 'text-[var(--color-warning)]',
    dot: 'bg-[var(--color-warning)]',
  },
  failed: {
    label: 'Failed',
    bg: 'bg-[var(--color-error)]/10',
    text: 'text-[var(--color-error)]',
    dot: 'bg-[var(--color-error)]',
  },
};

const SEVERITY_CONFIG: Record<string, { label: string; color: string }> = {
  minor:    { label: 'Minor',    color: 'text-[var(--color-success)]' },
  moderate: { label: 'Moderate', color: 'text-[var(--color-warning)]' },
  severe:   { label: 'Severe',   color: 'text-[var(--color-error)]' },
};

const QUICK_ACTIONS = [
  {
    href: '/upload',
    icon: Upload,
    label: 'Upload Image',
    description: 'Scan a new vehicle for damage',
    accent: 'from-[var(--color-primary)] to-[var(--color-accent)]',
  },
  {
    href: '/projects',
    icon: FolderOpen,
    label: 'All Projects',
    description: 'Browse all scan reports',
    accent: 'from-[var(--color-secondary)] to-[var(--color-primary)]',
  },
  {
    href: '/results',
    icon: Sparkles,
    label: 'View Results',
    description: 'Latest damage analysis',
    accent: 'from-[var(--color-accent)] to-[var(--color-warning)]',
  },
  {
    href: '/profile',
    icon: Activity,
    label: 'Activity Log',
    description: 'Your scan history',
    accent: 'from-[var(--color-warning)] to-[var(--color-success)]',
  },
];

export default function DashboardPage() {
  const allProjects = getAllProjects();
  const [recentProjects] = useState(getRecentProjects(5));
  const { toast } = useToast();

  const completed  = (Array.isArray(allProjects) ? allProjects : []).filter(p => p.status === 'completed').length;
  const analyzing  = (Array.isArray(allProjects) ? allProjects : []).filter(p => p.status === 'analyzing').length;
  const totalParts = allProjects.reduce((s, p) => s + (p.damagedParts ?? 0), 0);
  const avgConf    = (Array.isArray(allProjects) ? allProjects : []).filter(p => p.confidence > 0);
  const avgConfVal = avgConf.length
    ? Math.round(avgConf.reduce((s, p) => s + p.confidence, 0) / avgConf.length)
    : 0;

  function handleCardClick(name: string) {
    toast({ title: `Opening: ${name}`, variant: 'default' });
  }

  return (
    <div className="animate-fade-in-up p-6 space-y-8 min-h-screen">
      {/* ─── Page Header ─── */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)] tracking-wide">
            COMMAND CENTER
          </h1>
          <p className="text-sm font-body text-[var(--color-text-secondary)] mt-1">
            DentaScan forensic analysis overview — all systems nominal
          </p>
        </div>
        <Link
          href="/upload"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]
                     text-[var(--color-background)] text-sm font-medium font-body
                     transition-transform duration-150 active:scale-[0.97] hover:-translate-y-0.5"
        >
          <Zap className="w-4 h-4" />
          New Scan
        </Link>
      </header>

      {/* ─── Stats Row ─── */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger>
          <DashboardCard
            title="Total Scans"
            value={allProjects.length}
            subtitle="All-time vehicle analyses"
            icon={ScanSearch}
            trend={{ value: '+12% this week', positive: true }}
            accent="primary"
          />
          <DashboardCard
            title="Completed Reports"
            value={completed}
            subtitle={`${allProjects.length - completed} still in progress`}
            icon={Sparkles}
            trend={{ value: '+3 today', positive: true }}
            accent="success"
          />
          <DashboardCard
            title="Parts Identified"
            value={totalParts}
            subtitle="Damage zones across all scans"
            icon={Car}
            trend={{ value: 'avg 2.8/scan', positive: true }}
            accent="warning"
          />
          <DashboardCard
            title="Avg. Confidence"
            value={`${avgConfVal}%`}
            subtitle="AI detection accuracy"
            icon={TrendingUp}
            trend={{ value: '+2.1% vs last month', positive: true }}
            accent="accent"
          />
        </div>
      </section>

      {/* ─── Main content: Recent Activity + Project Grid ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Activity Feed */}
        <section
          aria-labelledby="activity-heading"
          className="xl:col-span-1 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 id="activity-heading" className="font-heading font-semibold text-[var(--color-text)] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--color-primary)]" />
              Recent Activity
            </h2>
            <Link
              href="/projects"
              className="text-xs font-body text-[var(--color-primary)] hover:opacity-80 flex items-center gap-0.5 transition-opacity"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <ol className="space-y-4" data-stagger>
            {(Array.isArray(recentProjects) ? recentProjects : []).map((project) => {
              const cfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.pending;
              const sev = SEVERITY_CONFIG[project.severity] ?? SEVERITY_CONFIG.minor;
              return (
                <li key={project._id}>
                  <Link
                    href="/projects"
                    onClick={() => handleCardClick(project.name)}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-background)]
                               transition-colors duration-150 group"
                  >
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body font-medium text-[var(--color-text)] truncate">
                        {project.vehicle}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] truncate mt-0.5">
                        {project.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.text} font-medium`}>
                          {cfg.label}
                        </span>
                        {project.severity && (
                          <span className={`text-xs font-medium ${sev.color}`}>
                            {sev.label}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
                    />
                  </Link>
                </li>
              );
            })}
          </ol>

          {analyzing > 0 && (
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg
                            bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20">
              <Clock className="w-4 h-4 text-[var(--color-primary)] animate-pulse" />
              <span className="text-xs font-body text-[var(--color-primary)]">
                {analyzing} scan{analyzing > 1 ? 's' : ''} currently processing
              </span>
            </div>
          )}
        </section>

        {/* Project Grid */}
        <section
          aria-labelledby="projects-heading"
          className="xl:col-span-2"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 id="projects-heading" className="font-heading font-semibold text-[var(--color-text)] flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[var(--color-primary)]" />
              Recent Scans
            </h2>
            <Link
              href="/projects"
              className="text-xs font-body text-[var(--color-primary)] hover:opacity-80 flex items-center gap-0.5 transition-opacity"
            >
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-stagger>
            {(Array.isArray(recentProjects) ? (recentProjects || []).slice(0, 4) : []).map((project) => {
              const cfg = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.pending;
              const sev = SEVERITY_CONFIG[project.severity] ?? SEVERITY_CONFIG.minor;
              return (
                <Link
                  key={project._id}
                  href="/projects"
                  onClick={() => handleCardClick(project.name)}
                  className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden
                             transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg group shadow-sm"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={`${project.vehicle} damage scan`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/80 to-transparent" />
                    <span
                      className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium
                                 ${cfg.bg} ${cfg.text} backdrop-blur-sm border border-current/20`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-body font-medium text-[var(--color-text)] truncate">
                      {project.vehicle}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate mt-0.5">
                      {project.name}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1.5">
                        {project.damagedParts > 0 && (
                          <>
                            <Sparkles className={`w-3.5 h-3.5 ${sev.color}`} />
                            <span className={`text-xs font-medium ${sev.color}`}>
                              {project.damagedParts} part{project.damagedParts !== 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                      </div>
                      {project.confidence > 0 && (
                        <span className="text-xs font-body text-[var(--color-text-secondary)]">
                          {project.confidence}% conf.
                        </span>
                      )}
                    </div>
                    {project.estimatedCost !== 'Pending analysis' && (
                      <p className="text-xs text-[var(--color-primary)] font-medium mt-2">
                        Est. {project.estimatedCost}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* ─── Quick Actions ─── */}
      <section aria-labelledby="actions-heading">
        <h2
          id="actions-heading"
          className="font-heading font-semibold text-[var(--color-text)] mb-4 animate-fade-in-up flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-[var(--color-primary)]" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-stagger>
          {QUICK_ACTIONS.map((action, idx) => (
            <Link
              key={`action-${action.href}-${idx}`}
              href={action.href}
              className="group relative bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]
                         p-5 flex flex-col items-start gap-3 overflow-hidden shadow-sm
                         transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-0.5"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300
                            bg-gradient-to-br ${action.accent}`}
                aria-hidden="true"
              />
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.accent}
                            flex items-center justify-center transition-transform group-hover:rotate-6`}
              >
                <action.icon className="w-5 h-5 text-[var(--color-background)]" />
              </div>
              <div>
                <p className="text-sm font-heading font-semibold text-[var(--color-text)]">
                  {action.label}
                </p>
                <p className="text-xs font-body text-[var(--color-text-secondary)] mt-0.5">
                  {action.description}
                </p>
              </div>
              <ChevronRight
                className="w-4 h-4 text-[var(--color-text-secondary)] mt-auto self-end
                           transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}