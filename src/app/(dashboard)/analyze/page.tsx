'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Analysis } from '@/types';

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#FF6B1A',
  high: '#E8A020',
  medium: '#E8DFC8',
  low: '#1A2A4A',
};

const SEVERITY_BG: Record<string, string> = {
  critical: 'bg-[#FF6B1A]/20 border-[#FF6B1A]/60 text-[#FF6B1A]',
  high: 'bg-[#E8A020]/20 border-[#E8A020]/60 text-[#E8A020]',
  medium: 'bg-[#E8DFC8]/10 border-[#E8DFC8]/40 text-[#E8DFC8]',
  low: 'bg-[#1A2A4A]/40 border-[#1A2A4A] text-[#E8DFC8]/60',
};

export default function AnalyzePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setError(null);
    setUploading(true);

    try {
      // Step 1: Upload image
      const formData = new FormData();
      formData.append('file', selectedFile);
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error(uploadData.error || 'Upload failed');

      setUploading(false);
      setAnalyzing(true);

      // Step 2: Analyze
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadData.data.imageUrl }),
      });
      const analyzeData = await analyzeRes.json();
      if (!analyzeData.success) throw new Error(analyzeData.error || 'Analysis failed');

      setResult(analyzeData.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  const isLoading = uploading || analyzing;

  return (
    <div className="min-h-screen bg-[#0B1220] p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-[#E8A020]" />
          <h1
            className="text-3xl font-bold text-[#E8A020] tracking-widest uppercase"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Damage Analysis
          </h1>
        </div>
        <p className="text-[#E8DFC8]/60 ml-4" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
          Upload a vehicle image to initiate forensic scan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Panel */}
        <div className="space-y-4">
          <div
            className={`relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer ${
              dragOver
                ? 'border-[#E8A020] bg-[#E8A020]/10'
                : 'border-[#1A2A4A] hover:border-[#E8A020]/50 bg-[#111E35]'
            }`}
            style={{ minHeight: '320px' }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !previewUrl && fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Vehicle preview"
                  className="w-full rounded-lg object-contain"
                  style={{ maxHeight: '400px' }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setResult(null);
                    setError(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 bg-[#0B1220]/80 border border-[#E8A020]/40 text-[#E8A020] rounded px-2 py-1 text-xs hover:bg-[#E8A020]/20 transition-colors"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  ✕ CLEAR
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 px-8">
                {/* Animated scan icon */}
                <div className="relative mb-6">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="2" y="2" width="76" height="76" rx="4" stroke="#E8A020" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                    <rect x="14" y="14" width="52" height="52" rx="2" stroke="#E8A020" strokeWidth="1" opacity="0.3" />
                    <line x1="2" y1="40" x2="78" y2="40" stroke="#E8A020" strokeWidth="1" opacity="0.6" />
                    <circle cx="40" cy="40" r="8" stroke="#E8A020" strokeWidth="1.5" opacity="0.8" />
                    <circle cx="40" cy="40" r="2" fill="#E8A020" />
                    <line x1="14" y1="14" x2="22" y2="14" stroke="#E8A020" strokeWidth="2" />
                    <line x1="14" y1="14" x2="14" y2="22" stroke="#E8A020" strokeWidth="2" />
                    <line x1="66" y1="14" x2="58" y2="14" stroke="#E8A020" strokeWidth="2" />
                    <line x1="66" y1="14" x2="66" y2="22" stroke="#E8A020" strokeWidth="2" />
                    <line x1="14" y1="66" x2="22" y2="66" stroke="#E8A020" strokeWidth="2" />
                    <line x1="14" y1="66" x2="14" y2="58" stroke="#E8A020" strokeWidth="2" />
                    <line x1="66" y1="66" x2="58" y2="66" stroke="#E8A020" strokeWidth="2" />
                    <line x1="66" y1="66" x2="66" y2="58" stroke="#E8A020" strokeWidth="2" />
                  </svg>
                </div>
                <p
                  className="text-[#E8A020] text-sm font-bold tracking-widest uppercase mb-2"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  Drop vehicle image here
                </p>
                <p
                  className="text-[#E8DFC8]/40 text-xs tracking-wider"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  or click to browse — JPEG, PNG, WebP (max 10MB)
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileInput}
          />

          {previewUrl && !result && (
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full py-4 rounded-lg font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                background: isLoading ? '#1A2A4A' : 'linear-gradient(135deg, #E8A020, #FF6B1A)',
                color: isLoading ? '#E8DFC8' : '#0B1220',
                border: isLoading ? '1px solid #E8A020' : 'none',
              }}
            >
              {uploading ? '[ UPLOADING... ]' : analyzing ? '[ SCANNING... ]' : '[ INITIATE SCAN ]'}
            </button>
          )}

          {isLoading && (
            <div className="bg-[#111E35] border border-[#E8A020]/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-2 h-2 rounded-full bg-[#E8A020] animate-pulse"
                />
                <span
                  className="text-[#E8A020] text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  {uploading ? 'Uploading image data...' : 'Running forensic analysis...'}
                </span>
              </div>
              <div className="w-full bg-[#0B1220] rounded-full h-1">
                <div
                  className="h-1 rounded-full bg-[#E8A020] animate-pulse"
                  style={{ width: uploading ? '30%' : '70%', transition: 'width 0.5s ease' }}
                />
              </div>
            </div>
          )}

          {error && (
            <div
              className="bg-[#FF6B1A]/10 border border-[#FF6B1A]/40 rounded-lg p-4 text-[#FF6B1A] text-sm"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              <span className="font-bold">ERROR: </span>{error}
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div>
          {!result && !isLoading && (
            <div
              className="h-full min-h-[320px] border border-dashed border-[#1A2A4A] rounded-lg flex flex-col items-center justify-center bg-[#111E35]/50"
            >
              <p
                className="text-[#E8DFC8]/30 text-xs tracking-widest uppercase"
                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
              >
                Awaiting scan input...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Overall severity badge */}
              <div className="bg-[#111E35] border border-[#E8A020]/30 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[#E8DFC8]/60 text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                  >
                    Overall Severity
                  </span>
                  <span
                    className={`px-3 py-1 rounded border text-xs font-bold tracking-widest uppercase ${
                      SEVERITY_BG[result.overallSeverity] || SEVERITY_BG.medium
                    }`}
                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                  >
                    {result.overallSeverity.toUpperCase()}
                  </span>
                </div>
                <div
                  className="text-[#E8DFC8]/50 text-xs"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  {result.damageAreas.length} damage zone{result.damageAreas.length !== 1 ? 's' : ''} detected
                </div>
              </div>

              {/* Damage areas */}
              <div className="space-y-3">
                <h3
                  className="text-[#E8A020] text-xs tracking-widest uppercase font-bold"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  Damage Zones
                </h3>
                {result.damageAreas.length === 0 && (
                  <div
                    className="bg-[#111E35] border border-[#1A2A4A] rounded-lg p-4 text-[#E8DFC8]/50 text-sm"
                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                  >
                    No damage detected.
                  </div>
                )}
                {result.damageAreas.map((zone, i) => (
                  <div
                    key={i}
                    className="bg-[#111E35] border border-[#1A2A4A] rounded-lg p-4 hover:border-[#E8A020]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: SEVERITY_COLORS[zone.severity] || '#E8DFC8' }}
                        />
                        <span
                          className="text-[#E8DFC8] text-sm font-bold tracking-wider uppercase"
                          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                          {zone.area}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded border text-xs font-bold tracking-widest uppercase flex-shrink-0 ${
                          SEVERITY_BG[zone.severity] || SEVERITY_BG.medium
                        }`}
                        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                      >
                        {zone.severity}
                      </span>
                    </div>
                    <p
                      className="text-[#E8DFC8]/60 text-xs leading-relaxed ml-4"
                      style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                    >
                      {zone.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setResult(null);
                    setError(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="flex-1 py-3 rounded-lg border border-[#E8A020]/40 text-[#E8A020] text-xs font-bold tracking-widest uppercase hover:bg-[#E8A020]/10 transition-colors"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  New Scan
                </button>
                <button
                  onClick={() => router.push('/dashboard/history')}
                  className="flex-1 py-3 rounded-lg border border-[#1A2A4A] text-[#E8DFC8]/60 text-xs font-bold tracking-widest uppercase hover:border-[#E8A020]/30 hover:text-[#E8DFC8] transition-colors"
                  style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                  View History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
