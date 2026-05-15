'use client';

import { useState, useCallback, createContext, useContext } from 'react';
import { X, Info, Sparkles } from 'lucide-react';

interface Toast { id: string; title: string; description?: string; variant: 'success' | 'error' | 'info'; }
interface ToastContextType { toast: (t: Omit<Toast, 'id'>) => void; toasts: Toast[]; dismiss: (id: string) => void; }

const ToastContext = createContext<ToastContextType>({ toast: () => {}, toasts: [], dismiss: () => {} });

// No-op container — ToastProvider renders the actual toast list inline.
// Exported for compatibility with the common Phase-1 hallucination
//   const { ToastContainer } = useToast();
//   <ToastContainer />
// (gen78 dashboard layout crashed with "Element type is invalid: undefined"
// because the LLM destructured ToastContainer from useToast() and rendered
// it. The hook didn't expose ToastContainer → JSX received undefined →
// React crash on the entire dashboard.) Returning null keeps the JSX
// well-formed while ToastProvider continues to handle the real rendering.
export function ToastContainer() { return null; }

// useToast also returns ToastContainer so the destructure pattern works.
// Kept as a property on the hook return rather than the context value to
// avoid threading a fresh component reference through every Provider render.
export function useToast() {
  const ctx = useContext(ToastContext);
  return { ...ctx, ToastContainer };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => setToasts(prev => (Array.isArray(prev) ? prev : []).filter(x => x.id !== id)), 3000);
  }, []);
  const dismiss = useCallback((id: string) => setToasts(prev => (Array.isArray(prev) ? prev : []).filter(x => x.id !== id)), []);

  const icons: Record<string, any> = { success: Sparkles, error: Sparkles, info: Info };
  const colors: Record<string, string> = { success: 'text-green-500', error: 'text-red-500', info: 'text-blue-500' };

  return (
    <ToastContext.Provider value={{ toast, toasts, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {(Array.isArray(toasts) ? toasts : []).map(t => {
          const Icon = icons[t.variant] || Info;
          return (
            <div key={t.id} className="flex items-start gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg p-4 animate-in slide-in-from-right">
              <Icon className={`h-5 w-5 shrink-0 ${colors[t.variant] || 'text-blue-500'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text)]">{t.title}</p>
                {t.description && <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{t.description}</p>}
              </div>
              <button onClick={() => dismiss(t.id)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"><X className="h-4 w-4" /></button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}