# FitBuddy – AI Fitness & Wellness Assistant for Students

**FitBuddy** is an intelligent, responsive full-stack web application tailored for college and university students. Powered by Google Gemini AI, Firebase Authentication, and Google Cloud Firestore, FitBuddy provides non-extreme daily activity routines, practical balanced student meal ideas, habit completion tracking, and an empathetic conversational wellness coach.

---

## Table of Contents
1. [Project Abstract](#1-project-abstract)
2. [Problem Statement](#2-problem-statement)
3. [Objectives](#3-objectives)
4. [Existing System](#4-existing-system)
5. [Proposed System](#5-proposed-system)
6. [Modules Description](#6-modules-description)
7. [System Architecture Explanation](#7-system-architecture-explanation)
8. [Database Design (Firestore Schema)](#8-database-design)
9. [Key Advantages](#9-key-advantages)
10. [Limitations](#10-limitations)
11. [Future Enhancements](#11-future-enhancements)
12. [Conclusion](#12-conclusion)
13. [Project Viva Questions and Answers (10+ Technical Q&As)](#13-project-viva-questions-and-answers)
14. [Step-by-Step Local Setup & Execution Guide](#14-step-by-step-local-setup--execution-guide)
15. [Google Gemini API Setup](#15-google-gemini-api-setup)
16. [Firebase Authentication & Firestore Setup](#16-firebase-setup)
17. [Google Cloud Run Deployment Instructions](#17-google-cloud-run-deployment-instructions)

---

## 1. Project Abstract
Modern college education requires students to spend extensive hours seated before laptops and attending lectures, leading to high sedentary fatigue, physical stiffness, poor hydration, and exam-induced anxiety. Existing fitness applications are designed for professional bodybuilders, demanding high-intensity gym routines and rigid calorie counting that trigger stress rather than wellness.

**FitBuddy** addresses this gap by acting as a gentle, educational wellness companion. Built using **Python Flask**, modern **HTML5/CSS3/JavaScript** (and React/TypeScript), **Google Gemini AI (`gemini-3.8-flash`)**, and **Firebase**, FitBuddy delivers customized 10–45 minute dorm-friendly movement sequences, unrestrictive nutritious meal suggestions (Vegetarian, Non-veg, Vegan, South Indian), an interactive habit tracker, and real-time AI conversational advice equipped with strict non-clinical safety boundaries.

---

## 2. Problem Statement
1. **Sedentary Desk Strain:** College students sit for 8–12 hours daily, suffering from thoracic hunching, forward-head posture, and eye strain.
2. **Impractical Fitness Tools:** Existing apps assume access to commercial gym machinery, 90 minutes of free time, and expensive dietary supplements.
3. **Harmful Nutritional Trends:** Restrictive dieting and extreme fasting promoted on social media create nutritional deficiencies, brain fog, and lack of energy during exam periods.
4. **Lack of Safe, Accessible Guidance:** Students need immediate, personalized suggestions for healthy sleep hygiene, study breaks, and hydration without fear of unsafe medical diagnosis.

---

## 3. Objectives
- **Personalized Micro-Activities:** Generate safe warm-up, main exercise, and posture cool-down routines that can be performed in dorm rooms or study areas within 10 to 45 minutes.
- **Balanced Student Nutrition:** Suggest accessible, affordable meal plates across diverse food preferences without calorie anxiety or extreme restrictions.
- **Conversational AI Coaching:** Leverage the official Google GenAI SDK to engage students with positive, actionable wellness answers.
- **Safety Enforcement:** Program system-level instructions preventing medical claims or pharmacological advice, automatically recommending university medical clinics for symptoms.
- **Persistent Progress Tracking:** Log daily habits (hydration, screen breaks, physical movement) in Firestore to visualize 7-day consistency streaks.

---

## 4. Existing System
- Designed primarily for heavy resistance training or competitive athletics.
- Enforces strict caloric logging, macronutrient obsession, and rapid weight-loss targets.
- Uses rigid static databases without generative adaptation to student dormitory constraints.
- Lacks embedded medical disclaimers or ergonomic desk-relief modules.

---

## 5. Proposed System
- **Student-Centric Wellness Model:** Emphasizes mobility, cognitive stamina, mental relaxation, and restorative sleep.
- **Generative AI Personalization:** Uses Google Gemini (`gemini-3.8-flash`) to dynamically format plans based on available student minutes, experience levels, and cuisine preferences.
- **Dual-Mode Architecture:** Operates with a clean Python Flask REST server or full-stack Express/React deployment with Firestore persistence and local storage fallback.
- **Non-Clinical Ethics:** Prohibits extreme exercises, dangerous calorie deficits, and self-diagnosis of illness.

---

## 6. Modules Description
1. **Authentication & Profile Module:** Manages student accounts via Firebase Authentication (email/password). Stores profile attributes (name, age, fitness goal, activity level, available time, food preference) in Firestore.
2. **Dashboard Module:** Displays personalized greeting, today's habit checklist, completion percentage, and 7-day consistency visualization.
3. **Gemini AI Chatbot Module:** Real-time conversational interface that passes user queries through server-side GenAI prompts with strict safety instructions.
4. **Activity Planner Module:** Receives goal and available time (10–45 mins) and outputs a structured Warm-up, Main Activity, Cool-down, and Safety Reminders.
5. **Balanced Meal Module:** Curates nutritious, budget-friendly breakfast, lunch, study snack, and dinner suggestions based on dietary choices.
6. **Habit Progress Module:** Tracks daily completion of 6 fundamental habits: Hydration, 15-min Movement, 20-20-20 Eye Breaks, Regular Meals, 3-min Mindful Breath, and 8h Sleep.

---

## 7. System Architecture Explanation

```
 ┌─────────────────────────────────────────────────────────┐
 │               Presentation Layer (Frontend)             │
 │   • HTML5, CSS3, JavaScript / React + Tailwind CSS      │
 │   • Firebase Auth Web SDK & LocalStorage Fallback       │
 └────────────────────────────┬────────────────────────────┘
                              │ JSON Requests (REST / Fetch)
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │               Application Layer (Backend Server)        │
 │   • Python Flask (app.py) / Node.js Express (server.ts) │
 │   • Route Handlers (/api/chat, /api/workout, /api/meals)│
 │   • Strict Non-Clinical Safety Prompt Sanitization      │
 └─────────────┬─────────────────────────────┬─────────────┘
               │                             │
    Google GenAI SDK Calls            Firestore Client SDK
               │                             │
               ▼                             ▼
 ┌──────────────────────────┐  ┌──────────────────────────┐
 │     Google Gemini AI     │  │     Firebase Cloud       │
 │   • gemini-3.8-flash     │  │   • Firebase Auth        │
 │   • JSON Schema outputs  │  │   • Firestore Database   │
 └──────────────────────────┘  └──────────────────────────┘
```

---

## 8. Database Design
FitBuddy uses **Google Cloud Firestore**, a scalable NoSQL document database:

### Collection 1: `users/{userId}`
Stores user demographic and fitness preferences:
```json
{
  "name": "Alex Rivera",
  "email": "alex.student@campus.edu",
  "age": "20",
  "goal": "General fitness & daily movement",
  "activityLevel": "Beginner",
  "availableTime": "20",
  "foodPreference": "Vegetarian",
  "createdAt": "2026-10-03T06:11:47Z"
}
```

### Collection 2: `progress/{userId}/dates/{dateString}`
Tracks daily completed habits for habit score calculation:
```json
{
  "date": "2026-10-03",
  "activitiesCompleted": [
    "hydration",
    "movement",
    "screen_break"
  ],
  "percentage": 50,
  "updatedAt": "2026-10-03T06:11:47Z"
}
```

---

## 9. Key Advantages
1. **Designed for Real Student Life:** No gym equipment or complex cooking facilities required.
2. **Strict Medical Safety Guardrails:** Safeguards students against harmful workout or diet trends.
3. **Instant Generative AI Speed:** Fast generation using Gemini 3.8 Flash.
4. **Secure Server-Side Architecture:** API keys are never exposed in frontend scripts.
5. **Cloud-Native & Scalable:** Ready to be hosted on Google Cloud Run with zero-scale cost efficiency.

---

## 10. Limitations
1. Requires an internet connection to reach Google Gemini and Firebase endpoints.
2. Does not directly read hardware sensors (e.g., smart watch heart rate monitors or step counters).
3. Provides educational wellness advice rather than clinical or therapeutic interventions.

---

## 11. Future Enhancements
- Integration with university cafeteria / hostel mess food menus.
- Real-time posture tracking using computer vision (MediaPipe) via webcam.
- Voice-enabled conversational coaching via Gemini Live API.
- Native mobile companion application (PWA / Android).

---

## 12. Conclusion
**FitBuddy** demonstrates how modern Generative AI, cloud databases, and compassionate human-centered design can come together to solve a genuine student dilemma. By prioritizing mental clarity, consistent micro-movement, and wholesome nutrition over extreme athletic pressure, FitBuddy empowers students to achieve academic excellence without sacrificing their health.

---

## 13. Project Viva Questions and Answers

### Q1: What makes FitBuddy different from commercial fitness apps like MyFitnessPal or Nike Training Club?
**Answer:** Most commercial apps cater to gym-goers and emphasize aggressive caloric deficits or heavy weight training. FitBuddy specifically targets college students with 10–45 minute dorm-friendly movement routines that counter desk sitting, wholesome balanced meals without calorie counting, and integrated safety disclaimers that protect against burnout and misinformation.

### Q2: Why did you select Google Gemini (`gemini-3.8-flash`) as the AI model?
**Answer:** `gemini-3.8-flash` delivers the optimal combination of sub-second inference speeds, high context understanding, and cost efficiency. Furthermore, it supports structured JSON schema enforcement (`response_mime_type="application/json"`), ensuring that our activity and meal responses always parse reliably.

### Q3: How do you prevent Gemini from prescribing medication or acting as an unlicensed doctor?
**Answer:** We enforce a strict system instruction prompt on the server side (`WELLNESS_SYSTEM_INSTRUCTION`). It explicitly forbids diagnosing symptoms, prescribing medications, or recommending extreme fasting. If a student mentions illness or pain, the model is instructed to warmly recommend consulting their university health clinic or a doctor.

### Q4: How is the `GEMINI_API_KEY` protected from security breaches?
**Answer:** The API key is stored exclusively in server environment variables (`.env` or Cloud Run Secret Manager). The frontend communicates with the backend via proxy endpoints (`/api/chat`, `/api/workout`, `/api/meals`), ensuring the API key is never transmitted to or visible in client JavaScript.

### Q5: Explain the database architecture used for tracking student progress.
**Answer:** We utilized Google Cloud Firestore, a NoSQL document database. We created a `users` collection keyed by `userId` for profile preferences, and a `progress` subcollection structured as `progress/{userId}/dates/{date}` storing an array of completed habit identifiers. This allows O(1) daily lookups and straightforward 7-day aggregation.

### Q6: How does the application handle scenarios where the student loses internet connection?
**Answer:** The frontend implements dual-layer storage caching. If Firestore is offline or still synchronizing, the app mirrors user preferences and today's completed habit checklist into the browser's `localStorage`, providing uninterrupted offline feedback.

### Q7: Why is Google Cloud Run ideal for deploying this application?
**Answer:** Cloud Run is a fully managed serverless container platform. It automatically scales containers from zero to handle bursts of students during peak morning or exam hours, automatically issues HTTPS SSL certificates, and charges only for the exact milliseconds CPU/memory are utilized.

---

## 14. Step-by-Step Local Setup & Execution Guide

### Prerequisites
- Python 3.10+ installed
- Node.js 18+ (if running Vite full-stack version)
- A Google Gemini API Key from Google AI Studio

### Running the Python Flask Application
1. Open your terminal and navigate to the project directory:
   ```bash
   cd FitBuddy
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment configuration and add your Gemini API Key:
   ```bash
   cp .env.example .env
   # Edit .env and paste your GEMINI_API_KEY
   ```
5. Run the Flask development server:
   ```bash
   python app.py
   ```
6. Open your web browser and navigate to:
   `http://127.0.0.1:5000`

---

## 15. Google Gemini API Setup
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Click **Get API key** and generate a new key.
3. Save the key in your `.env` file:
   ```env
   GEMINI_API_KEY="AIzaSyYourGeneratedGeminiKey..."
   ```

---

## 16. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Create a project** and name it `fitbuddy-wellness`.
3. In the left sidebar:
   - Go to **Authentication** → Get Started → Enable **Email/Password**.
   - Go to **Firestore Database** → Create database → Choose **production mode**.
4. In Project Settings → General → Web Apps (`</>`), register your web app.
5. Copy your configuration into `FitBuddy/firebase/firebase-config.js`.

---

## 17. Google Cloud Run Deployment Instructions

1. Install the Google Cloud SDK and authenticate:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_GCP_PROJECT_ID
   ```
2. Build and deploy containerized service:
   ```bash
   gcloud run deploy fitbuddy-assistant \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY="your-gemini-api-key"
   ```
3. Cloud Run will provide your live HTTPS URL (e.g. `https://fitbuddy-assistant-xyz-uc.a.run.app`).
