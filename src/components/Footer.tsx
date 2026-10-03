import React from 'react';
import { Activity, ShieldCheck, Heart, Github, GraduationCap } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openPresentationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openPresentationModal }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 pt-10 pb-8 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-bold text-lg text-slate-900">FitBuddy</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                AI Assistant
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Your friendly student wellness companion. Powered by Google Gemini AI, Firebase Auth & Firestore, engineered to support healthy study habits, active breaks, and wholesome nourishment.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={openPresentationModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>College Project Report & Viva Q&A</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-xs uppercase tracking-wider text-slate-900 mb-3">
              Application Modules
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentTab('home')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('chat')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Gemini AI Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('workout')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Activity Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('meals')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Balanced Meal Ideas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('progress')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Progress Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack & Standards */}
          <div>
            <h5 className="font-semibold text-xs uppercase tracking-wider text-slate-900 mb-3">
              Technical Stack
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>• Google Gemini AI SDK</li>
              <li>• Python Flask / Express API</li>
              <li>• Firebase Authentication</li>
              <li>• Google Cloud Firestore</li>
              <li>• Google Cloud Run Ready</li>
              <li>• Tailwind CSS Design System</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FitBuddy – AI Fitness & Wellness Assistant for Students.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with care for healthy students everywhere</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
