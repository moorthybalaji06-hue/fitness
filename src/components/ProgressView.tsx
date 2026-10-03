import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  TrendingUp,
  Droplets,
  Moon,
  Activity,
  Eye,
  HeartPulse,
  Utensils,
  Award,
  Sparkles,
  Database,
  Calendar,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BreathingWidget } from './BreathingWidget';
import { DisclaimerBanner } from './DisclaimerBanner';

export const ProgressView: React.FC = () => {
  const { dailyCompleted, toggleActivity, weeklyProgress, profile, isConfiguredWithRealFirebase } =
    useAuth();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const habits = [
    {
      id: 'hydration',
      category: 'hydration',
      title: 'Optimal Hydration (2L Water)',
      description: 'Drink 7–8 glasses of water. Keep a water bottle at your study table to prevent dehydration-induced fatigue.',
      icon: Droplets,
      color: 'blue',
      tip: 'Drinking a cold glass of water immediately upon waking helps trigger alert state and kickstarts digestion.',
    },
    {
      id: 'movement',
      category: 'movement',
      title: 'Daily Movement (15-20 Min)',
      description: 'Engage in light cardio, walking, stretching, or bodyweight exercises to increase blood circulation to the brain.',
      icon: Activity,
      color: 'emerald',
      tip: 'Short bursts of movement promote brain-derived neurotrophic factor (BDNF), crucial for memory consolidation.',
    },
    {
      id: 'screen_break',
      category: 'screen',
      title: '20-20-20 Screen Breaks',
      description: 'Every 20 minutes of reading or screen work, shift gaze to an object 20 feet away for at least 20 seconds.',
      icon: Eye,
      color: 'cyan',
      tip: 'Relaxing ciliary eye muscles prevents tension headaches and dry eye syndrome caused by computer work.',
    },
    {
      id: 'healthy_meal',
      category: 'nutrition',
      title: 'Regular Nourishing Meals',
      description: 'Eat meals at regular timings without skipping. Emphasize colorful vegetables, whole grains, and protein.',
      icon: Utensils,
      color: 'amber',
      tip: 'Skipping meals causes severe glucose dips that lead to study brain fog and late-night junk food cravings.',
    },
    {
      id: 'mindfulness',
      category: 'relaxation',
      title: 'Mindful Relaxation & Breath',
      description: 'Dedicate 3–5 minutes to calm deep diaphragmatic breathing or quiet meditation away from your smartphone.',
      icon: HeartPulse,
      color: 'rose',
      tip: 'Box breathing (4s in, 4s hold, 4s out, 4s hold) immediately triggers parasympathetic vagal stimulation.',
    },
    {
      id: 'sleep_routine',
      category: 'sleep',
      title: 'Consistent Sleep (7–8 Hours)',
      description: 'Go to sleep and wake up around the same time. Dim blue lights 45 minutes before turning in.',
      icon: Moon,
      color: 'indigo',
      tip: 'Deep REM sleep consolidates complex notes and academic concepts studied during the day into long-term memory.',
    },
  ];

  const total = habits.length;
  const completed = dailyCompleted.length;
  const percentage = Math.min(100, Math.round((completed / total) * 100));

  const filteredHabits =
    activeCategory === 'all'
      ? habits
      : habits.filter((h) => h.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span>Progress & Daily Wellness Habits</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track daily completed activities and watch your weekly consistency grow.
          </p>
        </div>

        {/* Firestore Sync status badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>Synced to Firestore {isConfiguredWithRealFirebase ? '(Cloud)' : '(Local)'}</span>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1: Completion Percentage */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#2563eb"
                strokeWidth="6"
                strokeDasharray="163"
                strokeDashoffset={163 - (163 * percentage) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute text-sm font-bold text-slate-900">{percentage}%</span>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Rate</span>
            <h4 className="text-lg font-extrabold text-slate-900">{completed} / {total} Habits</h4>
            <p className="text-[11px] text-slate-500">
              {percentage >= 100 ? 'Incredible! All done today.' : `${total - completed} remaining today`}
            </p>
          </div>
        </div>

        {/* Metric 2: Weekly Average */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Weekly Score</span>
            <h4 className="text-lg font-extrabold text-slate-900">
              {Math.round(
                weeklyProgress.reduce((acc, curr) => acc + curr.percentage, 0) /
                  weeklyProgress.length
              )}%
            </h4>
            <p className="text-[11px] text-slate-500">Consistent student habit index</p>
          </div>
        </div>

        {/* Metric 3: Active Goal */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Focus</span>
            <h4 className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{profile.goal}</h4>
            <p className="text-[11px] text-slate-500">{profile.availableTime} mins planned daily</p>
          </div>
        </div>
      </div>

      {/* Weekly Progress Bar Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>7-Day Activity Progress History</span>
            </h3>
            <p className="text-xs text-slate-500">
              Every day recorded in the Firestore database: <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">progress/{'{userId}'}/dates/{'{date}'}</code>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 items-end pt-4 pb-2">
          {weeklyProgress.map((item, idx) => {
            const isToday = idx === weeklyProgress.length - 1;
            return (
              <div key={item.date} className="flex flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">{item.percentage}%</span>
                <div className="w-full bg-slate-100 rounded-lg h-28 flex items-end p-1">
                  <div
                    style={{ height: `${Math.max(15, item.percentage)}%` }}
                    className={`w-full rounded-md transition-all duration-500 ${
                      isToday
                        ? 'bg-blue-600 shadow-xs'
                        : item.percentage >= 80
                        ? 'bg-emerald-500'
                        : 'bg-indigo-400'
                    }`}
                  />
                </div>
                <div className="text-center">
                  <span className={`block text-xs font-bold ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                    {item.day}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.date.split('-').slice(1).join('/')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Completed Activities Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>Mark Today's Activities & Habits</span>
            </h3>
            <p className="text-xs text-slate-500">
              Click any habit to mark complete or incomplete. Stored in your student record.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHabits.map((habit) => {
            const isDone = dailyCompleted.includes(habit.id);
            const Icon = habit.icon;
            return (
              <div
                key={habit.id}
                onClick={() => toggleActivity(habit.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 select-none flex flex-col justify-between ${
                  isDone
                    ? 'bg-blue-50/70 border-blue-200 shadow-xs'
                    : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="pt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-sm font-bold ${isDone ? 'text-blue-900 line-through' : 'text-slate-900'}`}>
                      {habit.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{habit.description}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100/80 text-[11px] text-slate-500">
                  💡 <span className="font-semibold text-slate-700">Student Tip:</span> {habit.tip}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relax Breathing Widget */}
      <BreathingWidget />

      {/* Medical Safety Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
