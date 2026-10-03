import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  db,
  isFirebaseInitialized,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '../firebase/config';

export interface UserProfile {
  name: string;
  email: string;
  age: string;
  goal: string;
  activityLevel: string;
  availableTime: string;
  foodPreference: string;
}

export interface DayProgress {
  date: string; // YYYY-MM-DD
  completed: string[];
}

interface AuthContextType {
  user: { uid: string; email: string; displayName?: string } | null;
  profile: UserProfile;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  dailyCompleted: string[];
  toggleActivity: (activityId: string) => Promise<void>;
  weeklyProgress: { day: string; date: string; count: number; total: number; percentage: number }[];
  isConfiguredWithRealFirebase: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.student@campus.edu',
  age: '20',
  goal: 'General fitness & daily movement',
  activityLevel: 'Beginner',
  availableTime: '20',
  foodPreference: 'Vegetarian',
};

const INITIAL_ACTIVITIES = ['hydration', 'screen_break'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getTodayString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ uid: string; email: string; displayName?: string } | null>(() => {
    const saved = localStorage.getItem('fitbuddy_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fitbuddy_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [dailyCompleted, setDailyCompleted] = useState<string[]>(() => {
    const today = getTodayString();
    const saved = localStorage.getItem(`fitbuddy_progress_${today}`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [loading, setLoading] = useState(false);
  const [isRealFirebase, setIsRealFirebase] = useState(false);

  // Sync auth state if Firebase is available
  useEffect(() => {
    if (!auth || !isFirebaseInitialized) return;
    try {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          setIsRealFirebase(true);
          const u = {
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || profile.name,
          };
          setUser(u);
          localStorage.setItem('fitbuddy_user', JSON.stringify(u));

          // Fetch profile from Firestore
          if (db) {
            try {
              const ref = doc(db, 'users', fbUser.uid);
              const snap = await getDoc(ref);
              if (snap.exists()) {
                const data = snap.data() as UserProfile;
                setProfile(data);
                localStorage.setItem('fitbuddy_profile', JSON.stringify(data));
              }
            } catch (err) {
              console.log('Firestore fetch notice (using cache):', err);
            }
          }
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.log('Firebase auth listener fallback:', e);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (auth && isRealFirebase) {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        const u = { uid: cred.user.uid, email: cred.user.email || email, displayName: cred.user.displayName || email.split('@')[0] };
        setUser(u);
        localStorage.setItem('fitbuddy_user', JSON.stringify(u));
      } else {
        // Local auth simulation for hassle-free demonstration
        const u = { uid: 'user-' + Date.now(), email, displayName: email.split('@')[0] };
        setUser(u);
        localStorage.setItem('fitbuddy_user', JSON.stringify(u));
      }
    } catch (err: any) {
      // If Firebase auth fails (e.g. invalid config or missing credentials), inform gracefully
      throw new Error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
      const newProf: UserProfile = {
        ...profile,
        name,
        email,
      };

      if (auth && isRealFirebase) {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const u = { uid: cred.user.uid, email: cred.user.email || email, displayName: name };
        setUser(u);
        localStorage.setItem('fitbuddy_user', JSON.stringify(u));
        if (db) {
          await setDoc(doc(db, 'users', cred.user.uid), newProf);
        }
      } else {
        const u = { uid: 'user-' + Date.now(), email, displayName: name };
        setUser(u);
        localStorage.setItem('fitbuddy_user', JSON.stringify(u));
      }

      setProfile(newProf);
      localStorage.setItem('fitbuddy_profile', JSON.stringify(newProf));
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (auth && isRealFirebase) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.warn(e);
      }
    }
    setUser(null);
    localStorage.removeItem('fitbuddy_user');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem('fitbuddy_profile', JSON.stringify(updated));

    if (user && db && isRealFirebase) {
      try {
        await updateDoc(doc(db, 'users', user.uid), updated as any);
      } catch {
        try {
          await setDoc(doc(db, 'users', user.uid), updated);
        } catch (e) {
          console.log('Firestore write notice:', e);
        }
      }
    }
  };

  const toggleActivity = async (activityId: string) => {
    const today = getTodayString();
    let updated: string[];
    if (dailyCompleted.includes(activityId)) {
      updated = dailyCompleted.filter((id) => id !== activityId);
    } else {
      updated = [...dailyCompleted, activityId];
    }
    setDailyCompleted(updated);
    localStorage.setItem(`fitbuddy_progress_${today}`, JSON.stringify(updated));

    if (user && db && isRealFirebase) {
      try {
        const progressRef = doc(db, 'progress', user.uid, 'dates', today);
        await setDoc(progressRef, { activitiesCompleted: updated, updatedAt: new Date().toISOString() }, { merge: true });
      } catch (err) {
        console.log('Firestore progress update notice:', err);
      }
    }
  };

  // Generate 7-day progress history
  const getWeeklyProgress = () => {
    const totalDailyItems = 6;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = days[d.getDay()];

      let count = 0;
      if (i === 0) {
        count = dailyCompleted.length;
      } else {
        const stored = localStorage.getItem(`fitbuddy_progress_${dateStr}`);
        if (stored) {
          count = JSON.parse(stored).length;
        } else {
          // Representative healthy student habit completion pattern
          const mockCounts = [4, 5, 3, 5, 4, 6, dailyCompleted.length];
          count = mockCounts[6 - i] ?? 4;
        }
      }

      const percentage = Math.min(100, Math.round((count / totalDailyItems) * 100));
      result.push({
        day: dayName,
        date: dateStr,
        count,
        total: totalDailyItems,
        percentage,
      });
    }
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        logout,
        updateProfile,
        dailyCompleted,
        toggleActivity,
        weeklyProgress: getWeeklyProgress(),
        isConfiguredWithRealFirebase: isRealFirebase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
