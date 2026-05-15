'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface DamagedPart {
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  repairEstimate?: string;
  zone?: string;
}

interface Analysis {
  _id: string;
  imageUrl?: string;
  overallSeverity: 'critical' | 'high' | 'medium' | 'low';
  damagedParts: DamagedPart[];
  summary?: string;
  vehicleType?: string;
  scanDuration?: number;
  confidence?: number;
  createdAt: string;
}

const SEVERITY_CONFIG = {
  critical: { color: '#FF6B1A', bg: '#FF6B1A15', border: '#FF6B1A40', label: 'CRITICAL', icon: Zap },
  high: { color: '#E8A020', bg: '#E8A02015', border: '#E8A02040', label: 'HIGH', icon: AlertTriangle },
  medium: { color: '#E8DFC8', bg: '#E8DFC815', border: '#E8DFC840', label: 'MEDIUM', icon: Clock },
  low: { color: '#6B8CAE', bg: '#6B8CAE15', border: '#6B8CAE40', label: 'LOW', icon: CheckCircle },
};

// SVG vehicle diagram zones mapped to part names
const VEHICLE_ZONES: Record<string, { x: number; y: number; w: number; h: number; label: string }> = {
  hood: { x: 60, y: 20, w: 80, h: 40, label: 'HOOD' },
  'front bumper': { x: 55, y: 10, w: 90, h: 20, label: 'FRONT BUMPER' },
  'rear bumper': { x: 55, y: 170, w: 90, h: 20, label: 'REAR BUMPER' },
  trunk: { x: 60, y: 140, w: 80, h: 40, label: 'TRUNK' },
  roof: { x: 65, y: 75, w: 70, h: 50, label: 'ROOF' },
  'driver door': { x: 20, y: 80, w: 40, h: 50, label: 'DRIVER DOOR' },
  'passenger door': { x: 140, y: 80, w: 40, h: 50, label: 'PASS. DOOR' },
  'front left fender': { x: 15, y: 25, w: 45, h: 45, label: 'FL FENDER' },
  'front right fender': { x: 140, y: 25, w: 45, h: 45, label: 'FR FENDER' },
  'rear left panel': { x: 15, y: 130, w: 45, h: 45, label: 'RL PANEL' },
  'rear right panel': { x: 140, y: 130, w: 45, h: 45, label: 'RR PANEL' },
};

