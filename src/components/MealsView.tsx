import React, { useState } from 'react';
import {
  Utensils,
  Sparkles,
  Droplets,
  Heart,
  RotateCcw,
  CheckCircle,
  Coffee,
  Sun,
  Cookie,
  Moon,
  Info,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DisclaimerBanner } from './DisclaimerBanner';

interface MealPlan {
  preference: string;
  breakfast: { name: string; description: string; studentTip: string };
  lunch: { name: string; description: string; studentTip: string };
  snack: { name: string; description: string; studentTip: string };
  dinner: { name: string; description: string; studentTip: string };
  hydrationTip: string;
  balancedDietNote: string;
}

export const MealsView: React.FC = () => {
  const { profile } = useAuth();

  const [foodPreference, setFoodPreference] = useState(
    profile.foodPreference || 'Vegetarian'
  );
  const [dietaryNotes, setDietaryNotes] = useState('Affordable dorm/campus ingredients');
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState<MealPlan | null>(null);

  const preferenceOptions = [
    'No preference',
    'Vegetarian',
    'Non-vegetarian',
    'Vegan',
    'South Indian',
  ];

  const handleGenerateMeals = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodPreference,
          dietaryNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate meals.');
      }

      const data: MealPlan = await response.json();
      setMeals(data);
    } catch (err: any) {
      console.error(err);
      // Fallback balanced suggestions based on preference
      setMeals({
        preference: foodPreference,
        breakfast: {
          name: foodPreference === 'South Indian' ? 'Idli & Sambar with Coconut Chutney' : 'Wholesome Oatmeal or Veggie Poha Bowl',
          description: foodPreference === 'South Indian' 
            ? 'Steamed fermented rice-lentil idlis served with protein-rich dal sambar and fresh chutney.' 
            : 'Warm rolled oats or tempered flattened rice with peanuts, vegetables, and lemon juice.',
          studentTip: 'Easily digestible and provides sustained slow-burning carbs for morning lectures.',
        },
        lunch: {
          name: foodPreference === 'South Indian' ? 'Rice, Rasam, Beetroot Poriyal & Curd' : 'Balanced Grain Bowl with Dal, Paneer/Egg & Steamed Veggies',
          description: 'A comforting, complete lunch plate combining fiber, plant proteins, and probiotic curd/yogurt.',
          studentTip: 'Pack in a lunchbox or grab at the campus mess/canteen without post-meal drowsiness.',
        },
        snack: {
          name: 'Roasted Makhana (Fox Nuts) / Spiced Trail Mix',
          description: 'Crunchy, lightly roasted fox nuts or mixed pumpkin seeds and almonds seasoned with chaat masala.',
          studentTip: 'Perfect to keep in a backpack for mid-afternoon library cravings.',
        },
        dinner: {
          name: foodPreference === 'South Indian' ? 'Warm Dosa or Ragi Dosa with Vegetable Kootu' : 'Whole Wheat Rotis with Mixed Lentil Stew & Sautéed Greens',
          description: 'A warming, light evening meal that promotes restful sleep and steady overnight recovery.',
          studentTip: 'Finish dinner 2 hours before bed for optimal digestion and deep sleep.',
        },
        hydrationTip: 'Aim for 7–8 glasses (2.5L) of water. Sip warm water or herbal infusion in the evening.',
        balancedDietNote: 'FitBuddy emphasizes nourishing variety, steady energy, and positive food relationships. No restrictive calorie deprivation.',
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
            <Utensils className="w-6 h-6 text-indigo-600" />
            <span>Balanced Meal Ideas</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Practical, wholesome, student-friendly nutrition powered by Google Gemini.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Non-Restrictive Nutrition</span>
        </div>
      </div>

      {/* Preference Form */}
      <form onSubmit={handleGenerateMeals} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Food Preference
            </label>
            <select
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            >
              {preferenceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Campus / Kitchen Setup
            </label>
            <input
              type="text"
              placeholder="e.g. Campus mess, hostel kettle, shared dorm kitchen"
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>FitBuddy does NOT promote fasting, calorie counting, or extreme diets.</span>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all disabled:opacity-50"
          >
            {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Curating Balanced Meals...' : 'Generate Balanced Meal Ideas'}</span>
          </button>
        </div>
      </form>

      {/* Generated Meal Ideas */}
      {meals && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-100 border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                Personalized Meal Plan
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Balanced Ideas for {meals.preference}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-900 bg-white/70 px-3 py-1.5 rounded-xl border border-blue-200">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>{meals.hydrationTip}</span>
            </div>
          </div>

          {/* 4 Cards: Breakfast, Lunch, Snack, Dinner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Breakfast */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Sun className="w-4 h-4" />
                  </div>
                  <span>Energizing Breakfast</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{meals.breakfast.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{meals.breakfast.description}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                💡 <strong>Student Tip:</strong> {meals.breakfast.studentTip}
              </div>
            </div>

            {/* Lunch */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <span>Nourishing Lunch</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{meals.lunch.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{meals.lunch.description}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                💡 <strong>Student Tip:</strong> {meals.lunch.studentTip}
              </div>
            </div>

            {/* Snack */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Cookie className="w-4 h-4" />
                  </div>
                  <span>Focus Study Snack</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{meals.snack.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{meals.snack.description}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                💡 <strong>Student Tip:</strong> {meals.snack.studentTip}
              </div>
            </div>

            {/* Dinner */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Moon className="w-4 h-4" />
                  </div>
                  <span>Restful Evening Dinner</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{meals.dinner.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{meals.dinner.description}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                💡 <strong>Student Tip:</strong> {meals.dinner.studentTip}
              </div>
            </div>
          </div>

          {/* Balanced Diet Reminder */}
          {meals.balancedDietNote && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-3 shadow-xs">
              <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">FitBuddy Nutritional Philosophy: </strong>
                {meals.balancedDietNote}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Wellness Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
