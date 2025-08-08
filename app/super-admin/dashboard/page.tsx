'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminRequests from '../AdminRequests';
import SystemOverview from '../SystemOverview';

export default function SuperAdminDashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (role !== 'superadmin' || !email) {
      router.push('/super-admin');
      return;
    }
    
    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    router.push('/super-admin');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-orange-900 shadow-lg border-b border-red-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                <i className="ri-shield-keyhole-line text-2xl text-white"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white" style={{fontFamily: 'Pacifico, serif'}}>
                  logo
                </h1>
                <div className="flex items-center mt-1">
                  <span className="bg-yellow-400/20 text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-yellow-400/50 mr-2">
                    <i className="ri-vip-crown-line mr-1"></i>
                    SUPER ADMIN
                  </span>
                  <span className="text-sm text-red-200">{userEmail}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/admin')}
                className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors !rounded-button"
              >
                <i className="ri-admin-line mr-2"></i>
                Admin View
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-700/80 transition-colors !rounded-button"
              >
                <i className="ri-logout-box-line mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-sm p-1 mb-6 border border-gray-700/60">
          <nav className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-dashboard-3-line mr-2"></i>
              System Overview
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
                activeTab === 'requests'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-user-settings-line mr-2"></i>
              Admin Requests
              <span className="ml-2 bg-yellow-500/20 text-yellow-400 text-xs font-medium px-2 py-0.5 rounded-full border border-yellow-500/50">
                3
              </span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && <SystemOverview />}
          {activeTab === 'requests' && <AdminRequests />}
        </div>
      </div>
    </div>
  );
}