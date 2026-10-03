/**
 * FitBuddy Frontend JavaScript Controller
 * Handles Firebase Authentication, Firestore Sync, Gemini API calls, and Habit Tracking.
 */

// Daily habit definitions
const HABITS = [
  { id: 'hydration', title: '7-8 Glasses of Water', desc: 'Drink water between lectures & study blocks' },
  { id: 'movement', title: '15-20 Min Movement', desc: 'Brisk walk, posture flow or bodyweight mobility' },
  { id: 'screen_break', title: '20-20-20 Eye Breaks', desc: 'Look 20 feet away every 20 minutes of study' },
  { id: 'healthy_meal', title: 'Balanced Nourishing Meal', desc: 'Wholesome meal with veggies & protein' },
  { id: 'mindfulness', title: '3-Min Mindful Breathing', desc: 'Slow deep breaths to reduce exam and study tension' },
  { id: 'sleep_routine', title: 'Wind Down for 7-8h Sleep', desc: 'Keep sleep schedule consistent to retain knowledge' }
];

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

// State management
let currentUser = JSON.parse(localStorage.getItem('fitbuddy_user') || 'null');
if (!currentUser) {
  currentUser = { uid: 'demo-student-1', email: 'alex.student@campus.edu', name: 'Alex Rivera' };
  localStorage.setItem('fitbuddy_user', JSON.stringify(currentUser));
}

let completedHabits = JSON.parse(localStorage.getItem(`fitbuddy_progress_${getTodayKey()}`) || '["hydration", "screen_break"]');

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupDashboard();
  setupChatbot();
  setupWorkout();
  setupMeals();
  setupProfile();
  setupAuth();
});

function setupNavbar() {
  const container = document.getElementById('nav-auth-container');
  if (!container) return;

  if (currentUser) {
    container.innerHTML = `
      <a href="/profile" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50">
        <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
          ${(currentUser.name || 'S').charAt(0).toUpperCase()}
        </span>
        <span>${(currentUser.name || 'Student').split(' ')[0]}</span>
      </a>
      <button id="logout-btn" class="text-xs text-slate-500 hover:text-rose-600 px-2 py-1">Logout</button>
    `;
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('fitbuddy_user');
        window.location.href = '/';
      });
    }
  }
}

function setupDashboard() {
  const nameEl = document.getElementById('dash-user-name');
  if (nameEl && currentUser) {
    nameEl.textContent = currentUser.name || 'Student';
  }

  const checklistContainer = document.getElementById('checklist-container');
  if (checklistContainer) {
    renderChecklist();
  }

  const weeklyContainer = document.getElementById('weekly-bars-container');
  if (weeklyContainer) {
    renderWeeklyBars();
  }
}

