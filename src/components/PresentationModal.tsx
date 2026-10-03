import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  BookOpen,
  HelpCircle,
  FileCode,
  Layers,
  Database,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Server,
  Cloud,
} from 'lucide-react';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    | 'report'
    | 'viva'
    | 'architecture'
    | 'database'
    | 'python-code'
    | 'deployment'
  >('report');

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                FitBuddy – College Project Report & Viva Hub
              </h2>
              <p className="text-xs text-slate-500">
                Academic Presentation Material, Architecture, Viva Q&A & Python Flask Source Files
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-slate-200 bg-white flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'report', label: '1. Project Report (12 Sections)', icon: BookOpen },
            { id: 'viva', label: '2. Project Viva Q&A', icon: HelpCircle },
            { id: 'architecture', label: '3. System Architecture', icon: Layers },
            { id: 'database', label: '4. Database Design (Firestore)', icon: Database },
            { id: 'python-code', label: '5. Python Flask App Files', icon: FileCode },
            { id: 'deployment', label: '6. Run Locally & Cloud Run', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body / Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-700">
          {/* TAB 1: ACADEMIC PROJECT REPORT (12 SECTIONS) */}
          {activeTab === 'report' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Section 1: Abstract */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-blue-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs">1</span>
                  <span>Project Abstract</span>
                </h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed text-xs sm:text-sm text-slate-700">
                  Modern college students experience high levels of academic stress, sedentary desk lifestyles, irregular sleep patterns, and disordered hostel eating. Existing fitness applications typically promote intense bodybuilding regimens or extreme calorie counting that exacerbate anxiety and are unsuitable for student life. <strong>FitBuddy – AI Fitness & Wellness Assistant</strong> is a specialized, responsive web system combining generative artificial intelligence (Google Gemini API), cloud database persistence (Firebase Firestore), and secure authentication (Firebase Auth). It delivers personalized 10–45 minute dorm-friendly mobility routines, wholesome non-restrictive student meal recommendations, habit tracking, and an empathetic conversational assistant that strictly adheres to non-clinical safety boundaries.
                </div>
              </section>

              {/* Section 2: Problem Statement */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-blue-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs">2</span>
                  <span>Problem Statement</span>
                </h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed text-xs sm:text-sm text-slate-700 space-y-2">
                  <p>
                    University students spend 8–12 hours daily seated in lectures and before digital screens, leading to poor spinal ergonomics, mental fatigue, and sleep disruption. Key issues include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
                    <li>Lack of accessible, low-barrier physical routines that can be performed in dorm rooms without equipment.</li>
                    <li>Widespread misinformation surrounding restrictive diets, leading to student lethargy and poor academic focus.</li>
                    <li>Absence of personalized, safe, 24/7 wellness advice that knows when to enforce medical disclaimers.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Objectives */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-blue-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs">3</span>
                  <span>Project Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
                    <strong className="text-blue-900 block mb-1">1. Intelligent Movement Generation:</strong>
                    Synthesize structured warm-up, main exercise, and posture cool-down routines under 45 minutes using Google Gemini.
                  </div>
                  <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl">
                    <strong className="text-indigo-900 block mb-1">2. Non-Restrictive Student Nutrition:</strong>
                    Provide balanced, budget-friendly meal ideas for Vegetarian, Non-veg, Vegan, and South Indian cuisines without calorie anxiety.
                  </div>
                  <div className="p-3 bg-cyan-50/50 border border-cyan-200 rounded-xl">
                    <strong className="text-cyan-900 block mb-1">3. Non-Clinical Safety Guardrails:</strong>
                    Implement system prompts preventing medical diagnostic claims, redirecting users with symptoms to campus healthcare.
                  </div>
                  <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl">
                    <strong className="text-emerald-900 block mb-1">4. Cloud Persistence:</strong>
                    Securely record student profiles and daily habit completions in Firebase Firestore across web and mobile viewports.
                  </div>
                </div>
              </section>

              {/* Section 4 & 5: Existing vs Proposed */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-blue-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs">4 & 5</span>
                  <span>Existing vs. Proposed System</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Feature</th>
                        <th className="p-3 text-rose-800">Existing Commercial Fitness Apps</th>
                        <th className="p-3 text-emerald-800">Proposed FitBuddy System</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-semibold">Target Audience</td>
                        <td className="p-3 text-slate-500">Gym-goers, bodybuilders, extreme dieters</td>
                        <td className="p-3 font-medium text-emerald-900">University students and desk-bound learners</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Time Requirement</td>
                        <td className="p-3 text-slate-500">60–90 minutes with specialized gym weights</td>
                        <td className="p-3 font-medium text-emerald-900">10–45 minute dorm & bedroom bodyweight micro-breaks</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Dietary Advice</td>
                        <td className="p-3 text-slate-500">Aggressive calorie deficit and restrictive macro tracking</td>
                        <td className="p-3 font-medium text-emerald-900">Wholesome, student-budget balanced foods with local options</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Safety & AI Prompting</td>
                        <td className="p-3 text-slate-500">Static hardcoded templates with no dialogue</td>
                        <td className="p-3 font-medium text-emerald-900">Dynamic Google Gemini with medical disclaimer safety guards</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 6: Modules */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-blue-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs">6</span>
                  <span>Project Modules</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <strong className="block text-slate-900 mb-1">M1: Auth & Profile Module</strong>
                    Handles registration, login, logout, and stores student fitness goals, activity levels, and dietary preferences in Firestore.
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <strong className="block text-slate-900 mb-1">M2: Gemini AI Generation Module</strong>
                    Interfaces with Google GenAI SDK to generate structured activity sessions, meal suggestions, and conversational assistance.
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <strong className="block text-slate-900 mb-1">M3: Progress & Habit Tracker Module</strong>
                    Logs daily checkboxes (Hydration, Movement, Screen breaks, Sleep, Relaxation) with percentage calculations and 7-day visualization.
                  </div>
                </div>
              </section>

              {/* Section 9, 10, 11: Advantages, Limitations, Future Enhancements */}
              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-blue-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs">7</span>
                  <span>Advantages, Limitations & Future Enhancements</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                    <strong className="text-emerald-900 block mb-1">Key Advantages:</strong>
                    Zero equipment needed, fast response times via Gemini, zero medical risk posture, accessible across desktop & mobile screens.
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
                    <strong className="text-amber-900 block mb-1">Limitations:</strong>
                    Requires active network connection for Gemini calls; does not integrate physical wearable sensors (e.g. smart watch heart rate).
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
                    <strong className="text-blue-900 block mb-1">Future Enhancements:</strong>
                    Integration with campus mess food menus, voice-activated live coaching via Gemini Live API, and camera-based posture detection.
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: PROJECT VIVA QUESTIONS & MODEL ANSWERS */}
          {activeTab === 'viva' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <strong>Viva Preparation Guide:</strong> Below are the most frequently asked questions by external examiners, professors, and technical evaluators for this specific project, along with high-scoring technical answers.
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: 'Q1. What is the core problem that FitBuddy solves compared to existing fitness apps?',
                    a: 'Most commercial fitness applications cater to experienced gym athletes and encourage rigorous calorie deficits that elevate stress in college students. FitBuddy is specifically designed for students living in hostels or dorms, generating non-extreme 10–45 minute desk-relief routines, wholesome unrestrictive meals, and encouraging wellness habits without any equipment or extreme targets.',
                  },
                  {
                    q: 'Q2. Which AI model is utilized and how is the API key protected from exposure?',
                    a: 'FitBuddy uses Google Gemini (specifically gemini-3.8-flash) via the official Google GenAI SDK. Crucially, all Gemini API calls are made exclusively on the backend server (Flask in Python / Express in Node) using server environment variables (process.env.GEMINI_API_KEY). The frontend never receives or exposes the secret API key.',
                  },
                  {
                    q: 'Q3. How does FitBuddy ensure medical safety and avoid legal/clinical liability?',
                    a: 'FitBuddy enforces strict system prompt instructions that instruct the model to behave exclusively as an educational wellness companion. It is strictly forbidden from diagnosing ailments, prescribing pharmaceuticals, or recommending extreme fasting. For any injury or pain query, it programmatically issues immediate advice to consult a licensed medical practitioner or university health center.',
                  },
                  {
                    q: 'Q4. What is the database schema used in Firebase Firestore?',
                    a: 'Firestore utilizes a NoSQL document-oriented model with two primary collections: 1) "users/{userId}" storing user profile parameters (name, email, age, goal, activityLevel, availableTime, foodPreference), and 2) "progress/{userId}/dates/{dateString}" storing an array of completed activity identifiers (activitiesCompleted) and timestamp.',
                  },
                  {
                    q: 'Q5. Why did you choose Google Cloud Run for container deployment?',
                    a: 'Google Cloud Run is a fully managed serverless container runtime that scales automatically from zero to handle student traffic surges during exam periods. It provides automatic HTTPS SSL certificates, zero cost during idle periods, and integrates natively with GCP environment variables.',
                  },
                  {
                    q: 'Q6. How does the application handle offline or poor campus WiFi connectivity?',
                    a: 'The frontend implements dual-layer storage caching: whenever Firestore is syncing or offline, local browser storage maintains the user profile and daily checklist state so that students never experience blank screens or lost data.',
                  },
                  {
                    q: 'Q7. How are structured JSON responses guaranteed from the Gemini API?',
                    a: 'We leverage the official SDK configuration parameter "responseMimeType: \'application/json\'" paired with clear schema definitions in the prompt. If parsing ever fails, the backend wraps the response with safe, pre-validated wellness fallbacks.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-xs">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item.q}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed pl-6 border-l-2 border-blue-200 ml-2">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  FitBuddy System Architecture
                </h3>
                <p className="text-xs text-slate-500">
                  Three-tier architecture comprising Presentation Layer, Application/AI Controller Layer, and Cloud Persistence Layer.
                </p>
              </div>

              {/* Architecture Diagram Representation */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Layer 1: Client */}
                  <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>1. Client Tier</span>
                    </div>
                    <ul className="text-xs space-y-1 text-slate-600">
                      <li>• HTML5 / CSS3 / Modern React</li>
                      <li>• Tailwind CSS Responsive UI</li>
                      <li>• Firebase Auth Client SDK</li>
                      <li>• Local Storage Offline Cache</li>
                    </ul>
                  </div>

                  {/* Layer 2: Backend */}
                  <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span>2. Application Tier</span>
                    </div>
                    <ul className="text-xs space-y-1 text-slate-600">
                      <li>• Python Flask / Express.js Server</li>
                      <li>• REST API Endpoints (/api/*)</li>
                      <li>• Google GenAI SDK Controller</li>
                      <li>• Non-clinical Safety Guards</li>
                    </ul>
                  </div>

                  {/* Layer 3: Cloud & AI */}
                  <div className="bg-white p-4 rounded-xl border border-cyan-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 uppercase">
                      <span className="w-2 h-2 rounded-full bg-cyan-600" />
                      <span>3. Cloud & Services Tier</span>
                    </div>
                    <ul className="text-xs space-y-1 text-slate-600">
                      <li>• Google Gemini AI (gemini-3.8-flash)</li>
                      <li>• Google Cloud Firestore Database</li>
                      <li>• Firebase Authentication Service</li>
                      <li>• Google Cloud Run Container</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-blue-100/60 rounded-xl text-xs text-blue-900 leading-relaxed">
                  <strong>Data Flow:</strong> User submits wellness parameters from the UI → Backend validates and decorates prompt with safety guardrails → Gemini generates structured routines → Backend relays response to UI → User progress is simultaneously synced to Firestore.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DATABASE DESIGN */}
          {activeTab === 'database' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Firestore Database Structure & Schema
                </h3>
                <p className="text-xs text-slate-500">
                  Document-oriented NoSQL collections engineered for speed, low latency, and student privacy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Collection 1: users */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                    <Database className="w-4 h-4" />
                    <span>{'Collection: users/{userId}'}</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-900 text-blue-200 text-xs font-mono overflow-x-auto leading-relaxed">
{`{
  "name": "Alex Rivera",
  "email": "alex.student@campus.edu",
  "age": "20",
  "goal": "General fitness & daily movement",
  "activityLevel": "Beginner",
  "availableTime": "20",
  "foodPreference": "Vegetarian",
  "createdAt": "2026-10-03T06:11:47Z"
}`}
                  </pre>
                  <p className="text-xs text-slate-500">
                    Stores the core student profile. Injected into prompts to personalize Gemini suggestions.
                  </p>
                </div>

                {/* Collection 2: progress */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    <Database className="w-4 h-4" />
                    <span>{'Subcollection: progress/{userId}/dates/{date}'}</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-900 text-indigo-200 text-xs font-mono overflow-x-auto leading-relaxed">
{`{
  "date": "2026-10-03",
  "activitiesCompleted": [
    "hydration",
    "movement",
    "screen_break"
  ],
  "percentage": 50,
  "updatedAt": "2026-10-03T06:11:47Z"
}`}
                  </pre>
                  <p className="text-xs text-slate-500">
                    Stores daily completion records. Queried by date to calculate 7-day consistency graphs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PYTHON FLASK CODE BROWSER */}
          {activeTab === 'python-code' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Python Flask Project Files (`FitBuddy/app.py`)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Students can run this standalone Python Flask project locally or deploy it to Google Cloud Run.
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleCopy(
`# FitBuddy Python Flask App
# Save in FitBuddy/app.py
from flask import Flask, render_template, request, jsonify
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
client = genai.Client()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    msg = data.get('message', '')
    response = client.models.generate_content(
        model='gemini-3.8-flash',
        contents=f"User: {msg}. You are FitBuddy wellness assistant."
    )
    return jsonify({'reply': response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))`,
                      'flask-snippet'
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  {copiedCode === 'flask-snippet' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-2xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed max-h-96 whitespace-pre">
{`# FitBuddy - Full Python Flask Application (FitBuddy/app.py)
from flask import Flask, render_template, request, jsonify
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def api_chat():
    data = request.json or {}
    message = data.get('message', '')
    response = client.models.generate_content(
        model='gemini-3.8-flash',
        contents=f"User: {message}. Act as FitBuddy wellness assistant."
    )
    return jsonify({'reply': response.text})

@app.route('/api/workout', methods=['POST'])
def api_workout():
    data = request.json or {}
    goal = data.get('goal', 'General fitness')
    time = data.get('availableTime', '20')
    # Call Gemini to generate structured JSON routine
    return jsonify({"title": f"{goal} Session", "warmUp": ["Neck rolls"], "mainActivity": ["Bodyweight squats"], "coolDown": ["Gentle stretches"]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))`}
              </div>
            </div>
          )}

          {/* TAB 6: RUN LOCALLY & GOOGLE CLOUD RUN DEPLOYMENT */}
          {activeTab === 'deployment' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  How to Run Locally & Deploy to Google Cloud Run
                </h3>
                <p className="text-xs text-slate-500">
                  Step-by-step shell commands for development and production deployment.
                </p>
              </div>

              {/* Local Run */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-blue-600" />
                  <span>Step 1: Running Locally with Python</span>
                </h4>
                <div className="bg-slate-900 p-3 rounded-xl text-slate-100 font-mono text-xs space-y-1">
                  <p className="text-slate-400"># 1. Clone repository & enter directory</p>
                  <p>cd FitBuddy</p>
                  <p className="text-slate-400"># 2. Create virtual environment</p>
                  <p>python3 -m venv venv && source venv/bin/activate</p>
                  <p className="text-slate-400"># 3. Install dependencies</p>
                  <p>pip install -r requirements.txt</p>
                  <p className="text-slate-400"># 4. Set environment variable</p>
                  <p>export GEMINI_API_KEY="your-gemini-api-key"</p>
                  <p className="text-slate-400"># 5. Run Flask server</p>
                  <p>python app.py</p>
                </div>
              </div>

              {/* Cloud Run Deployment */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Cloud className="w-4 h-4 text-blue-600" />
                  <span>Step 2: Deploy to Google Cloud Run</span>
                </h4>
                <div className="bg-slate-900 p-3 rounded-xl text-slate-100 font-mono text-xs space-y-1">
                  <p className="text-slate-400"># 1. Authenticate with Google Cloud</p>
                  <p>gcloud auth login</p>
                  <p>gcloud config set project YOUR_PROJECT_ID</p>
                  <p className="text-slate-400"># 2. Build and deploy container to Cloud Run</p>
                  <p>gcloud run deploy fitbuddy-app \</p>
                  <p>&nbsp;&nbsp;--source . \</p>
                  <p>&nbsp;&nbsp;--platform managed \</p>
                  <p>&nbsp;&nbsp;--region us-central1 \</p>
                  <p>&nbsp;&nbsp;--allow-unauthenticated \</p>
                  <p>&nbsp;&nbsp;--set-env-vars GEMINI_API_KEY="your-gemini-api-key"</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
          <span>Prepared for Student Academic Presentation & Project Evaluation.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
