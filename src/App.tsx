import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Auth/Login';
import { Dashboard } from './pages/Dashboard';
import { ChildAnalysis } from './pages/Analysis';
import { RegionalInsights } from './pages/Regional';
import { useStore } from './store/useStore';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useStore();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/analysis" 
          element={
            <ProtectedRoute>
              <ChildAnalysis />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/regional" 
          element={
            <ProtectedRoute>
              <RegionalInsights />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
