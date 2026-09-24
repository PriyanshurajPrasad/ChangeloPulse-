import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import UserLayout from '../components/layout/UserLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Guards
import ProtectedRoute from './ProtectedRoute';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';

// Portal Gateway & Auth Pages
import PortalGateway from '../pages/auth/PortalGateway';
import UserLoginPage from '../pages/auth/UserLoginPage';
import UserRegisterPage from '../pages/auth/UserRegisterPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import AdminRegisterPage from '../pages/auth/AdminRegisterPage';
import AdminAccessPage from '../pages/auth/AdminAccessPage';

// Public/Changelog Pages
import ChangelogPage from '../pages/public/ChangelogPage';
import UpdateDetailPage from '../pages/public/UpdateDetailPage';

// User Panel Pages
import UserDashboard from '../pages/user/UserDashboard';
import UserProfilePage from '../pages/user/UserProfilePage';
import UserUpdatesPage from '../pages/user/UserUpdatesPage';
import UserFeedbackHistoryPage from '../pages/user/UserFeedbackHistoryPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUpdates from '../pages/admin/ManageUpdates';
import CreateUpdatePage from '../pages/admin/CreateUpdatePage';
import EditUpdatePage from '../pages/admin/EditUpdatePage';
import AdminStatisticsPage from '../pages/admin/AdminStatisticsPage';
import AdminFeedbackPage from '../pages/admin/AdminFeedbackPage';

// Error Pages
import NotFoundPage from '../pages/error/NotFoundPage';
import UnauthorizedPage from '../pages/error/UnauthorizedPage';

/**
 * Smart redirect component for generic /dashboard path
 */
function DashboardRedirect() {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/user/login" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/user/dashboard" replace />;
}

function ChangelogSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/user/changelog/${slug}`} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root User Entrance Page */}
      <Route path="/" element={<PortalGateway />} />

      {/* Smart /dashboard redirect */}
      <Route path="/dashboard" element={<DashboardRedirect />} />

      {/* Legacy Auth route redirects */}
      <Route path="/login" element={<Navigate to="/user/login" replace />} />
      <Route path="/register" element={<Navigate to="/user/register" replace />} />

      {/* Legacy public changelog URLs redirect to authenticated user routes */}
      <Route path="/changelog" element={<Navigate to="/user/changelog" replace />} />
      <Route path="/changelog/:slug" element={<ChangelogSlugRedirect />} />

      {/* Auth & Error Pages with standard PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/register" element={<AdminRegisterPage />} />
        <Route path="/admin/access" element={<AdminAccessPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/* User Panel Routes (Guarded by UserRoute) */}
      <Route
        path="/user/*"
        element={
          <UserRoute>
            <UserLayout />
          </UserRoute>
        }
      >
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="updates" element={<UserUpdatesPage />} />
        <Route path="feedback" element={<UserFeedbackHistoryPage />} />
        <Route path="changelog" element={<ChangelogPage />} />
        <Route path="changelog/:slug" element={<UpdateDetailPage />} />
      </Route>

      {/* Admin Portal Routes (Guarded by AdminRoute) */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="updates" element={<ManageUpdates />} />
        <Route path="feedback" element={<AdminFeedbackPage />} />
        <Route path="updates/new" element={<Navigate to="/admin/updates/create" replace />} />
        <Route path="updates/create" element={<CreateUpdatePage />} />
        <Route path="updates/:id/edit" element={<EditUpdatePage />} />
        <Route path="updates/edit/:id" element={<EditUpdatePage />} />
        <Route path="drafts" element={<ManageUpdates key="drafts" defaultStatus="draft" />} />
        <Route path="published" element={<ManageUpdates key="published" defaultStatus="published" />} />
        <Route path="archived" element={<ManageUpdates key="archived" defaultStatus="archived" />} />
        <Route path="statistics" element={<AdminStatisticsPage />} />
        <Route path="profile" element={<AdminDashboard />} />
      </Route>

      {/* Wildcard 404 Catch-All Route (Must be AT THE VERY END) */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
