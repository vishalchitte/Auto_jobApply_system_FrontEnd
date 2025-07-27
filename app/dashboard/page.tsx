
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from './FileUpload';
import EmailStatus from './EmailStatus';
import Statistics from './Statistics';
import UserEmailTemplates from './UserEmailTemplates';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [notificationCount, setNotificationCount] = useState(0); // For bell icon
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
        <div className="mb-6">
          <nav className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'upload'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-upload-cloud-line mr-2"></i>
              Upload Files
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'templates'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-mail-settings-line mr-2"></i>
              Email Templates
            </button>
            <button
              onClick={() => setActiveTab('scheduler')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'scheduler'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-calendar-schedule-line mr-2"></i>
              Scheduler
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap relative ${
                activeTab === 'notifications'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-notification-3-line mr-2"></i>
              Notifications
              {notificationCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              <i className="ri-user-settings-line mr-2"></i>
              Profile Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'upload' && <FileUpload />}
          {activeTab === 'templates' && <UserEmailTemplates />}
          {activeTab === 'scheduler' && <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-white">Scheduler (Coming Soon)</div>}
          {activeTab === 'notifications' && <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-white">Notifications (Coming Soon)</div>}
          {activeTab === 'profile' && <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-white">Profile Settings (Coming Soon)</div>}
        </div>
      </div>
    </div>
  );
}