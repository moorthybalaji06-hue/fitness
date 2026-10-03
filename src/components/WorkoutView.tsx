import React, { useState } from 'react';
import {
  Activity,
  Clock,
  Target,
  Sparkles,
  ShieldAlert,
  Flame,
  CheckCircle,
  AlertTriangle,
  PlayCircle,
  RotateCcw,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from './DisclaimerBanner';

interface WorkoutPlan {
  title: string;
  warmUp: string[];
  mainActivity: string[];
  coolDown: string[];
  safetyReminders: string[];
  advice: string;
}

export const WorkoutView: React.FC = () => {
  const { profile } = useAuth();

  const [goal, setGoal] = useState(profile.goal || 'General fitness');
  const [availableTime, setAvailableTime] = useState(profile.availableTime || '20');
  const [experienceLevel, setExperienceLevel] = useState(profile.activityLevel || 'Beginner');
  const [userContext, setUserContext] = useState('Study break / Dorm room friendly');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  const goalOptions = [
    'General fitness',
    'Daily movement',
    'Mobility and flexibility',
    'Relaxation/light activity',
    'Desk posture reset',
  ];

  const timeOptions = ['10', '15', '20', '30', '45'];
  const levelOptions = ['Beginner', 'Intermediate', 'Gentle / Recovering'];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          availableTime,
          experienceLevel,
          userContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate workout plan from server.');
      }

      const data: WorkoutPlan = await response.json();
      setPlan(data);
    } catch (err: any) {
      console.error(err);
      setError('Could not reach Gemini service. Showing default balanced student routine.');
      // Safe default fallback
      setPlan({
        title: `${goal} Routine (${availableTime} Mins)`,
        warmUp: [
          '2 mins Arm circles & gentle neck rolls (release study tension)',
          '3 mins Standing torso twists and dynamic hip openers',
        ],
        mainActivity: [
          '4 mins Bodyweight air squats (focus on slow, controlled tempo)',
          '4 mins Incline desk push-ups or floor knee push-ups',
          '4 mins Alternating reverse lunges or brisk marching in place',
          '3 mins Forearm plank or bird-dog core stabilization',
        ],
        coolDown: [
          '3 mins Standing quad and hamstring gentle stretch',
          '2 mins Child pose & slow diaphragmatic breathing',
        ],
        safetyReminders: [
          'Never push through sharp or unnatural pain.',
          'Take gentle sips of water whenever thirsty.',
          'Form and consistency are far more important than speed or reps.',
        ],
        advice: 'Taking a 15–20 minute movement break resets cognitive fatigue and enhances focus for your next study block!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-blue-600" />
            <span>Activity Planner</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalized, non-extreme student movement sessions powered by Gemini.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Gemini GenAI Powered</span>
        </div>
      </div>

      {/* Input Form Card */}
      <form onSubmit={handleGenerate} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Goal */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Wellness Goal</span>
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {goalOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Available Time */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Available Time</span>
            </label>
            <select
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t} Minutes
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Experience Level</span>
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {levelOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Setting/Context */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Setting / Notes (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Small dorm room, quiet study break, no equipment"
            value={userContext}
            onChange={(e) => setUserContext(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            FitBuddy strictly avoids extreme exercise routines or unsafe weight-loss targets.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            {loading ? (
              <RotateCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{loading ? 'Generating Routine...' : 'Generate Activity Plan'}</span>
          </button>
        </div>
      </form>

      {/* Generated Routine Display */}
      {plan && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
                  Custom Student Session
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5">
                  {plan.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-xs text-xs font-semibold text-white">
                <Clock className="w-4 h-4 text-blue-200" />
                <span>{availableTime} mins total</span>
              </div>
            </div>
            {plan.advice && (
              <p className="text-blue-100 text-xs sm:text-sm mt-3 leading-relaxed border-t border-white/20 pt-3">
                💡 <strong>Coach Note:</strong> {plan.advice}
              </p>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Section 1: Warm-up */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <h4>Warm-Up (Mobility & Joint Prep)</h4>
              </div>
              <div className="grid grid-cols-1 gap-2 pl-8">
                {plan.warmUp.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs sm:text-sm text-slate-800">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Main Activity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <h4>Main Activity (Movement & Tone)</h4>
              </div>
              <div className="grid grid-cols-1 gap-2 pl-8">
                {plan.mainActivity.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-xs sm:text-sm text-slate-800">
                    <Flame className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Cool-Down */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <h4>Cool-Down & Posture Decompression</h4>
              </div>
              <div className="grid grid-cols-1 gap-2 pl-8">
                {plan.coolDown.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-200/60 text-xs sm:text-sm text-slate-800">
                    <Heart className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Reminders */}
            {plan.safetyReminders && plan.safetyReminders.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Safety & Health Reminders:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {plan.safetyReminders.map((rem, idx) => (
                    <li key={idx}>{rem}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Medical Safety Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
