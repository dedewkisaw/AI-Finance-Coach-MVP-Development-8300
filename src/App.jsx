import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import { AuthProvider } from './contexts/AuthContext';
import { FinanceProvider } from './contexts/FinanceContext';
import questConfig from './config/questConfig';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import QuestOnboardingPage from './pages/QuestOnboardingPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import PremiumUpgrade from './pages/PremiumUpgrade';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FeedbackButton from './components/feedback/FeedbackButton';
import './App.css';

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <AuthProvider>
        <FinanceProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/quest-onboarding" element={
                  <ProtectedRoute>
                    <QuestOnboardingPage />
                  </ProtectedRoute>
                } />
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/premium" element={
                  <ProtectedRoute>
                    <PremiumUpgrade />
                  </ProtectedRoute>
                } />
              </Routes>
              
              {/* Global Feedback Button - Available on all pages */}
              <FeedbackButton />
              
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
        </FinanceProvider>
      </AuthProvider>
    </QuestProvider>
  );
}

export default App;