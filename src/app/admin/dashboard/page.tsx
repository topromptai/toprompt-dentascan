'use client';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">DentaScan — Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-gray-600">New user registered</span>
            <span className="text-gray-400 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-gray-600">Content updated</span>
            <span className="text-gray-400 ml-auto">15 min ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="text-gray-600">New record created</span>
            <span className="text-gray-400 ml-auto">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
