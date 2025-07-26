'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  // Mock data
  const systemStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalEmails: 15634,
    successRate: 92.4
  };

  const dailyActivity = [
    { day: 'Mon', users: 45, emails: 523, success: 485 },
    { day: 'Tue', users: 52, emails: 612, success: 567 },
    { day: 'Wed', users: 38, emails: 445, success: 402 },
    { day: 'Thu', users: 61, emails: 734, success: 681 },
    { day: 'Fri', users: 47, emails: 589, success: 544 },
    { day: 'Sat', users: 33, emails: 301, success: 278 },
    { day: 'Sun', users: 29, emails: 245, success: 223 }
  ];

  const userGrowth = [
    { month: 'Jan', users: 120, emails: 2340 },
    { month: 'Feb', users: 156, emails: 2890 },
    { month: 'Mar', users: 189, emails: 3456 },
    { month: 'Apr', users: 234, emails: 4123 },
    { month: 'May', users: 278, emails: 4567 },
    { month: 'Jun', users: 312, emails: 5234 }
  ];

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <i className="ri-user-line text-blue-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+8.2% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <i className="ri-user-star-line text-green-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">71.5% activity rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <i className="ri-mail-send-line text-purple-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Emails</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalEmails.toLocaleString()}</p>
              <p className="text-sm text-green-600">+15.3% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <i className="ri-trophy-line text-yellow-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.successRate}%</p>
              <p className="text-sm text-green-600">+2.1% improvement</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="ri-server-line mr-2 text-blue-600"></i>
          System Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <i className="ri-database-2-line text-green-600 text-xl mr-3"></i>
              <div>
                <p className="font-medium text-green-800">Database</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full pulse-animation"></div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <i className="ri-mail-line text-green-600 text-xl mr-3"></i>
              <div>
                <p className="font-medium text-green-800">Email Service</p>
                <p className="text-sm text-green-600">Active</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full pulse-animation"></div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <i className="ri-timer-line text-green-600 text-xl mr-3"></i>
              <div>
                <p className="font-medium text-green-800">Scheduler</p>
                <p className="text-sm text-green-600">Running</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full pulse-animation"></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="ri-bar-chart-line mr-2 text-blue-600"></i>
            Daily Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3B82F6" />
              <Bar dataKey="emails" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="ri-line-chart-line mr-2 text-blue-600"></i>
            Growth Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
              <Area type="monotone" dataKey="emails" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent System Logs */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="ri-file-list-line mr-2 text-blue-600"></i>
          Recent System Logs
        </h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <i className="ri-information-line text-blue-600 mr-3"></i>
            <div className="flex-1">
              <p className="text-sm text-blue-800">System backup completed successfully</p>
              <p className="text-xs text-blue-600">2024-01-15 09:00:00</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <i className="ri-check-line text-green-600 mr-3"></i>
            <div className="flex-1">
              <p className="text-sm text-green-800">Daily email batch processed - 1,247 emails sent</p>
              <p className="text-xs text-green-600">2024-01-15 09:05:00</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <i className="ri-alert-line text-yellow-600 mr-3"></i>
            <div className="flex-1">
              <p className="text-sm text-yellow-800">High memory usage detected - 78%</p>
              <p className="text-xs text-yellow-600">2024-01-15 08:45:00</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-red-50 rounded-lg">
            <i className="ri-error-warning-line text-red-600 mr-3"></i>
            <div className="flex-1">
              <p className="text-sm text-red-800">Failed email delivery to 5 recipients</p>
              <p className="text-xs text-red-600">2024-01-15 08:30:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="ri-flashlight-line mr-2 text-blue-600"></i>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors !rounded-button">
            <i className="ri-restart-line text-blue-600 text-xl mr-3"></i>
            <span className="text-blue-800 font-medium">Restart System</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors !rounded-button">
            <i className="ri-database-line text-green-600 text-xl mr-3"></i>
            <span className="text-green-800 font-medium">Backup Database</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors !rounded-button">
            <i className="ri-mail-send-line text-yellow-600 text-xl mr-3"></i>
            <span className="text-yellow-800 font-medium">Send Test Email</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors !rounded-button">
            <i className="ri-file-download-line text-purple-600 text-xl mr-3"></i>
            <span className="text-purple-800 font-medium">Export Logs</span>
          </button>
        </div>
      </div>
    </div>
  );
}