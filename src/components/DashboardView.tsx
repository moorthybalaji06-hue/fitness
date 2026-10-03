import React from 'react';
import {
  Activity,
  Utensils,
  MessageSquare,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Droplets,
  Moon,
  Eye,
  HeartPulse,
  Award,
  Calendar,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BreathingWidget } from './BreathingWidget';
import { DisclaimerBanner } from './DisclaimerBanner';

interface DashboardViewProps {
  setCurrentTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setCurrentTab }) => {
  const { profile, dailyCompleted, toggleActivity, weeklyProgress } = useAuth();

  const habits = [
    {
      id: 'hydration',
      title: '7-8 Glasses of Water',
      desc: 'Drink water between lectures & study blocks',
      icon: Droplets,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'movement',
      title: '15-20 Min Movement',
      desc: 'Brisk walk, posture flow or bodyweight mobility',
      icon: Activity,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'screen_break',
      title: '20-20-20 Eye Breaks',
      desc: 'Look 20 feet away every 20 minutes of study',
      icon: Eye,
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      id: 'healthy_meal',
      title: 'Balanced Nourishing Meal',
      desc: 'Wholesome breakfast or lunch with veggies & protein',
      icon: Utensils,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'mindfulness',
      title: '3-Min Mindful Breathing',
      desc: 'Slow deep breaths to reduce exam and study tension',
      icon: HeartPulse,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      id: 'sleep_routine',
      title: 'Wind Down for 7-8h Sleep',
      desc: 'Keep sleep schedule consistent to retain knowledge',
      icon: Moon,
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

  const completedCount = dailyCompleted.length;
  const progressPercent = Math.min(100, Math.round((completedCount / habits.length) * 100));

  return (
    <div className="space-y-8 py-4">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Good day, {profile.name || 'Student'}!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready for your daily wellness boost?
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Your goal: <strong className="text-white">{profile.goal}</strong> • Available time today: <strong className="text-white">{profile.availableTime} mins</strong>. Take small sustainable steps!
            </p>
          </div>

          {/* Quick Circular / Progress Metric */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="transparent" />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="#ffffff"
                  strokeWidth="6"
                  strokeDasharray="163"
                  strokeDashoffset={163 - (163 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <span className="absolute text-sm font-bold text-white">{progressPercent}%</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-blue-200 font-semibold">Today's Habits</span>
              <span className="text-lg font-extrabold text-white">{completedCount} of {habits.length}</span>
              <span className="block text-[11px] text-blue-200">
                {progressPercent === 100 ? 'All habits completed! 🎉' : 'Keep going!'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature Action Cards (Activity, Meals, Chat) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Activity Planner Card */}
        <div
          onClick={() => setCurrentTab('workout')}
          className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Activity className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Module 1</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Activity Planner
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Generate an energizing {profile.availableTime}-min routine with warm-up, main exercise, and posture cool-down.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Generate workout routine</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Meal Ideas Card */}
        <div
          onClick={() => setCurrentTab('meals')}
          className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-indigo-400 transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Utensils className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Module 2</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Meal Ideas ({profile.foodPreference})
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Balanced, affordable recipes with wholesome breakfast, lunch, study snack & dinner suggestions.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
            <span>Explore balanced meals</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>

        {/* Gemini AI Chat Card */}
        <div
          onClick={() => setCurrentTab('chat')}
          className="group cursor-pointer rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-cyan-400 transition-all flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <MessageSquare className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600">Module 3</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                Gemini AI Chat
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ask about exam stress, desk stretches, sleep hygiene, or ask for a quick morning energizer routine.
              </p>
            </div>
          </div>
          <div className="pt-4 flex items-center text-xs font-semibold text-cyan-600 group-hover:translate-x-1 transition-transform">
            <span>Ask FitBuddy now</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>

      {/* Two Column Section: Daily Habits Checklist & Weekly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Checklist (2 columns on wide) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span>Today's Wellness Checklist</span>
              </h3>
              <p className="text-xs text-slate-500">
                Tap each habit as you complete it. Synced to your student profile!
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {habits.map((habit) => {
              const isDone = dailyCompleted.includes(habit.id);
              const Icon = habit.icon;
              return (
                <div
                  key={habit.id}
                  onClick={() => toggleActivity(habit.id)}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all flex items-start gap-3 select-none ${
                    isDone
                      ? 'bg-blue-50/60 border-blue-200'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="pt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <h4 className={`text-xs font-bold ${isDone ? 'text-blue-900 line-through' : 'text-slate-900'}`}>
                      {habit.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug">{habit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Progress Section */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Weekly Consistency</span>
              </h3>
              <span className="text-xs font-medium text-slate-500">Past 7 Days</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Building small daily habits creates long-term resilience and stamina.
            </p>

            {/* Weekly Bars */}
            <div className="pt-6 grid grid-cols-7 gap-2 items-end h-36">
              {weeklyProgress.map((item, idx) => {
                const isToday = idx === weeklyProgress.length - 1;
                return (
                  <div key={item.date} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] text-slate-400 font-semibold">{item.percentage}%</span>
                    <div className="w-full bg-slate-100 rounded-t-md h-24 relative flex items-end overflow-hidden">
                      <div
                        style={{ height: `${Math.max(12, item.percentage)}%` }}
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          isToday
                            ? 'bg-blue-600'
                            : item.percentage >= 80
                            ? 'bg-emerald-500'
                            : 'bg-indigo-400'
                        }`}
                      />
                    </div>
                    <span className={`text-[11px] font-bold ${isToday ? 'text-blue-600' : 'text-slate-600'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">7-Day Habit Average:</span>
            <span className="font-bold text-slate-900">
              {Math.round(
                weeklyProgress.reduce((acc, curr) => acc + curr.percentage, 0) /
                  weeklyProgress.length
              )}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Breathing Widget & Medical Disclaimer */}
      <BreathingWidget />
      <DisclaimerBanner compact />
    </div>
  );
};
