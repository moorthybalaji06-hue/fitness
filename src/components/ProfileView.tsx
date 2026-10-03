import React, { useState } from 'react';
import { User, Calendar, Target, Clock, Utensils, Award, Save, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, user, isConfiguredWithRealFirebase } = useAuth();

  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    age: profile.age || '20',
    goal: profile.goal || 'General fitness & daily movement',
    activityLevel: profile.activityLevel || 'Beginner',
    availableTime: profile.availableTime || '20',
    foodPreference: profile.foodPreference || 'Vegetarian',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const goalOptions = [
    'General fitness & daily movement',
    'Mobility & posture correction',
    'Stress relief & mental relaxation',
    'Gentle strength & stamina',
    'Light daily stretching',
  ];

  const activityLevelOptions = ['Beginner', 'Intermediate', 'Casual / Light'];

  const availableTimeOptions = ['10', '15', '20', '30', '45'];

  const foodPreferenceOptions = [
    'No preference',
    'Vegetarian',
    'Non-vegetarian',
    'Vegan',
    'South Indian',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      await updateProfile(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <User className="w-6 h-6 text-blue-600" />
            <span>Student Wellness Profile</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalize your parameters so Gemini can generate routines suited to your routine.
          </p>
        </div>

        {/* Database indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>Firestore Synced {isConfiguredWithRealFirebase ? '(Cloud)' : '(Local Cache)'}</span>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold">Profile saved to Firestore!</p>
            <p className="text-xs text-emerald-700">Your AI suggestions will automatically reflect these preferences.</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email (Readonly or editable) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <span>Student Email</span>
            </label>
            <input
              type="email"
              disabled
              value={formData.email}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Age (Years)</span>
            </label>
            <input
              type="number"
              min="16"
              max="99"
              required
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Current Activity Level</span>
            </label>
            <select
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {activityLevelOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Available Activity Time */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Available Daily Activity Time</span>
            </label>
            <select
              value={formData.availableTime}
              onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {availableTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time} Minutes per day
                </option>
              ))}
            </select>
          </div>

          {/* Food Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-blue-600" />
              <span>Food Preference</span>
            </label>
            <select
              value={formData.foodPreference}
              onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {foodPreferenceOptions.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Goal */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>Primary Wellness Goal</span>
          </label>
          <select
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            {goalOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1.5">
            FitBuddy focuses on functional mobility, alertness, and study vitality without stressful weight-loss pressures.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Profile to Firestore'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
