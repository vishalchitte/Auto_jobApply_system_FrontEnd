'use client';

import { useEffect, useState } from 'react';
import { SuperAdminAPI } from '@/config/superAdminApi';


export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await SuperAdminAPI.getAdminRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load admin requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await SuperAdminAPI.approveAdmin(id);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to approve admin');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await SuperAdminAPI.rejectAdmin(id);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to reject admin');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Pending Admin Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-400">No pending requests</p>
      ) : (
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-gray-300 border-b border-gray-700">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-white">{req.name}</td>
                <td className="px-4 py-2 text-gray-300">{req.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
