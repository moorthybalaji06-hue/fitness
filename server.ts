import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
let genAI: GoogleGenAI | null = null;
if (apiKey) {
  try {
    genAI = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Warning: Could not initialize GoogleGenAI client with provided key:', err);
  }
}

// System safety instruction for general wellness
const WELLNESS_SYSTEM_INSTRUCTION = `You are FitBuddy, a friendly, supportive, and knowledgeable AI wellness and fitness assistant specially created for college and university students.

CORE RULES:
1. Provide practical, gentle, balanced guidance for physical activity, mobility, wholesome meals, stress management, hydration, and sleep.
2. DO NOT ACT AS A DOCTOR, CLINICIAN, OR MEDICAL PROFESSIONAL.
3. NEVER diagnose medical conditions, prescribe medications or supplements, or offer medical treatment.
4. For any reported pain, injury, dizziness, eating disorder concerns, illness, or medical symptoms, immediately and warmly advise the student to consult a qualified physician, university health center, or licensed healthcare professional.
5. DO NOT recommend extreme exercise routines, exhaustive exhaustion drills, or rapid weight-loss programs. Focus on consistency, energy, mental clarity, and sustainable wellness.
6. For meals, encourage balanced, affordable, easily prepared meals with good hydration. Avoid restrictive diets, extreme caloric deficits, or fasting regimes.
7. Keep tone empathetic, encouraging, concise, and student-relatable.`;

// 1. CHAT ENDPOINT
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    if (!genAI || !apiKey) {
      // Graceful fallback response when API key is not configured in local environment
      res.json({
        reply: `Hello! I am FitBuddy, your friendly wellness assistant. I can help suggest daily movement routines, hydration reminders, study breaks, and nourishing student meals! (Note: Connect your GEMINI_API_KEY in .env for live Gemini generation). For any medical concerns or pain, please always consult your campus health clinic.`,
      });
      return;
    }

    // Format chat context
    const contents: any[] = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach((h: any) => {
        if (h.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: h.text }] });
        } else if (h.sender === 'bot') {
          contents.push({ role: 'model', parts: [{ text: h.text }] });
        }
      });
    }

    contents.push({
      role: 'user',
      parts: [
        {
          text: `User query: "${message}". Please respond in accordance with your FitBuddy wellness guidelines. Be encouraging, actionable, and include a brief safety reminder if relevant.`,
        },
      ],
    });

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: WELLNESS_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'FitBuddy is here to help! Stay hydrated, take regular stretch breaks, and rest well.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'Failed to generate response from Gemini. Please try again.',
      details: error.message || String(error),
    });
  }
});

// 2. ACTIVITY PLANNER ENDPOINT
app.post('/api/workout', async (req: Request, res: Response) => {
  const { goal, availableTime, experienceLevel, userContext } = req.body || {};
  const timeNum = availableTime || '20';
  const goalText = goal || 'General fitness & daily movement';
  const level = experienceLevel || 'Beginner';

  const defaultPlan = {
    title: `${goalText} Session (${timeNum} mins)`,
    warmUp: [
      '2 mins Neck rolls & gentle shoulder shrugs to release study tension',
      '3 mins Standing torso twists and dynamic hip openers',
      '2 mins Light brisk marching in place with rhythmic breathing',
    ],
    mainActivity: [
      '5 mins Bodyweight air squats or chair squats (good spinal posture)',
      '4 mins Wall or knee push-ups paired with arm circles',
      '4 mins Alternating reverse lunges or brisk stair stepping',
      '3 mins Core bird-dog or gentle forearm plank hold intervals',
    ],
    coolDown: [
      '3 mins Standing hamstring and quad stretches',
      '2 mins Deep diaphragmatic breathing & spinal decompression',
    ],
    safetyReminders: [
      'Stay hydrated with small sips of water throughout.',
      'Never push through sharp or sudden joint pain.',
      'Consistency is much more valuable than exhausting intensity.',
    ],
    advice: 'Taking a 15–20 minute movement break resets mental fatigue and enhances memory retention for studying.',
  };

  if (!genAI || !apiKey) {
    res.json(defaultPlan);
    return;
  }

  try {
    const prompt = `Create a realistic, student-friendly ${timeNum}-minute activity routine for a student.
Goal: ${goalText}
Experience Level: ${level}
Context: ${userContext || 'College student studying at desk'}

SAFETY CONSTRAINTS:
- Do NOT generate extreme workouts, exhaustive HIIT, or rapid weight-loss targets.
- Focus on general fitness, mobility, posture correction from sitting, or light movement.
- Return strictly a valid JSON object with keys: "title", "warmUp" (array of strings), "mainActivity" (array of strings), "coolDown" (array of strings), "safetyReminders" (array of strings), "advice" (string).`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: WELLNESS_SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    let raw = response.text || '';
    raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(raw);
    res.json({
      title: parsed.title || defaultPlan.title,
      warmUp: parsed.warmUp || defaultPlan.warmUp,
      mainActivity: parsed.mainActivity || defaultPlan.mainActivity,
      coolDown: parsed.coolDown || defaultPlan.coolDown,
      safetyReminders: parsed.safetyReminders || defaultPlan.safetyReminders,
      advice: parsed.advice || defaultPlan.advice,
    });
  } catch (error) {
    console.warn('Workout generation fallback used:', error);
    res.json(defaultPlan);
  }
});

