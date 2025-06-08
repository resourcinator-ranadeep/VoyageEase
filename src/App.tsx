import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import UserDashboard from './pages/dashboards/UserDashboard';
import DriverDashboard from './pages/dashboards/DriverDashboard';
import AgencyDashboard from './pages/dashboards/AgencyDashboard';
import BusOperatorDashboard from './pages/dashboards/BusOperatorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import BookingPage from './pages/BookingPage';
import RideRequestPage from './pages/RideRequestPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import ForumPage from './pages/ForumPage';
import SecretAdminSignup from './pages/auth/SecretAdminSignup';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to={getDashboardRoute(user.role)} replace /> : <SignupPage />} />
      <Route path="/secret-admin-portal-xyz123" element={<SecretAdminSignup />} />
      
      <Route 
        path="/dashboard/user" 
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/driver" 
        element={
          <ProtectedRoute allowedRoles={['driver']}>
            <DriverDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/agency" 
        element={
          <ProtectedRoute allowedRoles={['tour_agency']}>
            <AgencyDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/bus-operator" 
        element={
          <ProtectedRoute allowedRoles={['bus_operator']}>
            <BusOperatorDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/admin" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/booking" 
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <BookingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ride-request" 
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <RideRequestPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/chat/:chatId" 
        element={
          <ProtectedRoute allowedRoles={['user', 'driver']}>
            <ChatPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute allowedRoles={['user', 'driver', 'tour_agency', 'bus_operator', 'admin']}>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/forum" 
        element={<ForumPage />} 
      />
    </Routes>
  );
}

function getDashboardRoute(role: string): string {
  switch (role) {
    case 'user': return '/dashboard/user';
    case 'driver': return '/dashboard/driver';
    case 'tour_agency': return '/dashboard/agency';
    case 'bus_operator': return '/dashboard/bus-operator';
    case 'admin': return '/dashboard/admin';
    default: return '/';
  }
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="App">
            <AppRoutes />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;