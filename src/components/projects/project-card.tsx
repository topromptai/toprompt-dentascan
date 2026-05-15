'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Pencil, Trash2, Car, DollarSign, Sparkles } from 'lucide-react';
import type { Project } from '@/lib/data/projects';

const STATUS_CONFIG: Record<Project['status'], { label: string; bg: string; text: string }> = {
  active:    { label: 'Active',    bg: 'bg-[var(--color-primary)]/15',   text: 'text-[var(--color-primary)]' },
  completed: { label: 'Completed', bg: 'bg-[var(--color-success)]/15',   text: 'text-[var(--color-success)]' },
  pending:   { label: 'Pending',   bg: 'bg-[var(--color-warning)]/15',   text: 'text-[var(--color-warning)]' },
  archived:  { label: 'Archived',  bg: 'bg-[var(--color-border)]',       text: 'text-[var(--color-text-secondary)]' },
};

const SEVERITY_CONFIG: Record<Project['severity'], { label: string; color: string }> = {
  minor:    { label: 'Minor',    color: 'text-[var(--color-success)]' },
  moderate: { label: 'Moderate', color: 'text-[var(--color-warning)]' },
  severe:   { label: 'Severe',   color: 'text-[var(--color-error)]' },
};

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
}

export function ProjectCard({ project, onDelete, onEdit }: ProjectCardProps) {
  const status = STATUS_CONFIG[project.status] ?? STATUS_CONFIG.pending;
  const severity = SEVERITY_CONFIG[project.severity] ?? SEVERITY_CONFIG.minor;

  const handleDelete = () => {
    if (!confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;
    onDelete(project._id);
  };

  return (
    <article className="group bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.thumbnailUrl}
          alt={`${project.vehicleYear} ${project.vehicleMake} ${project.vehicleModel} damage scan`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(232,160,32,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.4) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <span
          className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
        <span
          className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-background)]/80 backdrop-blur-sm ${severity.color}`}
        >
          <Sparkles className="w-3 h-3" />
          {severity.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-1">
          <Car className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-primary)]" />
          <span className="text-xs text-[var(--color-text-secondary)] font-body">
            {project.vehicleYear} {project.vehicleMake} {project.vehicleModel}
          </span>
        </div>
        <h3 className="text-base font-heading font-semibold text-[var(--color-text)] leading-snug mb-2">
          {project.name}
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] font-body line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        {/* Damage zones */}
        <div className="flex flex-wrap gap-1 mb-4">
          {(Array.isArray(project.damageZones) ? project.damageZones : []).slice(0, 3).map((zone, idx) => (
            <span
              key={`${zone}-${idx}`}
              className="px-2 py-0.5 rounded-md text-xs font-body bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20"
            >
              {zone}
            </span>
          ))}
          {project.damageZones.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-xs font-body text-[var(--color-text-secondary)] border border-[var(--color-border)]">
              +{project.damageZones.length - 3} more
            </span>
          )}
        </div>

        {/* Cost + Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-1 text-[var(--color-primary)]">
            <DollarSign className="w-4 h-4" />
            <span className="font-heading font-bold text-base">
              {Number(project.estimatedCost ?? 0).toLocaleString()}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)] font-body">est.</span>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href={`/projects/${project._id}`}
              aria-label={`View project ${project.name}`}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors duration-150"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onEdit(project)}
              aria-label={`Edit project ${project.name}`}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors duration-150"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              aria-label={`Delete project ${project.name}`}
              className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors duration-150"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
