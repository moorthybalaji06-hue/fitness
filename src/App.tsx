/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { ChatbotView } from './components/ChatbotView';
import { WorkoutView } from './components/WorkoutView';
import { MealsView } from './components/MealsView';
import { ProgressView } from './components/ProgressView';
import { ProfileView } from './components/ProfileView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';
import { AuthModal } from './components/AuthModal';
import { PresentationModal } from './components/PresentationModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const openAuth = (mode: 'login' | 'register') => {
    setCurrentTab(mode);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900 font-sans">
        {/* Navigation Bar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          openAuthModal={openAuth}
          openPresentationModal={() => setIsPresentationOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {currentTab === 'home' && (
            <HomeView
              setCurrentTab={setCurrentTab}
              openAuthModal={openAuth}
            />
          )}

          {currentTab === 'login' && (
            <LoginView
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'register' && (
            <RegisterView
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardView
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'chat' && (
            <ChatbotView />
          )}

          {currentTab === 'workout' && (
            <WorkoutView />
          )}

          {currentTab === 'meals' && (
            <MealsView />
          )}

          {currentTab === 'progress' && (
            <ProgressView />
          )}

          {currentTab === 'profile' && (
            <ProfileView />
          )}
        </main>

        {/* Footer */}
        <Footer
          setCurrentTab={setCurrentTab}
          openPresentationModal={() => setIsPresentationOpen(true)}
        />

        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
        />

        {/* Project Presentation & Viva Modal */}
        <PresentationModal
          isOpen={isPresentationOpen}
          onClose={() => setIsPresentationOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
