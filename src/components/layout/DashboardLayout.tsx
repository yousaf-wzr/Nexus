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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="relative group">
          {/* Animated indigo ring */}
          <div className="w-20 h-20 border-2 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <img 
            src="/logo.svg" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 transition-transform duration-500 group-hover:scale-110" 
            alt="Loading..." 
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">
            Nexus Secure Sync
          </p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role Protection Logic
  if (location.pathname.includes('/dashboard/investor') && user?.role !== 'investor') {
    return <Navigate to="/dashboard/entrepreneur" replace />;
  }
  if (location.pathname.includes('/dashboard/entrepreneur') && user?.role !== 'entrepreneur') {
    return <Navigate to="/dashboard/investor" replace />;
  }
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-8 bg-[#F8FAFC]">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};