function VehicleDiagram({ parts }: { parts: DamagedPart[] }) {
  const [drawn, setDrawn] = useState(false);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDrawn(true), 300);
    const t2 = setTimeout(() => setLit(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const damagedZoneKeys = parts.map(p => p.name.toLowerCase());
  const getPartSeverity = (zoneKey: string): DamagedPart | undefined =>
    parts.find(p => p.name.toLowerCase() === zoneKey);

  return (
    <div
      className="relative rounded-xl p-6"
      style={{ background: '#0B1220', border: '1px solid #1A2A4A' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-4 rounded-sm" style={{ background: '#E8A020' }} />
        <span className="text-xs tracking-widest font-bold" style={{ color: '#E8A020' }}>VEHICLE DAMAGE MAP</span>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 rounded-xl overflow-hidden opacity-10" style={{ backgroundImage: 'linear-gradient(#E8A020 1px, transparent 1px), linear-gradient(90deg, #E8A020 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="relative flex justify-center">
        <svg viewBox="0 0 200 210" className="w-full max-w-xs" style={{ filter: 'drop-shadow(0 0 20px #E8A02020)' }}>
          {/* Vehicle outline — draws itself */}
          <g
            style={{
              strokeDasharray: 800,
              strokeDashoffset: drawn ? 0 : 800,
              transition: 'stroke-dashoffset 1.2s ease-in-out',
            }}
          >
            {/* Main body */}
            <rect x="20" y="60" width="160" height="120" rx="8" fill="none" stroke="#1A2A4A" strokeWidth="1.5" />
            {/* Roof */}
            <rect x="50" y="30" width="100" height="45" rx="6" fill="none" stroke="#1A2A4A" strokeWidth="1.5" />
            {/* Hood */}
            <rect x="25" y="60" width="150" height="35" rx="4" fill="none" stroke="#1A2A4A" strokeWidth="1" />
            {/* Trunk */}
            <rect x="25" y="145" width="150" height="35" rx="4" fill="none" stroke="#1A2A4A" strokeWidth="1" />
            {/* Wheels */}
            <circle cx="55" cy="185" r="14" fill="none" stroke="#1A2A4A" strokeWidth="1.5" />
            <circle cx="145" cy="185" r="14" fill="none" stroke="#1A2A4A" strokeWidth="1.5" />
            <circle cx="55" cy="25" r="14" fill="none" stroke="#1A2A4A" strokeWidth="1.5" />
            <circle cx="145" cy="25" r="14" fill="none" stroke="#1A2A4A" strokeWidth="1.5" />
            {/* Door lines */}
            <line x1="100" y1="60" x2="100" y2="180" stroke="#1A2A4A" strokeWidth="0.8" strokeDasharray="3,3" />
            {/* Windshield */}
            <rect x="55" y="32" width="90" height="28" rx="4" fill="#0B1220" stroke="#1A2A4A" strokeWidth="1" />
          </g>

          {/* Damage zones — ignite after draw */}
          {lit && Object.entries(VEHICLE_ZONES).map(([key, zone]) => {
            if (!damagedZoneKeys.includes(key)) return null;
            const part = getPartSeverity(key);
            const cfg = SEVERITY_CONFIG[part?.severity || 'medium'];
            return (
              <g key={key}>
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.w}
                  height={zone.h}
                  rx="3"
                  fill={cfg.color}
                  fillOpacity="0.2"
                  stroke={cfg.color}
                  strokeWidth="1.5"
                  style={{ animation: 'pulse 2s ease-in-out infinite' }}
                />
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 + 4}
                  textAnchor="middle"
                  fontSize="5"
                  fill={cfg.color}
                  fontFamily="IBM Plex Mono, monospace"
                  fontWeight="bold"
                >
                  {zone.label}
                </text>
              </g>
            );
          })}

          {/* Scan line animation */}
          {drawn && !lit && (
            <line
              x1="0" y1="0" x2="200" y2="0"
              stroke="#E8A020"
              strokeWidth="1"
              strokeOpacity="0.6"
              style={{ animation: 'scanLine 0.9s linear forwards' }}
            />
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {Object.entries(SEVERITY_CONFIG).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.color }} />
            <span className="text-xs" style={{ color: cfg.color, fontFamily: '"IBM Plex Mono", monospace' }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scanLine {
          from { transform: translateY(0); opacity: 0.8; }
          to { transform: translateY(210px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { fill-opacity: 0.15; }
          50% { fill-opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}

function PartRow({ part, index }: { part: DamagedPart; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = SEVERITY_CONFIG[part.severity] || SEVERITY_CONFIG.medium;
  const Icon = cfg.icon;

  return (
    <div
      className="rounded-lg border transition-all"
      style={{ borderColor: expanded ? cfg.border : '#1A2A4A', background: expanded ? cfg.bg : '#111E35' }}
    >
      <button
        className="w-full flex items-center gap-3 p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-xs font-bold w-6 text-center" style={{ color: '#E8A020', opacity: 0.5, fontFamily: '"IBM Plex Mono", monospace' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <Icon className="w-4 h-4 shrink-0" style={{ color: cfg.color }} />
        <span className="flex-1 text-sm font-bold tracking-wider" style={{ color: '#E8DFC8', fontFamily: '"IBM Plex Mono", monospace' }}>
          {part.name.toUpperCase()}
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded tracking-widest"
          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
        >
          {cfg.label}
        </span>
        {expanded ? <ChevronUp className="w-4 h-4" style={{ color: '#E8A020' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#E8A020', opacity: 0.5 }} />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t" style={{ borderColor: cfg.border }}>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: '#E8DFC8', opacity: 0.8, fontFamily: '"IBM Plex Mono", monospace' }}>
            {part.description}
          </p>
          {part.repairEstimate && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs tracking-widest" style={{ color: '#E8A020', opacity: 0.6 }}>EST. REPAIR:</span>
              <span className="text-sm font-bold" style={{ color: '#E8A020', fontFamily: '"IBM Plex Mono", monospace' }}>{part.repairEstimate}</span>
            </div>
          )}
          {part.zone && (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs tracking-widest" style={{ color: '#E8A020', opacity: 0.6 }}>ZONE:</span>
              <span className="text-xs" style={{ color: '#E8DFC8', opacity: 0.7, fontFamily: '"IBM Plex Mono", monospace' }}>{part.zone.toUpperCase()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DamageReport({ analysisId }: { analysisId: string }) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!analysisId) return;
    setLoading(true);
    fetch(`/api/analyses/${analysisId}`)
      .then(r => {
        if (!r.ok) throw new Error('Analysis not found');
        return r.json();
      })
      .then(setAnalysis)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [analysisId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: '#E8A020', borderTopColor: 'transparent' }} />
        <p className="text-xs tracking-widest" style={{ color: '#E8A020', fontFamily: '"IBM Plex Mono", monospace' }}>RUNNING FORENSIC SCAN...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="rounded-xl border p-12 text-center" style={{ borderColor: '#FF6B1A40', background: '#FF6B1A08' }}>
        <AlertTriangle className="w-10 h-10 mx-auto mb-4" style={{ color: '#FF6B1A' }} />
        <p className="text-sm font-bold tracking-widest" style={{ color: '#FF6B1A', fontFamily: '"IBM Plex Mono", monospace' }}>SCAN DATA NOT FOUND</p>
        <p className="text-xs mt-2" style={{ color: '#E8DFC8', opacity: 0.5 }}>{error || 'Analysis ID may be invalid or deleted.'}</p>
      </div>
    );
  }

  const cfg = SEVERITY_CONFIG[analysis.overallSeverity] || SEVERITY_CONFIG.medium;
  const SeverityIcon = cfg.icon;
  const scanDate = new Date(analysis.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="space-y-6" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
      {/* Header card */}
      <div className="rounded-xl border p-6" style={{ borderColor: '#1A2A4A', background: '#111E35' }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest mb-1" style={{ color: '#E8A020', opacity: 0.6 }}>FORENSIC SCAN REPORT</p>
            <h2 className="text-xl font-bold tracking-wider mb-1" style={{ color: '#E8DFC8', fontFamily: 'Orbitron, sans-serif' }}>
              {analysis.vehicleType ? analysis.vehicleType.toUpperCase() : 'VEHICLE'} DAMAGE ANALYSIS
            </h2>
            <p className="text-xs" style={{ color: '#E8DFC8', opacity: 0.4 }}>ID: {analysis._id}</p>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <SeverityIcon className="w-5 h-5" style={{ color: cfg.color }} />
            <div>
              <p className="text-xs tracking-widest" style={{ color: cfg.color, opacity: 0.7 }}>OVERALL SEVERITY</p>
              <p className="text-lg font-bold tracking-widest" style={{ color: cfg.color, fontFamily: 'Orbitron, sans-serif' }}>{cfg.label}</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t" style={{ borderColor: '#1A2A4A' }}>
          <div>
            <p className="text-xs tracking-widest mb-1" style={{ color: '#E8A020', opacity: 0.5 }}>PARTS AFFECTED</p>
            <p className="text-2xl font-bold" style={{ color: '#E8A020', fontFamily: 'Orbitron, sans-serif' }}>{analysis.damagedParts.length}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest mb-1" style={{ color: '#E8A020', opacity: 0.5 }}>SCAN DATE</p>
            <p className="text-sm font-bold" style={{ color: '#E8DFC8' }}>{scanDate}</p>
          </div>
          {analysis.confidence !== undefined && (
            <div>
              <p className="text-xs tracking-widest mb-1" style={{ color: '#E8A020', opacity: 0.5 }}>CONFIDENCE</p>
              <p className="text-2xl font-bold" style={{ color: '#E8A020', fontFamily: 'Orbitron, sans-serif' }}>{Math.round(analysis.confidence * 100)}%</p>
            </div>
          )}
          {analysis.scanDuration !== undefined && (
            <div>
              <p className="text-xs tracking-widest mb-1" style={{ color: '#E8A020', opacity: 0.5 }}>SCAN TIME</p>
              <p className="text-sm font-bold" style={{ color: '#E8DFC8' }}>{analysis.scanDuration}s</p>
            </div>
          )}
        </div>

        {analysis.summary && (
          <div className="mt-4 p-4 rounded-lg" style={{ background: '#0B1220', border: '1px solid #1A2A4A' }}>
            <p className="text-xs tracking-widest mb-2" style={{ color: '#E8A020', opacity: 0.6 }}>AI SUMMARY</p>
            <p className="text-sm leading-relaxed" style={{ color: '#E8DFC8', opacity: 0.8 }}>{analysis.summary}</p>
          </div>
        )}
      </div>

      {/* Two-column layout: diagram + parts list */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Vehicle diagram */}
        <VehicleDiagram parts={analysis.damagedParts} />

        {/* Parts list */}
        <div className="rounded-xl border p-6" style={{ borderColor: '#1A2A4A', background: '#111E35' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-4 rounded-sm" style={{ background: '#E8A020' }} />
            <span className="text-xs tracking-widest font-bold" style={{ color: '#E8A020' }}>DAMAGE MANIFEST</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ background: '#E8A02020', color: '#E8A020', border: '1px solid #E8A02040' }}>
              {analysis.damagedParts.length} PARTS
            </span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1" style={{ scrollbarColor: '#1A2A4A #0B1220' }}>
            {analysis.damagedParts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#6B8CAE' }} />
                <p className="text-sm" style={{ color: '#E8DFC8', opacity: 0.5 }}>No damage detected</p>
              </div>
            ) : (
              analysis.damagedParts.map((part, i) => (
                <PartRow key={i} part={part} index={i} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Image if available */}
      {analysis.imageUrl && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#1A2A4A' }}>
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#111E35', borderBottom: '1px solid #1A2A4A' }}>
            <div className="w-1.5 h-4 rounded-sm" style={{ background: '#E8A020' }} />
            <span className="text-xs tracking-widest font-bold" style={{ color: '#E8A020' }}>SOURCE IMAGE</span>
          </div>
          <div style={{ background: '#0B1220' }}>
            <img src={analysis.imageUrl} alt="Analyzed vehicle" className="w-full max-h-96 object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
