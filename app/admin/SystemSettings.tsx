'use client';

import { useState } from 'react';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    emailSchedule: {
      enabled: true,
      time: '09:00',
      timezone: 'UTC'
    },
    emailLimits: {
      dailyLimit: 1000,
      rateLimit: 10,
      retryAttempts: 3
    },
    smtp: {
      host: 'smtp.example.com',
      port: 587,
      username: 'sender@example.com',
      password: '••••••••',
      encryption: 'TLS'
    },
    attachments: {
      allowedTypes: ['.pdf', '.doc', '.docx'],
      maxSize: 5,
      maxFiles: 2
    },
    notifications: {
      adminEmail: 'admin@example.com',
      dailyReports: true,
      errorAlerts: true,
      successNotifications: false
    }
  });

  const [activeSection, setActiveSection] = useState('schedule');

  const handleSettingChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically send the settings to your backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">System Settings</h2>
        <button
          onClick={handleSaveSettings}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors !rounded-button"
        >
          <i className="ri-save-line mr-2"></i>
          Save Settings
        </button>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm p-1 card-shadow">
        <nav className="flex space-x-1 overflow-x-auto">
          <button
            onClick={() => setActiveSection('schedule')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
              activeSection === 'schedule'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className="ri-timer-line mr-2"></i>
            Schedule
          </button>
          <button
            onClick={() => setActiveSection('limits')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
              activeSection === 'limits'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className="ri-speed-line mr-2"></i>
            Limits
          </button>
          <button
            onClick={() => setActiveSection('smtp')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
              activeSection === 'smtp'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className="ri-mail-settings-line mr-2"></i>
            SMTP
          </button>
          <button
            onClick={() => setActiveSection('attachments')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
              activeSection === 'attachments'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className="ri-attachment-line mr-2"></i>
            Attachments
          </button>
          <button
            onClick={() => setActiveSection('notifications')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap !rounded-button ${
              activeSection === 'notifications'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <i className="ri-notification-line mr-2"></i>
            Notifications
          </button>
        </nav>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        {/* Schedule Settings */}
        {activeSection === 'schedule' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <i className="ri-timer-line mr-2 text-blue-600"></i>
              Email Schedule Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enable Scheduled Emails
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailSchedule.enabled}
                    onChange={(e) => handleSettingChange('emailSchedule', 'enabled', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Automatically send emails at scheduled time
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Send Time
                </label>
                <input
                  type="time"
                  value={settings.emailSchedule.time}
                  onChange={(e) => handleSettingChange('emailSchedule', 'time', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.emailSchedule.timezone}
                  onChange={(e) => handleSettingChange('emailSchedule', 'timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="CST">Central Time</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Limits Settings */}
        {activeSection === 'limits' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <i className="ri-speed-line mr-2 text-blue-600"></i>
              Email Rate Limits
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Email Limit
                </label>
                <input
                  type="number"
                  value={settings.emailLimits.dailyLimit}
                  onChange={(e) => handleSettingChange('emailLimits', 'dailyLimit', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Maximum emails per day</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Limit (per minute)
                </label>
                <input
                  type="number"
                  value={settings.emailLimits.rateLimit}
                  onChange={(e) => handleSettingChange('emailLimits', 'rateLimit', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Maximum emails per minute</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retry Attempts
                </label>
                <input
                  type="number"
                  value={settings.emailLimits.retryAttempts}
                  onChange={(e) => handleSettingChange('emailLimits', 'retryAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Number of retry attempts for failed emails</p>
              </div>
            </div>
          </div>
        )}

        {/* SMTP Settings */}
        {activeSection === 'smtp' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <i className="ri-mail-settings-line mr-2 text-blue-600"></i>
              SMTP Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={settings.smtp.host}
                  onChange={(e) => handleSettingChange('smtp', 'host', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="smtp.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Port
                </label>
                <input
                  type="number"
                  value={settings.smtp.port}
                  onChange={(e) => handleSettingChange('smtp', 'port', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={settings.smtp.username}
                  onChange={(e) => handleSettingChange('smtp', 'username', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={settings.smtp.password}
                  onChange={(e) => handleSettingChange('smtp', 'password', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption
                </label>
                <select
                  value={settings.smtp.encryption}
                  onChange={(e) => handleSettingChange('smtp', 'encryption', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="TLS">TLS</option>
                  <option value="SSL">SSL</option>
                  <option value="NONE">None</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Attachments Settings */}
        {activeSection === 'attachments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <i className="ri-attachment-line mr-2 text-blue-600"></i>
              Attachment Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum File Size (MB)
                </label>
                <input
                  type="number"
                  value={settings.attachments.maxSize}
                  onChange={(e) => handleSettingChange('attachments', 'maxSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Files per Email
                </label>
                <input
                  type="number"
                  value={settings.attachments.maxFiles}
                  onChange={(e) => handleSettingChange('attachments', 'maxFiles', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowed File Types
                </label>
                <div className="flex flex-wrap gap-2">
                  {settings.attachments.allowedTypes.map((type, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {type}
                      <button
                        onClick={() => {
                          const newTypes = settings.attachments.allowedTypes.filter((_, i) => i !== index);
                          handleSettingChange('attachments', 'allowedTypes', newTypes);
                        }}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <i className="ri-notification-line mr-2 text-blue-600"></i>
              Notification Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.notifications.adminEmail}
                  onChange={(e) => handleSettingChange('notifications', 'adminEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.dailyReports}
                    onChange={(e) => handleSettingChange('notifications', 'dailyReports', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Send daily email reports</span>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.errorAlerts}
                    onChange={(e) => handleSettingChange('notifications', 'errorAlerts', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Send error alerts</span>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications.successNotifications}
                    onChange={(e) => handleSettingChange('notifications', 'successNotifications', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Send success notifications</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}