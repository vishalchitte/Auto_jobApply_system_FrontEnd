'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminAPI } from '@/config/api'; // use your real backend API

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Authenticate with real backend
      const userData = await AdminAPI.login(email, password);

      if (!userData.approved) {
        setError('Your account is not approved yet. Please wait for admin approval.');
        setIsLoading(false);
        return;
      }

      // Ensure only SUPER_ADMIN can log in here
      if (userData.role !== 'SUPER_ADMIN') {
        setError('Access denied. You are not a super admin.');
        setIsLoading(false);
        return;
      }

      // Save session
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userId', userData.id.toString());

      // Redirect to super admin dashboard
      router.push('/super-admin/dashboard');
    } catch (err) {
      console.error('Super admin login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-40 h-40 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-24 w-56 h-56 bg-orange-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-24 left-32 w-48 h-48 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-16 right-16 w-64 h-64 bg-red-500/10 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <i className="ri-shield-keyhole-line text-3xl text-white"></i>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Pacifico, serif' }}>
            logo
          </h1>
          <p className="text-gray-400">Super Admin Portal</p>
          <div className="flex items-center justify-center mt-2">
            <span className="bg-red-500/20 text-red-400 text-xs font-medium px-3 py-1 rounded-full border border-red-500/50">
              <i className="ri-vip-crown-line mr-1"></i>
              SUPER ADMIN ACCESS
            </span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Master Control</h2>
            <p className="text-gray-400 text-sm">Highest level system access</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 flex items-center">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <i className="ri-admin-line mr-2"></i>
                Super Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter super admin email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <i className="ri-key-line mr-2"></i>
                Master Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/60 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter master password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed !rounded-button flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Authenticating...
                </>
              ) : (
                <>
                  <i className="ri-shield-check-line mr-2"></i>
                  Access Master Control
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-gray-400 hover:text-gray-300 text-sm flex items-center justify-center">
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Regular Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
