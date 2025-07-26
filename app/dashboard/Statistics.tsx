'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Statistics() {
  // Mock data for charts
  const emailTrendData = [
    { day: 'Mon', sent: 45, delivered: 42, opened: 23 },
    { day: 'Tue', sent: 52, delivered: 48, opened: 31 },
    { day: 'Wed', sent: 38, delivered: 35, opened: 19 },
    { day: 'Thu', sent: 61, delivered: 58, opened: 34 },
    { day: 'Fri', sent: 47, delivered: 44, opened: 28 },
    { day: 'Sat', sent: 33, delivered: 31, opened: 16 },
    { day: 'Sun', sent: 29, delivered: 27, opened: 14 }
  ];

  const statusDistribution = [
    { name: 'Delivered', value: 285, color: '#10B981' },
    { name: 'Opened', value: 165, color: '#3B82F6' },
    { name: 'Bounced', value: 23, color: '#EF4444' },
    { name: 'Pending', value: 12, color: '#F59E0B' }
  ];

  const companyStats = [
    { company: 'TechCorp', sent: 45, delivered: 42, rate: 93.3 },
    { company: 'Innovate Inc', sent: 38, delivered: 35, rate: 92.1 },
    { company: 'StartupXYZ', sent: 52, delivered: 46, rate: 88.5 },
    { company: 'Enterprise Solutions', sent: 29, delivered: 27, rate: 93.1 },
    { company: 'Wilson Consulting', sent: 41, delivered: 38, rate: 92.7 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <i className="ri-mail-send-line text-blue-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600">+12% from last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <i className="ri-check-double-line text-green-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">1,152</p>
              <p className="text-sm text-green-600">92.4% delivery rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <i className="ri-eye-line text-purple-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Opened</p>
              <p className="text-2xl font-bold text-gray-900">687</p>
              <p className="text-sm text-green-600">59.6% open rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <i className="ri-error-warning-line text-red-600 text-2xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bounced</p>
              <p className="text-2xl font-bold text-gray-900">95</p>
              <p className="text-sm text-red-600">7.6% bounce rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="ri-line-chart-line mr-2 text-blue-600"></i>
            Weekly Email Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={emailTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sent" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
              <Area type="monotone" dataKey="delivered" stackId="2" stroke="#10B981" fill="#10B981" />
              <Area type="monotone" dataKey="opened" stackId="3" stroke="#8B5CF6" fill="#8B5CF6" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="ri-pie-chart-line mr-2 text-blue-600"></i>
            Email Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Company Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="ri-building-line mr-2 text-blue-600"></i>
          Company Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emails Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companyStats.map((company, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-building-line text-blue-600"></i>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{company.company}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.sent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.delivered}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${company.rate}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 card-shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="ri-history-line mr-2 text-blue-600"></i>
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Email batch sent to TechCorp (45 recipients)</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">New Excel file uploaded: hr_contacts_jan.xlsx</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Scheduled email job completed</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Email template updated</p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}