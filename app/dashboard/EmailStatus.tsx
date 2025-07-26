
'use client';

import { useState } from 'react';

interface EmailRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: string;
  deliveryStatus: 'delivered' | 'bounced' | 'opened' | 'pending';
}

export default function EmailStatus() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const emailRecords: EmailRecord[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      company: 'TechCorp',
      status: 'sent',
      sentAt: '2024-01-15 09:00:00',
      deliveryStatus: 'delivered'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@innovate.com',
      company: 'Innovate Inc',
      status: 'sent',
      sentAt: '2024-01-15 09:01:00',
      deliveryStatus: 'opened'
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@startup.io',
      company: 'StartupXYZ',
      status: 'failed',
      sentAt: '2024-01-15 09:02:00',
      deliveryStatus: 'bounced'
    },
    {
      id: '4',
      name: 'Emily Brown',
      email: 'emily.brown@enterprise.com',
      company: 'Enterprise Solutions',
      status: 'sent',
      sentAt: '2024-01-15 09:03:00',
      deliveryStatus: 'delivered'
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.w@consulting.com',
      company: 'Wilson Consulting',
      status: 'pending',
      sentAt: '',
      deliveryStatus: 'pending'
    }
  ];

  const filteredRecords = emailRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return 'ri-check-line text-green-400';
      case 'failed': return 'ri-close-line text-red-400';
      case 'pending': return 'ri-time-line text-yellow-400';
      default: return 'ri-question-line text-gray-400';
    }
  };

  const getDeliveryIcon = (status: string) => {
    switch (status) {
      case 'delivered': return 'ri-check-double-line text-green-400';
      case 'opened': return 'ri-eye-line text-blue-400';
      case 'bounced': return 'ri-error-warning-line text-red-400';
      case 'pending': return 'ri-time-line text-yellow-400';
      default: return 'ri-question-line text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getDeliveryBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'opened':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'bounced':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl shadow-sm p-6 card-shadow border border-gray-700/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 sm:mb-0 flex items-center text-white">
          <i className="ri-mail-check-line mr-2 text-purple-400"></i>
          Email Status Monitor
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/50">
          <div className="flex items-center">
            <i className="ri-check-line text-green-400 text-2xl mr-3"></i>
            <div>
              <p className="text-sm text-green-400">Sent</p>
              <p className="text-2xl font-bold text-green-400">
                {emailRecords.filter(r => r.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/50">
          <div className="flex items-center">
            <i className="ri-close-line text-red-400 text-2xl mr-3"></i>
            <div>
              <p className="text-sm text-red-400">Failed</p>
              <p className="text-2xl font-bold text-red-400">
                {emailRecords.filter(r => r.status === 'failed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/20 rounded-lg p-4 border border-yellow-500/50">
          <div className="flex items-center">
            <i className="ri-time-line text-yellow-400 text-2xl mr-3"></i>
            <div>
              <p className="text-sm text-yellow-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">
                {emailRecords.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/50">
          <div className="flex items-center">
            <i className="ri-eye-line text-blue-400 text-2xl mr-3"></i>
            <div>
              <p className="text-sm text-blue-400">Opened</p>
              <p className="text-2xl font-bold text-blue-400">
                {emailRecords.filter(r => r.deliveryStatus === 'opened').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Records Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Delivery
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Sent At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-700/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">{record.name}</div>
                    <div className="text-sm text-gray-400">{record.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {record.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(record.status)}`}>
                    <i className={`${getStatusIcon(record.status)} mr-1`}></i>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDeliveryBadge(record.deliveryStatus)}`}>
                    <i className={`${getDeliveryIcon(record.deliveryStatus)} mr-1`}></i>
                    {record.deliveryStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {record.sentAt || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 !rounded-button">
                      <i className="ri-eye-line"></i>
                    </button>
                    <button className="text-green-400 hover:text-green-300 !rounded-button">
                      <i className="ri-refresh-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-8">
          <i className="ri-inbox-line text-gray-500 text-6xl mb-4"></i>
          <p className="text-gray-400">No email records found</p>
        </div>
      )}
    </div>
  );
}
