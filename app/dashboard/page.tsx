
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from './FileUpload';
import EmailStatus from './EmailStatus';
import Statistics from './Statistics';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (!role || !email) {
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
                <p className="text-sm text-gray-400">Welcome back!</p>
                <p className="text-sm font-medium text-gray-200">{userEmail}</p>
              </div>
            </div>
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

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-800/50 rounded-xl shadow-sm p-1 mb-6 border border-gray-700/50">
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors !rounded-button ${
                activeTab === 'upload'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-upload-2-line mr-2"></i>
              Upload Excel
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors !rounded-button ${
                activeTab === 'status'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-mail-check-line mr-2"></i>
              Email Status
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors !rounded-button ${
                activeTab === 'stats'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-bar-chart-line mr-2"></i>
              Statistics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'upload' && <FileUpload />}
          {activeTab === 'status' && <EmailStatus />}
          {activeTab === 'stats' && <Statistics />}
        </div>
      </div>
    </div>
  );
}
