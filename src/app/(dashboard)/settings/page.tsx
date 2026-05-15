'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface Item { _id: string; title: string; description: string; }

const INITIAL_ITEMS: Item[] = [
  { _id: '1', title: 'First setting', description: 'A short description of this setting.' },
  { _id: '2', title: 'Second setting', description: 'Another sample entry to show the layout.' },
  { _id: '3', title: 'Third setting', description: 'You can edit, delete, or add new ones.' },
  { _id: '4', title: 'Fourth setting', description: 'Sample placeholder text for preview.' },
  { _id: '5', title: 'Fifth setting', description: 'Replace this with real data once wired up.' },
  { _id: '6', title: 'Sixth setting', description: 'The full-stack phase will connect this to a real API.' },
];

export default function SettingsPage() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');

  const filtered = (Array.isArray(items) ? items : []).filter((it) =>
    (it.title || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    (it.description || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleCreate = () => {
    const title = (draftTitle || '').trim();
    if (!title) return;
    setItems((prev) => [
      { _id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), title, description: (draftDescription || '').trim() || 'No description' },
      ...prev,
    ]);
    setDraftTitle('');
    setDraftDescription('');
    setShowCreate(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => (Array.isArray(prev) ? prev : []).filter((it) => it._id !== id));
  };

  return (
    <main className="p-6">
      <header className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--color-text)' }}>Settings</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Manage your settings.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition shadow-sm shrink-0"
          style={{ background: 'var(--color-primary)', color: '#fff' }}
        >
          <Plus className="w-4 h-4" />
          <span>New Setting</span>
        </button>
      </header>

      <input
        type="text"
        placeholder="Search settings..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg border text-sm mb-6"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
      />

      {filtered.length === 0 ? (
        <div className="border rounded-xl p-12 text-center" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>No settings found</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>Get started by creating your first setting.</p>
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'var(--color-primary)', color: '#fff' }}
          >
            <Plus className="w-4 h-4" />
            <span>Create Setting</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(Array.isArray(filtered) ? filtered : []).map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-xl border transition hover:shadow-md"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
            >
              <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>
              <button
                type="button"
                onClick={() => handleDelete(item._id)}
                className="text-sm hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreate(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl p-6 max-w-md w-full"
            style={{ background: 'var(--color-surface)' }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>New Setting</h2>
            <input
              type="text"
              placeholder="Title"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              autoFocus
              className="w-full px-4 py-2 rounded-lg border text-sm mb-3"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text)' }}
            />
            <textarea
              placeholder="Description (optional)"
              value={draftDescription}
              onChange={(e) => setDraftDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border text-sm mb-4 resize-none"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text)' }}
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => { setShowCreate(false); setDraftTitle(''); setDraftDescription(''); }}
                className="px-4 py-2 rounded-lg text-sm border"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', background: 'transparent' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                disabled={!(draftTitle || '').trim()}
                className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
              >
                Add Setting
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
