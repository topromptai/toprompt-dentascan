'use client';

import { useState } from 'react';

const MOCK_USERS = [
  { _id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', createdAt: '2024-01-15' },
  { _id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'member', createdAt: '2024-02-20' },
  { _id: '3', name: 'Mike Wilson', email: 'mike@example.com', role: 'member', createdAt: '2024-03-10' },
  { _id: '4', name: 'Emma Davis', email: 'emma@example.com', role: 'member', createdAt: '2024-03-22' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);

  const handleRoleChange = (id: string, role: string) => {
    setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users ({users.length})</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="text-xs px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-500">{user.createdAt}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
