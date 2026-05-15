'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  ScanLine,
  X,
  Save,
  FolderOpen,
} from 'lucide-react';
import { getAllProjects, type Project } from '@/lib/data/projects';
import { ProjectCard } from '@/components/projects/project-card';
import { useToast } from '@/components/ui/toast';
import { Modal } from '@/components/ui/modal';

const STATUS_OPTIONS: { value: Project['status'] | 'all'; label: string }[] = [
  { value: 'all',       label: 'All Statuses' },
  { value: 'active',    label: 'Active' },
  { value: 'pending',   label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived',  label: 'Archived' },
];

const SEVERITY_OPTIONS: { value: Project['severity'] | 'all'; label: string }[] = [
  { value: 'all',      label: 'All Severities' },
  { value: 'minor',    label: 'Minor' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe',   label: 'Severe' },
];

type FormData = Omit<Project, '_id' | 'createdAt' | 'updatedAt' | 'thumbnailUrl'>;

const EMPTY_FORM: FormData = {
  name: '',
  description: '',
  status: 'pending',
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: 2024,
  damageZones: [],
  estimatedCost: 0,
  severity: 'minor',
};

const THUMBNAIL_POOL = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
];

export default function ProjectsPage() {
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>([] as any);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Project['status'] | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<Project['severity'] | 'all'>('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [zonesInput, setZonesInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { Promise.resolve(getAllProjects()).then((data) => setProjects(Array.isArray(data) ? data : [])).catch(() => {}); }, []);

  /* ── derived list ── */
  const filtered = useMemo(() => {
    const q = (search ?? '').toLowerCase();
    return (Array.isArray(projects) ? projects : []).filter((p) => {
      const matchSearch =
        !q ||
        (p.name ?? '').toLowerCase().includes(q) ||
        (p.vehicleMake ?? '').toLowerCase().includes(q) ||
        (p.vehicleModel ?? '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchSeverity = severityFilter === 'all' || p.severity === severityFilter;
      return matchSearch && matchStatus && matchSeverity;
    });
  }, [projects, search, statusFilter, severityFilter]);

  /* ── open create modal ── */
  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setZonesInput('');
    setModalOpen(true);
  };

  /* ── open edit modal ── */
  const openEdit = (project: Project) => {
    setEditTarget(project);
    setForm({
      name: project.name,
      description: project.description,
      status: project.status,
      vehicleMake: project.vehicleMake,
      vehicleModel: project.vehicleModel,
      vehicleYear: project.vehicleYear,
      damageZones: Array.isArray(project.damageZones) ? project.damageZones : [],
      estimatedCost: project.estimatedCost,
      severity: project.severity,
    });
    setZonesInput(
      (Array.isArray(project.damageZones) ? project.damageZones : []).join(', ')
    );
    setModalOpen(true);
  };

  /* ── delete ── */
  const handleDelete = (id: string) => {
    setProjects((prev) => (Array.isArray(prev) ? prev : []).filter((p) => p._id !== id));
    toast({ title: 'Project deleted', variant: 'default' });
  };

  /* ── submit (create or edit) ── */
  const handleSubmit = () => {
    if (!(form.name ?? '').trim()) {
      toast({ title: 'Project name is required', variant: 'error' });
      return;
    }
    setSubmitting(true);
    const zones = (zonesInput ?? '')
      .split(',')
      .map((z) => (z || '').trim())
      .filter(Boolean);

    setTimeout(() => {
      setSubmitting(false);
      if (editTarget) {
        setProjects((prev) =>
          (Array.isArray(prev) ? prev : []).map((p) =>
            p._id === editTarget._id
              ? { ...p, ...form, damageZones: zones, updatedAt: new Date().toISOString() }
              : p
          )
        );
        toast({ title: 'Project updated successfully', variant: 'default' });
      } else {
        const newProject = {
          _id: crypto.randomUUID(),
          ...form,
          damageZones: zones,
          thumbnailUrl: THUMBNAIL_POOL[Math.floor(projects.length % THUMBNAIL_POOL.length)],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProjects((prev) => [newProject, ...(Array.isArray(prev) ? prev : [])]);
        toast({ title: 'Project created successfully', variant: 'default' });
      }
      setModalOpen(false);
    }, 500);
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="animate-fade-in-up min-h-screen bg-[var(--color-background)] p-6">
      {/* ── Page Header ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--color-text)] flex items-center gap-2">
            <ScanLine className="w-6 h-6 text-[var(--color-primary)]" />
            Projects
          </h1>
          <p className="text-sm font-body text-[var(--color-text-secondary)] mt-1">
            Manage your vehicle damage scan projects
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-medium font-body transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97] shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </header>

      {/* ── Search + Filter Bar ── */}
      <section
        aria-label="Search and filter projects"
        className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-4 mb-6 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input
            id="project-search"
            type="search"
            placeholder="Search by name, make, model…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none transition-colors"
            aria-label="Search projects"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as Project['status'] | 'all');
            toast({ title: 'Filter applied', variant: 'default' });
          }}
          aria-label="Filter by status"
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-colors"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={severityFilter}
          onChange={(e) => {
            setSeverityFilter(e.target.value as Project['severity'] | 'all');
            toast({ title: 'Filter applied', variant: 'default' });
          }}
          aria-label="Filter by severity"
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 transition-colors"
        >
          {SEVERITY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {(search || statusFilter !== 'all' || severityFilter !== 'all') && (
          <button
            onClick={() => { setSearch(''); setStatusFilter('all'); setSeverityFilter('all'); }}
            aria-label="Clear all filters"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm font-body text-[var(--color-text-secondary)] hover:text-[var(--color-error)] hover:border-[var(--color-error)]/40 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </section>

      {/* ── Results count ── */}
      {filtered.length > 0 && (
        <p className="text-xs font-body text-[var(--color-text-secondary)] mb-4">
          Showing {filtered.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* ── Empty State ── */}
      {filtered.length === 0 ? (
        <div className="animate-scale-in flex flex-col items-center justify-center py-20 text-center">
          <FolderOpen className="w-14 h-14 text-[var(--color-primary)]/40 mb-4" />
          <h2 className="text-xl font-heading font-semibold text-[var(--color-text)] mb-2">
            {projects.length === 0 ? 'No projects yet' : 'No matching projects'}
          </h2>
          <p className="text-sm font-body text-[var(--color-text-secondary)] mb-6 max-w-sm">
            {projects.length === 0
              ? 'Upload a vehicle image to start your first damage scan project.'
              : 'Try adjusting your search or filters to find what you are looking for.'}
          </p>
          {projects.length === 0 && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-medium font-body hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Create First Project
            </button>
          )}
        </div>
      ) : (
        /* ── Card Grid ── */
        <section
          aria-label="Project cards"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-stagger
        >
          {(Array.isArray(filtered) ? filtered : []).map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDelete}
              onEdit={openEdit}
            />
          ))}
        </section>
      )}

      {/* ── Create / Edit Modal ── */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Project' : 'New Project'}
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-body text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-medium font-body disabled:opacity-50 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" role="status" aria-label="Saving" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {editTarget ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="proj-name" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">
              Project Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="proj-name"
              type="text"
              required
              aria-required="true"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g. BMW Rear-End Collision"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="proj-make" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Make</label>
              <input
                id="proj-make" type="text" value={form.vehicleMake}
                onChange={(e) => updateField('vehicleMake', e.target.value)}
                placeholder="Toyota"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
              />
            </div>
            <div>
              <label htmlFor="proj-model" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Model</label>
              <input
                id="proj-model" type="text" value={form.vehicleModel}
                onChange={(e) => updateField('vehicleModel', e.target.value)}
                placeholder="Camry"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
              />
            </div>
            <div>
              <label htmlFor="proj-year" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Year</label>
              <input
                id="proj-year" type="number" min="1980" max="2030" value={form.vehicleYear}
                onChange={(e) => updateField('vehicleYear', parseInt(e.target.value) || 2024)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="proj-desc" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Description</label>
            <textarea
              id="proj-desc" rows={3} value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe the damage and scan context…"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="proj-status" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Status</label>
              <select
                id="proj-status" value={form.status}
                onChange={(e) => updateField('status', e.target.value as Project['status'])}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label htmlFor="proj-severity" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Severity</label>
              <select
                id="proj-severity" value={form.severity}
                onChange={(e) => updateField('severity', e.target.value as Project['severity'])}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
              >
                <option value="minor">Minor</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="proj-cost" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Estimated Cost ($)</label>
            <input
              id="proj-cost" type="number" min="0" step="50" value={form.estimatedCost}
              onChange={(e) => updateField('estimatedCost', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
            />
          </div>

          <div>
            <label htmlFor="proj-zones" className="block text-xs font-body font-medium text-[var(--color-text-secondary)] mb-1">Damage Zones (comma-separated)</label>
            <input
              id="proj-zones" type="text" value={zonesInput}
              onChange={(e) => setZonesInput(e.target.value)}
              placeholder="Hood, Front Bumper, Left Fender"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/40 outline-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
