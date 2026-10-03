"""
FitBuddy - AI Fitness & Wellness Assistant for Students
Backend: Python Flask + Google Gemini AI (official google-genai SDK)
Database & Auth: Firebase Firestore & Firebase Authentication
Deployment: Google Cloud Run
"""

import os
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "fitbuddy-student-secret-2026")

# Initialize Gemini Client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
client = None
if GEMINI_API_KEY:
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Google GenAI Client: {e}")

WELLNESS_SYSTEM_INSTRUCTION = """You are FitBuddy, a friendly, supportive, and knowledgeable AI wellness and fitness assistant specially created for college and university students.

CORE RULES:
1. Provide practical, gentle, balanced guidance for physical activity, mobility, wholesome meals, stress management, hydration, and sleep.
2. DO NOT ACT AS A DOCTOR, CLINICIAN, OR MEDICAL PROFESSIONAL.
3. NEVER diagnose medical conditions, prescribe medications or supplements, or offer medical treatment.
4. For any reported pain, injury, dizziness, eating disorder concerns, illness, or medical symptoms, immediately and warmly advise the student to consult a qualified physician, university health center, or licensed healthcare professional.
5. DO NOT recommend extreme exercise routines, exhaustive exhaustion drills, or rapid weight-loss programs. Focus on consistency, energy, mental clarity, and sustainable wellness.
6. For meals, encourage balanced, affordable, easily prepared meals with good hydration. Avoid restrictive diets, extreme caloric deficits, or fasting regimes.
7. Keep tone empathetic, encouraging, concise, and student-relatable."""

# ================= PAGE ROUTES =================

@app.route('/')
def home():
    """Home Page with hero, features, quick actions and disclaimer."""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """Main student dashboard with habits checklist and progress."""
    return render_template('dashboard.html')

@app.route('/chatbot')
def chatbot():
    """Interactive Gemini AI chat interface."""
    return render_template('chatbot.html')

@app.route('/workout')
def workout():
    """Activity planner form and routine generator."""
    return render_template('workout.html')

@app.route('/meals')
def meals():
    """Balanced meal ideas generator."""
    return render_template('meals.html')

@app.route('/profile')
def profile():
    """Student profile configuration page."""
    return render_template('profile.html')

@app.route('/login')
def login_page():
    """Student login page."""
    return render_template('login.html')

@app.route('/register')
def register_page():
    """Student registration page."""
    return render_template('register.html')

# ================= API ENDPOINTS =================

@app.route('/api/chat', methods=['POST'])
def api_chat():
    """
    POST /api/chat
    Payload: { "message": "string", "history": [...] }
    Returns: { "reply": "string" }
    """
    data = request.get_json() or {}
    user_msg = data.get('message', '').strip()

    if not user_msg:
        return jsonify({'error': 'Message text is required'}), 400

    if not client or not GEMINI_API_KEY:
        return jsonify({
            'reply': (
                "Hello from FitBuddy! I am ready to help you with gentle study-break stretches, "
                "hydration habits, and balanced college meals. (Connect your GEMINI_API_KEY in .env "
                "to activate real-time Gemini generation). Remember to listen to your body and "
                "consult campus medical staff for any health concerns."
            )
        })

    try:
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=user_msg,
            config={
                'system_instruction': WELLNESS_SYSTEM_INSTRUCTION,
                'temperature': 0.7,
            }
        )
        reply_text = response.text or "Stay hydrated and take a refreshing screen break!"
        return jsonify({'reply': reply_text})
    except Exception as e:
        print(f"Gemini API chat error: {e}")
        return jsonify({'error': 'Failed to process chat query with Gemini'}), 500

@app.route('/api/workout', methods=['POST'])
def api_workout():
    """
    POST /api/workout
    Payload: { "goal": "string", "availableTime": "20", "experienceLevel": "Beginner" }
    Returns: JSON formatted activity plan (warmUp, mainActivity, coolDown, safetyReminders)
    """
    data = request.get_json() or {}
    goal = data.get('goal', 'General fitness & daily movement')
    time_min = data.get('availableTime', '20')
    level = data.get('experienceLevel', 'Beginner')
    context = data.get('userContext', 'Student dorm room without weights')

    if not client or not GEMINI_API_KEY:
        # Safe default response
        return jsonify({
            "title": f"{goal} Session ({time_min} mins)",
            "warmUp": [
                "2 mins Neck rolls and shoulder circles (releases study hunch)",
                "3 mins Gentle torso twists and hip rotations"
            ],
            "mainActivity": [
                "4 mins Bodyweight squats or chair squats",
                "4 mins Wall or knee push-ups paired with overhead reaches",
                "4 mins Alternating lunges or brisk marching",
                "3 mins Core bird-dog or gentle plank hold"
            ],
            "coolDown": [
                "3 mins Standing hamstring & chest openers",
                "2 mins Diaphragmatic deep breathing"
            ],
            "safetyReminders": [
                "Do not push through joint or muscle pain.",
                "Take small sips of water throughout."
            ],
            "advice": "Daily moderate movement boosts academic focus and lowers cortisol."
        })

    prompt = f"""Generate a safe, student-friendly {time_min}-minute movement routine for a student.
Goal: {goal}
Level: {level}
Context: {context}

STRICT SAFETY CONSTRAINTS:
- Do NOT generate extreme workouts, exhaustive HIIT, or rapid weight-loss targets.
- Focus on general fitness, mobility, posture correction from sitting, or light movement.
- Return strictly a valid JSON object matching this schema:
{{
  "title": "string",
  "warmUp": ["step 1", "step 2"],
  "mainActivity": ["exercise 1", "exercise 2", "exercise 3"],
  "coolDown": ["stretch 1", "stretch 2"],
  "safetyReminders": ["safety tip 1", "safety tip 2"],
  "advice": "encouraging tip"
}}"""

    try:
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt,
            config={
                'system_instruction': WELLNESS_SYSTEM_INSTRUCTION,
                'response_mime_type': 'application/json',
                'temperature': 0.6,
            }
        )
        plan = json.loads(response.text)
        return jsonify(plan)
    except Exception as e:
        print(f"Workout generation error: {e}")
        return jsonify({
            "title": f"{goal} Routine",
            "warmUp": ["3 mins Dynamic arm and neck circles"],
            "mainActivity": ["12 mins Low-impact bodyweight mobility sequence"],
            "coolDown": ["5 mins Static stretching & deep breathing"],
            "safetyReminders": ["Listen to your body at all times."],
            "advice": "Consistency is key to sustainable student vitality."
        })

