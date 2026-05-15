'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload, ScanSearch, Trash2, Eye, Filter, ChevronDown, X, AlertTriangle, CheckCircle, Clock, ZapOff, Zap } from 'lucide-react';
import { Modal } from '@/components/ui/modal';

interface Analysis {
  _id: string;
  imageUrl: string;
  originalFilename: string;
  severity: 'minor' | 'moderate' | 'severe' | null;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  damagedParts: string[];
  confidence: number;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

const SEVERITY_CONFIG = {
  minor:    { label: 'Minor',    color: 'text-[#4ade80]',  bg: 'bg-[#4ade80]/10',  border: 'border-[#4ade80]/30' },
  moderate: { label: 'Moderate', color: 'text-[#E8A020]',  bg: 'bg-[#E8A020]/10',  border: 'border-[#E8A020]/30' },
  severe:   { label: 'Severe',   color: 'text-[#FF6B1A]',  bg: 'bg-[#FF6B1A]/10',  border: 'border-[#FF6B1A]/30' },
};

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   icon: Clock,        color: 'text-[#E8DFC8]/60', bg: 'bg-[#E8DFC8]/5',   border: 'border-[#E8DFC8]/20' },
  analyzing: { label: 'Analyzing', icon: ScanSearch,   color: 'text-[#E8A020]',   bg: 'bg-[#E8A020]/10',  border: 'border-[#E8A020]/30' },
  completed: { label: 'Completed', icon: CheckCircle,  color: 'text-[#4ade80]',   bg: 'bg-[#4ade80]/10',  border: 'border-[#4ade80]/30' },
  failed:    { label: 'Failed',    icon: ZapOff,       color: 'text-[#FF6B1A]',   bg: 'bg-[#FF6B1A]/10',  border: 'border-[#FF6B1A]/30' },
};

const MOCK_ANALYSES: Analysis[] = [
  {
    _id: 'ana-001',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
    originalFilename: 'toyota_camry_front.jpg',
    severity: 'severe',
    status: 'completed',
    damagedParts: ['Hood', 'Front Bumper', 'Left Fender', 'Radiator Grille'],
    confidence: 94,
    summary: 'Significant front-end collision damage detected across multiple panels. Frame integrity assessment recommended.',
    createdAt: '2025-01-20T14:32:00Z',
    updatedAt: '2025-01-20T14:33:12Z',
  },
  {
    _id: 'ana-002',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80',
    originalFilename: 'ford_f150_roof.jpg',
    severity: 'moderate',
    status: 'completed',
    damagedParts: ['Roof Panel', 'Hood', 'Trunk Lid'],
    confidence: 88,
    summary: 'Hail damage pattern identified across upper body panels. Approximately 47 impact zones mapped.',
    createdAt: '2025-01-18T09:15:00Z',
    updatedAt: '2025-01-18T09:16:44Z',
  },
  {
    _id: 'ana-003',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
    originalFilename: 'bmw_side_damage.jpg',
    severity: 'minor',
    status: 'completed',
    damagedParts: ['Driver Door', 'Side Mirror'],
    confidence: 97,
    summary: 'Minor side-swipe damage on driver-side door and mirror assembly. No structural compromise detected.',
    createdAt: '2025-01-15T16:45:00Z',
    updatedAt: '2025-01-15T16:46:02Z',
  },
  {
    _id: 'ana-004',
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80',
    originalFilename: 'honda_crv_rear.jpg',
    severity: null,
    status: 'analyzing',
    damagedParts: [],
    confidence: 0,
    summary: 'Analysis in progress...',
    createdAt: '2025-01-21T08:00:00Z',
    updatedAt: '2025-01-21T08:00:00Z',
  },
];

