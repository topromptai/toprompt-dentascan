'use client';

import { useState } from 'react';

const MOCK_CONTENT = [
  { _id: '1', key: 'home.hero.title', type: 'text', value: 'Welcome to our platform' },
  { _id: '2', key: 'home.hero.subtitle', type: 'text', value: 'The best solution for your needs' },
  { _id: '3', key: 'home.cta.text', type: 'text', value: 'Get Started Free' },
  { _id: '4', key: 'about.title', type: 'text', value: 'About Us' },
  { _id: '5', key: 'contact.email', type: 'text', value: 'hello@example.com' },
];

export default function ContentEditorPage() {
  const [items, setItems] = useState(MOCK_CONTENT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (id: string, value: string) => {
    setEditingId(id);
    setEditValue(value);
  };

  const handleSave = (id: string) => {
    setItems(prev => prev.map(i => i._id === id ? { ...i, value: editValue } : i));
    setEditingId(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.key}</code>
              <span className="text-xs text-gray-400">{item.type}</span>
            </div>
            {editingId === item._id ? (
              <div className="flex gap-2">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                />
                <button
                  onClick={() => handleSave(item._id)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm self-end"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">{String(item.value)}</p>
                <button
                  onClick={() => handleEdit(item._id, String(item.value))}
                  className="text-xs text-gray-500 hover:text-gray-900"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
