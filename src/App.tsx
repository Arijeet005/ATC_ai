import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { InitialCaptureScreen } from './components/InitialCaptureScreen';
import { Dashboard } from './components/Dashboard';
import { CaptureScreen } from './components/CaptureScreen';
import { ScoreScreen } from './components/ScoreScreen';
import { RecordsScreen } from './components/RecordsScreen';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('initial-capture');
  const [analysisData, setAnalysisData] = useState(null);
  const [userName] = useState('Dr. Rajesh Kumar');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('initial-capture');
  };

  const handleNavigation = (screen: string, data?: any) => {
    setCurrentScreen(screen);
    if (data) {
      setAnalysisData(data);
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  switch (currentScreen) {
    case 'initial-capture':
      return <InitialCaptureScreen onNavigate={handleNavigation} userName={userName} />;
    case 'dashboard':
      return <Dashboard onNavigate={handleNavigation} userName={userName} />;
    case 'capture':
      return <CaptureScreen onNavigate={handleNavigation} />;
    case 'score':
      return <ScoreScreen onNavigate={handleNavigation} analysisData={analysisData} />;
    case 'records':
      return <RecordsScreen onNavigate={handleNavigation} />;
    case 'settings':
      return <SettingsScreen onNavigate={handleNavigation} />;
    case 'sync':
      // For now, redirect to dashboard with sync message
      setTimeout(() => handleNavigation('dashboard'), 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-green-800">Syncing with BPA System...</p>
          </div>
        </div>
      );
    default:
      return <InitialCaptureScreen onNavigate={handleNavigation} userName={userName} />;
  }
}