export default function AnalysisPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'severity' | 'status'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<Analysis | null>(null);
  const [viewTarget, setViewTarget] = useState<Analysis | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/analyses')
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data?.data ?? []);
        setAnalyses(list.length > 0 ? list : MOCK_ANALYSES);
      })
      .catch(() => setAnalyses(MOCK_ANALYSES))
      .finally(() => setLoading(false));
  }, []);

  const SEVERITY_ORDER: Record<string, number> = { severe: 3, moderate: 2, minor: 1 };
  const STATUS_ORDER: Record<string, number> = { analyzing: 4, pending: 3, completed: 2, failed: 1 };

  const sorted = [...analyses]
    .filter(a => filterSeverity === 'all' || a.severity === filterSeverity)
    .filter(a => filterStatus === 'all' || a.status === filterStatus)
    .sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') {
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'severity') {
        cmp = (SEVERITY_ORDER[a.severity ?? ''] ?? 0) - (SEVERITY_ORDER[b.severity ?? ''] ?? 0);
      } else if (sortBy === 'status') {
        cmp = (STATUS_ORDER[a.status] ?? 0) - (STATUS_ORDER[b.status] ?? 0);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

  function handleFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file (JPG, PNG, WEBP, etc.)');
      return;
    }
    setUploadError(null);
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const newAnalysis: Analysis = {
        _id: crypto.randomUUID(),
        imageUrl: reader.result as string,
        originalFilename: file.name,
        severity: null,
        status: 'analyzing',
        damagedParts: [],
        confidence: 0,
        summary: 'Analysis in progress...',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAnalyses(prev => [newAnalysis, ...prev]);
      setUploading(false);
      // Simulate analysis completing
      setTimeout(() => {
        setAnalyses(prev => prev.map(a =>
          a._id === newAnalysis._id
            ? {
                ...a,
                status: 'completed',
                severity: 'moderate',
                damagedParts: ['Front Bumper', 'Hood'],
                confidence: 91,
                summary: 'Moderate front-end damage detected. Two primary impact zones identified.',
                updatedAt: new Date().toISOString(),
              }
            : a
        ));
      }, 3000);
    };
    reader.readAsDataURL(file);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setAnalyses(prev => prev.filter(a => a._id !== deleteTarget._id));
    setDeleteTarget(null);
  }

  function toggleSort(field: 'date' | 'severity' | 'status') {
    if (sortBy === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  const SortIcon = ({ field }: { field: string }) => (
    <ChevronDown
      className={`w-3 h-3 transition-transform ${
        sortBy === field && sortDir === 'asc' ? 'rotate-180' : ''
      } ${sortBy === field ? 'text-[#E8A020]' : 'text-[#E8DFC8]/30'}`}
    />
  );

  return (
    <div className="min-h-screen bg-[#0B1220] p-6 space-y-6" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#E8A020] tracking-widest uppercase" style={{ fontFamily: '"Orbitron", sans-serif' }}>
            Damage Analyses
          </h1>
          <p className="text-xs text-[#E8DFC8]/50 mt-1 tracking-wider">
            FORENSIC SCAN HISTORY — {analyses.length} RECORD{analyses.length !== 1 ? 'S' : ''}
          </p>
        </div>
        <label
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.97] text-sm font-medium"
          style={{ background: '#E8A020', color: '#0B1220' }}
        >
          <Upload className="w-4 h-4" />
          <span>Upload &amp; Analyze</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </header>

      {/* Upload drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0] ?? null); }}
        className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
        style={{
          borderColor: dragOver ? '#E8A020' : '#1A2A4A',
          background: dragOver ? 'rgba(232,160,32,0.05)' : '#111E35',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
            <p className="text-[#E8A020] text-sm tracking-wider">INITIALIZING SCAN...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E8A020]/10 border border-[#E8A020]/30 flex items-center justify-center">
              <ScanSearch className="w-6 h-6 text-[#E8A020]" />
            </div>
            <div>
              <p className="text-[#E8DFC8] text-sm font-medium">Drop vehicle image here or click to upload</p>
              <p className="text-[#E8DFC8]/40 text-xs mt-1 tracking-wider">JPG · PNG · WEBP · HEIC — AI analysis begins immediately</p>
            </div>
          </div>
        )}
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm" style={{ background: 'rgba(255,107,26,0.08)', borderColor: 'rgba(255,107,26,0.3)', color: '#FF6B1A' }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {uploadError}
        </div>
      )}

      {/* Filters + Sort Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border" style={{ background: '#111E35', borderColor: '#1A2A4A' }}>
        <Filter className="w-4 h-4 text-[#E8A020] flex-shrink-0" />
        <span className="text-xs text-[#E8DFC8]/50 tracking-widest uppercase mr-1">Filter:</span>

        <select
          value={filterSeverity}
          onChange={e => setFilterSeverity(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-xs border outline-none transition-colors"
          style={{ background: '#0B1220', borderColor: '#1A2A4A', color: '#E8DFC8', fontFamily: '"IBM Plex Mono", monospace' }}
        >
          <option value="all">All Severities</option>
          <option value="minor">Minor</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
        </select>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-1.5 rounded-lg text-xs border outline-none transition-colors"
          style={{ background: '#0B1220', borderColor: '#1A2A4A', color: '#E8DFC8', fontFamily: '"IBM Plex Mono", monospace' }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="analyzing">Analyzing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>

        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs text-[#E8DFC8]/50 tracking-widest uppercase mr-1">Sort:</span>
          {(['date', 'severity', 'status'] as const).map(field => (
            <button
              key={field}
              onClick={() => toggleSort(field)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border transition-all duration-150"
              style={{
                background: sortBy === field ? 'rgba(232,160,32,0.12)' : 'transparent',
                borderColor: sortBy === field ? 'rgba(232,160,32,0.4)' : '#1A2A4A',
                color: sortBy === field ? '#E8A020' : '#E8DFC8',
              }}
            >
              {field.toUpperCase()}
              <SortIcon field={field} />
            </button>
          ))}
        </div>

        {(filterSeverity !== 'all' || filterStatus !== 'all') && (
          <button
            onClick={() => { setFilterSeverity('all'); setFilterStatus('all'); }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs border transition-colors"
            style={{ borderColor: '#FF6B1A', color: '#FF6B1A', background: 'rgba(255,107,26,0.08)' }}
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#E8A020] border-t-transparent animate-spin" />
          <p className="text-[#E8A020] text-xs tracking-widest uppercase">Loading scan records...</p>
        </div>
      ) : sorted.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border" style={{ background: '#111E35', borderColor: '#1A2A4A' }}>
          <div className="w-16 h-16 rounded-xl bg-[#E8A020]/10 border border-[#E8A020]/20 flex items-center justify-center mb-5">
            <ScanSearch className="w-8 h-8 text-[#E8A020]/50" />
          </div>
          <h2 className="text-lg font-bold text-[#E8DFC8] mb-2 tracking-wider" style={{ fontFamily: '"Orbitron", sans-serif' }}>
            NO SCAN RECORDS
          </h2>
          <p className="text-xs text-[#E8DFC8]/40 mb-6 max-w-sm tracking-wide">
            {analyses.length === 0
              ? 'Upload a vehicle image above to initiate your first forensic damage analysis.'
              : 'No records match the current filter criteria. Adjust filters to view results.'}
          </p>
          {analyses.length === 0 && (
            <label
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-150 hover:-translate-y-0.5"
              style={{ background: '#E8A020', color: '#0B1220' }}
            >
              <Zap className="w-4 h-4" />
              Start First Scan
              <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0] ?? null)} />
            </label>
          )}
        </div>
      ) : (
        /* Analysis Cards Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map(analysis => {
            const sevCfg = analysis.severity ? SEVERITY_CONFIG[analysis.severity] : null;
            const stsCfg = STATUS_CONFIG[analysis.status];
            const StatusIcon = stsCfg.icon;
            return (
              <article
                key={analysis._id}
                className="rounded-xl border overflow-hidden flex flex-col transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
                style={{ background: '#111E35', borderColor: '#1A2A4A' }}
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden bg-[#0B1220]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={analysis.imageUrl}
                    alt={analysis.originalFilename}
                    className="w-full h-full object-cover"
                  />
                  {/* Blueprint grid overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(232,160,32,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.15) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      opacity: analysis.status === 'analyzing' ? 0.6 : 0.2,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111E35] to-transparent" />
                  {/* Status badge */}
                  <span
                    className={`absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${stsCfg.color} ${stsCfg.bg} ${stsCfg.border}`}
                  >
                    <StatusIcon className={`w-3 h-3 ${analysis.status === 'analyzing' ? 'animate-pulse' : ''}`} />
                    {stsCfg.label.toUpperCase()}
                  </span>
                  {/* Severity badge */}
                  {sevCfg && (
                    <span
                      className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium border ${sevCfg.color} ${sevCfg.bg} ${sevCfg.border}`}
                    >
                      {sevCfg.label.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col flex-1 gap-3">
                  <div>
                    <p className="text-[#E8DFC8] text-sm font-medium truncate" title={analysis.originalFilename}>
                      {analysis.originalFilename}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[#E8DFC8]/40 text-xs">{formatDate(analysis.createdAt)}</span>
                      <span className="text-[#E8DFC8]/25 text-xs">·</span>
                      <span className="text-[#E8DFC8]/40 text-xs">{formatTime(analysis.createdAt)}</span>
                      {analysis.confidence > 0 && (
                        <>
                          <span className="text-[#E8DFC8]/25 text-xs">·</span>
                          <span className="text-[#E8A020] text-xs">{analysis.confidence}% conf.</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Damaged parts */}
                  {analysis.damagedParts.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {analysis.damagedParts.slice(0, 3).map((part, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-xs border"
                          style={{ background: 'rgba(255,107,26,0.08)', borderColor: 'rgba(255,107,26,0.25)', color: '#FF6B1A' }}
                        >
                          {part}
                        </span>
                      ))}
                      {analysis.damagedParts.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-xs border" style={{ borderColor: '#1A2A4A', color: '#E8DFC8' }}>
                          +{analysis.damagedParts.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  <p className="text-[#E8DFC8]/50 text-xs leading-relaxed line-clamp-2">
                    {analysis.summary}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 mt-auto border-t" style={{ borderColor: '#1A2A4A' }}>
                    <button
                      onClick={() => setViewTarget(analysis)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all duration-150 hover:scale-[1.02]"
                      style={{ background: 'rgba(232,160,32,0.08)', borderColor: 'rgba(232,160,32,0.3)', color: '#E8A020' }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      VIEW
                    </button>
                    <button
                      onClick={() => setDeleteTarget(analysis)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all duration-150 hover:scale-[1.02] ml-auto"
                      style={{ background: 'rgba(255,107,26,0.06)', borderColor: 'rgba(255,107,26,0.2)', color: '#FF6B1A' }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      DELETE
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* View Modal */}
      <Modal
        open={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title={viewTarget?.originalFilename ?? 'Analysis Detail'}
        className="max-w-2xl"
      >
        {viewTarget && (
          <div className="space-y-4" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={viewTarget.imageUrl}
              alt={viewTarget.originalFilename}
              className="w-full h-56 object-cover rounded-lg border"
              style={{ borderColor: '#1A2A4A' }}
            />
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'STATUS', value: STATUS_CONFIG[viewTarget.status].label.toUpperCase() },
                { label: 'SEVERITY', value: viewTarget.severity ? SEVERITY_CONFIG[viewTarget.severity].label.toUpperCase() : 'N/A' },
                { label: 'CONFIDENCE', value: viewTarget.confidence > 0 ? `${viewTarget.confidence}%` : 'N/A' },
                { label: 'SCAN DATE', value: formatDate(viewTarget.createdAt) },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-lg border" style={{ background: '#0B1220', borderColor: '#1A2A4A' }}>
                  <p className="text-[#E8DFC8]/40 text-xs tracking-widest mb-1">{label}</p>
                  <p className="text-[#E8A020] text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
            {viewTarget.damagedParts.length > 0 && (
              <div className="p-3 rounded-lg border" style={{ background: '#0B1220', borderColor: '#1A2A4A' }}>
                <p className="text-[#E8DFC8]/40 text-xs tracking-widest mb-2">DAMAGED PARTS</p>
                <div className="flex flex-wrap gap-1.5">
                  {viewTarget.damagedParts.map((part, i) => (
                    <span key={i} className="px-2 py-1 rounded text-xs border" style={{ background: 'rgba(255,107,26,0.08)', borderColor: 'rgba(255,107,26,0.25)', color: '#FF6B1A' }}>
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="p-3 rounded-lg border" style={{ background: '#0B1220', borderColor: '#1A2A4A' }}>
              <p className="text-[#E8DFC8]/40 text-xs tracking-widest mb-2">ANALYSIS SUMMARY</p>
              <p className="text-[#E8DFC8] text-sm leading-relaxed">{viewTarget.summary}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Deletion"
      >
        {deleteTarget && (
          <div className="space-y-4" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            <div className="flex items-start gap-3 p-4 rounded-lg border" style={{ background: 'rgba(255,107,26,0.06)', borderColor: 'rgba(255,107,26,0.25)' }}>
              <AlertTriangle className="w-5 h-5 text-[#FF6B1A] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#E8DFC8] text-sm font-medium">This action cannot be undone.</p>
                <p className="text-[#E8DFC8]/50 text-xs mt-1">
                  Permanently delete scan record for <span className="text-[#E8A020]">{deleteTarget.originalFilename}</span>?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg text-sm border transition-colors"
                style={{ borderColor: '#1A2A4A', color: '#E8DFC8', background: 'transparent' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: '#FF6B1A', color: '#0B1220' }}
              >
                <Trash2 className="w-4 h-4" />
                Delete Record
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
