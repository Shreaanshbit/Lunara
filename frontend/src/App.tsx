/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavPath, MoodLog, SymptomLog } from './types';
import { INITIAL_MOOD, INITIAL_SYMPTOMS } from './data/mockData';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { LunaraAIView } from './views/LunaraAIView';
import { MyCycleView } from './views/MyCycleView';
import { InsightsView } from './views/InsightsView';
import { MoodView } from './views/MoodView';
import { SymptomsView } from './views/SymptomsView';
import { ProfileSettingsView } from './views/ProfileSettingsView';
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { SignUpView } from './views/SignUpView';
import { LogMoodModal } from './components/modals/LogMoodModal';
import { LogSymptomsModal } from './components/modals/LogSymptomsModal';
import { PeriodStartedModal } from './components/modals/PeriodStartedModal';
import { DownloadModal } from './components/modals/DownloadModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<NavPath>('dashboard');
  const [currentMood, setCurrentMood] = useState<MoodLog>(INITIAL_MOOD);
  const [symptoms, setSymptoms] = useState<SymptomLog[]>(INITIAL_SYMPTOMS);

  // Modals state
  const [isLogMoodOpen, setIsLogMoodOpen] = useState(false);
  const [isLogSymptomsOpen, setIsLogSymptomsOpen] = useState(false);
  const [isPeriodStartedOpen, setIsPeriodStartedOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Handlers
  const handleAddSymptom = (newSymptom: SymptomLog) => {
    setSymptoms((prev) => [newSymptom, ...prev]);
  };

  const handlePeriodStarted = (startDate: string, intensity: string) => {
    // Add period started indicator
    const periodSymptom: SymptomLog = {
      id: `s-period-${Date.now()}`,
      name: `Menstrual Flow (${intensity})`,
      category: 'physical',
      severity: 6,
      severityLabel: `Day 1 · ${intensity}`,
      timeLogged: 'Today, Just now',
      color: '#8e4647',
    };
    setSymptoms((prev) => [periodSymptom, ...prev]);
  };

  // Full-bleed views (Landing, Sign-in, Sign-up)
  if (currentPath === 'landing') {
    return (
      <>
        <LandingView 
          onNavigate={setCurrentPath} 
          onOpenDownload={() => setIsDownloadOpen(true)}
        />
        <DownloadModal
          isOpen={isDownloadOpen}
          onClose={() => setIsDownloadOpen(false)}
        />
      </>
    );
  }

  if (currentPath === 'login') {
    return (
      <LoginView
        onNavigate={setCurrentPath}
        onLoginSuccess={() => setCurrentPath('dashboard')}
      />
    );
  }

  if (currentPath === 'signup') {
    return (
      <SignUpView
        onNavigate={setCurrentPath}
        onSignUpSuccess={() => setCurrentPath('dashboard')}
      />
    );
  }

  // Dashboard & Sanctuary Workspace Shell
  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* Side and Bottom Navigation */}
      <Navigation 
        currentPath={currentPath} 
        onNavigate={setCurrentPath} 
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Main Content Area */}
      <div className="md:pl-72">
        <Header 
          currentPath={currentPath} 
          onNavigate={setCurrentPath} 
          onOpenDownload={() => setIsDownloadOpen(true)}
        />

        <main className="relative pt-16 bg-background min-h-screen pb-20 md:pb-0">
          {currentPath === 'dashboard' && (
            <DashboardView
              onNavigate={setCurrentPath}
              onOpenLogMood={() => setIsLogMoodOpen(true)}
              onOpenLogSymptoms={() => setIsLogSymptomsOpen(true)}
              currentMood={currentMood}
              symptoms={symptoms}
            />
          )}

          {currentPath === 'my-cycle' && (
            <MyCycleView
              onNavigate={setCurrentPath}
              onOpenLogSymptoms={() => setIsLogSymptomsOpen(true)}
              onOpenPeriodStarted={() => setIsPeriodStartedOpen(true)}
            />
          )}

          {currentPath === 'lunara-ai' && (
            <LunaraAIView
              onNavigate={setCurrentPath}
              onOpenLogSymptoms={() => setIsLogSymptomsOpen(true)}
              currentMood={currentMood}
              symptoms={symptoms}
            />
          )}

          {currentPath === 'insights' && (
            <InsightsView onNavigate={setCurrentPath} />
          )}

          {currentPath === 'mood' && (
            <MoodView
              onNavigate={setCurrentPath}
              currentMood={currentMood}
              onUpdateMood={setCurrentMood}
            />
          )}

          {currentPath === 'symptoms' && (
            <SymptomsView
              onNavigate={setCurrentPath}
              onOpenLogSymptoms={() => setIsLogSymptomsOpen(true)}
              symptoms={symptoms}
            />
          )}

          {currentPath === 'profile-settings' && (
            <ProfileSettingsView 
              onNavigate={setCurrentPath} 
              onOpenDownload={() => setIsDownloadOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Interactive Global Modals */}
      <LogMoodModal
        isOpen={isLogMoodOpen}
        onClose={() => setIsLogMoodOpen(false)}
        currentMood={currentMood}
        onSave={setCurrentMood}
      />

      <LogSymptomsModal
        isOpen={isLogSymptomsOpen}
        onClose={() => setIsLogSymptomsOpen(false)}
        onAddSymptom={handleAddSymptom}
      />

      <PeriodStartedModal
        isOpen={isPeriodStartedOpen}
        onClose={() => setIsPeriodStartedOpen(false)}
        onPeriodStarted={handlePeriodStarted}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>
  );
}
