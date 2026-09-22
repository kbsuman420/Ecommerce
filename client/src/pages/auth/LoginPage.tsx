import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      const result = await login({ email, password });
      if (result.success && result.user) {
        // Automatically redirect based on user's assigned role in database
        if (result.user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (result.user.role === 'SELLER') {
          navigate('/seller/dashboard');
        } else {
          navigate(redirectUrl || '/');
        }
      }
    } catch {
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md mb-3">
          P
        </div>
        <h1 className="text-2xl font-black text-slate-900">Sign in to Paidal Shop</h1>
        <p className="text-xs text-slate-500 mt-1">
          Enter your email and you will be routed to your assigned panel
        </p>
      </div>

      {/* Demo Credentials Helper */}
      <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-3.5 mb-6 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Demo Accounts (Auto-Routed by Email):
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => handleFillDemo('customer@gmail.com')}
            className="bg-white hover:bg-blue-50 border border-slate-200 p-2 rounded-xl text-left transition"
          >
            <div className="font-bold text-blue-600">Customer</div>
            <div className="text-slate-400 truncate text-[10px]">customer@gmail.com</div>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo('seller@gmail.com')}
            className="bg-white hover:bg-emerald-50 border border-slate-200 p-2 rounded-xl text-left transition"
          >
            <div className="font-bold text-emerald-600">Seller</div>
            <div className="text-slate-400 truncate text-[10px]">seller@gmail.com</div>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo('admin@gmail.com')}
            className="bg-white hover:bg-purple-50 border border-slate-200 p-2 rounded-xl text-left transition"
          >
            <div className="font-bold text-purple-600">Admin</div>
            <div className="text-slate-400 truncate text-[10px]">admin@gmail.com</div>
          </button>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <a href="#" className="text-[11px] font-semibold text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-5">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
