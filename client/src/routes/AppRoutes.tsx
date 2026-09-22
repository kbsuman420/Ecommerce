import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/customer/HomePage';
import { CartPage } from '../pages/customer/CartPage';
import { WishlistPage } from '../pages/customer/WishlistPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { SellerDashboard } from '../pages/seller/SellerDashboard';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public & Customer Storefront Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Seller Panel (Restricted to SELLER or ADMIN) */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={['SELLER', 'ADMIN']}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Panel (Restricted to ADMIN) */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
