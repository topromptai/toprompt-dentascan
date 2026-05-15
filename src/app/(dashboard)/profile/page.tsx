'use client';
import { useState } from 'react';
import { User, Mail, Shield, Trash2, Save, Camera, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

const MOCK_USER = {
  _id: 'user-001',
  name: 'John Doe',
  email: 'john@example.com',
  username: 'johndoe',
  role: 'Analyst',
  joinDate: 'January 2024',
  scansCompleted: 47,
  projectsActive: 12,
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [user, setUser] = useState(MOCK_USER);
  const [form, setForm] = useState({ name: MOCK_USER.name, email: MOCK_USER.email });
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const initials = (form.name || '')
    .split(' ')
    .map((w: string) => w?.[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setUser(prev => ({ ...prev, name: form.name, email: form.email }));
      setIsSaving(false);
      toast({ title: 'Profile updated successfully!', variant: 'default' });
    }, 700);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    toast({ title: 'Account deletion request received. Our team will process it within 48 hours.', variant: 'default' });
  };

  return (
    <div className="animate-fade-in-up min-h-screen bg-[var(--color-background)] p-6">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-[var(--color-text)] tracking-wider uppercase">
          User Profile
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1 font-body">
          Manage your account information and preferences
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-transparent" />
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6" data-stagger>

        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-md">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-3xl font-heading font-bold text-[var(--color-background)] shadow-lg transition-transform duration-300 group-hover:scale-105">
                  {initials}
                </div>
                <button
                  aria-label="Change profile picture"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 hover:bg-[var(--color-accent)]"
                >
                  <Camera className="w-4 h-4 text-[var(--color-background)]" />
                </button>
              </div>

              <div className="text-center">
                <h2 className="text-lg font-heading font-bold text-[var(--color-text)]">{user.name}</h2>
                <p className="text-sm text-[var(--color-text-secondary)] font-body">{user.email}</p>
                <span className="mt-2 inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30 font-body">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--color-border)] space-y-3">
              <div className="flex items-center justify-between text-sm font-body">
                <span className="text-[var(--color-text-secondary)]">
                  <User className="w-3.5 h-3.5 inline mr-1.5 text-[var(--color-primary)]" />
                  Member since
                </span>
                <span className="text-[var(--color-text)] font-medium">{user.joinDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-body">
                <span className="text-[var(--color-text-secondary)]">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-[var(--color-success)]" />
                  Scans Completed
                </span>
                <span className="text-[var(--color-primary)] font-bold">{user.scansCompleted}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-body">
                <span className="text-[var(--color-text-secondary)]">
                  <Shield className="w-3.5 h-3.5 inline mr-1.5 text-[var(--color-accent)]" />
                  Active Projects
                </span>
                <span className="text-[var(--color-accent)] font-bold">{user.projectsActive}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Edit Form */}
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-6 shadow-md">
            <h3 className="text-base font-heading font-semibold text-[var(--color-text)] mb-1 uppercase tracking-wider">
              Account Information
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] font-body mb-5">
              Update your personal details below
            </p>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="block text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5 font-body"
                >
                  <User className="w-3.5 h-3.5 inline mr-1.5" />
                  Full Name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] outline-none transition-all duration-200 font-body text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="block text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider mb-1.5 font-body"
                >
                  <Mail className="w-3.5 h-3.5 inline mr-1.5" />
                  Email Address
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] outline-none transition-all duration-200 font-body text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-[var(--color-background)] text-sm font-medium font-body transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[var(--color-background)] border-t-transparent rounded-full animate-spin" role="status" aria-label="Saving" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-error)]/30 p-6 shadow-md">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-error)]/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[var(--color-error)]" />
              </div>
              <div>
                <h3 className="text-base font-heading font-semibold text-[var(--color-error)] uppercase tracking-wider">
                  Danger Zone
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] font-body mt-0.5">
                  Irreversible and destructive actions
                </p>
              </div>
            </div>

            <div className="border border-[var(--color-error)]/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--color-text)] font-body">Delete Account</p>
                <p className="text-xs text-[var(--color-text-secondary)] font-body mt-0.5">
                  Permanently remove your account and all associated scan data.
                </p>
              </div>
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-error)]/50 text-[var(--color-error)] text-sm font-medium font-body transition-all duration-200 hover:bg-[var(--color-error)]/10 hover:border-[var(--color-error)] flex-shrink-0 active:scale-[0.97]"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              ) : (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 rounded-lg bg-[var(--color-error)] text-[var(--color-text)] text-sm font-medium font-body transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium font-body transition-all duration-200 hover:bg-[var(--color-background)] active:scale-[0.97]"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