@app.route('/api/meals', methods=['POST'])
def api_meals():
    """
    POST /api/meals
    Payload: { "foodPreference": "Vegetarian", "dietaryNotes": "campus budget" }
    Returns: JSON formatted balanced meal ideas without restrictive diets.
    """
    data = request.get_json() or {}
    preference = data.get('foodPreference', 'Vegetarian')
    notes = data.get('dietaryNotes', 'Affordable student meals')

    if not client or not GEMINI_API_KEY:
        return jsonify({
            "preference": preference,
            "breakfast": {
                "name": "Oatmeal Bowl or Spiced Poha / Idli",
                "description": "Slow-release carbs with nuts or peanuts and seasonal fruit.",
                "studentTip": "Quick to assemble in under 5 minutes before morning lectures."
            },
            "lunch": {
                "name": "Balanced Dal & Rice / Grain Bowl with Greens",
                "description": "High fiber lentils, colorful seasonal vegetables, and probiotic yogurt.",
                "studentTip": "Provides steady energy without afternoon post-lunch sluggishness."
            },
            "snack": {
                "name": "Roasted Chickpeas / Makhana / Fruit & Walnuts",
                "description": "Crunchy brain-boosting snack rich in magnesium and protein.",
                "studentTip": "Keep an airtight box in your study bag."
            },
            "dinner": {
                "name": "Light Vegetable Kootu / Khichdi / Warm Stir-Fry",
                "description": "Comforting, warm and light on digestion for deep, uninterrupted sleep.",
                "studentTip": "Eat 2 hours before bed for superior sleep quality."
            },
            "hydrationTip": "Drink 2 to 2.5L clean water throughout the day.",
            "balancedDietNote": "FitBuddy does not support calorie counting or restrictive deprivation."
        })

    prompt = f"""Generate practical, affordable, balanced student meal ideas for preference: "{preference}".
Notes: {notes}

STRICT NUTRITIONAL PRINCIPLES:
- DO NOT generate restrictive diets, fasting plans, calorie limits, or weight-loss targets.
- Recommend wholesome, affordable, accessible ingredients suitable for student hostels or quick cooking.
- Return strictly a valid JSON object matching this schema:
{{
  "preference": "{preference}",
  "breakfast": {{ "name": "string", "description": "string", "studentTip": "string" }},
  "lunch": {{ "name": "string", "description": "string", "studentTip": "string" }},
  "snack": {{ "name": "string", "description": "string", "studentTip": "string" }},
  "dinner": {{ "name": "string", "description": "string", "studentTip": "string" }},
  "hydrationTip": "string",
  "balancedDietNote": "string"
}}"""

    try:
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt,
            config={
                'system_instruction': WELLNESS_SYSTEM_INSTRUCTION,
                'response_mime_type': 'application/json',
                'temperature': 0.6,
            }
        )
        meal_plan = json.loads(response.text)
        return jsonify(meal_plan)
    except Exception as e:
        print(f"Meal generation error: {e}")
        return jsonify({
            "preference": preference,
            "breakfast": { "name": "Balanced Breakfast", "description": "Complex carbs and fruit", "studentTip": "Quick" },
            "lunch": { "name": "Nourishing Plate", "description": "Grains and legumes", "studentTip": "Filling" },
            "snack": { "name": "Nuts & Seasonal Fruit", "description": "Healthy fats", "studentTip": "Portable" },
            "dinner": { "name": "Light Evening Stew", "description": "Easily digested", "studentTip": "Restful" },
            "hydrationTip": "Keep a water bottle on your desk.",
            "balancedDietNote": "Focus on nutrient-dense real foods."
        })

@app.route('/api/wellness-tips')
def api_wellness_tips():
    """Returns curated daily wellness advice categories."""
    tips = [
        {"id": "hydration", "title": "Hydration", "tip": "Drink 7-8 glasses of water daily."},
        {"id": "sleep", "title": "Sleep", "tip": "Maintain 7-8 hours of regular sleep."},
        {"id": "movement", "title": "Movement", "tip": "Stand and stretch every 50 minutes."},
        {"id": "screen_breaks", "title": "Screen Breaks", "tip": "Follow the 20-20-20 rule."},
        {"id": "relaxation", "title": "Relaxation", "tip": "Practice 4-4-4 diaphragmatic breathing."},
        {"id": "regular_meals", "title": "Regular Meals", "tip": "Eat consistent meals without skipping."}
    ]
    return jsonify({"tips": tips})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
