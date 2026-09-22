import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockUsers, mockProducts } from '../../services/mockData';
import type { User, UserRole } from '../../types/auth';
import type { Product } from '../../types/product';
import {
  ShieldCheck,
  Users,
  DollarSign,
  PackageCheck,
  CheckCircle,
  XCircle,
  Store,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [usersList, setUsersList] = useState<User[]>(Object.values(mockUsers));
  const [productsList, setProductsList] = useState<Product[]>(mockProducts);

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    setUsersList(
      usersList.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleStatusChange = (
    productId: number,
    newStatus: 'APPROVED' | 'REJECTED' | 'PUBLISHED'
  ) => {
    setProductsList(
      productsList.map((p) =>
        p.id === productId ? { ...p, status: newStatus } : p
      )
    );
  };

  return (
    <div className="space-y-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Platform Admin Governance
          </span>
          <h1 className="text-2xl font-black mt-1">Super Admin Console</h1>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as {user?.fname} ({user?.email}). Manage user roles, approve marketplace products, and view platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-200">
          <Sparkles className="w-4 h-4 text-purple-400" /> Platform Status: Healthy
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Platform Users</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">1,420</p>
          <span className="text-[11px] text-slate-400 mt-1 block">3 Active Roles</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Platform GMV</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">$84,920.00</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            +22.4% vs last quarter
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Vendors</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">48</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Verified merchant stores</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Products</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{productsList.length}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">In catalog database</span>
        </div>
      </div>

      {/* 1. User Management & Role Control */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">User Role Management</h2>
          <p className="text-xs text-slate-500">
            Promote or reassign registered users across CUSTOMER, SELLER, and ADMIN permissions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Current Role</th>
                <th className="py-3 px-4 text-right">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                        {u.fname[0]}
                      </div>
                      <span className="font-bold text-slate-900">
                        {u.fname} {u.lname || ''}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">{u.email}</td>
                  <td className="py-3 px-4">{u.phoneNo || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${
                        u.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-700'
                          : u.role === 'SELLER'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        handleRoleChange(u.id, e.target.value as UserRole)
                      }
                      className="bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="SELLER">Seller</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Product Moderation & Governance */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Product Moderation & Approval</h2>
          <p className="text-xs text-slate-500">
            Review vendor catalog listings before or after publishing to maintain quality
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {productsList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 line-clamp-1 max-w-xs">
                          {p.title}
                        </span>
                        <span className="text-[11px] text-slate-400">{p.categoryName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{p.sellerName}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">${p.price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.status === 'PUBLISHED' || p.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleStatusChange(p.id, 'APPROVED')}
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition"
                        title="Approve Listing"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(p.id, 'REJECTED')}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition"
                        title="Reject Listing"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
