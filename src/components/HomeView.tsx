import React from 'react';
import {
  Activity,
  Utensils,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Zap,
  Heart,
  Droplets,
  Moon,
  Clock,
  Compass,
} from 'lucide-react';
import { DisclaimerBanner } from './DisclaimerBanner';
import { BreathingWidget } from './BreathingWidget';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentTab, openAuthModal }) => {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border border-blue-100 p-8 sm:p-12 lg:p-16 shadow-xs">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 text-blue-800 text-xs font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-Powered Wellness for Students</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Your friendly <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">wellness companion</span>
          </h1>

          {/* Short Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Stay energized, focused, and healthy throughout your college journey. FitBuddy generates personalized micro-activities, balanced student meals, and mindful habits powered by Google Gemini.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02]"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentTab('login')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 shadow-xs transition-all hover:scale-[1.02]"
            >
              <span>Student Login / Sign In</span>
            </button>

            <button
              onClick={() => setCurrentTab('chat')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-700 font-semibold text-sm border border-blue-200 hover:bg-blue-50/80 shadow-xs transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Ask FitBuddy</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-6 grid grid-cols-3 gap-2 border-t border-slate-200/80 max-w-md mx-auto text-center text-xs text-slate-500">
            <div>
              <span className="block font-bold text-slate-900 text-sm">100% Safe</span>
              <span>Non-Extreme</span>
            </div>
            <div>
              <span className="block font-bold text-slate-900 text-sm">15–20 Min</span>
              <span>Dorm-Friendly</span>
            </div>
            <div>
              <span className="block font-bold text-slate-900 text-sm">Gemini AI</span>
              <span>Smart Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Designed for busy student life
          </h2>
          <p className="text-sm text-slate-500">
            Smart tools tailored to campus schedules, hostel cooking, and long library study sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Activity Planner */}
          <div
            onClick={() => setCurrentTab('workout')}
            className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Activity className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Activity Planner
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Tailored 10 to 45-minute daily movement routines. Includes warm-up, mobility flow, and cool-down designed to undo desk hunch and fatigue.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>No gym or weights required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Posture & flexibility focused</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Safety reminders included</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Create workout routine</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: Meal Ideas */}
          <div
            onClick={() => setCurrentTab('meals')}
            className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Utensils className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Balanced Meal Ideas
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Nutritious, affordable, and practical meals for vegetarians, vegans, South Indian, or non-veg preferences. Zero restrictive diet stress.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Budget & dorm-friendly recipes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Brain food for exam stamina</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>No extreme calorie counting</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Explore student meals</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: AI Chat */}
          <div
            onClick={() => setCurrentTab('chat')}
            className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                <MessageSquare className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                  Gemini AI Chat
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Ask wellness questions anytime. Get instant guidance on healthy routines, desk stiffness relief, hydration habits, and study energy tips.
                </p>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Interactive conversational AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Encouraging & supportive tone</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Strict non-clinical safety guards</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 flex items-center text-xs font-semibold text-cyan-600 group-hover:translate-x-1 transition-transform">
              <span>Start chatting</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quick Breathing Feature */}
      <BreathingWidget />

      {/* Wellness Disclaimer Component */}
      <DisclaimerBanner />
    </div>
  );
};
