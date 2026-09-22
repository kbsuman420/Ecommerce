import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Store,
  UserCheck,
} from 'lucide-react';
import type { UserRole } from '../../types/auth';

export const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fname || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await register({
        fname,
        lname,
        email,
        phoneNo,
        password,
        role,
      });

      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (role === 'SELLER') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md mb-3">
          P
        </div>
        <h1 className="text-2xl font-black text-slate-900">Create an Account</h1>
        <p className="text-xs text-slate-500 mt-1">
          Join as a Customer, Vendor/Seller, or Platform Administrator
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Your Role:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('CUSTOMER')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                  role === 'CUSTOMER'
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <UserCheck className={`w-5 h-5 mb-2 ${role === 'CUSTOMER' ? 'text-blue-600' : 'text-slate-400'}`} />
                <div>
                  <div className="font-bold text-xs">Customer</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Buy & Review</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('SELLER')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                  role === 'SELLER'
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <Store className={`w-5 h-5 mb-2 ${role === 'SELLER' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <div>
                  <div className="font-bold text-xs">Seller</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Sell & Inventory</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                  role === 'ADMIN'
                    ? 'border-purple-600 bg-purple-50/50 text-purple-900 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <ShieldCheck className={`w-5 h-5 mb-2 ${role === 'ADMIN' ? 'text-purple-600' : 'text-slate-400'}`} />
                <div>
                  <div className="font-bold text-xs">Admin</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Platform Control</div>
                </div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                First Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="John"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : `Register as ${role}`}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-5">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
