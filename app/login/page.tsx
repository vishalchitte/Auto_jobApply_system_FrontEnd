'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserAPI } from '@/config/userApi';

export default function LoginPage() {
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
      const userData = await UserAPI.login(email, password);

      if (!userData.approved) {
        setError('Your account is not approved yet. Please wait for admin approval.');
        setIsLoading(false);
        return;
      }

      // Save user session to localStorage
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userId', userData.id.toString());

      // Redirect based on role
      if (userData.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-48 h-48 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400/20 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2" style={{fontFamily: 'Pacifico, serif'}}>
            logo
          </h1>
          <p className="text-gray-400">HR Email Automation System</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 flex items-center">
              <i className="ri-error-warning-line mr-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed !rounded-button flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line mr-2"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <p className="text-sm text-gray-300 mb-2 font-medium">Demo Credentials:</p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Admin: admin@example.com / admin123</p>
              <p>User: user@example.com / user123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
