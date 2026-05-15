'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, ScanLine, AlertTriangle, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onAnalysisComplete?: (analysisId: string) => void;
}

export function ImageUploader({ onAnalysisComplete }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File | null) => {
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!f.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, WebP, HEIC).');
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError('Image must be under 20 MB.');
      return;
    }
    setFile(f);
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const dropped = e.dataTransfer.files?.[0] ?? null;
      handleFile(dropped);
    },
    [handleFile]
  );

  const handleAnalyze = async () => {
    if (!file || loading) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/analyses', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      const analysis = await res.json();
      onAnalysisComplete?.(analysis._id);
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onClick={() => !file && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
          ${
            dragOver
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.01]'
              : file
              ? 'border-[var(--color-primary)]/50 bg-[var(--color-surface)] cursor-default'
              : 'border-[var(--color-border)] bg-[var(--color-surface)] cursor-pointer hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-primary)]/3'
          }`}
        style={{ minHeight: '280px' }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="hidden"
          aria-label="Upload vehicle image"
        />

        {preview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Vehicle preview"
              className="w-full object-contain max-h-72"
            />
            {/* Scan line overlay animation */}
            {loading && (
              <div className="absolute inset-0 bg-[var(--color-background)]/60 flex flex-col items-center justify-center gap-3">
                <div
                  className="absolute left-0 right-0 h-0.5 bg-[var(--color-primary)] opacity-80"
                  style={{
                    animation: 'scanLine 1.5s linear infinite',
                    boxShadow: '0 0 12px 2px var(--color-primary)',
                  }}
                />
                <div className="w-12 h-12 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                <p className="font-heading text-sm text-[var(--color-primary)] tracking-widest uppercase">Scanning...</p>
              </div>
            )}
            {/* Remove button */}
            {!loading && (
              <button
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--color-background)]/80 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center mb-4">
              {dragOver ? (
                <Upload className="w-8 h-8 text-[var(--color-primary)] animate-bounce" />
              ) : (
                <ImageIcon className="w-8 h-8 text-[var(--color-primary)]/60" />
              )}
            </div>
            <p className="font-heading text-base font-semibold text-[var(--color-text)] mb-1">
              {dragOver ? 'Drop to upload' : 'Upload Vehicle Image'}
            </p>
            <p className="font-body text-sm text-[var(--color-text-secondary)] mb-3">
              Drag & drop or click to select
            </p>
            <p className="font-body text-xs text-[var(--color-text-secondary)]/60">
              JPEG, PNG, WebP, HEIC · Max 20 MB
            </p>
          </div>
        )}
      </div>

      {/* File info */}
      {file && !loading && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex items-center gap-2 min-w-0">
            <ImageIcon className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
            <span className="font-body text-sm text-[var(--color-text)] truncate">{file.name}</span>
          </div>
          <span className="font-body text-xs text-[var(--color-text-secondary)] shrink-0 ml-3">
            {(file.size / 1024).toFixed(0)} KB
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30">
          <AlertTriangle className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
          <p className="font-body text-sm text-[var(--color-accent)]">{error}</p>
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: !file || loading ? undefined : 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
          backgroundColor: !file || loading ? 'var(--color-surface)' : undefined,
          color: !file || loading ? 'var(--color-text-secondary)' : 'var(--color-background)',
          border: !file || loading ? '1px solid var(--color-border)' : 'none',
        }}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Analyzing Damage...
          </>
        ) : (
          <>
            <ScanLine className="w-4 h-4" />
            Analyze Damage
          </>
        )}
      </button>

      {/* Scan line keyframe */}
      <style>{`
        @keyframes scanLine {
          0%   { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