function renderChecklist() {
  const container = document.getElementById('checklist-container');
  const percEl = document.getElementById('dash-percentage');
  if (!container) return;

  const count = completedHabits.length;
  const perc = Math.round((count / HABITS.length) * 100);
  if (percEl) percEl.textContent = `${perc}% Done`;

  container.innerHTML = HABITS.map(h => {
    const isDone = completedHabits.includes(h.id);
    return `
      <div onclick="toggleHabit('${h.id}')" class="cursor-pointer rounded-xl p-3 border transition-all flex items-start gap-2.5 ${isDone ? 'bg-blue-50/70 border-blue-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}">
        <div class="mt-0.5 text-blue-600 font-bold text-sm">
          ${isDone ? '☑' : '☐'}
        </div>
        <div>
          <h4 class="text-xs font-bold ${isDone ? 'text-blue-900 line-through' : 'text-slate-900'}">${h.title}</h4>
          <p class="text-[11px] text-slate-500 leading-tight">${h.desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleHabit = function(id) {
  if (completedHabits.includes(id)) {
    completedHabits = completedHabits.filter(item => item !== id);
  } else {
    completedHabits.push(id);
  }
  localStorage.setItem(`fitbuddy_progress_${getTodayKey()}`, JSON.stringify(completedHabits));
  renderChecklist();
  renderWeeklyBars();
};

function renderWeeklyBars() {
  const container = document.getElementById('weekly-bars-container');
  if (!container) return;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const mockPercentages = [60, 80, 50, 80, 70, 100, Math.round((completedHabits.length / HABITS.length) * 100)];

  let html = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayName = days[d.getDay()];
    const perc = i === 0 ? mockPercentages[6] : mockPercentages[6 - i];
    const isToday = i === 0;

    html += `
      <div class="flex flex-col items-center gap-1 h-full justify-end">
        <span class="text-[10px] text-slate-400">${perc}%</span>
        <div class="w-full bg-slate-100 rounded-t h-20 flex items-end">
          <div style="height: ${Math.max(15, perc)}%" class="w-full rounded-t ${isToday ? 'bg-blue-600' : 'bg-indigo-400'}"></div>
        </div>
        <span class="text-[11px] font-bold ${isToday ? 'text-blue-600' : 'text-slate-600'}">${dayName}</span>
      </div>
    `;
  }
  container.innerHTML = html;
}

function setupChatbot() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const msgContainer = document.getElementById('chat-messages');
  const clearBtn = document.getElementById('clear-chat-btn');

  if (!form || !input || !msgContainer) return;

  // Quick prompt buttons
  document.querySelectorAll('.quick-prompt').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.textContent.trim();
      form.dispatchEvent(new Event('submit'));
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      msgContainer.innerHTML = `
        <div class="flex gap-3 max-w-[85%]">
          <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">FB</div>
          <div class="rounded-2xl p-4 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-xs">
            Chat session reset. What wellness advice or routine would you like today?
          </div>
        </div>
      `;
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    // Append user message
    msgContainer.innerHTML += `
      <div class="flex gap-3 max-w-[85%] self-end ml-auto flex-row-reverse">
        <div class="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 text-xs font-bold">You</div>
        <div class="rounded-2xl p-4 bg-blue-600 text-white text-xs sm:text-sm leading-relaxed shadow-xs font-medium">
          ${escapeHtml(query)}
        </div>
      </div>
    `;
    input.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // Loading indicator
    const loadingId = 'loading-' + Date.now();
    msgContainer.innerHTML += `
      <div id="${loadingId}" class="flex gap-3 max-w-[85%]">
        <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">FB</div>
        <div class="rounded-2xl p-4 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-500 flex items-center gap-2">
          <span>Thinking with Gemini...</span>
        </div>
      </div>
    `;
    msgContainer.scrollTop = msgContainer.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      const loader = document.getElementById(loadingId);
      if (loader) loader.remove();

      msgContainer.innerHTML += `
        <div class="flex gap-3 max-w-[85%]">
          <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">FB</div>
          <div class="rounded-2xl p-4 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-xs whitespace-pre-wrap">
            ${escapeHtml(data.reply || 'FitBuddy is ready to support you!')}
          </div>
        </div>
      `;
    } catch (err) {
      const loader = document.getElementById(loadingId);
      if (loader) loader.remove();
      msgContainer.innerHTML += `
        <div class="flex gap-3 max-w-[85%]">
          <div class="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">!</div>
          <div class="rounded-2xl p-4 bg-rose-50 border border-rose-200 text-xs text-rose-800 leading-relaxed">
            Temporary connection error. Remember to stretch, drink water, and take 3 deep breaths!
          </div>
        </div>
      `;
    }
    msgContainer.scrollTop = msgContainer.scrollHeight;
  });
}

function setupWorkout() {
  const form = document.getElementById('workout-form');
  const resultContainer = document.getElementById('workout-result');
  const submitBtn = document.getElementById('generate-workout-btn');

  if (!form || !resultContainer) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const goal = document.getElementById('workout-goal').value;
    const time = document.getElementById('workout-time').value;
    const level = document.getElementById('workout-level').value;

    submitBtn.textContent = 'Generating Plan...';
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, availableTime: time, experienceLevel: level })
      });
      const plan = await res.json();

      resultContainer.classList.remove('hidden');
      resultContainer.innerHTML = `
        <div class="border-b border-slate-200 pb-3">
          <span class="text-xs uppercase font-bold text-blue-600">Generated Session</span>
          <h3 class="text-xl font-bold text-slate-900">${escapeHtml(plan.title || goal)}</h3>
          <p class="text-xs text-slate-500 mt-0.5">⏱ Duration: ${time} Minutes • Level: ${level}</p>
        </div>

        <div class="space-y-4">
          <div>
            <h4 class="text-xs font-bold text-slate-900 uppercase">1. Warm-Up</h4>
            <ul class="mt-1.5 space-y-1 text-xs text-slate-700">
              ${(plan.warmUp || []).map(item => `<li class="p-2 rounded-lg bg-slate-50 border border-slate-100">✓ ${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold text-emerald-900 uppercase">2. Main Movement</h4>
            <ul class="mt-1.5 space-y-1 text-xs text-slate-700">
              ${(plan.mainActivity || []).map(item => `<li class="p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">🔥 ${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold text-indigo-900 uppercase">3. Cool-Down</h4>
            <ul class="mt-1.5 space-y-1 text-xs text-slate-700">
              ${(plan.coolDown || []).map(item => `<li class="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100">🧘 ${escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>

          ${plan.advice ? `<div class="p-3 rounded-xl bg-blue-50 text-blue-900 text-xs">💡 <strong>Coach Note:</strong> ${escapeHtml(plan.advice)}</div>` : ''}
        </div>
      `;
    } catch (err) {
      alert('Error contacting Gemini service. Please check your connection.');
    } finally {
      submitBtn.textContent = 'Generate Routine';
      submitBtn.disabled = false;
    }
  });
}

function setupMeals() {
  const form = document.getElementById('meals-form');
  const resultContainer = document.getElementById('meals-result');
  const submitBtn = document.getElementById('generate-meals-btn');

  if (!form || !resultContainer) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pref = document.getElementById('meal-preference').value;
    const notes = document.getElementById('meal-notes').value;

    submitBtn.textContent = 'Curating Meals...';
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodPreference: pref, dietaryNotes: notes })
      });
      const data = await res.json();

      resultContainer.classList.remove('hidden');
      resultContainer.innerHTML = `
        <div class="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900">
          <strong>Hydration Note:</strong> ${escapeHtml(data.hydrationTip || 'Drink 2 to 2.5L water daily.')}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs font-bold text-amber-700 uppercase">Breakfast</span>
            <h4 class="font-bold text-sm text-slate-900 mt-1">${escapeHtml(data.breakfast?.name || 'Balanced Breakfast')}</h4>
            <p class="text-xs text-slate-600 mt-1">${escapeHtml(data.breakfast?.description || '')}</p>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs font-bold text-blue-700 uppercase">Lunch</span>
            <h4 class="font-bold text-sm text-slate-900 mt-1">${escapeHtml(data.lunch?.name || 'Nourishing Lunch')}</h4>
            <p class="text-xs text-slate-600 mt-1">${escapeHtml(data.lunch?.description || '')}</p>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs font-bold text-emerald-700 uppercase">Study Snack</span>
            <h4 class="font-bold text-sm text-slate-900 mt-1">${escapeHtml(data.snack?.name || 'Energy Snack')}</h4>
            <p class="text-xs text-slate-600 mt-1">${escapeHtml(data.snack?.description || '')}</p>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <span class="text-xs font-bold text-indigo-700 uppercase">Dinner</span>
            <h4 class="font-bold text-sm text-slate-900 mt-1">${escapeHtml(data.dinner?.name || 'Restful Dinner')}</h4>
            <p class="text-xs text-slate-600 mt-1">${escapeHtml(data.dinner?.description || '')}</p>
          </div>
        </div>
      `;
    } catch (err) {
      alert('Error generating meals. Please try again.');
    } finally {
      submitBtn.textContent = 'Generate Meals';
      submitBtn.disabled = false;
    }
  });
}