// 3. MEAL IDEAS ENDPOINT
app.post('/api/meals', async (req: Request, res: Response) => {
  const { foodPreference, dietaryNotes } = req.body || {};
  const pref = foodPreference || 'Vegetarian';

  const defaultMeals = {
    preference: pref,
    breakfast: {
      name: pref === 'South Indian' ? 'Steamed Idli & Vegetable Sambar with Chutney' : 'Wholesome Oatmeal Bowl with Banana & Peanut Butter',
      description: pref === 'South Indian'
        ? 'Fermented steamed rice-lentil idlis served with a bowl of protein-rich dal sambar.'
        : 'Rolled oats cooked with milk or water, topped with sliced banana, chia seeds, and honey.',
      studentTip: 'Takes only 4 minutes to assemble and provides sustained slow-release carbs for morning lectures.',
    },
    lunch: {
      name: pref === 'South Indian' ? 'Brown Rice, Rasam, Beetroot Poriyal & Curd' : 'Balanced Grain Bowl with Lentil Dal & Sautéed Greens',
      description: 'A comforting, complete lunch plate combining fiber, plant proteins, and probiotic curd/yogurt.',
      studentTip: 'Great for campus mess or quick meal-prep without post-lunch brain fog.',
    },
    snack: {
      name: 'Roasted Makhana (Fox Nuts) / Spiced Trail Mix',
      description: 'Crunchy snack packed with magnesium and protein to prevent afternoon study fatigue.',
      studentTip: 'Keeps at room temperature in a pocket or study backpack.',
    },
    dinner: {
      name: pref === 'South Indian' ? 'Warm Dosa or Ragi Dosa with Vegetable Kootu' : 'Whole Wheat Rotis with Mixed Lentil Stew & Sautéed Veggies',
      description: 'A comforting, easily digestible meal that promotes restful sleep and steady overnight recovery.',
      studentTip: 'Light on digestion for deep, uninterrupted sleep.',
    },
    hydrationTip: 'Aim for 7 to 8 glasses of clean water daily. Keep a reusable water bottle by your study desk.',
    balancedDietNote: 'FitBuddy encourages variety, whole grains, and mindful eating without restrictive diets or calorie targets.',
  };

  if (!genAI || !apiKey) {
    res.json(defaultMeals);
    return;
  }

  try {
    const prompt = `Generate practical, affordable, balanced student meal ideas for preference: "${pref}".
Dietary Notes: ${dietaryNotes || 'Simple college ingredients'}

STRICT NUTRITIONAL PRINCIPLES:
- DO NOT generate restrictive diets, fasting plans, calorie limits, or weight-loss targets.
- Recommend wholesome, affordable, accessible ingredients suitable for student hostels or quick cooking.
- Return strictly a valid JSON object with keys: "preference", "breakfast" {name, description, studentTip}, "lunch" {name, description, studentTip}, "snack" {name, description, studentTip}, "dinner" {name, description, studentTip}, "hydrationTip", "balancedDietNote".`;

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: WELLNESS_SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    let raw = response.text || '';
    raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(raw);
    res.json({
      preference: parsed.preference || pref,
      breakfast: parsed.breakfast || defaultMeals.breakfast,
      lunch: parsed.lunch || defaultMeals.lunch,
      snack: parsed.snack || defaultMeals.snack,
      dinner: parsed.dinner || defaultMeals.dinner,
      hydrationTip: parsed.hydrationTip || defaultMeals.hydrationTip,
      balancedDietNote: parsed.balancedDietNote || defaultMeals.balancedDietNote,
    });
  } catch (error) {
    console.warn('Meals generation fallback used:', error);
    res.json(defaultMeals);
  }
});

// 4. DAILY WELLNESS TIPS ENDPOINT
app.get('/api/wellness-tips', (_req: Request, res: Response) => {
  res.json({
    categories: [
      {
        id: 'hydration',
        title: 'Hydration',
        icon: 'Droplets',
        color: 'blue',
        tip: 'Aim for 7–8 glasses (approx. 2 liters) of water. Drink a full glass right after waking up to activate metabolism.',
        action: 'Refill your water bottle before studying.',
      },
      {
        id: 'sleep',
        title: 'Sleep Routine',
        icon: 'Moon',
        color: 'indigo',
        tip: 'Consistent sleep of 7–9 hours improves academic memory consolidation and immune resilience.',
        action: 'Turn off screens 30 minutes before bed.',
      },
      {
        id: 'movement',
        title: 'Daily Movement',
        icon: 'Activity',
        color: 'emerald',
        tip: 'Break prolonged sitting every 45–60 minutes with 2 minutes of walking or standing posture alignment.',
        action: 'Stand up and stretch arms overhead now.',
      },
      {
        id: 'screen_breaks',
        title: 'Screen Breaks',
        icon: 'Eye',
        color: 'cyan',
        tip: 'Follow the 20-20-20 rule: Every 20 minutes, look at an object 20 feet away for at least 20 seconds to ease eye strain.',
        action: 'Gaze out a window for 20 seconds.',
      },
      {
        id: 'relaxation',
        title: 'Relaxation & Mind',
        icon: 'HeartPulse',
        color: 'rose',
        tip: 'Take 4 slow deep diaphragmatic breaths (4s inhale, 4s hold, 4s exhale) to down-regulate exam stress.',
        action: 'Take 3 deep, steady breaths.',
      },
      {
        id: 'regular_meals',
        title: 'Regular Meals',
        icon: 'Utensils',
        color: 'amber',
        tip: 'Eat consistent balanced meals with protein and complex carbs to avoid blood sugar crashes and brain fog.',
        action: 'Eat lunch at a regular time away from screens.',
      },
    ],
  });
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`FitBuddy Server running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
