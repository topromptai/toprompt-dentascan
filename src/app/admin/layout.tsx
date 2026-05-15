'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileEdit, Globe, LogOut, User, KeyRound, UserCog, Users } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);

  // Admin login page (/admin) renders WITHOUT sidebar — full-screen login
  const isLoginPage = pathname === '/admin';
  if (isLoginPage) {
    return <>{children}</>;
  }

  const linkClass = (href: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      pathname === href || pathname.startsWith(href + '/')
        ? 'bg-gray-900 text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="mb-6">
          <h1 className="text-lg font-bold text-gray-900">DentaScan</h1>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
        <Link href="/admin/dashboard" className={linkClass('/admin/dashboard')}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link href="/admin/content" className={linkClass('/admin/content')}>
          <FileEdit size={18} /> Content
        </Link>
        <Link href="/admin/users" className={linkClass('/admin/users')}>
          <Users size={18} /> Users
        </Link>

        </nav>

        <div className="mt-auto pt-4 border-t border-gray-200 space-y-1">
          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg w-full text-left"
            >
              <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">A</div>
              <span className="flex-1">Admin</span>
              <UserCog size={14} />
            </button>
            {profileOpen && (
              <div className="absolute bottom-full left-0 w-full mb-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <Link href="/admin/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>
                  <User size={14} /> Profile
                </Link>
                <Link href="/admin/profile/password" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50" onClick={() => setProfileOpen(false)}>
                  <KeyRound size={14} /> Change Password
                </Link>
              </div>
            )}
          </div>
          <a href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 rounded-lg">
            <Globe size={16} /> View Site
          </a>
          <button onClick={() => { window.location.href = '/api/admin/logout'; }} className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-700 w-full text-left rounded-lg">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
