import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CalendarProvider } from "./context/CalendarContext";
import { RoleGuard } from "./components/auth/RoleGuard";

// Pages & Components
import TestCalendar from "./pages/TestCalendar";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { EntrepreneurDashboard } from "./pages/dashboard/EntrepreneurDashboard";
import { InvestorDashboard } from "./pages/dashboard/InvestorDashboard";
import { StartupDetail } from "./pages/dashboard/StartupDetail"; 
import { CreatePitch } from "./pages/dashboard/CreatePitch"; 
import { EntrepreneurProfile } from "./pages/profile/EntrepreneurProfile";
import { InvestorProfile } from "./pages/profile/InvestorProfile";
import { InvestorsPage } from "./pages/investors/InvestorsPage";
import { EntrepreneursPage } from "./pages/entrepreneurs/EntrepreneursPage";
import { MessagesPage } from "./pages/messages/MessagesPage";
import { NotificationsPage } from "./pages/notifications/NotificationsPage";
import { DocumentsPage } from "./pages/documents/DocumentsPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { HelpPage } from "./pages/help/HelpPage";
import { DealsPage } from "./pages/deals/DealsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { VideoCallPage } from "./pages/VideoCallPage";
import { ChatPage } from "./pages/chat/ChatPage";


const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'investor' ? "/dashboard/investor" : "/dashboard/entrepreneur"} replace />;
  }
  
  return <>{children}</>;
};

const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Navigate to={user?.role === 'investor' ? "/dashboard/investor" : "/dashboard/entrepreneur"} replace />;
};

function App() {
  return (
    <AuthProvider>
      <CalendarProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
           
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              } 
            />

            {/* 2. Standalone Protected Routes */}
            <Route 
              path="/video-call" 
              element={
                <RoleGuard allowedRoles={['entrepreneur', 'investor']}>
                  <VideoCallPage />
                </RoleGuard>
              } 
            />
            
            {/* 3. Main Dashboard Layout (Nested Routes) */}
            <Route path="/" element={<DashboardLayout />}>
              {/* Intelligent Home Redirect */}
              <Route index element={<RootRedirect />} />
            
              {/* Entrepreneur Specific */}
              <Route path="dashboard/entrepreneur">
                <Route 
                  index 
                  element={
                    <RoleGuard allowedRoles={['entrepreneur']}>
                      <EntrepreneurDashboard />
                    </RoleGuard>
                  } 
                />
                
                <Route 
                  path="create-pitch" 
                  element={
                    <RoleGuard allowedRoles={['entrepreneur']}>
                      <CreatePitch />
                    </RoleGuard>
                  } 
                />
              </Route>

              <Route 
                path="investors" 
                element={
                  <RoleGuard allowedRoles={['entrepreneur']}>
                    <InvestorsPage />
                  </RoleGuard>
                } 
              />

              {/* Investor Specific */}
              <Route path="dashboard/investor">
                <Route 
                  index 
                  element={
                    <RoleGuard allowedRoles={['investor']}>
                      <InvestorDashboard />
                    </RoleGuard>
                  } 
                />
              
                <Route 
                  path="startup/:id" 
                  element={
                    <RoleGuard allowedRoles={['investor']}>
                      <StartupDetail />
                    </RoleGuard>
                  } 
                />
              </Route>

              <Route 
                path="entrepreneurs" 
                element={
                  <RoleGuard allowedRoles={['investor']}>
                    <EntrepreneursPage />
                  </RoleGuard>
                } 
              />
              
              <Route 
                path="deals" 
                element={
                  <RoleGuard allowedRoles={['investor', 'entrepreneur']}> 
                    <DealsPage />
                  </RoleGuard>
                } 
              />
              
              {/* Shared Protected Routes */}
              <Route path="schedule" element={<SchedulePage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="help" element={<HelpPage />} />
              
              <Route path="profile/calendar" element={<TestCalendar />} />
              <Route path="profile/entrepreneur/:id" element={<EntrepreneurProfile />} />
              <Route path="profile/investor/:id" element={<InvestorProfile />} />

              <Route path="chat" element={<ChatPage />} />
              <Route path="chat/:userId" element={<ChatPage />} />
            </Route>

            {/* 4. Catch-all: Redirect unknown paths to Root Logic */}
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </Router>
      </CalendarProvider>
    </AuthProvider>
  );
}

export default App;