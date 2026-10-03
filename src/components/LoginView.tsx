import React, { useState } from 'react';
import { LogIn, Lock, Mail, AlertCircle, CheckCircle, ArrowRight, UserPlus, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginViewProps {
  setCurrentTab: (tab: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ setCurrentTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { login, user, logout } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => {
        setCurrentTab('dashboard');
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login('alex.student@campus.edu', 'fitbuddy123');
      setSuccess(true);
      setTimeout(() => {
        setCurrentTab('dashboard');
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-10 space-y-6">
      {/* If already logged in, show status & option to switch account */}
      {user && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between shadow-xs">
          <div>
            <p className="font-semibold text-sm text-blue-950">Currently signed in as:</p>
            <p className="text-blue-700">{user.email || user.displayName}</p>
          </div>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-rose-600 font-semibold hover:bg-rose-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 shadow-xs mb-1">
            <LogIn className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Student Login</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Sign in with Firebase Authentication to access your wellness dashboard.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800 animate-in fade-in duration-200">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Login successful! Opening your student dashboard...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Student Email</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. student@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Login to FitBuddy'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Student Sign-In */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-medium uppercase">Or Instant Access</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 text-blue-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>1-Click Demo Student Sign-In (Alex Rivera)</span>
          </button>
        </div>

        {/* Toggle to Register */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Don't have an account yet? </span>
          <button
            type="button"
            onClick={() => setCurrentTab('register')}
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};
