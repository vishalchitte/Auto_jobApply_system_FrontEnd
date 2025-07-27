'use client';

import { useState, useEffect } from 'react';
import { AdminAPI, User } from '../../config/api';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [unapprovedUsers, setUnapprovedUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'approved' | 'unapproved'>('approved');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load data on component mount
  useEffect(() => {
    loadUsers();
    loadUnapprovedUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await AdminAPI.getAllNormalUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadUnapprovedUsers = async () => {
    try {
      setLoading(true);
      const fetchedUnapprovedUsers = await AdminAPI.getUnapprovedUsers();
      setUnapprovedUsers(fetchedUnapprovedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load unapproved users');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId: number) => {
    try {
      setLoading(true);
      await AdminAPI.approveUser(userId);
      // Refresh both lists after approval
      await loadUsers();
      await loadUnapprovedUsers();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setLoading(true);
      await AdminAPI.deleteUser(userId);
      // Refresh the users list after deletion
      await loadUsers();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUnapprovedUsers = unapprovedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button
          onClick={() => {
            loadUsers();
            loadUnapprovedUsers();
          }}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('approved')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'approved'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          Approved Users ({filteredUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('unapproved')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'unapproved'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          Pending Approval ({filteredUnapprovedUsers.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {activeTab === 'approved' && filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/50">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/50">
                      Approved
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={loading}
                      className="text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {activeTab === 'unapproved' && filteredUnapprovedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-yellow-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/50">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/50">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleApproveUser(user.id)}
                      disabled={loading}
                      className="text-green-400 hover:text-green-300 disabled:opacity-50 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={loading}
                      className="text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {((activeTab === 'approved' && filteredUsers.length === 0) ||
          (activeTab === 'unapproved' && filteredUnapprovedUsers.length === 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {activeTab === 'approved' ? 'No approved users found' : 'No pending users found'}
            </div>
            <div className="text-gray-500 text-sm mt-2">
              {searchTerm ? 'Try adjusting your search terms' : 'Users will appear here when available'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}