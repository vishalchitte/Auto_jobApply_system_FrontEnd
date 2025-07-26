
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';
import EmailTemplates from './EmailTemplates';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (role !== 'admin' || !email) {
      router.push('/login');
      return;
    }
    
    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white" style={{fontFamily: 'Pacifico, serif'}}>
                logo
              </h1>
              <div className="ml-4">
                <span className="bg-red-500/20 text-red-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-500/50">
                  Admin Panel
                </span>
                <p className="text-sm text-gray-400 mt-1">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors !rounded-button"
              >
                <i className="ri-dashboard-line mr-2"></i>
                User View
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors !rounded-button"
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
        <div className="bg-gray-800/50 rounded-xl shadow-sm p-1 mb-6 border border-gray-700/50">
          <nav className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
                activeTab === 'dashboard'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-dashboard-line mr-2"></i>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
                activeTab === 'users'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-user-settings-line mr-2"></i>
              User Management
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
                activeTab === 'templates'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-file-text-line mr-2"></i>
              Email Templates
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
                activeTab === 'settings'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-settings-line mr-2"></i>
              System Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'templates' && <EmailTemplates />}
          {activeTab === 'settings' && <SystemSettings />}
        </div>
      </div>
    </div>
  );
}