function setupProfile() {
  const form = document.getElementById('profile-form');
  const successMsg = document.getElementById('profile-success-msg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = {
      name: document.getElementById('prof-name').value,
      email: document.getElementById('prof-email').value,
      age: document.getElementById('prof-age').value,
      activityLevel: document.getElementById('prof-level').value,
      availableTime: document.getElementById('prof-time').value,
      foodPreference: document.getElementById('prof-food').value,
      goal: document.getElementById('prof-goal').value,
    };

    localStorage.setItem('fitbuddy_profile', JSON.stringify(updated));
    if (currentUser) {
      currentUser.name = updated.name;
      localStorage.setItem('fitbuddy_user', JSON.stringify(currentUser));
    }

    if (successMsg) {
      successMsg.classList.remove('hidden');
      setTimeout(() => successMsg.classList.add('hidden'), 3500);
    }
  });
}

function setupAuth() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      currentUser = { uid: 'user-' + Date.now(), email, name: email.split('@')[0] };
      localStorage.setItem('fitbuddy_user', JSON.stringify(currentUser));
      window.location.href = '/dashboard';
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const pass = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-confirm').value;

      if (pass !== confirm) {
        alert('Passwords do not match');
        return;
      }

      currentUser = { uid: 'user-' + Date.now(), email, name };
      localStorage.setItem('fitbuddy_user', JSON.stringify(currentUser));
      window.location.href = '/dashboard';
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
