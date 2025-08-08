'use client';

import { useEffect, useState } from 'react';
import { SuperAdminAPI } from '@/config/superAdminApi';

export default function SystemOverviewPage() {
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const data = await SuperAdminAPI.getSystemOverview();
      setOverview(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load system overview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">System Overview</h1>
      {overview ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-gray-300">Total Users</h2>
            <p className="text-3xl font-bold text-white">{overview.totalUsers}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-gray-300">Total Admins</h2>
            <p className="text-3xl font-bold text-white">{overview.totalAdmins}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-gray-300">Total Sub Admins</h2>
            <p className="text-3xl font-bold text-white">{overview.totalSubAdmins}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No data available</p>
      )}
    </div>
  );
}
