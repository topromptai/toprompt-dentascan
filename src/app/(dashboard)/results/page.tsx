'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Download, Share2, Trash2, ArrowLeft, Upload, Scan } from 'lucide-react';
import DamageReport from '@/components/results/damage-report';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const analysisId = searchParams.get('analysisId');

  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/analyses')
      .then(r => r.json())
      .then(data => setAnalyses(Array.isArray(data) ? data : []))
      .catch(() => setAnalyses([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this analysis? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await fetch(`/api/analyses/${id}`, { method: 'DELETE' });
      setAnalyses(prev => prev.filter(a => a._id !== id));
      if (analysisId === id) router.push('/results');
    } catch {}
    setDeleting(null);
  };

  const handleDownload = (id: string) => {
    const link = document.createElement('a');
    link.href = `/api/analyses/${id}/report`;
    link.download = `dentascan-report-${id}.json`;
    link.click();
  };

  const handleShare = async (id: string) => {
    const url = `${window.location.origin}/results?analysisId=${id}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      alert('Report link copied to clipboard');
    }
  };

  if (analysisId) {
    return (
      <main className="p-6" style={{ background: 'var(--color-background)', minHeight: '100vh', fontFamily: '"IBM Plex Mono", monospace' }}>
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={() => router.push('/results')}
            className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition"
            style={{ color: '#E8A020', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO ANALYSES
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDownload(analysisId)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition hover:opacity-90"
              style={{ borderColor: '#E8A020', color: '#E8A020', background: 'transparent', fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <Download className="w-4 h-4" />
              DOWNLOAD REPORT
            </button>
            <button
              onClick={() => handleShare(analysisId)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition hover:opacity-90"
              style={{ borderColor: '#1A2A4A', color: '#E8DFC8', background: '#111E35', fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <Share2 className="w-4 h-4" />
              SHARE
            </button>
            <button
              onClick={() => handleDelete(analysisId)}
              disabled={deleting === analysisId}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition hover:opacity-90 disabled:opacity-50"
              style={{ borderColor: '#FF6B1A', color: '#FF6B1A', background: 'transparent', fontFamily: '"IBM Plex Mono", monospace' }}
            >
              <Trash2 className="w-4 h-4" />
              DELETE
            </button>
          </div>
        </div>
        <DamageReport analysisId={analysisId} />
      </main>
    );
  }

  return (
    <main className="p-6" style={{ background: 'var(--color-background)', minHeight: '100vh', fontFamily: '"IBM Plex Mono", monospace' }}>
      <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-6 rounded-sm" style={{ background: '#E8A020' }} />
            <h1 className="text-2xl font-bold tracking-widest" style={{ color: '#E8A020', fontFamily: 'Orbitron, sans-serif' }}>ANALYSIS HISTORY</h1>
          </div>
          <p className="text-xs tracking-wider" style={{ color: '#E8DFC8', opacity: 0.6 }}>FORENSIC DAMAGE REPORTS — ALL SCANS</p>
        </div>
        <button
          onClick={() => router.push('/upload')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90 shadow-lg"
          style={{ background: '#E8A020', color: '#0B1220', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700 }}
        >
          <Scan className="w-4 h-4" />
          NEW SCAN
        </button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#E8A020', borderTopColor: 'transparent' }} />
            <p className="text-xs tracking-widest" style={{ color: '#E8A020' }}>LOADING ANALYSES...</p>
          </div>
        </div>
      ) : analyses.length === 0 ? (
        <div
          className="rounded-xl border p-16 text-center"
          style={{ borderColor: '#1A2A4A', background: '#111E35' }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#0B1220', border: '1px solid #E8A020' }}>
            <Scan className="w-8 h-8" style={{ color: '#E8A020' }} />
          </div>
          <h2 className="text-lg font-bold tracking-widest mb-2" style={{ color: '#E8A020', fontFamily: 'Orbitron, sans-serif' }}>NO ANALYSES FOUND</h2>
          <p className="text-sm mb-6" style={{ color: '#E8DFC8', opacity: 0.6 }}>Upload a vehicle image to begin forensic damage detection.</p>
          <button
            onClick={() => router.push('/upload')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition hover:opacity-90"
            style={{ background: '#E8A020', color: '#0B1220', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            <Upload className="w-4 h-4" />
            UPLOAD IMAGE
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {analyses.map((analysis) => (
            <AnalysisCard
              key={analysis._id}
              analysis={analysis}
              onView={() => router.push(`/results?analysisId=${analysis._id}`)}
              onDelete={() => handleDelete(analysis._id)}
              deleting={deleting === analysis._id}
            />
          ))}
        </div>
      )}
    </main>
  );
}

function AnalysisCard({ analysis, onView, onDelete, deleting }: { analysis: any; onView: () => void; onDelete: () => void; deleting: boolean }) {
  const severityColor: Record<string, string> = {
    critical: '#FF6B1A',
    high: '#E8A020',
    medium: '#E8DFC8',
    low: '#6B8CAE',
  };
  const severity = analysis.overallSeverity || analysis.severity || 'medium';
  const partCount = analysis.damagedParts?.length || analysis.parts?.length || 0;
  const date = analysis.createdAt ? new Date(analysis.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown date';

  return (
    <div
      className="rounded-xl border p-5 transition hover:shadow-lg cursor-pointer group"
      style={{ borderColor: '#1A2A4A', background: '#111E35' }}
      onClick={onView}
    >
      {analysis.imageUrl && (
        <div className="w-full h-36 rounded-lg mb-4 overflow-hidden" style={{ background: '#0B1220' }}>
          <img src={analysis.imageUrl} alt="Vehicle" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
        </div>
      )}
      {!analysis.imageUrl && (
        <div className="w-full h-36 rounded-lg mb-4 flex items-center justify-center" style={{ background: '#0B1220', border: '1px dashed #1A2A4A' }}>
          <Scan className="w-8 h-8" style={{ color: '#1A2A4A' }} />
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs tracking-widest mb-1" style={{ color: '#E8A020', opacity: 0.7 }}>SCAN ID</p>
          <p className="text-xs font-mono" style={{ color: '#E8DFC8' }}>{analysis._id?.slice(-8).toUpperCase()}</p>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded tracking-widest"
          style={{ background: `${severityColor[severity]}20`, color: severityColor[severity], border: `1px solid ${severityColor[severity]}40` }}
        >
          {severity.toUpperCase()}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs tracking-widest mb-0.5" style={{ color: '#E8DFC8', opacity: 0.5 }}>PARTS AFFECTED</p>
          <p className="text-lg font-bold" style={{ color: '#E8A020', fontFamily: 'Orbitron, sans-serif' }}>{partCount}</p>
        </div>
        <div className="text-right">
          <p className="text-xs tracking-widest mb-0.5" style={{ color: '#E8DFC8', opacity: 0.5 }}>SCAN DATE</p>
          <p className="text-xs" style={{ color: '#E8DFC8' }}>{date}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onView(); }}
          className="flex-1 py-2 rounded-lg text-xs font-bold tracking-wider transition hover:opacity-90"
          style={{ background: '#E8A020', color: '#0B1220' }}
        >
          VIEW REPORT
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          disabled={deleting}
          className="px-3 py-2 rounded-lg text-xs transition hover:opacity-90 disabled:opacity-50"
          style={{ background: '#0B1220', color: '#FF6B1A', border: '1px solid #FF6B1A30' }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#0B1220' }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: '#E8A020', borderTopColor: 'transparent' }} />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
