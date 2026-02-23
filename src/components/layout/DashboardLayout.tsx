import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <img src="/logo.svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6" alt="Loading..." />
        </div>
        <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">
          Nexus Secure Sync...
        </p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Security route protection
  if (location.pathname.includes('/dashboard/investor') && user?.role !== 'investor') {
    return <Navigate to="/dashboard/entrepreneur" replace />;
  }
  if (location.pathname.includes('/dashboard/entrepreneur') && user?.role !== 'entrepreneur') {
    return <Navigate to="/dashboard/investor" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Global Navbar at the very top */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar without logo */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};