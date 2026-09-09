import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types/auth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireRole?: Role;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireRole,
  redirectTo,
}: ProtectedRouteProps) {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-vault-cream flex flex-col items-center justify-center p-6 text-vault-dark select-none">
        <div className="w-10 h-10 border-4 border-vault-dark/20 border-t-vault-green rounded-full animate-spin mb-4" />
        <span className="font-serif italic text-2xl text-vault-dark tracking-tight">
          Verifying Vault Access...
        </span>
        <span className="font-mono text-xs text-vault-dark/60 uppercase tracking-widest mt-1">
          Prompt Vault Security
        </span>
      </div>
    );
  }

  // If unauthenticated, redirect to Sign In with return location state
  if (!session) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If a specific role is required (e.g. 'admin') and profile.role doesn't match, redirect to dashboard or fallback
  if (requireRole && profile?.role !== requireRole) {
    return <Navigate to={redirectTo || '/dashboard'} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
