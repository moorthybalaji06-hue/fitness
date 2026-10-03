/**
 * Firebase Client Configuration for FitBuddy
 * Uses Firebase Web SDK (v10 / v11 modular)
 *
 * Replace the placeholders below with your credentials from:
 * https://console.firebase.google.com -> Project Settings -> General -> Your Apps
 */

export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-fitbuddy-app.firebaseapp.com",
  projectId: "your-fitbuddy-app",
  storageBucket: "your-fitbuddy-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

/**
 * Suggested Firestore Rules (firestore.rules):
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /users/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 *     match /progress/{userId}/dates/{date} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 *   }
 * }
 */
