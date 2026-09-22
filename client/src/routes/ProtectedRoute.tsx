import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, isLoading, quickSwitchRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border border-rose-200 rounded-3xl p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Access Restricted</h2>
        <p className="text-xs text-slate-500 mt-2">
          Your current role is <strong className="text-slate-800 uppercase font-mono">{user.role}</strong>. This section requires <strong>{allowedRoles.join(' or ')}</strong> access.
        </p>

        {/* Quick Switch Helper */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
          <p className="text-[11px] text-slate-400">For demo/learning purposes, switch your role below:</p>
          <div className="flex gap-2 justify-center">
            {allowedRoles.map((r) => (
              <button
                key={r}
                onClick={() => quickSwitchRole(r)}
                className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800"
              >
                Switch to {r}
              </button>
            ))}
          </div>
        </div>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};
